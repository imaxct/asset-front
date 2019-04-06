<template>
  <div>
    <x-header>流程进度</x-header>
    <group title="当前进度">
      <br>
      <flow>
        <flow-state state="1" title="提交流程" is-done></flow-state>
        <flow-line is-done></flow-line>
        <template v-for="(p, idx) in process.steps">
          <flow-state :state="idx + 1" :title="p.name" :is-done="p.id < ticket.ticket.curStepId"></flow-state>
          <flow-line
            :tip="ticket.ticket.curStepId === p.nextStepId ? '进行中' : ''"
            :is-done="p.id < ticket.ticket.curStepId"
            v-if="p.nextStepId"
          ></flow-line>
        </template>
      </flow>
      <!-- <step v-model="curStepValue" style="width: 95%;margin: 0 auto;">
        <step-item v-for="(p,idx) in this.process.steps" :title="p.name" :key="idx"></step-item>
      </step>-->
    </group>
  </div>
</template>
<script>
import {
  Step,
  StepItem,
  Divider,
  Group,
  XHeader,
  Flow,
  FlowState,
  FlowLine
} from "vux";
import { getProcessById } from "@/api/process";
import { getTicketDetail } from "@/api/ticket";
import { showMsg } from "@/libs/util";
export default {
  components: {
    Step,
    StepItem,
    Divider,
    Group,
    XHeader,
    Flow,
    FlowState,
    FlowLine
  },
  data() {
    return {
      process: {
        process: { name: "资产入库", id: 1 },
        steps: [
          {
            id: 1,
            name: "步骤1",
            nextStepId: 2,
            roleRequired: "admin",
            statusRequired: null
          },
          {
            id: 2,
            name: "步骤2",
            nextStepId: 3,
            roleRequired: "admin",
            statusRequired: null
          },
          {
            id: 3,
            name: "步骤3",
            nextStepId: null,
            roleRequired: "admin",
            statusRequired: null
          }
        ]
      },
      ticket: {
        ticket: {
          id: 1,
          curStepId: 3,
          processId: 1,
          curStatus: "PROCESSING",
          applyReason: "申请原因"
        },
        logs: []
      }
    };
  },
  methods: {
    loadData() {
      getTicketDetail(this.$route.params.tid).then(res => {
        if (res.data.ok) {
          this.ticket = res.data.obj;
          getProcessById(this.ticket.ticket.processId).then(r => {
            if (r.data.ok) {
              this.process = r.data.obj;
              // for (let i = 0; i < this.process.steps.length; i++) {
              //   if (this.process.steps[i].id === this.ticket.ticket.curStepId) {
              //     this.curStepValue = i;
              //     break;
              //   }
              // }
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
    //this.loadData();
  }
};
</script>
