<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content
            h4  一站式满足所有需求
            br
            h5.text-999 多种优势一一展现，玩法多多，7X24小时贴心客服、国家级安全资金管理、丰富的奖池资金、多支付渠道，一站满足您所有需求。
            .card-container
              .card
                .ds-icon-ow-clock24
                h5.text-999 7X24小时客户服务
                br
                h6.text-bbb 全年365天不间断的技术支持及客户服务，
                h6.text-bbb 随时随地待命，为您排忧解难！
              .card
                .ds-icon-ow-credit
                h5.text-999 专业运营资质
                br
                h6.text-bbb 畅博娱乐拥有菲律宾政府颁发的博彩牌照，
                h6.text-bbb 安全公信
              .card
                .ds-icon-ow-protect
                h5.text-999 安全防护
                br
                h6.text-bbb 使用CDN多线加速，分布式高防云防御和军用级
                h6.text-bbb 防火墙，全方位保障用户信息安全
              .card
                .ds-icon-ow-twservice
                h5.text-999 充提服务
                br
                h6.text-bbb 支持国内各大主流银行及第三方充值，充值
                h6.text-bbb 即时到账，提现最快3分钟到账
            .ds-icon-ow-safe-bg
              h5 随时随地 快乐游戏
              h6.light-white 畅博娱乐 轻松享受游戏乐趣
              br
              p
                .ds-ow-button.green.ds-icon-ow-download.oval 立即下载
    .slide-footer.scroll-content(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
        br
        | All right reserved

</template>

<script>
import common from '../common'
export default {
  mixins: [common],
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../../var.stylus'
  
  .ds-icon-ow-safe-bg
    padding .8rem 0
    position relative
    color #fff
    margin-bottom .2rem
    // &:after
    //   content ''
    //   position absolute
    //   left 0
    //   right 0
    //   top 0
    //   bottom 0
    //   content ''
    //   bg-gradient(90deg, #a97afc, #4892eb)
    //   z-index -1
      


  .card-container
    position relative
    height 40%
    margin .4rem auto
    padding 5% 0
    max-width 14rem
    &:after
      position absolute
      left 5%
      right 5%
      top 0
      bottom 0
      content ''
      display inline-block
      background-color #6e9eff
      z-index -1
      radius(.1rem)
      
      
  .card
    padding-top .4rem
    display inline-block
    width 20%
    height 40%
    min-width 2.6rem
    background-color #fff
    padding PW
    margin PW
    shadow(0 0 .5rem rgba(110, 158, 255, .35))
    radius(.1rem)

    @media(max-width: PHONEW)
      height 200px
  
    .ds-icon-ow-clock24
    .ds-icon-ow-credit
    .ds-icon-ow-protect
    .ds-icon-ow-twservice
      position relative
      radius(50%)
      margin 10% auto
      width .5rem
      height .5rem
      
   
</style>



