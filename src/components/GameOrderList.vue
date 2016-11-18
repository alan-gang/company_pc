<template lang="jade">
  el-table(:data="ns")
    el-table-column(prop="title" label="玩法、投注号码" width="200" show-overflow-tooltip=true)
    el-table-column(prop="$" label="模式" width="100")
    el-table-column(prop="n" label="注数" width="100")
    el-table-column(prop="times" label="倍投" width="100")
    el-table-column(prop="pay" label="金额" width="200")
    el-table-column(prop="bonus" label="奖金" width="200")
    el-table-column(prop="point" label="返点" width="100")
    el-table-column(inline-template label="清除全部" min-width="200")
      el-button-group
        // el-button(@click.native="removeAll()" v-if="$index === 0") 清除全部
        el-button(icon="delete" size="small" @click.native="remove($index)")
</template>

<script>
  export default {
    props: ['ns'],
    data () {
      return {
        // data: [
        //   {title: '五星直选', $: '元', n: 20, times: 3, pay: 252455121545121245544560.00, bonus: 23.45, point: '7.5%'}
        // ]
      }
    },
    computed: {
    },
    methods: {
      remove (index) {
        this.$emit('remove-order', index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-table
    position relative
    width 100%
  .el-button-group
    vertical-align middle
    
</style>
<style>
  .el-table,
  .el-table tr,
  .el-table th,
  .el-table td,
  .el-table th div
  {
    background-color: transparent;
    border: none;
  }
  .el-table::before,
  .el-table__fixed::before{
    background-color: transparent;
  }
  .fixed td,
  .fixed td .cell
  {
    height: 0;
    overflow: visible;
  }
 

</style>