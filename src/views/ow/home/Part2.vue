<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content
          h3  三大特性，铸就精彩
          .card.hover
            .ds-icon-ow-safe
            h5 信誉保证
            h6 雄厚实力，确保畅玩无忧！
          .card.hover
            .ds-icon-ow-fast
            h5 充提更快捷
            h6 为玩家提供一系列安全、可靠便捷的重提服务。
          .card.hover
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
  h3
    margin-bottom .5rem
  h5
    margin-bottom .1rem  
  .slide-page
    .card
      width 2.8rem
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
          z-index -1
          radius(50%)
        
      .ds-icon-ow-safe
        &:after
          bg-gradient(180deg, #787ef2, #8e93f5) 
      .ds-icon-ow-fast
        &:after
          bg-gradient(180deg, #2a9afd, #25b2fe) 
      .ds-icon-ow-nice
        &:after
          bg-gradient(180deg, #fd5f46, #fd8671) 
      
        
    
   
</style>



