<template lang="jade">
  .order-list
    el-table.ghost(:data="data" v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" v-on:header-click="headerClick")
      el-table-column(label="玩法、投注号码" width="200" show-overflow-tooltip=true)
        template(scope="scope") {{ scope.row.title  + '[' + scope.row.codes + '] ' }}
      el-table-column(prop="$" label="模式" width="80")
      el-table-column(prop="n" label="注数" width="100" align="right")
      el-table-column(prop="times" label="倍投" width="80" align="right")
      el-table-column(prop="pay" label="金额" width="120" align="right" inline-template)
        span {{ row.pay ? row.pay.toFixed(3) : row.pay }}
      el-table-column(prop="bonus" label="奖金" width="120" align="right")
      el-table-column(prop="point" label="返点" width="100" align="right")
      el-table-column(inline-template label="清除全部" min-width="60" class-name="actions" align="center")
        .ds-button.text-button(@click="remove($index)") 
          i.el-icon-close(v-show="row.title")

    el-pagination(:total="ns.length" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if="ns.length > 5" v-on:current-change="pageChanged")

</template>

<script>
  import util from '../util'
  export default {
    props: ['ns'],
    data () {
      return {
        // data: [
        //   {title: '五星直选', $: '元', n: 20, times: 3, pay: 252455121545121245544560.00, bonus: 23.45, point: '7.5%'}
        // ]
        pageSize: 5,
        currentPage: 1
      }
    },
    computed: {
      data () {
        if (this.ns.length <= this.pageSize) return this.ns
        else {
          return util.groupArray(this.ns.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage), 5, {_empty: true})[0]
        }
      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (row.selected) return 'selected-row'
      },
      remove (index) {
        this.$emit('remove-order', index)
      },
      setSelected (row) {
        !row._empty && (row.selected = !row.selected)
      },
      headerClick (c, e) {
        if (c.label === '清除全部') this.remove()
      },
      pageChanged (cp) {
        this.currentPage = cp
      }
    }
  }
</script>

<style lang="stylus">
  H = 1.6rem
  .order-list
    .el-table
    // width "calc(100% - %s)" % s
      .el-table__body-wrapper
        // padding-right .3rem
        max-height H
      
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .ds-button
    text-shadow none
    vertical-align middle
    color GREY
    line-height .2rem
    &:hover
      color #666
  
</style>
  
 

