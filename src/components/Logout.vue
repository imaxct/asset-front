<template>
  <div>
    <x-header>退出登录</x-header>
    <msg title="确认退出？" description="退出登录后，将会跳转到登录页面重新登录" icon="warn" :buttons="buttons"></msg>
  </div>
</template>
<script>
import { Msg, XHeader } from "vux";
import { mapActions } from "vuex";
export default {
  components: {
    Msg,
    XHeader
  },
  methods: {
    ...mapActions(["handleLogout"]),
    logout() {
      this.handleLogout();
      this.$router.push({
        name: "login"
      });
    }
  },
  data() {
    return {
      buttons: [
        {
          type: "primary",
          text: "确认退出",
          onClick: this.logout.bind(this)
        }
      ]
    };
  }
};
</script>
