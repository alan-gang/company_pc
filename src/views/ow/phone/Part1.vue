<template lang="jade">
  .ow-content
    .button-group
      .button(:class="{on: on === 0}" @click.stop="goIntro(0)") 电脑版
      .button(:class="{on: on === 1}" @click.stop="goIntro(1)") 手机版
   
    h2 随时 随地 随心
    h4 精心雕琢只为提供最舒适的感受

    .ow-icon-phone
    .ow-icon-wave01

    
    
</template>
<script>
export default {
  data () {
    return {
      on: 1
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
  
  .ow-content
    display inline-block
    color #5b6470
    height 100%
    width 100%
    color #fff
    position relative
    padding-top 1rem
    .ow-icon-wave01
      width 100%
      height 15%
      position absolute
      bottom 0
    .ow-icon-phone
      max-width 5rem
      max-height 9rem
      width 90%
      height 80%
      margin 1.5rem auto
      
      
      
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
      height 100%
      background #fff
      transform rotateZ(15deg)
      z-index -1
    h2
      font-size .6rem
      margin-bottom .4rem
      
    h4
      font-size .2rem
      margin PW
      
    .ow-icon-pc
    .ow-icon-mobile
      width 100%
      height 4rem
      margin 8% 0 8% 0
  
    .button-group
      display inline-block
      radius(.2rem)
      overflow hidden
      margin .5rem 0
      border 1px solid #888
      color #666
      background-color #fff
      .button.on
        color #fff
   
</style>



