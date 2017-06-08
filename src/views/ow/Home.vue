<template lang="jade">
  swiper.home-swiper.scroll-content(:options="swiperOption" ref="mySwiper")
    swiper-slide
      Part1
    swiper-slide.part2-slide
      Part2
    swiper-slide.part3-slide
      Part3
    swiper-slide.part4-slide.ds-icon-ow-wave
      Part4
    swiper-slide.part5-slide.ds-icon-ow-safe-bg
      Part5
    swiper-slide.part6-slide
      Part6
</template>

<script>
  import Part1 from './home/Part1'
  import Part2 from './home/Part2'
  import Part3 from './home/Part3'
  import Part4 from './home/Part4'
  import Part5 from './home/Part5'
  import Part6 from './home/Part6'
 // swiper options example:
  export default {
    data () {
      return {
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          // autoplay: 3000,
          direction: 'vertical',
          grabCursor: true,
          // setWrapperSize: true,
          // autoHeight: true,
          // pagination: '.swiper-pagination',
          // paginationClickable: true,
          // prevButton: '.swiper-button-prev',
          // nextButton: '.swiper-button-next',
          // scrollbar: '.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          // onTransitionStart (swiper) {
          //   console.log(swiper)
          // }
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      // swiper () {
      //   return this.$refs.mySwiper.swiper
      // }
    },
    mounted () {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },
    components: {
      Part1,
      Part2,
      Part3,
      Part4,
      Part5,
      Part6
    }
  }
</script>



