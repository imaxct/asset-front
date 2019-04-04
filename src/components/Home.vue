<template>
  <div>
    <divider></divider>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1></h1>
    </div>
    <divider></divider>
    <grid :cols="3">
      <grid-item label="资产入库" key="1" link="/process/1">
        <img slot="icon" src="../assets/import.png">
      </grid-item>
      <grid-item label="资产出库" key="2">
        <img slot="icon" src="../assets/export.png">
      </grid-item>
      <grid-item label="资产流转" key="3">
        <img slot="icon" src="../assets/transfer.png">
      </grid-item>
      <grid-item label="资产处理" key="4">
        <img slot="icon" src="../assets/detail.png">
      </grid-item>
      <grid-item label="资产维保" key="5">
        <img slot="icon" src="../assets/check.png">
      </grid-item>
      <grid-item label="资产查询" key="6">
        <img slot="icon" src="../assets/search.png">
      </grid-item>
      <grid-item label="二维码扫描" key="7" link="/scan">
        <img slot="icon" src="../assets/barcode.png">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Cell, Grid, GridItem, Divider } from "vux";

export default {
  components: {
    Cell,
    Grid,
    GridItem,
    Divider
  },
  data() {
    return {
      msg: "Hello World!"
    };
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
