<template lang="jade">
  .order-list(style="position: relative;")
    span(style="z-index: 1; background: red; font-size: 9px; color: #fff; border-radius: 50%; display: inline-block; width: .16rem; height: .16rem; text-align: center; position: absolute; left: .05rem; top: .05rem; line-height: .18rem") {{ ns.length }}

    el-table.ghost.header-bold(:data="data" stripe  v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" v-on:header-click="headerClick")

      el-table-column(:render-header="renderHeader" label="玩法、投注号码" width="150" show-overflow-tooltip=true)
        template(scope="scope") 
          span {{ scope.row.title ? scope.row.title  + '[' + (scope.row.nsnsTitle || scope.row.codes) + '] ' : '' }}

      el-table-column(prop="$" label="模式" width="60")
      el-table-column(prop="n" label="注数" width="80" align="right")
      el-table-column(prop="times" label="倍投" width="80" align="right")
      el-table-column(prop="pay" label="金额" width="120" align="right" inline-template)
        span {{ row.pay ? row.pay.toFixed(3) : row.pay }}
      el-table-column(prop="bonus" label="奖金" width="100" align="right")
      el-table-column(prop="point" label="返点" width="100" align="right")
      el-table-column(inline-template label="清除全部" min-width="60" class-name="actions" align="center")
        .ds-button.text-button(@click="remove($index)") 
          i.el-icon-close(v-show="row.title")

    el-pagination(:total="ns.length" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if="ns.length > pageSize" v-on:current-change="pageChanged")

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
        pageSize: 10,
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
      renderHeader (createElement, { column }) {
        return createElement(
          'div',
          [
            column.label
            // createElement('span', {
            //   attrs: {
            //     style: 'background: red; color: #fff; border-radius: 50%; display: inline-block; width: .2rem; height: .2rem; text-align: center; position: absolute; left: 0;top: -.02rem'
            //   }
            // },
            // [this.data.length])
          ]
        )
      },
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
  
    
    
    
</style>
      
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .order-list
    padding-top .1rem
    // border-top 1px solid #ddd
  .ds-button
    text-shadow none
    vertical-align middle
    color GREY
    line-height .2rem
    &:hover
      color #666
  
</style>
  
 

