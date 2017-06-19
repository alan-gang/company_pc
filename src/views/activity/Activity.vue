<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.activity-center
      router-link.banner.section(v-for=" (a, i) in activities " v-bind:to=" sources[a.activityType - 1].href " @click.native.stop="")
        img(:src=" sources[a.activityType - 1].src ")
        h4.text-black {{ a.title }}
        h5 {{ a.subTitle }}

      .empty(v-if=" activities.length === 0 ") 活动列表空空如也

    
</template>

<script>
// v-bind:class=" [ 'ds-icon-activity-' + (i + 1) ] "
// :src=" '/assets/activity/banner' + (i + 1) + '.jpg' "
  import api from '../../http/api'
  export default {
    data () {
      return {
        sources: [
          {href: '/activity/5-2-1', src: '/static/activity/banner1.jpg', title: '注册就送', describe: '全新的游戏体验，来玩就送'},
          {href: '/activity/5-2-2', src: '/static/activity/banner2.jpg', title: '新用户有礼了', describe: '绑定手机、银行卡、邮箱，即可领取58元优惠券'},
          {href: '/activity/5-2-3', src: '/static/activity/banner3.jpg', title: '每日签到', describe: '每日来我签到，好礼不断'},
          {href: '/activity/5-2-4', src: '/static/activity/banner4.jpg', title: '充值送好礼', describe: '我们一直在送礼，一直在等你'},
          {href: '/activity/5-2-5', src: '/static/activity/banner5.jpg', title: '首提大返利', describe: '首次成功提现，即送18元大礼金'},
          {href: '/activity/5-2-5', src: '/static/activity/banner4.jpg', title: '首提大返利', describe: '首次成功提现，即送18元大礼金'},
          {href: '/activity/5-2-7', src: '/static/activity/banner7.jpg', title: '充值送好礼', describe: '我们一直在送礼，一直在等你'},
          {href: '/activity/5-2-7', src: '/static/activity/banner7.jpg', title: '充值送好礼', describe: '我们一直在送礼，一直在等你'}
        ],
        activities: [
        ]
      }
    },
    mounted () {
      this.getAllActivityList()
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
  .activity-center
    top TH
    padding PWX
    .section
      display inline-block
      // width 4.15rem
      width 50%
      // margin PW
      padding PW
      box-sizing border-box
      // padding PW
      // border 1px solid #d4d4d4
      // padding-top 1.5rem
      radius()
      cursor pointer
      background-size 100%
      &:hover
        background-color #fff
      
      h4,h5
        margin .08rem .05rem
        margin-bottom 0
      h4
        font-size .14rem
        font-weight bold
      h5 
        font-size .12rem
      img
        width 100%
  
</style>
