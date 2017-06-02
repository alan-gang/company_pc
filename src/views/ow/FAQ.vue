<template lang="jade">
  .ow-faq.scroll-content

    .ow-icon-faq-bg
      fieldset
        legend FAQS
        h4 常见问题解答
    .buttons
      span.link(v-for=" (b,bi) in btns" v-bind:class="{ on: i === bi }" @click="i = bi") {{b}}
    .list-container
      ul.faq-list
        li.faq-item(v-for=" (n, ni) in faq " v-bind:class="{ on: j === ni }")
          h4(@click=" j !== ni ? (j = ni): (j = -1) ") {{n.title}}
          h6(v-show=" j === ni ") {{n.content}}

    h6(style="margin: .1rem 0") Copyright © 2017 Changbo Entertainment Inc 
    h6(style="margin: .1rem 0") All right reserved

        
</template>

<script>
import AllRights from 'components/AllRights'
export default {
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
    AllRights
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../owvar.stylus'
  
  .ow-faq
    display inline-block
    color #666
    .ow-icon-faq-bg
      padding 1rem
    fieldset
      border .05rem solid #fff
      radius()
      color #fff
      text-align center
      max-width 4rem
      width 60%
      margin 0 auto
      h4 
        font-size .24rem
        opacity .8
        padding-bottom .2rem
    legend
      margin 0 auto
      font-size .58rem
      color #fff
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



