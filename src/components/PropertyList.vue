<template>
  <panel type="4" header="资产列表" :list="list"></panel>
</template>

<script>
import { Panel, AlertModule } from "vux";
import { getAvailable } from "@/api/property";
import { showMsg } from "@/libs/util";
const PropertyStatus = {
  PENDING_IMPORT: "等待入库",
  IDLE: "空闲",
  OCCUPIED: "使用中",
  PROCESSING: "流程处理中",
  DAMAGED: "损坏",
  LOST: "丢失",
  RUINED: "报废"
};
const StatusRequired = {
  "1": ["PENDING_IMPORT"],
  "2": ["IDLE", "DAMAGED", "RUINED"],
  "3": ["IDLE", "OCCUPIED"],
  "4": ["IDLE", "OCCUPIED"],
  "5": ["IDLE", "OCCUPIED"]
};
export default {
  components: {
    Panel
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    loadData() {
      getAvailable()
        .then(res => {
          if (!res.data.ok) {
            showMsg({
              title: "提示",
              content: res.data.msg,
              replacePath: "/",
              router: this.$router
            });
          } else {
            const data = res.data.obj;
            data.forEach(t => {
              const status = StatusRequired[this.$route.params.pid];
              if (!status.includes(t.curStatus)) {
                return;
              }
              if (t.gmtModified) {
                t.gmtModified = t.gmtModified.replace("T", " ");
              }
              this.list.push({
                title: t.name,
                desc: `当前状态：${PropertyStatus[t.curStatus]}`,
                url: {
                  path: `/Ticket/${this.$route.params.pid}/${t.id}`,
                  replace: true
                },
                meta: {
                  source: t.gmtModified
                }
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
          showMsg({
            title: "提示",
            content: "加载数据错误",
            replacePath: "/",
            router: this.$router
          });
        });
    }
  },
  mounted() {
    if (!this.$route.params.pid || !this.$route.params.pid.match(/^\d+$/)) {
      showMsg({
        title: "提示",
        content: "参数错误, 未选择流程",
        replacePath: "/",
        router: this.$router
      });
    } else {
      this.loadData();
    }
  }
};
</script>