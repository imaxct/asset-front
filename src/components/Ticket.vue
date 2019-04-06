<template>
  <div>
    <x-header>填写流程单({{process[pid].name}})</x-header>
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
      <x-textarea title="申请原因" :max="250" placeholder="请填写申请原因"></x-textarea>
    </group>
  </div>
</template>

<script>
import { XTextarea, Group, XInput, XHeader, PopupPicker, Cell } from "vux";
import { getBrief } from "@/api/property";
import { PropertyStatus, showMsg } from "@/libs/util";
export default {
  components: {
    XTextarea,
    Group,
    XInput,
    XHeader,
    PopupPicker,
    Cell
  },
  data() {
    return {
      pid: this.$route.params.pid,
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
        1: {
          name: "资产入库"
        },
        2: {
          name: "资产出库"
        },
        3: {
          name: "资产流转"
        },
        4: {
          name: "资产处理"
        },
        5: {
          name: "资产维保"
        }
      }
    };
  },
  methods: {
    loadData() {
      getBrief(this.$route.params.id).then(res => {
        if (res.data.ok) {
          const data = res.data.obj;
          if (data.length === 1) {
            this.prop = data[0];
          }
        } else {
          showMsg({
            title: "提示",
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