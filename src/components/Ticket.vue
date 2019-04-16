<template>
  <div>
    <x-header>填写流程单({{process[pid]}})</x-header>
    <group>
      <cell title="名称" :value="prop.name"></cell>
      <cell title="部门" :value="prop.depName"></cell>
      <cell title="当前状态" :value="PropertyStatus[prop.curStatus]"></cell>
      <popup-picker
        title="资产状态"
        v-if="pid == 4 || pid == 5"
        :data="option"
        v-model="finalStatus"
        :show-name="true"
      ></popup-picker>
      <x-textarea title="申请原因" :max="250" placeholder="请填写申请原因" v-model="applyReason"></x-textarea>
      <br>
      <div style="padding: 0 20px;">
        <x-button @click.native="submit" type="primary">提交</x-button>
      </div>
    </group>
  </div>
</template>

<script>
import {
  XTextarea,
  Group,
  XInput,
  XHeader,
  PopupPicker,
  Cell,
  XButton
} from "vux";
import { getBrief } from "@/api/property";
import { submitTicket } from "@/api/ticket";
import { PropertyStatus, showMsg } from "@/libs/util";
export default {
  components: {
    XTextarea,
    Group,
    XInput,
    XHeader,
    PopupPicker,
    Cell,
    XButton
  },
  data() {
    return {
      pid: this.$route.params.pid,
      applyReason: "",
      prop: {},
      finalStatus: [],
      PropertyStatus,
      option: [
        [
          { name: "正常", value: "SAME" },
          { name: "损坏", value: "DAMAGED" },
          { name: "丢失", value: "LOST" },
          { name: "报废", value: "RUINED" },
          { name: "故障", value: "OUT_OF_WORK" }
        ]
      ],
      process: {
        1: "资产入库",
        2: "资产出库",
        3: "资产流转",
        4: "资产处理",
        5: "资产维保"
      }
    };
  },
  methods: {
    submit() {
      submitTicket({
        propertyId: this.prop.id,
        processId: this.pid,
        applyReason: this.applyReason
      }).then(res => {
        showMsg({
          content: res.data.ok ? "提交成功" : res.data.msg,
          replacePath: res.data.ok ? `/ticket/${res.data.obj}` :"/",
          router: this.$router
        });
      });
    },
    loadData() {
      getBrief(this.$route.params.id).then(res => {
        if (res.data.ok) {
          const data = res.data.obj;
          if (data.length === 1) {
            this.prop = data[0];
          }
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