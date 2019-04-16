<template>
  <div>
    <x-header>{{$route.params.todo? '待办工单' : '我的记录' }}</x-header>
    <panel type="4" header="记录列表" :list="list"></panel>
    <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-if="list.length <= 0"></load-more>
  </div>
</template>
<script>
import { getMyTickets, getTodoTickets } from "@/api/ticket";
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
      if (this.$route.params.todo) {
        getTodoTickets().then(res => {
          this.handleResponse(res);
        });
      } else {
        getMyTickets().then(res => {
          this.handleResponse(res);
        });
      }
    },
    handleResponse(res) {
      if (res.data.ok) {
        const data = res.data.obj;
        data.forEach(t => {
          this.list.push({
            title: `${t.propertyName} - ${t.processName}`,
            desc: `当前状态: ${TicketStatus[t.ticket.curStatus]} 当前步骤: ${
              t.curStep ? t.curStep.name : "无"
            }`,
            url: {
              path: `/log/${t.ticket.id}`,
              replace: false
            },
            meta: {
              source: `申请人:${t.applyUserName}`,
              date: t.ticket.gmtCreate
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

