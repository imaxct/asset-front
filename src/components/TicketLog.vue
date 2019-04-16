<template>
  <div>
    <x-header>流程进度</x-header>
    <group :title="process.process.name + '- 当前进度'">
      <div style="padding: 0 40px;">
        <flow>
          <flow-state state="1" title="提交" is-done></flow-state>
          <flow-line is-done></flow-line>
          <template v-for="(p, idx) in process.steps">
            <flow-state
              :state="idx + 2"
              :title="p.name"
              :is-done="!curStep || p.id < ticket.ticket.curStepId"
            ></flow-state>
            <flow-line :is-done="!curStep || p.id < ticket.ticket.curStepId" v-if="p.nextStepId"></flow-line>
          </template>
        </flow>
      </div>
    </group>
    <group :title="'当前步骤：' + curStep.name" v-if="canProcess">
      <radio :options="[{key:'true',value:'同意'},{key:'false',value:'拒绝'}]" @on-change="valueChange"></radio>
      <x-textarea v-model="stepProcess.text" placeholder="请填写审批意见" title="审批意见"></x-textarea>
      <div style="padding: 0 10px;">
        <x-button @click.native="handleSumbit" mini plain type="primary">提交</x-button>
      </div>
    </group>
    <group title="流程记录">
      <x-table style="line-height: 35px;">
        <thead style="font-size: 14px;">
          <tr>
            <th>时间</th>
            <th>步骤</th>
            <th>处理人</th>
            <th>是否通过</th>
          </tr>
        </thead>
        <tbody style="font-size: 13px; color: #7d7d7d;">
          <tr v-for="(log, idx) in ticket.logs" :key="idx" @click="clickItem(idx)">
            <td>{{log.gmtCreate}}</td>
            <td>{{log.stepName}}</td>
            <td>{{log.processUser}}</td>
            <td>{{log.pass ? '是' : '否'}}</td>
          </tr>
        </tbody>
      </x-table>
    </group>
    <div v-transfer-dom>
      <popup v-model="show">
        <group title="审批意见">
          <p style="padding: 10px 15px;">{{message}}</p>
        </group>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  Cell,
  Step,
  StepItem,
  Divider,
  Group,
  XHeader,
  Flow,
  FlowState,
  FlowLine,
  XTable,
  Popup,
  TransferDom,
  Radio,
  XTextarea,
  XButton
} from "vux";
import { getProcessById } from "@/api/process";
import { getTicketDetail } from "@/api/ticket";
import { process } from "@/api/log";
import { showMsg, getToken } from "@/libs/util";
export default {
  components: {
    Cell,
    Step,
    StepItem,
    Divider,
    Group,
    XHeader,
    Flow,
    FlowState,
    FlowLine,
    XTable,
    Popup,
    Radio,
    XTextarea,
    XButton
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      stepProcess: {
        pass: false,
        text: ""
      },
      show: false,
      message: "",
      canProcess: false,
      curStep: null,
      process: {
        process: {},
        steps: []
      },
      ticket: {
        propertyId: "",
        propertyName: "",
        ticket: {},
        logs: []
      }
    };
  },
  methods: {
    valueChange(value, label) {
      if (value === "true") {
        this.$set(this.stepProcess, "pass", true);
      } else {
        this.$set(this.stepProcess, "pass", false);
      }
    },
    handleSumbit() {
      process({
        pass: this.stepProcess.pass,
        stepId: this.curStep.id,
        ticketId: this.ticket.ticket.id,
        processProposal: this.stepProcess.text
      }).then(res => {
        if (res.data.ok) {
          showMsg({
            content: "提交成功",
            replacePath: `/prop/${this.ticket.propertyId}`,
            router: this.$router
          });
        } else {
          showMsg({
            content: res.data.msg,
            replacePath: "/",
            router: this.$router
          });
        }
      });
    },
    clickItem(idx) {
      this.message = this.ticket.logs[idx].processProposal;
      this.show = true;
    },
    loadData() {
      getTicketDetail(this.$route.params.tid).then(res => {
        if (res.data.ok) {
          const token = getToken();
          this.ticket = res.data.obj;
          getProcessById(this.ticket.ticket.processId).then(r => {
            if (r.data.ok) {
              this.process = r.data.obj;
              for (let i = 0; i < this.process.steps.length; i++) {
                const step = this.process.steps[i];
                if (step.id === this.ticket.ticket.curStepId) {
                  this.curStep = step;
                  break;
                }
              }
              if (!this.curStep) return;
              const arr = this.curStep.roleRequired.split(",");
              if (!token) return;
              for (let idx in arr) {
                if (arr[idx] === token.roleId) {
                  if (this.ticket.ticket.applyUserId != token.userId) {
                    this.canProcess = true;
                  }
                  break;
                }
              }
            } else {
              showMsg({
                content: r.data.msg,
                replacePath: "/",
                router: this.$router
              });
            }
          });
        } else {
          showMsg({
            content: res.data.msg,
            replacePath: "/",
            router: this.$router
          });
        }
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
