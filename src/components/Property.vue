<template>
  <div>
    <x-header>资产详情</x-header>
    <card>
      <div slot="content">
        <divider>资产二维码</divider>
        <div style="text-align:center;">
          <qrcode :value="info.property.propertyId" type="img"></qrcode>
        </div>
        <group title="资产信息">
          <cell title="资产名称" :value="info.property.name" :is-loading="!info.property"></cell>
          <cell
            title="资产状态"
            :value="PropertyStatus[info.property.curStatus]"
            :is-loading="!info.property"
          ></cell>
          <cell title="所属部门" :value="info.property.depName" :is-loading="!info.property"></cell>
          <cell
            title="当前使用人"
            :value="occupyUserName"
            :is-loading="!occupyUserName"
            v-if="info.property.occupyUserId"
          ></cell>
          <cell title="当前流程" :value="processName" :is-loading="!processName" v-if="info.ticket" link="/"></cell>
        </group>
        <group v-if="info.processes.length" title="可发起流程">
          <x-button
            v-for="t in info.processes"
            :key="t.id"
            mini
            plain
            type="primary"
            :link="`/Ticket/${t.id}/${id}`"
          >{{t.name}}</x-button>
          <divider></divider>
        </group>
      </div>
    </card>
  </div>
</template>

<script>
import {
  Box,
  Card,
  Group,
  Cell,
  XButton,
  XHeader,
  Qrcode,
  Divider,
  Flexbox,
  FlexboxItem
} from "vux";
import { showMsg, PropertyStatus } from "@/libs/util";
import { getDetail } from "@/api/property";
import { getUserNameById } from "@/api/user";
import { getProcessById } from "@/api/process";
export default {
  components: {
    Box,
    Card,
    Group,
    Cell,
    XButton,
    XHeader,
    Qrcode,
    Divider,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      id: this.$route.params.id || "null",
      info: {
        property: {},
        processes: [],
        step: null,
        ticket: null
      },
      occupyUserName: "",
      processName: "",
      PropertyStatus
    };
  },
  methods: {
    loadData() {
      getDetail(this.id).then(res => {
        if (res.data.ok) {
          this.info = res.data.obj;
          if (this.info.property.occupyUserId) {
            getUserNameById(this.info.property.occupyUserId).then(res => {
              if (res.data.ok) {
                this.occupyUserName = res.data.obj;
              } else {
                this.occupyUserName = " ";
              }
            });
          }
          if (this.info.ticket) {
            getProcessById(this.info.ticket.processId).then(res => {
              if (res.data.ok) {
                this.processName = res.data.obj.process.name;
              } else {
                this.processName = " ";
                showMsg({
                  title: "提示",
                  content: res.data.msg
                });
              }
            });
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