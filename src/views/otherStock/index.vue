<template lang="jade">

.other-stock
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
import Contract from '../group/OtherContract'
import Stock from '../form/OtherProfit'
import ExpectStock from '../form/TOtherProfit'

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
  name: 'other-stock',
  props: [],
  data () {
    return {
      I: 0
    }
  },
  methods: {
    __setOtherStockI (i) {
      this.I = i
    }
  }
}
</script>

<style lang="stylus">
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
