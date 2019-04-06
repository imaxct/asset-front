<template>
  <div></div>
</template>
<script>
import { Flow, FlowState, FlowLine } from "vux";
import { getProcessById } from "@/api/process";
import { getTicketDetail } from "@/api/ticket";
import { showMsg } from "@/libs/util";
export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  data() {
    return {
      process: {
        process: {},
        steps: []
      },
      ticket: {
        ticket: {},
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
