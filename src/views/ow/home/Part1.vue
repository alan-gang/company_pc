<template lang="jade">
  swiper.part1-swiper.scroll-content(:options="swiperOption" ref="mySwiper")
    swiper-slide.flex
      .flex-content
        h2.white 全新畅博精彩呈现
        h4.light-white Changbo Entertainments
    swiper-slide.flex
      .flex-content
        h2.white 全新畅博精彩呈现1
        h4.light-white Changbo Entertainments
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
  @import '../var.stylus'
    .part1-swiper
      &:before
        content ''
        position absolute
        left 0
        top 0 
        right 0
        bottom 0
        background url(../assets/cloud.png) center bottom no-repeat
        background-size 100%
        
      &:after
        content ''
        position absolute
        left 0
        top 0 
        right 0
        bottom 0
        bg-gradient(90deg, #a97afc, #4892eb)
        z-index -1
</style>



