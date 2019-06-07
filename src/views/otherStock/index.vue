// 佣金管理
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
    OtherProfit: resolve => require(["../form/OtherProfit"], resolve), //我的佣金  下级佣金
    TOtherProfit: resolve => require(["../form/TOtherProfit"], resolve), //预期佣金
    OtherContract: resolve => require(["../group/OtherContract"], resolve) //契约佣金
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