<template>
  <div>
    <x-header>资产列表</x-header>
    <panel type="4" header="资产列表" :list="list"></panel>
    <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-if="list.length <= 0"></load-more>
  </div>
</template>

<script>
import { Panel, AlertModule, LoadMore, XHeader } from "vux";
import { getMine, getMyDep } from "@/api/property";
import { showMsg, PropertyStatus } from "@/libs/util";
const StatusRequired = {
  "1": ["PENDING_IMPORT"],
  "2": ["IDLE", "DAMAGED", "RUINED"],
  "3": ["OCCUPIED"],
  "4": ["IDLE", "OCCUPIED"],
  "5": ["IDLE", "OCCUPIED"]
};
export default {
  components: {
    Panel,
    LoadMore,
    XHeader
  },
  data() {
    return {
      list: [],
      less: false
    };
  },
  methods: {
    handleResponse(res) {
      if (res.data.ok) {
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
            desc: `当前状态：${PropertyStatus[t.curStatus]} 当前流程：${
              t.curProcess
            }`,
            url: {
              path: this.less
                ? `/prop/${t.propertyId}`
                : `/ticket/${this.$route.params.pid}/${t.id}`,
              replace: true
            },
            meta: {
              source: t.depName,
              other: t.gmtModified
            }
          });
        });
      }
    },
    handleError(err) {
      console.log(err);
      showMsg({
        title: "提示",
        content: "加载数据错误",
        replacePath: "/",
        router: this.$router
      });
    },
    loadData() {
      getMine()
        .then(res => {
          this.handleResponse(res);
        })
        .catch(err => {
          this.handleError(err);
        });

      if (!this.less) {
        getMyDep()
          .then(res => {
            this.handleResponse(res);
          })
          .catch(err => {
            this.handleError(err);
          });
      }
    }
  },
  mounted() {
    if (!this.$route.params.pid || !this.$route.params.pid.match(/^\d+$/)) {
      this.less = true;
    } else {
      this.loadData();
    }
  }
};
</script>