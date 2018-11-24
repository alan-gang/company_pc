<template lang="jade">

.lottery-stock
  slot(name="toolbar")
  //- MyContract.scroll-content(v-if=" I === 0 ")
  //- SubContract.scroll-content(v-if=" I === 1 ")
  //- MyStock.scroll-content(v-if=" I === 2 ")
  //- SubStock.scroll-content(v-if=" I === 3 ")
  //- ExpectStock.scroll-content(v-if=" I === 4 ")

  Contract.scroll-content(v-if=" I === 0 ")
  Stock.scroll-content(v-if=" I === 1 ")
  ExpectStock.scroll-content(v-if=" I === 2 ")

</template>

<script>
// import MyContract from './MyContract'
// import SubContract from './SubContract'
// import MyStock from './MyStock'
// import SubStock from './SubStock'
// import ExpectStock from './ExpectStock'
import Contract from '../group/Contract'
import Stock from '../group/Stock'
import ExpectStock from '../group/TStock'

export default {
  components: {
    Contract,
    Stock,
    ExpectStock
    // MyContract,
    // SubContract,
    // MyStock,
    // SubStock,
    // ExpectStock
  },
  name: 'lottery-stock',
  props: [],
  data () {
    return {
      I: 0
    }
  },
  methods: {
    __setLotteryStockI (i) {
      this.I = i
    }
  }
}
</script>

<style lang="stylus">
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
