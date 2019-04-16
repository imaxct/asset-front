<template>
  <div>
    <x-header>我的记录</x-header>
    <panel type="4" header="记录列表" :list="list"></panel>
    <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-if="list.length <= 0"></load-more>
  </div>
</template>
<script>
import { getMyTickets } from "@/api/ticket";
import { showMsg, TicketStatus } from "@/libs/util";
import { XHeader, Panel, LoadMore } from "vux";
export default {
  components: {
    XHeader,
    Panel,
    LoadMore
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    loadData() {
      getMyTickets().then(res => {
        if (res.data.ok) {
          const data = res.data.obj;
          data.forEach(t => {
            this.list.push({
              title: `${t.propertyName} - ${t.processName}`,
              desc: `当前状态: ${TicketStatus[t.ticket.curStatus]} 当前步骤: ${
                t.curStepName
              }`,
              url: {
                path: `/log/${t.ticket.id}`,
                replace: false
              }
            });
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

