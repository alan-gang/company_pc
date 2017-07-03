<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content.white
          h3.myt(style="font-family: MyT") 多屏幕畅玩
          h5.light-white 支持桌面端及移动端，完美适配市面绝大多数机型，让您随时随地，想玩就玩！
          img(:src="src[on]")

          div
            .ds-ow-button-group
              .ds-ow-button.light(:class="{green: on === 0}" @click.stop="goIntro(0)") 电脑版
              .ds-ow-button.light(:class="{green: on === 1}" @click.stop="goIntro(1)") 手机版
   
</template>

<script>
export default {
  data () {
    return {
      on: 0,
      src: ['/static/ow/pc.png', '/static/ow/mobile.png']
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
  .myt
    font-gradient(90deg, #36d574, #1fbd5d)
  .slide-page
    // bg-gradient(90deg, #a97afc, #4892eb)
    background #0a0c3d
    h3,h5
      margin PW 0
    img
      margin 5*PW 0
   
</style>



