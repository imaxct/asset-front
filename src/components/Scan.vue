<template>
  <div>
    <x-header style="z-index:999999;">二维码扫描</x-header>
    <div class="fullscreen">
      <qrcode-stream @decode="onDecode" @init="onInit" :paused="paused"/>
    </div>
  </div>
</template>

<script>
import { AlertModule, Flexbox, FlexboxItem, Divider, XHeader } from "vux";
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
    Flexbox,
    FlexboxItem,
    Divider,
    XHeader
  },
  data() {
    return {
      error: "",
      paused: false
    };
  },
  methods: {
    onDecode(result) {
      const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/g;
      this.paused = true;
      if (result.match(regex)) {
        if (this.$route.params.pid) {
          const pid = this.$route.params.pid;
          this.$router.replace({
            path: `/ticket/${pid}/${result}`
          });
        } else {
          this.$router.replace({
            path: `/prop/${result}`
          });
        }
      } else {
        const that = this;
        AlertModule.show({
          title: "提示",
          content: "非资产二维码",
          onHide() {
            that.$router.push({
              name: "home"
            });
          }
        });
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (err) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
        console.log(this.err);
      }
    }
  }
};
</script>

<style lang="css">
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: black;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
</style>