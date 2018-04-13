<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form

        p.item.block(style="margin: .3rem 0 .15rem 0")
          | 我的帐户：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          span.text-blue {{ me.account }}
          span(style="padding-left: 2rem") 我的昵称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          span.text-black {{ me.name }}

        .item.block
          | 团队余额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          span.amount.gradient {{ numberWithCommas(data.totalAmount) }}
          span.text-black  元 
          span.text-money  &nbsp;{{ textMoney }}

        .item.block
          | 今日参与游戏： 
          span.amount {{ numberWithCommas(data.buyAmount) }}
          span.text-black 元 

        .item.block
          | 今日中奖：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          span.amount {{ numberWithCommas(data.prizeAmount) }}
          span.text-black 元 
        

        


        
</template>

<script>
  import store from '../../store'
  import { digitUppercase, numberWithCommas } from '../../util/Number'
  // import { dateFormat, dateTimeFormat } from '../../util/Date'
  import api from '../../http/api'
  export default {
    data () {
      return {
        numberWithCommas: numberWithCommas,
        me: store.state.user,
        data: {}
        // st: dateTimeFormat(new Date().getTime())
      }
    },
    computed: {
      textMoney () {
        return digitUppercase(this.data.totalAmount)
      }
    },
    mounted () {
      this.todayReport()
    },
    methods: {
      todayReport () {
        let loading = this.$loading({
          text: '今日报表加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.todayReport, {
          // startDay: this.st ? dateFormat((window.newDate(this.st)).getTime(), 6).replace(/[\s-]*/g, '') : '',
          // endDay: this.st ? dateFormat((window.newDate(this.st)).getTime(), 6).replace(/[\s-]*/g, '') : ''
          // endDay: '20170525'
          // startDay: '20170525',
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.data = data
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .stock-list
    top TH
    .form
      padding PWX PWX*2

  .item
    display inline-block
    &.block
      display block
  
  .el-select
  .el-input-number 
    width 1rem
    
  .text-money
    color #999
  .amount
    font-family Roboto
    font-size 0.72rem
    &.gradient
      font-gradient()

</style>
