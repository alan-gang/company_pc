<template lang="jade">
.total-account
  slot(name="cover")
  slot(name="movebar")
  slot(name="resize-x")
  slot(name="resize-y")
  slot(name="toolbar")
  TotalReport.scroll-content(v-if=" I === 0 ")
  ProfitLoss.scroll-content(v-if=" I === 1 ")
  SportsReport.scroll-content(v-if=" I === 2 ")
  VideoReport.scroll-content(v-if=" I === 3 ")
  GameReport.scroll-content(v-if=" I === 4 ")
  FishReport.scroll-content(v-if=" I === 5 ")
  CardReport.scroll-content(v-if=" I === 6 ")
  ActivityReport.scroll-content(v-if=" I === 7 ")
  LUL.scroll-content(v-if=" I === 8 ")
  DataAnalysis.scroll-content(v-if=" I === 9 ")
  ChartAnalysis.scroll-content(v-if=" I === 10 ")

</template>

<script>
import TotalReport from '../TotalReport'
import ProfitLoss from '../ProfitLoss'
import SportsReport from '../OutProfitLoss'
import VideoReport from '../outReport/outReportVideo'
import GameReport from '../outReport/outReportGame'
import FishReport from '../outReport/outReportFish'
import CardReport from '../outReport/outReportCard'
import ActivityReport from '../ActivityReport'
import LUL from '../LUL'
import DataAnalysis from '../../group/DataAnalysis'
import ChartAnalysis from '../../group/ChartAnalysis'

// import Today from '../Today'
// import DaySalary from '../DaySalary'
export default {
  components: {
    TotalReport,
    ProfitLoss,
    SportsReport,
    VideoReport,
    GameReport,
    FishReport,
    CardReport,
    ActivityReport,
    LUL,
    DataAnalysis,
    ChartAnalysis
    // Today,
    // DaySalary,
  },
  name: 'total-account',
  props: [],
  data () {
    return {
      I: 0
    }
  },
  methods: {
    __setTotalAccountI (i) {
      this.I = i
    }
  }
}
</script>

<style lang="stylus">
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
