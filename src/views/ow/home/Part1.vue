<template lang="jade">
  swiper.part1-swiper.scroll-content(:options="swiperOption" ref="mySwiper")
    swiper-slide
     .ow-content
        h1 全新畅博精彩呈现
        h6 Changbo Entertainments
    .swiper-pagination(slot="pagination")
    .swiper-button-prev(slot="button-prev")
    .swiper-button-next(slot="button-next")
 

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
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
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
    h1
    h6
      font-weight normal
      font-family monospace
    h1
      font-size .65rem
    h6
      font-size .3rem
      opacity .5
</style>



