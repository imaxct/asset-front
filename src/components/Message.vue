<template>
  <div>
    <x-header>我的消息</x-header>
    <tab v-model="tabIndex">
      <tab-item selected>未读消息</tab-item>
      <tab-item>全部消息</tab-item>
    </tab>
    <swiper v-model="tabIndex" :show-dots="false">
      <swiper-item>
        <group>
          <cell-box
            v-for="(it, idx) in unreadList"
            :key="idx"
            is-link
            @click.native="() => readMsg(idx)"
          >{{it.title}}</cell-box>
        </group>
        <load-more
          :show-loading="false"
          tip="暂无数据"
          background-color="#fbf9fe"
          v-if="unreadList.length <= 0"
        ></load-more>
      </swiper-item>
      <swiper-item>
        <group>
          <cell-box
            v-for="(it, idx) in msgList"
            :key="idx"
            is-link
            @click.native="() => showMessage(idx)"
          >{{it.title}}</cell-box>
        </group>
        <load-more
          :show-loading="false"
          tip="暂无数据"
          background-color="#fbf9fe"
          v-if="msgList.length <= 0"
        ></load-more>
      </swiper-item>
    </swiper>
    <x-dialog v-model="showDialog" class="dialog-demo">
      <div style="padding-top: 10px;">
        <h4>{{curMsg.title}}</h4>
        <div style="padding: 10px;"><p>&nbsp;&nbsp;{{curMsg.content}}</p></div>
        <div style="color: grey;">{{curMsg.gmtCreate}}</div>
      </div>
      <div @click="showDialog=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import {
  XHeader,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  LoadMore,
  Group,
  CellBox,
  XDialog
} from "vux";
import { getUnreadMessage, getAllMessage, readMessage } from "@/api/message";
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    LoadMore,
    Group,
    CellBox,
    XDialog
  },
  data() {
    return {
      tabIndex: 0,
      msgList: [],
      unreadList: [],
      curMsg: "",
      showDialog: false
    };
  },
  methods: {
    readMsg(idx) {
      this.curMsg = this.unreadList[idx];
      this.showDialog = true;
      this.setMessageRead(this.curMsg.id);
      this.unreadList.splice(idx, 1);
    },
    showMessage(idx) {
      this.curMsg = this.msgList[idx];
      this.showDialog = true;
      const { id } = this.curMsg;
      let index = -1;
      for (let i in this.unreadList) {
        if (id === this.unreadList[i].id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        this.setMessageRead(id);
        this.unreadList.splice(index, 1);
      }
    },
    setMessageRead(id) {
      readMessage({ id }).then(res => {
        const { data } = res;
      });
    },
    loadAllMessage() {
      getAllMessage().then(res => {
        const { data } = res;
        if (data.ok) {
          this.msgList = data.obj;
        }
      });
    },
    loadData() {
      getUnreadMessage().then(res => {
        const { data } = res;
        if (data.ok) {
          this.unreadList = data.obj;
        }
      });
    }
  },
  mounted() {
    this.loadData();
    this.loadAllMessage();
  }
};
</script>
<style lang="less" scoped>
@import "~vux/src/styles/close";

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
