<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content
          h3.myt(style="font-family: MyT")  三大特性，铸就精彩
          .card.hover.f
            .ds-icon-ow-safe
            h5 信誉保证
            h6 雄厚实力，确保畅玩无忧！
          .card.hover.s
            .ds-icon-ow-fast
            h5 充提更快捷
            h6 为玩家提供一系列安全、可靠便捷的重提服务。
          .card.hover.t
            .ds-icon-ow-nice
            h5 信誉保证
            h6 20多种主流彩票游戏。让您玩的尽兴。
    
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
  .myt
    font-gradient(90deg, #ffff86, #ffce43)
  .f
    background-color #7f85f3
  .s
    background-color #27a5fd
  .t
    background-color #fd6047
  h3
    margin-bottom .5rem
  h5
    color #fff
    margin-bottom .1rem  
  h6
    font-size .14rem
    color rgba(255, 255, 255, .5)
    
  .slide-page
    background #0d1052
    .card
      width 3rem
      @media(max-width: PHONEW)
        height 200px
      .ds-icon-ow-nice
      .ds-icon-ow-safe
      .ds-icon-ow-fast
        position relative
        radius(50%)
        margin 20% auto
        width 1.5rem
        height 1.5rem
        &:after
          content ''
          position absolute
          top 0
          left 0 
          right 0
          bottom 0
          background rgba(255, 255, 255, .1)
          // z-index -1
          radius(50%)
        
   
</style>



