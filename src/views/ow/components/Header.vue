<template lang="jade">
  .header
    .ds-icon-ow-logo(style="min-width: 200px; width: 20%; height: 100%; display: inline-block")
    nav(:class=" {open: open} ")
      router-link(v-for=" r in links " v-bind:to=" r.link "  @click.native.stop="" v-bind:class="[r.class]") {{ r.title }}
      a.collapse(@click="open = !open")
        i



</template>

<script>
export default {
  data () {
    return {
      open: false,
      links: [
        {title: '首页', link: '/ow', class: 'ds-icon-ow-home'},
        {title: '热门活动', link: '/ow?url=event'},
        {title: '游戏介绍', link: '/ow?url=intro'},
        {title: '常见问题', link: '/ow?url=faq'},
        {title: '域名验证', link: '/ow?url=domaincheck'},
        {title: '客户端下载', link: '/ow?url=download'},
        {title: '信游资讯', link: '/ow?url=news'}
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus">

</style>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  
  .header
    position absolute
    z-index 2
    top 0
    left 0
    right 0
    height HH
    line-height HH
    background-color #101463
    // bg-gradient(90deg, #a97afc, #4892eb)
    nav
      position: relative;
      float right
      padding 0 .75rem
      &.open
        @media (max-width: IPADW)
          font-family AvenirNextLTPro-UltLt,HelveticaNeue-Light,Helvetica,Arial,sans-serif
          padding-right 0
          padding-top .5rem
          padding-left .3rem
          background-color #0b60ef
        a
          display block
          line-height .3rem
          color hsla(0,0%,100%,.5)
        .collapse
          right .65rem
          i
            height 0
          i:before
            transform rotate(-40deg) translateY(.12rem)
          i:after
            transform rotate(40deg) translateY(-.12rem)
        
      a
        display inline-block
        height HH
        width 1rem
        text-align center
        // padding 0 .3rem
        color #fff
        opacity .5
        background-position center -.8rem
        vertical-align top
        transition all .2s linear
        &:hover
          opacity 1
          background-position center .15rem
          padding-top .2rem
          line-height 1.4rem
          background-color #2c77f4
          shadow(0 10px 0 rgba(44,119,244, .6))
          
        @media (max-width IPADW)
          line-height .3rem
          color hsla(0,0%,100%,.5)
          border-left 3px solid transparent
          display none
      
      .collapse
        @media (max-width IPADW)
          display inline-block
          position absolute
          top 0
          right 0

        position relative
        display none
        top -.05rem
        width .4rem
        height .4rem
        line-height .3rem
        padding 0
        margin .1rem
        transition all .2s linear
        i
          display inline-block
          width 100%
          height .02rem
          background-color #000
          line-height inherit
          &:before
            top .1rem
          &:after
          &:before 
            content ''
            position absolute
            left 0
            width 100%
            height .02rem
            background-color inherit
            bottom .1rem
            transition all .2s linear
      
</style>



