<template lang="jade">
  .ow-content
    h2 多屏幕畅玩
    h4 支持桌面端及移动端，完美适配市面绝大多数机型，让您随时随地，想玩就玩！

    div(v-bind:class="{'ow-icon-pc': on === 0, 'ow-icon-mobile': on === 1}")
    
    .button-group
      .button(:class="{on: on === 0}" @click="goIntro(0)") 电脑版
      .button(:class="{on: on === 1}" @click="goIntro(1)") 手机版
   
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
  
  .ow-content
    display inline-block
    color #5b6470
    width 100%
    color #fff
    h2
      font-size .36rem
    h4
      font-size .2rem
      margin PW
      opacity .8
      
    .ow-icon-pc
    .ow-icon-mobile
      width 100%
      height 8rem
      max-width 12rem
      max-height 10rem
      margin 0 auto
      
    .button-group
      display inline-block
      radius(.2rem)
      overflow hidden
      margin .2rem 0
      border 1px solid #888
      
        
            

      
        
    
   
</style>



