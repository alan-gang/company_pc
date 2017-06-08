<template lang="jade">
  .slide-page.scroll-content
    .slide-content
      .scroll-content(style="padding: 10% 0")
        .flex
          .flex-content
            h4 采种丰富
            br
            h5.text-999 近年来我们致力于投资开发多种类的彩票游戏，以创新的方式让彩票产品娱乐升级。重庆11选5，分分彩...
            h5.text-999 多达15个彩种，上百个玩法。满足玩家多变的需求。所有彩票游戏公正公开，皆参照各地官方开奖结果为
            h5.text-999 依据，连线同步即时开彩，让您享乐零时差。
        swiper.part4-swiper(:options="swiperOption" ref="mySwiper")
          .swiper-pagination.blue(slot="pagination")
          swiper-slide
            .slide-page
              .slide-content
                .scroll-content.flex
                  .flex-content
                    .ds-icon-ow-game.ds-icon-ow-game-01
                    .ds-icon-ow-game.ds-icon-ow-game-02
                    .ds-icon-ow-game.ds-icon-ow-game-03
                    .ds-icon-ow-game.ds-icon-ow-game-04
          swiper-slide
            .slide-page
              .slide-content
                .scroll-content.flex
                  .flex-content
                    .ds-icon-ow-game.ds-icon-ow-game-04
                    .ds-icon-ow-game.ds-icon-ow-game-05
                    .ds-icon-ow-game.ds-icon-ow-game-06
                    .ds-icon-ow-game.ds-icon-ow-game-07

   
</template>

<script>
import common from '../common'
export default {
  mixins: [common],
  data () {
    return {
      swiperOption: {
        autoHeight: false,
        pagination: '.swiper-pagination.blue',
        // slidesPerView: 0,
        paginationClickable: true,
        // spaceBetween: 30,
        loop: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    console.log('this is current swiper instance object', this.swiper)
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
  .part4-swiper
    height 4rem
    width 100%
   
</style>



