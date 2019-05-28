<template>
  <div class="total-account">
    <slot name="cover"></slot>
    <slot name="movebar"></slot>
    <slot name="resize-x"></slot>
    <slot name="resize-y"></slot>
    <slot name="toolbar"></slot>
    <lottery class="scroll-content" v-if=" I === 0 "/>
    <outReportCard class="scroll-content" v-if=" I === 1 "/>
    <!-- 微游和棋牌  全部都一样  就ID不一样 -->
    <!-- 棋牌 -->
    <outReportCard class="scroll-content" v-if=" I === 2 " :gameType="4"/>
    <!-- 微游 -->
    <outReportCard class="scroll-content" v-if=" I === 3 " :gameType="8"/>

    <!-- //- TotalReport.scroll-content(v-if=" I === 0 ")
  //- ProfitLoss.scroll-content(v-if=" I === 1 ")
  //- Keno.scroll-content(v-if=" I === 2 ")
  //- SportsReport.scroll-content(v-if=" I === 3 ")
  //- VideoReport.scroll-content(v-if=" I === 4 ")
  //- GameReport.scroll-content(v-if=" I === 5 ")
  //- FishReport.scroll-content(v-if=" I === 6 ")
  //- CardReport.scroll-content(v-if=" I === 7 ")
  //- Esports.scroll-content(v-if=" I === 8 ")
  //- ActivityReport.scroll-content(v-if=" I === 9 ")
  //- LUL.scroll-content(v-if=" I === 10 ")
  //- DataAnalysis.scroll-content(v-if=" I === 11 ")
    //- ChartAnalysis.scroll-content(v-if=" I === 12 ")-->
  </div>
</template>

<script>
import lottery from "../lottery"; //彩票
import outReportCard from "../outReport/outReportCard"; //棋牌   //微游

import TotalReport from "../TotalReport";
import ProfitLoss from "../ProfitLoss";
import SportsReport from "../OutProfitLoss";
import VideoReport from "../outReport/outReportVideo";
import GameReport from "../outReport/outReportGame";
import FishReport from "../outReport/outReportFish";
import Keno from "../outReport/outReportKeno";
import Esports from "../outReport/outReportEsports";
import ActivityReport from "../ActivityReport";
import LUL from "../LUL";
import DataAnalysis from "../../group/DataAnalysis";
import ChartAnalysis from "../../group/ChartAnalysis";

// import Today from '../Today'
// import DaySalary from '../DaySalary'
export default {
  components: {
    lottery,
    outReportCard,
    //
    Keno,
    Esports,
    TotalReport,
    ProfitLoss,
    SportsReport,
    VideoReport,
    GameReport,
    FishReport,
    ActivityReport,
    LUL,
    DataAnalysis,
    ChartAnalysis
    // Today,
    // DaySalary,
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

<style lang="stylus">







// 建议不添加scoped， 所有样式最多嵌套2层







</style>
