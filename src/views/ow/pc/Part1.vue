<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content(ref="sc").flex
        .flex-content.white
          .ds-ow-button-group
            .ds-ow-button.light(:class="{'green': on === 0}" @click.stop="goIntro(0)") 电脑版
            .ds-ow-button.light(:class="{'green': on === 1}" @click.stop="goIntro(1)") 手机版
          br
          br
          h2 轻巧 快速 安全
          br
          br
          h5 精心雕琢只为提供最舒适的感受
          br
          br
          br
          br
          br
          img(src="/static/ow/laptop.png")

    
    
</template>
<script>
export default {
  data () {
    return {
      on: 0
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    goIntro (n) {
      this.on = n
      this.$router.push(n ? '/ow?url=phone' : '/ow?url=pc')
    }
  },
  components: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../../var.stylus'
  .slide-page
    overflow hidden
    &:before
      content ''
      position absolute
      top 0
      left 0 
      right 0 
      bottom 20%
      bg-gradient(90deg, #1a9ff3, #8f84ff)
      z-index -2
      
    &:after
      content ''
      position absolute
      top 60%
      left -100rem 
      right -100rem 
      height 100rem
      background #fff
      transform rotateZ(-15deg)
      z-index -1
   
</style>



