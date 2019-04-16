<template>
  <div>
    <divider></divider>
    <!-- <div style="text-align: center;">
      <img src="../assets/profile_logo2.png" width="200">
    </div> -->

    <group title="个人页">
      <cell
        title="个人信息"
        is-link
        :border-intent="false"
        :arrow-direction="showInfo ? 'up' : 'down'"
        @click.native="showInfo = !showInfo"
      >
        <img slot="icon" src="../assets/profile.png" width="20" class="item-icon">
      </cell>

      <template v-if="showInfo">
        <cell-box :border-intent="false" class="sub-item">用户名: {{info.username}}</cell-box>
        <cell-box class="sub-item">姓名: {{info.name}}</cell-box>
        <cell-box class="sub-item">角色: {{info.roleName}}</cell-box>
      </template>
      <cell title="我的记录" is-link link="/ticketList">
        <img slot="icon" src="../assets/record.png" width="20" class="item-icon">
      </cell>
      <cell title="当前资产" is-link link="/process">
        <img slot="icon" src="../assets/property.png" width="20" class="item-icon">
      </cell>
      <cell title="我的消息" is-link>
        <img slot="icon" src="../assets/message.png" width="20" class="item-icon">
      </cell>
      <cell title="修改密码" is-link link="/changePassword">
        <img slot="icon" src="../assets/pass.png" width="20" class="item-icon">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, CellBox, Divider } from "vux";
import store from "@/store";
export default {
  components: {
    Group,
    Cell,
    CellBox,
    Divider
  },
  data() {
    return {
      info: {
        ...store.state.user
      },
      showInfo: false
    };
  }
};
</script>

<style lang="less" scoped>
.sub-item {
  color: #888;
}
.item-icon {
  display: block;
  margin-right: 5px;
}
</style>
