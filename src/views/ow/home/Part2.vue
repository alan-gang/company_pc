<template lang="jade">
  .ow-content
    h2  三大特性，铸就精彩
    .card
      .ow-icon-safe
      h4 信誉保证
      h6 雄厚实力，确保畅玩无忧！
    .card
      .ow-icon-fast
      h4 充提更快捷
      h6 为玩家提供一系列安全、可靠便捷的重提服务。
    .card
      .ow-icon-nice
      h4 信誉保证
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
  
  .ow-content
    display inline-block
    color #5b6470
    width 100%
    height 100%
    h2
      margin 10% 0
      font-size .36rem
      color #5b6470
    h4
      font-size .2rem
    h6
      color #bbb

    .card
      padding-top .4rem
      display inline-block
      width 20%
      height 40%
      min-width 3.5rem
      max-height 5rem
      
      padding PW
      margin PW
      shadow(0 0 .1rem #eee)
      .ow-icon-nice
      .ow-icon-safe
      .ow-icon-fast
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
        
      .ow-icon-safe
        &:after
          bg-gradient(180deg, #787ef2, #8e93f5) 
      .ow-icon-fast
        &:after
          bg-gradient(180deg, #2a9afd, #25b2fe) 
      .ow-icon-nice
        &:after
          bg-gradient(180deg, #fd5f46, #fd8671) 
      
        
    
   
</style>



