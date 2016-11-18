<template lang="jade">
  .follow-list
    .el-button-group
      .el-button 利润率追号
      .el-button 同倍追号
      .el-button 翻倍追号
    .form
      | 追号期数：
      el-select(v-model="nper")
        el-option(v-for="i in npers" v-bind:label="i + '期' " v-bind:value="i")
      |  起始倍数：
      el-input-number.times(v-model="times" v-bind:min="1" v-bind:max="100")
      |  倍

      | 最低收益：
      el-input.get(v-model="get")
      |  %
    el-table(:data="data")
      el-table-column(prop="NPER" label="投注编号" width="200" inline-template)
        span {{ row.NPER + ($index === 0 ? '(当前期)' : '期' ) }}
      el-table-column(prop="times" label="倍数" width="100" inline-template)
        el-input-number(v-model="row.times" @change="change" v-bind:min="1" v-bind:max="100")
      el-table-column(prop="pay" label="金额" width="200" inline-template)
        span {{ ( row.times * pay ).toFixed(2) }}
      el-table-column(prop="date" label="开奖时间" width="200")


</template>

<script>
  export default {
    props: {
      // 当前期数
      CNPER: Number,
      pay: Number
    },
    data () {
      return {
        nper: 5,
        npers: [5, 10, 15, 20, 25, 30],
        times: 1,
        get: ''
      }
    },
    computed: {
      data () {
        return Array(this.nper).fill(0).map((d, index) => {
          return (d = {
            NPER: this.CNPER + index,
            times: this.times,
            date: Date()
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
      this.$emit('setFollow', {NPER: this.nper, pay: this.PAY})
    },
    watch: {
      PAY () {
        this.$emit('setFollow', {NPER: this.nper, pay: this.PAY})
      }
    },
    methods: {
      change () {
        this.$emit('setFollow', {NPER: this.nper, pay: this.getPay()})
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

<style lang="stylus" scoped>
  @import '../var.stylus'
  .follow-list
    text-align center
    .el-button-group
      padding PW
  .el-button
    background-color transparent
  .form
    padding 0 PW
    text-align left
    .el-select
      width 1.2rem
    .el-input
      display inline-block
      width .5rem
  .el-table
    width 100%
    text-align left
  .el-input-number
    width .5rem
    vertical-align middle
    
    

</style>
<style>
  .follow-list .el-icon-minus,
  .follow-list .el-icon-plus {
    display: none;
  }
  .follow-list .el-input-number .el-input__inner {
    padding-right: 0;
  }
  
</style>