<template lang="jade">
.total-account
  slot(name="cover")
  slot(name="movebar")
  slot(name="resize-x")
  slot(name="resize-y")
  slot(name="toolbar")
  TotalReport.scroll-content(v-if=" I === 0 ")
  DaySalary.scroll-content(v-if=" I === 1 ")
  ActivityReport.scroll-content(v-if=" I === 2 ")
  LUL.scroll-content(v-if=" I === 3 ")
  Today.scroll-content(v-if=" I === 4 ")

</template>

<script>
import Today from '../Today'
import TotalReport from '../TotalReport'
import DaySalary from '../DaySalary'
import LUL from '../LUL'
import ActivityReport from '../ActivityReport'
export default {
  components: {
    Today,
    TotalReport,
    DaySalary,
    LUL,
    ActivityReport
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
