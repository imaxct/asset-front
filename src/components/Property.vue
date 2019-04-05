<template>
  <card header="资产详情">
    <div slot="content"></div>
  </card>
</template>

<script>
import { Card } from "vux";
import { showMsg } from "@/libs/util";
import { getDetail } from "@/api/property";
export default {
  data() {
    return {
      id: this.$route.params.id || "null"
    };
  },
  methods: {
    loadData() {
      getDetail().then(res => {
        
      });
    }
  },
  mounted() {
    if (!this.$route.params.id) {
      showMsg({
        title: "提示",
        content: "参数错误",
        replacePath: "/",
        router: this.$router
      });
    } else {
      this.loadData();
    }
  }
};
</script>