<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.gift-center
      div
        .ds-button-group
          .ds-button.text-button(v-bind:class="{selected: tabIndex === 1}" @click="tabIndex = 1") 礼品中心
          .ds-button.text-button(v-bind:class="{selected: tabIndex === 2}" @click="tabIndex = 2") 已领取的礼品
      .gift-list(v-if="tabIndex === 1")
        .ticket(:class=" [ ticketType[0] ] " v-for=" t in tickets ")
          h1
            span ￥
            | 20
          p 20元优惠券
          p.describe 可以用与投注, 不提现 可以用与投注
          .ds-button.primary 立即领取
          .ds-button.cancel.disabled 已领取
      
      el-table.header-bold.margin(:data="data" v-bind:row-class-name="tableRowClassName" v-if="tabIndex === 2")

        el-table-column(prop="cnname" label="礼品" align="left")
          template(scope="scope") 
            div.ds-icon-activity-ticket.small {{ '20元优惠券' }}

        el-table-column(prop="beginissue" label="领取时间" width="150")

        el-table-column(prop="taskprice" label="数量" width="100" align="right")

        el-table-column(width="20")

        el-table-column(label="状态" width="80" align="left")
          template(scope="scope") 
            span(:class="{ 'text-green': scope.row.status === 0}") {{ '未使用' }}

    
</template>

<script>
// v-bind:class=" [ 'ds-icon-activity-' + (i + 1) ] "
// :src=" '/assets/activity/banner' + (i + 1) + '.jpg' "
import api from '../../http/api'
export default {
  data () {
    return {
      tabIndex: 1,
      ticketType: ['ds-icon-activity-ticket', 'ds-icon-activity-coin'],
      tickets: [1, 2, 3],
      data: [{}, {}]
    }
  },
  mounted () {
  },
  methods: {
    getAllActivityList () {
      let loading = this.$loading({
        text: '活动列表加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      this.$http.get(api.getAllActivityList).then(({data}) => {
        // success
        if (data.success === 1) {
          this.activities = data.activityList || []
          setTimeout(() => {
            loading.text = '加载成功!'
          }, 100)
        } else this.$message.error('活动列表加载失败！')
      }, (rep) => {
        // error
        this.$message.error('活动列表加载失败！')
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
  .gift-center
    top TH
    padding PWX .1rem
    text-align center
    .gift-list
      display inline-block
      max-width 10rem
    .ticket
      position relative
      radius()
      float left
      min-height 1.06rem
      width 2.46rem
      padding .05rem 0
      padding-left 1.16rem
      padding-right 1.16rem
      text-align left
      background-color #fff
      border 1px solid #ccc
      margin .1rem
      shadow(2px 2px 2px rgba(0,0,0, .1))
      h1
        font-weight normal
        color BLUE
        font-size .6rem
        span
          font-size .24rem
      p
        font-size .12rem
        color #333
        &.describe
          color #999
      
      .ds-button
        position absolute
        right 0
        top 0
        bottom 0
        // padding 0 .3rem
        text-align center
        width 1.2rem
        background-image url(../../assets/activity/line.png)
        background-position left center 
        background-repeat no-repeat
        box-shadow none
        &:before
          content ''
          position relative
          height 100%
          width 1px
          vertical-align middle
          display inline-block
        &.cancel
          background-color #cacaca
</style>