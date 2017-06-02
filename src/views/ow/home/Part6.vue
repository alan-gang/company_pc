<template lang="jade">
  .ow-content
    h2  一站式满足所有需求
    h4 多种优势一一展现，玩法多多，7X24小时贴心客服、国家级安全资金管理、丰富的奖池资金、多支付渠道，一站满足您所有需求。
    .card-container
      .card
        .ow-icon-clock24
        h4 7X24小时客户服务
        h6 全年365天不间断的技术支持及客户服务，
        h6 随时随地待命，为您排忧解难！
      .card
        .ow-icon-credit
        h4 专业运营资质
        h6 畅博娱乐拥有菲律宾政府颁发的博彩牌照，
        h6 安全公信
      .card
        .ow-icon-protect
        h4 安全防护
        h6 使用CDN多线加速，分布式高防云防御和军用级
        h6 防火墙，全方位保障用户信息安全
      .card
        .ow-icon-twservice
        h4 充提服务
        h6 支持国内各大主流银行及第三方充值，充值
        h6 即时到账，提现最快3分钟到账
    .ow-icon-safe-bg.nobgcolor
      h2 随时随地 快乐游戏
      h6 畅博娱乐 轻松享受游戏乐趣
      p
        .button.green.ow-icon-download 立即下载

    h6(style="margin: .1rem 0") Copyright © 2017 Changbo Entertainment Inc 
    h6(style="margin: .1rem 0") All right reserved
        

</template>

<script>
export default {
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
  .ow-icon-safe-bg.nobgcolor
    padding .4rem 0
    position relative
    color #fff
    margin-bottom .2rem
    h2
      color #fff
    h2
    h6
      margin-top 0
    h2
      margin-bottom .1rem
    &:after
      content ''
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      content ''
      bg-gradient(90deg, #a97afc, #4892eb)
      z-index -1
      

  
  .ow-content
    display inline-block
    color #5b6470
    width 90%
    h2
      margin-bottom .4rem
      font-size .36rem
      color #5b6470
    h4
      font-size .18rem
      opacity .8
    h6
      color #bbb
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
    
      .ow-icon-clock24
      .ow-icon-credit
      .ow-icon-protect
      .ow-icon-twservice
        position relative
        radius(50%)
        margin 10% auto
        width .5rem
        height .5rem
        
   
</style>



