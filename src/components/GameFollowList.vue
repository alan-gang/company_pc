<template lang="jade">
  .follow-list
    .ds-button-group
        .ds-button.x-small.text-button(v-bind:class="{selected: tabIndex === 0}" @click="tabIndex = 0") 利润率追号
        .ds-button.x-small.text-button(v-bind:class="{selected: tabIndex === 1}" @click="tabIndex = 1") 同倍追号
        .ds-button.x-small.text-button(v-bind:class="{selected: tabIndex === 2}" @click="tabIndex = 2") 翻倍追号
    .form
      | 追号期数：
      el-select(v-model="nper")
        el-option(v-for="i in npers" v-bind:label="i + '期' " v-bind:value="i")
      |  &nbsp;&nbsp;起始倍数：
      el-input-number.center.times(v-model="times" v-bind:min="1" v-bind:max="100")
      |  倍

      | &nbsp;&nbsp;最低收益：
      el-input-number.center.get(v-model="get")
      |  %
    el-table.ghost(:data="data")
      el-table-column(prop="NPER" label="投注编号" width="200" inline-template)
        span {{ row.NPER + (row.NPER === CNPER? '(当前期)' : '期' ) }}
      el-table-column(prop="times" label="倍数" width="100" align="right" inline-template)
        el-input-number.center.blue(v-model="row.times" @change="change" v-bind:min="1" v-bind:max="100")
      el-table-column(prop="pay" label="金额" width="200" align="right"  inline-template)
        span 
          span.pay {{ ( row.times * pay ).toFixed(2) }}
          | &nbsp;元
      el-table-column(prop="date" label="开奖时间" align="center" width="200")


</template>

<script>
  export default {
    props: {
      // 当前起始期数
      FCNPER: Number,
      // 当前期数
      CNPER: Number,
      pay: Number
    },
    data () {
      return {
        nper: 5,
        npers: [5, 10, 15, 20, 25, 30],
        times: 1,
        get: '',
        tabIndex: 0
      }
    },
    computed: {
      data () {
        return Array(this.nper).fill(0).map((d, index) => {
          return (d = {
            NPER: this.FCNPER + index,
            times: this.times,
            date: (new Date()).toISOString()
          })
        })
      },
      PAY () {
        let pay = 0
        this.data.forEach(d => {
          pay += d.times * this.pay
        })
        return pay
      }
    },
    created () {
      this.$emit('set-follow', {NPER: this.nper, pay: this.PAY})
    },
    watch: {
      PAY () {
        this.$emit('set-follow', {NPER: this.nper, pay: this.PAY})
      }
    },
    methods: {
      change () {
        this.$emit('set-follow', {NPER: this.nper, pay: this.getPay()})
      },
      getPay () {
        let pay = 0
        this.data.forEach(d => {
          pay += d.times * this.pay
        })
        return pay
      }
    }
  }
</script>

<style lang="stylus">
  H = 3.5rem
  s = .3rem
  .follow-list
    .el-table
      width "calc(100% - %s)" % s
      margin-bottom .15rem
      .el-table__body-wrapper
        // padding-right .3rem
        max-height H
    td
      padding .025rem 0
      
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .follow-list
    text-align center
    .el-button-group
      padding PW
  .el-button
    background-color transparent
  .form
    padding 0 PWX
    text-align left
    color #666
    .el-select
      width 1.2rem
    .el-input
      display inline-block
      width .5rem

  .el-input-number
    width .4rem
    vertical-align middle
    text-align center
    &.get
      width .6rem
    &.blue
      color BLUE
  .pay
    color BLUE
    
  .ds-button-group
    height .3rem
    line-height .3rem
    display inline-block
    vertical-align middle
    margin PWX
    radius()
    overflow hidden
    background-color #fff
    border .01rem solid #ccc
    box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .1)
    box-sizing border-box
    overflow visible
    .ds-button
      position relative
      top -.01rem
      color #666
      text-shadow none
      radius(0)
      &:last-child
        border-top-right-radius .05rem
        border-bottom-right-radius .05rem
      &:first-child
        border-top-left-radius .05rem
        border-bottom-left-radius .05rem
      &.selected
        background-color BLUE
        color #fff
  
  .el-table
    text-align left

</style>
 
