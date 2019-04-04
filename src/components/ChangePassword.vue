<template>
  <div>
    <group title="旧密码">
      <x-input
        type="password"
        title="输入旧密码"
        placeholder="输入旧密码"
        :show-clear="true"
        v-model="oldPassword"
        required
      ></x-input>
    </group>
    <group title="新密码">
      <x-input
        type="password"
        title="输入新密码"
        placeholder="输入新密码"
        :show-clear="true"
        v-model="newPassword"
        required
      ></x-input>
    </group>
    <group title="重复新密码">
      <x-input
        type="password"
        title="重复新密码"
        placeholder="重复新密码"
        :show-clear="true"
        v-model="newPassword2"
        :equal-with="newPassword"
        required
      ></x-input>
    </group>
    <group>
      <x-button @click.native="onClick">提交</x-button>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XButton, AlertModule } from "vux";
import { changePassword } from "@/api/user";
import { setToken } from "@/libs/util";
import { mapActions } from "vuex";
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    };
  },
  methods: {
    ...mapActions(["handleLogout"]),
    onClick() {
      changePassword({
        newPassword: this.newPassword,
        oldPassword: this.oldPassword
      })
        .then(res => {
          const data = res.data;
          let path = "/login";
          let msg = "修改成功";
          if (!data.ok) {
            path = "/";
            msg = data.msg || "修改失败";
          } else {
            setToken({});
            this.handleLogout();
          }
          const that = this;
          AlertModule.show({
            title: "提示",
            content: msg,
            onHide() {
              if (data.ok) {
                that.$router.replace({
                  path
                });
              }
            }
          });
        })
        .catch(err => {
          const that = this;
          AlertModule.show({
            title: "错误",
            content: err,
            onHide() {
              that.$router.replace({
                name: "home"
              });
            }
          });
        });
    }
  }
};
</script>