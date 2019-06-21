// 团队盈亏-彩票
<template>
  <div class="total-account">
    <slot name="cover"></slot>
    <slot name="movebar"></slot>
    <slot name="resize-x"></slot>
    <slot name="resize-y"></slot>
    <slot name="toolbar"></slot>
    <lottery class="scroll-content" v-if=" I === 0 "/>
    <tripartite class="scroll-content" v-if=" I === 1 "/>
    <!-- 微游和棋牌  全部都一样  就 gameType ID不一样 -->
    <!-- 棋牌 -->
    <outReportCard class="scroll-content" v-if=" I === 2 " :gameType="4"/>
    <!-- 微游 -->
    <outReportCard class="scroll-content" v-if=" I === 3 " :gameType="8"/>
  </div>
</template>

<script>
import lottery from "../lottery"; //彩票
import tripartite from "../tripartite"; //三方
import outReportCard from "../outReport/outReportCard"; //棋牌   //微游
export default {
  components: {
    lottery,
    tripartite,
    outReportCard
    // lottery: resolve => require(["../lottery"], resolve), //彩票
    // tripartite: resolve => require(["../tripartite"], resolve), //三方
    // outReportCard: resolve => require(["../outReport/outReportCard"], resolve) //棋牌   //微游
  },
  name: "total-account",
  props: [],
  data() {
    return {
      I: 0
    };
  },
  methods: {
    __setTotalAccountI(i) {
      this.I = i;
    }
  }
};
</script>
