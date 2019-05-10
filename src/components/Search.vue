<template>
  <div>
    <x-header>资产查询</x-header>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-submit="onSubmit"
      ref="search"
    ></search>
    <panel type="4" v-if="list.length > 0" header="搜索结果" :list="list"></panel>
  </div>
</template>
<script>
import { Search, XHeader, Panel } from "vux";
import { searchProperty } from "@/api/property";
import { PropertyStatus } from "@/libs/util";
export default {
  components: {
    Search,
    XHeader,
    Panel
  },
  data() {
    return {
      results: [],
      value: "",
      list: []
    };
  },
  methods: {
    resultClick(item) {},
    getResult(value) {},
    onSubmit(value) {
      searchProperty({ name: value }).then(res => {
        const { data } = res;
        if (data.ok) {
          data.obj.forEach(t => {
            this.list.push({
              title: t.name,
              desc: `当前状态：${PropertyStatus[t.curStatus]} 当前流程：${
                t.curProcess ? t.curProcess : "无"
              }`,
              url: {
                path: `/prop/${t.propertyId}`
              },
              meta: {
                source: t.depName,
                other: t.gmtModified
              }
            });
          });
        }
      });
    }
  }
};
</script>

