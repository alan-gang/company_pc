<template lang="jade">
  .ow-content
    h2 采种丰富
    h4 近年来我们致力于投资开发多种类的彩票游戏，以创新的方式让彩票产品娱乐升级。重庆11选5，分分彩...
    h4 多达15个彩种，上百个玩法。满足玩家多变的需求。所有彩票游戏公正公开，皆参照各地官方开奖结果为
    h4 依据，连线同步即时开彩，让您享乐零时差。
    swiper.part4-swiper(:options="swiperOption" ref="mySwiper")
      swiper-slide
        .ow-icon-game.ow-icon-game-01
        .ow-icon-game.ow-icon-game-02
        .ow-icon-game.ow-icon-game-03
        .ow-icon-game.ow-icon-game-04
      swiper-slide I'm Slide 22
      swiper-slide I'm Slide 33
      swiper-slide I'm Slide 44
      swiper-slide I'm Slide 55
      swiper-slide I'm Slide 66
      swiper-slide I'm Slide 77
      .swiper-pagination.blue(slot="pagination")
   
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        autoHeight: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
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
  
  .ow-content
    display inline-block
    width 90%
    h2
      font-size .36rem
      margin-bottom .5rem
    h4
      margin .1rem 0
      font-size .18rem
      opacity .8
      
        
    
   
</style>



