// 彩票分红管理
<template>
  <div class="lottery-stock">
    <slot name="toolbar"></slot>
    <Stock class="scroll-content" v-if=" I === 0 " :typeCode="0"/>
    <Stock class="scroll-content" v-if=" I === 1 " :typeCode="1"/>
    <ExpectStock class="scroll-content" v-if=" I === 2 "/>
    <Contract class="scroll-content" v-if=" I === 3 "/>
  </div>
</template>

<script>
export default {
  components: {
    Stock: resolve => require(["../group/Stock"], resolve), //我的分红  下级分红
    Contract: resolve => require(["../group/Contract"], resolve), //彩票分红契约
    ExpectStock: resolve => require(["../group/TStock"], resolve) //预期分红
  },
  name: "lottery-stock",
  props: [],
  data() {
    return {
      I: 0
    };
  },
  methods: {
    __setLotteryStockI(i) {
      this.I = i;
    }
  }
};
</script>