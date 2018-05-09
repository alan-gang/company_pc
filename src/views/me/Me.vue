<template lang="jade">
  .me-page.me-info-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    MeSideView(type="me")
    .me-detail-info.scroll-content(@click="show = true")
      .base-info
        el-row
          el-col.ds-icon-m(:span="12") 用户类别： 
            span.account-type.text-blue {{ me.type }}
          el-col.ds-icon-free(:span="12") 优惠券余额：
            span.free {{ me.free }}
        el-row.base-info
          el-col.ds-icon-money(:span="12") 余  额：
            span.money.text-danger {{ me.amoney }}
          el-col.ds-icon-luckchance(:span="12") 综合中奖率：
            span.luck-chance {{ winRate }}%

      p
        b 个人喜好游戏排行
      p.love-item(v-for="(love, index) in myFavour")
        span.number {{ index + 1 }}
        span {{ love.lotteryName }}

</template>

<script>
import MeSideView from 'components/MeSideView'
import store from '../../store'
import api from '../../http/api'
export default {
  data () {
    return {
      show: false,
      me: store.state.user,
      winRate: '',
      myFavour: []
    }
  },
  mounted () {
    this.acctSecureInfo()
  },
  methods: {
    acctSecureInfo () {
      this.$http.get(api.acctSecureInfo).then(({data}) => {
        // success
        if (data.success === 1) {
          this.winRate = data.winRate
          this.myFavour = data.myFavour
        }
      }, (rep) => {
        // error
      }).finally(() => {
        this.loading = false
      })
    }
  },
  components: {
    MeSideView
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    top TH
    left 2.5rem
  .me-detail-info
    padding PWX .4rem
    .base-info
      color #333
      margin-bottom .8rem
      .el-col
        height .6rem
        line-height .6rem
        padding-left .35rem
        
  .love-item
    margin .35rem 0
  .number
    display inline-block
    width .2rem
    height .2rem
    line-height .2rem
    margin-right .1rem
    radius(50%)
    text-align center
    vertical-align middle
    color #fff
    background-color BLUE

  .free
  .luck-chance
    color #666
</style>


<style lang="stylus">
  #app.cb.v2 .me-info-page 
    .me-sideview
      display none
    .scroll-content
      left 0
      // max-width 5rem
</style>