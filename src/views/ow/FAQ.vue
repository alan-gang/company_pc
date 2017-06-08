<template lang="jade">
  .slide-page.scroll-content
    .slide-header(ref="sh").ds-icon-ow-faq-bg
        fieldset
          legend 
            h2 FAQS
          h5.light-white 常见问题解答
        .buttons
            span.link(v-for=" (b,bi) in btns" v-bind:class="{ on: i === bi }" @click="i = bi") {{b}}
    .slide-content
      .scroll-content(ref="sc")
        .flex-content
          .list-container
            ul.faq-list
              li.faq-item(v-for=" (n, ni) in faq " v-bind:class="{ on: j === ni }")
                h4(@click=" j !== ni ? (j = ni): (j = -1) ") {{n.title}}
                h6(v-show=" j === ni ") {{n.content}}

    .slide-footer.scroll-content(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
        br
        | All right reserved

  

        
</template>

<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      i: 0,
      btns: ['登录注册', '帐户密码', '绑卡', '充值', '提现', '卡券红包'],
      faq: [
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'},
        {title: '如何注册畅博娱乐？', content: '账户密码绑卡充值提现卡券红包其他注册问题账，户密码绑卡充值提现卡券红包。账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包账户密码绑卡充值提现卡券红包。'}
      ],
      j: 0
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
  @import './var.stylus'
  
  .slide-page
    .slide-header
      padding-top 1rem
      fieldset
        border .05rem solid #fff
        radius()
        color #fff
        text-align center
        max-width 4rem
        width 60%
        margin 0 auto
        h5 
          padding-bottom .2rem
      legend
        margin 0 auto
    .slide-content
      padding-top PWX
    .list-container
      text-align left
      max-height 65%
      overflow auto
      padding 0 PW
      @media (max-width: IPADW)
        max-height 60%
    .faq-list
      padding 0
      max-width 10rem
      margin 0 auto
      list-style none
      h2
        font-size .4rem
        font-gradient()
      h4
        font-size .18rem
        margin-bottom .1rem
      li h4
        position relative
        cursor pointer
        &:after
          content ''
          position absolute
          right PW
          width .1rem
          height .1rem
          border 2px solid #bbb
          border-top none
          border-left none
          transform rotateZ(45deg)
      li.on h4
        &:after
          transform rotateZ(-135deg)
      h6
        margin 0
        color #999
        font-size .14rem
        background-color rgba(222, 222, 222, .2)
        radius()
        padding PW

      .faq-item
        position relative
        border-bottom 1px solid #eee
        padding .4rem 0
    
    .buttons
      text-align center
      margin-top .5rem
      background-color #fff
      .link
        display inline-block
        cursor pointer
        margin PW
        width 1.2rem
        text-align center
        height .4rem
        line-height .4rem
        radius(.2rem)
        &:hover
          color #1a9ff3
        &.on
          border 1px solid #eee
          color #1a9ff3
          
        
</style>



