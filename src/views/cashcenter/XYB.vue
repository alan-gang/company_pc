<template lang="jade">

  .xyb
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content
      .a
        .b.inlb
          .c

        .b.inlb
          .d
            p.e
              span 15
              span %
            p.f 年化收益率
            p 每12小时结算一次收益
            p 随存随取

        .b.inlb
          .g.t_c
            .h.inlb
            p.f 当前余额(元)
            p.k 12345.0000


        .b.inlb
          .i.t_c
            .h.inlb
            p.f 累计收入(元)
            p.k 12345.0000

        .b.inlb
          .j
            .full.ds-button.positive 转入
            .full.ds-button.outline.blue 转出
      
      .l.t_c
        .ds-button-group
          .ds-button(v-bind:class=" {selected: i === 1} " @click=" i = 1 ") 资金明细
          .ds-button(v-bind:class=" {selected: i === 2} " @click=" i = 2 ") 结算记录
        
        el-table.header-bold.nopadding(:data="data" ref="table" stripe v-bind:max-height=" MH ")
          el-table-column(class-name="pl2" prop="projectId" align="center" label="交易时间" )
          el-table-column(class-name="pl2" prop="projectId" align="center" label="交易类型" )
          el-table-column(class-name="pl2" prop="projectId" align="center" label="交易金额" )
          el-table-column(class-name="pl2" prop="projectId" align="center" label="交易后账户金额" )
          el-table-column(class-name="pl2" prop="projectId" align="center" label="备注" )

</template>

<script>
import setTableMaxHeight from 'components/setTableMaxHeight'
export default {
  mixins: [setTableMaxHeight],
  components: {
  },
  name: 'name',
  props: [],
  data () {
    return {
      i: 1,
      data: []
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '../../var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.xyb
  .scroll-content
    padding 0 .2rem
  .a
    margin 0 -.05rem
    display flex
    flex-wrap wrap
    // justify-content center
  
  .b

    display flex
    justify-content center
    align-items center
    
    height 1.8rem
    min-width 2.5rem
    margin .05rem 
    vertical-align top
    background-color #fff
    background-repeat no-repeat
    
    
    &:nth-child(1)
      color #fff
      background-image url(../../assets/xyb/1.png)
      background-size 100% 100%
      margin-right 0
    &:nth-child(2)
      margin-left 0
      width 2.59rem
      
  .c
    width 2.08rem
    height .89rem
    background-image url(../../assets/xyb/2.png)
    background-size 100% 100%
  
  .d
    color #333
  .e
    color #f63030
  .e span:nth-child(1)
    font-size .6rem
  .f
    color #666
  .h
    width .72rem
    height .54rem
    background-image url(../../assets/xyb/3.png)
    background-size 100% 100%
    background-position center
  .i .h
    height .52rem
    background-image url(../../assets/xyb/4.png)
    background-size 100% 100%
  .j
    width 100%
    padding 0 .2rem
    .ds-button
      margin .05rem 0
      box-shadow none
      &.outline
        border-color BLUE
  .k
    font-size .36rem
    color #333
        
    
  
    
</style>
