<template lang="jade">
  .slide-page.scroll-content
    .slide-header(ref="sh").tabs
      .ds-ow-button.under-border 全部活动
      .ds-ow-button.under-border 进行中的活动
      .ds-ow-button.under-border 已经结束的活动

    .slide-content
      .scroll-content(ref="sc")
        .banner.section(v-for=" (a, i) in sources " v-if="!ED")
          img(:src=" a.src ")
          .content
            h5.text-black {{ a.title }}
            br
            h6.text-999 {{ a.describe }}
            br
            h6.text-999 {{ a.describe }}
            br
            h6.text-999 {{ a.describe }}
            .buttons
              .ds-ow-button.oval(@click="ED = true") 查看详情
        .loading-more(v-if="!ED")
          .ds-ow-button.oval 加载更多

        .empty(v-if=" sources.length === 0 ") 活动列表空空如也
        ForRegister(v-if="ED" @click.native="ED = true")

    .slide-footer.scroll-content.white(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
      br
      | All right reserved

</template>

<script>
// v-bind:class=" [ 'ds-icon-activity-' + (i + 1) ] "
// :src=" '/assets/activity/banner' + (i + 1) + '.jpg' "
  import api from '../../http/api'
  import common from './common'
  import ForRegister from './components/ForRegister'
  export default {
    mixins: [common],
    components: {
      ForRegister
    },
    data () {
      return {
        sources: [
          {href: '/activity/5-2-1', src: '/static/activity/banner1.jpg', title: '注册就送', describe: '全新的游戏体验，来玩就送'},
          {href: '/activity/5-2-2', src: '/static/activity/banner2.jpg', title: '新用户有礼了', describe: '绑定手机、银行卡、邮箱，即可领取58元优惠券绑定手机、银行卡、邮箱，'},
          {href: '/activity/5-2-3', src: '/static/activity/banner3.jpg', title: '每日签到', describe: '每日来我签到，好礼不断'},
          {href: '/activity/5-2-4', src: '/static/activity/banner4.jpg', title: '充值送好礼', describe: '我们一直在送礼，一直在等你'},
          {href: '/activity/5-2-5', src: '/static/activity/banner5.jpg', title: '首提大返利', describe: '首次成功提现，即送18元大礼金'},
          {href: '/activity/5-2-6', src: '/static/activity/banner4.jpg', title: '充值送好礼', describe: '我们一直在送礼，一直在等你'}
        ],
        activities: [
        ],
        ED: false
      }
    },
    mounted () {
      // this.getAllActivityList()
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
          }, 100)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import './var.stylus'
  
  .slide-page
    bg-gradient(90deg, #e1a9cd, #849df9)
    .tabs
      text-align center
      
    .loading-more
      padding .1rem 0
      .ds-ow-button
        width 2rem
        height .4rem
        line-height .4rem
        color #1a9ff3
        background-color #fff
        
    .section
      position relative
      width 70%
      max-width 10rem
      margin PW auto
      padding PW
      text-align left
      background-color #fff
      box-sizing border-box
      radius()
      cursor pointer
      img
        width 45%
        vertical-align top
      .content
        width 50%
        margin-left PWX
        display inline-block
        .buttons
          padding .1rem 0
        .ds-ow-button
          border 1px solid #1a9ff3
          color #1a9ff3
          background-color #fff
          
  
</style>
