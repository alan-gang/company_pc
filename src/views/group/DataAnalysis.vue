<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form

        label 日期 
          el-date-picker(:picker-options="options" v-model="st" type="date" placeholder="请选择日期")

        | &nbsp;&nbsp;
        .ds-button.primary.large.bold(@click="getTeamTodayData") 提交

        p.item.block(style="margin: .3rem 0 .15rem 0")
          | 我的帐户：&nbsp;&nbsp;&nbsp;&nbsp;
          span.text-blue {{ me.account }}
          span(style="padding-left: 2rem") 我的昵称：&nbsp;&nbsp;&nbsp;&nbsp;
          span.text-black {{ me.name }}

        .item.block
          | 团队余额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          span.amount.gradient {{ data.totalBalance || 0}}
          span.text-black  元 
          span.text-money  &nbsp;{{ textMoney }}

        .item.block
          | 团队总人数：&nbsp;&nbsp;&nbsp;
          span.amount {{ data.userCount || 0 }}
          span.text-black 人 
        
        .item.block
          span(style="position: relative; top: -.25rem") 团队活跃用户：
          div(style="display: inline-block; vertical-align: middle")

            label
              span.amount {{ data.userActivity || 0}}
              span.text-black 人 
              span.text-money (有活动的)

            br

            label
              span.amount {{ data.buyUserCount || 0 }}
              span.text-black 人 
              span.text-money (有投注的)

        


        
</template>

<script>
  import store from '../../store'
  import { digitUppercase } from '../../util/Number'
  import { dateFormat } from '../../util/Date'
  import api from '../../http/api'
  export default {
    data () {
      return {
        me: store.state.user,
        st: '',
        options: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        data: {}
      }
    },
    computed: {
      textMoney () {
        return digitUppercase(this.data.totalBalance || 0)
      }
    },
    mounted () {
      this.st = new Date()
      this.getTeamTodayData()
    },
    methods: {
      // 团队数据统计（pc端团队数据统计接口）
      // http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamTodayData&startDay=170226
      getTeamTodayData () {
        let loading = this.$loading({
          text: '团队数据加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.getTeamTodayData, {
          startDay: this.st ? dateFormat(this.st.getTime(), 6).replace(/[\s-]*/g, '') : ''
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.data = data.chartData[0]
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
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