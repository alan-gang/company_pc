<template lang="jade">
  section.ow
    owHeader
    swiper.scroll-content(:options="swiperOption" ref="mySwiper")
      swiper-slide
        Home
      swiper-slide
        FAQ
      swiper-slide
        NEWS
      swiper-slide
        PC
      swiper-slide
        Phone
      swiper-slide
        EventList
      swiper-slide
        Download
      swiper-slide
        Check

</template>

<script>
import base from 'components/base'
import owHeader from './components/Header'
import Home from './Home'
import FAQ from './FAQ'
import NEWS from './NEWS'
import PC from './PC'
import Phone from './Phone'
import EventList from './EventList'
import Download from './Download'
import Check from './Check'
export default {
  name: 'Ow',
  mixins: [base],
  data () {
    return {
      hasHeader: false,
      hasFooter: false,
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: 3000,
        // direction: 'horizonal',
        grabCursor: true,
        // setWrapperSize: true,
        // autoHeight: true,
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        // mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart (swiper) {
          // block8/3 console.log(swiper)
        }
        // more Swiper configs and callbacks...
        // ...
      },
      pages: {
        faq: 1,
        news: 2,
        pc: 3,
        phone: 4,
        eventlist: 5,
        download: 6,
        Check: 7
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'openRoute'
  },
  mounted () {
    this.swiper.slideTo(this.$route.query.url ? this.pages[this.$route.query.url] : 0)
  },
  methods: {
    openRoute ({path, query: {url}}) {
      // block8/3 console.log(url)
      this.swiper.slideTo(url ? this.pages[url] : 0, 300, false)
    }
  },
  components: {
    owHeader,
    Home,
    FAQ,
    NEWS,
    PC,
    Phone,
    EventList,
    Download,
    Check
  }
}
</script>

<style lang="stylus">
  @import './main.stylus'
  .ow
    background-color #fff
</style>
