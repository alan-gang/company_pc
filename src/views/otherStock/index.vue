// 其它游戏分红管理
<template>
  <div class="other-stock">
    <slot name="toolbar"/>
    <OtherProfit class="scroll-content" v-if=" I === 0 " :typeCode="0"/>
    <OtherProfit class="scroll-content" v-if=" I === 1 " :typeCode="1"/>
    <TOtherProfit class="scroll-content" v-if=" I === 2 "/>
    <OtherContract class="scroll-content" v-if=" I === 3 "/>
  </div>
</template>

<script>
export default {
  components: {
    OtherProfit: resolve => require(["../form/OtherProfit"], resolve), //我的其它游戏分红  下级其它游戏分红
    TOtherProfit: resolve => require(["../form/TOtherProfit"], resolve), //预期其它游戏分红
    OtherContract: resolve => require(["../group/OtherContract"], resolve) //契约其它游戏分红
  },
  name: "other-stock",
  props: [],
  data() {
    return {
      I: 0
    };
  },
  methods: {
    __setOtherStockI(i) {
      this.I = i;
    }
  }
};
</script>