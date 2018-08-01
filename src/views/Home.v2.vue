<template lang="jade">
  section.new-home(@scroll="scrollHander")
    Me(:menus="menus" v-on:open-page="openTab")

    MyMenu(:menus="menus.slice(0, 11).concat(menus[15])" v-on:open-page="openTab")

    el-carousel.ad(:interval="4000" arrow="always")
      el-carousel-item(v-for="(item, i) in sources" v-bind:key=" i " v-bind:style="{ ba }")
        img(:src=" item.src " style="width: 100%; min-width: 8rem; cursor: pointer;" @click=" openBanner(item) ")

    //- img.ad(src="/static/pic/banner.jpg" width="100%" style="min-width: 8rem; cursor: pointer;" @click="__setCall({fn: '__openWindowWithPost', args: '3:301:iframe'})")
    .our-game.content-width

      el-row.collects.font-white.top-games
        .intro(@mouseenter="__recentlyCode")
          span.gt 信游彩票
          span.en-name LOTTERY
          .right
            span.name 重庆时时彩 &nbsp;&nbsp;
            span.number(v-for=" n in ns ") {{ n }}
            |  &nbsp;&nbsp;
            router-link.ds-button.primary(:to=" '/game/1-1-1' ") 再来一注
              .el-icon-arrow-right
          .line
          p 信游彩票包含时时彩，11选五，快三，PK10，福彩3D，排三排五，六合彩等多种游戏，玩法齐全，同时开发了多个快频彩票，还有VR视频美女开奖，满足您不同的需求。


        el-col(:span="4" v-for=" (c, index) in topgames " v-if="c" v-bind:class="[c.title? c.class || c.menuClass :'empty ds-icon-add-item']" @click.native=" openHomeTab(c) ")
          p {{ c.title }}
          // p {{ c.descr }}

        // .el-col.pool(:span="24")
          span 奖池累计：
          | {{ EM }}

      el-row(:gutter=15 style="padding-bottom: .3rem")
        el-col.picture.lhg(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '2:203'}}) ")
          .co
            img(src="/static/pic/lhg.jpg")
        el-col.picture.bjl(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '2:201'}}) ")
          .co
            img(src="/static/pic/bjl.jpg")


    CopyRight


    // Guide(v-if="me.guide")

    // keep-alive
    //   transition(name="fade" appear=true)

    router-view.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )

    // Pages.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )

    // a submit form
    form(id="TheForm" method="post" action="" target="TheWindow")
      input(type="hidden" name="data" value="")
      input(type="hidden" name="version" value="")
      input(type="hidden" name="id" value="")


    iframe(:src="ifsrc" v-if="sports" style="width: 10rem;margin: 0 auto; border: none; height: 100%; position: absolute; top: 1.04rem" @load="ssports = true" v-show="ssports")

    .modal(v-if="false" )
      .mask
      .box-wrapper
        .box(ref="box" style="max-width: 12rem; width: 12rem; max-height: 8rem;")
          .tool-bar
            span.title 沙巴体育
            el-button-group
              el-button.close(icon="close" @click="ifsrc = ''")

          iframe(:src="ifsrc" v-if="ifsrc" style="width: 100%;margin: 0; border: none; height: 7.5rem")


</template>

<script>
import base from 'components/base'
// import Pages from './Pages'
import api from '../http/api'
import store from '../store'
import Guide from './Guide'
import Pages from './Pages'
import CopyRight from 'components/CopyRight'
import Me from 'components/Me'
import MyMenu from 'components/Menu'
import { numberWithCommas } from '../util/Number'
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus', 'pages', 'prehref', 'loop', 'maxPages', 'transition', 'free', 'money'],
  data () {
    return {
      hasFooter: true,
      me: store.state.user,
      sources: [
<<<<<<< HEAD
        // {href: '/activity/5-2-15?id=96', src: '/static/pic/2.jpg'},
        // {href: '/activity/5-2-14?id=88', src: '/static/pic/3.jpg'},
        // {href: '/activity/5-2-8?id=99', src: '/static/pic/1.jpg'}
        {href: '/activity/5-1-1', src: '/static/pic/2.jpg'},
        {href: '/activity/5-1-1', src: '/static/pic/3.jpg'},
        {href: '/activity/5-1-1', src: '/static/pic/1.jpg'}
=======
        {href: '/activity/5-1-1', src: '/static/pic/2.jpg'},
        {href: '/activity/5-1-1', src: '/static/pic/3.jpg'},
        {href: '/activity/5-1-1', src: '/static/pic/1.jpg'}
        // {href: '/activity/5-1-1', src: '/static/pic/2.jpg'},
        // {href: '/activity/5-1-1', src: '/static/pic/3.jpg'},
        // {href: '/activity/5-1-1', src: '/static/pic/1.jpg'}
>>>>>>> 92f8703abc2d76c09b1e8e5d2f1f3476e0fe84a6
      ],
      topgames: [
        {class: 'index_icon_01', id: '1-1-1', title: '重庆时时彩'},
        {class: 'index_icon_02', id: '1-3-1', title: '广东11选5'},
        {class: 'index_icon_03', id: '1-4-1', title: '安徽快三'},
        // {class: 'index_icon_04', id: '1-2-1', title: '快投30秒'},
        {class: 'index_icon_13', id: '1-1-4', title: '欢乐分分彩'},
        {class: 'index_icon_06', id: '1-5-1', title: '北京PK10'},
        {class: 'index_icon_04', id: '1-5-2', title: '福彩3D'},
        {class: 'index_icon_05', id: '1-5-3', title: '排列三、五'},
        // {class: 'index_icon_09', id: '1-5-4', title: '快投排列五'},
        {class: 'index_icon_10', id: '1-1-6', title: '六合彩'}
        // {class: 'index_icon_11', id: '1-7-4', fn: 2, title: 'VR赛车'},
        // {class: 'index_icon_12', id: '1-7-6', fn: 15, title: 'VR百家乐'}
      ],
      formData: {
        // data: '',
        // version: 0,
        // id: '',
        // vrurl: ''
      },
      ns: [1, 2, 3, 4, 5],
      timeout: 0,
      ifsrc: '',
      sports: false
    }
  },
  computed: {
    EM () {
      return numberWithCommas(this.pricePotAmount || 0)
    }
  },
  watch: {
    '$route' ({path, query: {sports}}) {
      if (sports && path === '/') {
        this.sports = true
        this.ssports = true
      } else {
        this.sports = false
        this.ssports = false
      }
    }
  },
  mounted () {
    this.__recentlyCode()
    this.pricePot()
    this.timeout = setInterval(this.pricePot, 60000 * 5)
    // this.openExternal(1)
    // this.openExternal(2)
    // this.openExternal(11)
    // this.openExternal(13)
    // this.openExternal(15)
  },
  beforeDestroy () {
    clearInterval(this.timeout)
    this.timeout = 0
  },
  methods: {
    openBanner (item) {
      if (item.fn) {
        this.__setCall({fn: item.fn, args: item.args})
      } else if (item.href) {
        this.$router.push(item.href)
      }
    },
    scrollHander (evt) {
      this.lefter = this.lefter || document.getElementsByClassName('lefter')[0]
      if (this.lefter) {
        this.lefter.style.transition = 'transform linear 0s'
        this.lefter.style.transform = 'translateX(-7rem) translateY(-' + Math.min(115, this.$el.scrollTop) + 'px)'
      }
    },
    pricePot () {
      this.$http.get(api.pricePot).then(({data}) => {
        if (data.success === 1) {
          this.pricePotAmount = data.amount || 0
          // this.pricePotCount = data.count || 0
          // }
        } else {
          // this.$message.error({target: this.$el, message: data.msg || '奖池信息获取失败！'})
        }
      }).catch(rep => {
        // this.$message.error({target: this.$el, message: '奖池信息获取失败！'})
      })
    },
    // 获得当前已开奖信息
    __recentlyCode (noloop) {
      this.$http.mypost(api.recentlyCode, {gameid: 1, pageNum: 1, size: 30}).then(({data}) => {
        // success
        if (data.success > 0 && data.items.length > 0) {
          let lst = data.items[0] || {code: '0,0,0,0,0'}
          this.ns = lst.code.split(',')
        }
      }, (rep) => {
        // error
      })
    },
    openHomeTab (item) {
      if (item.fn) return this.__openWindowWithPost(item.fn)
      else this.openTab(item.id)
    },
    openTab (url) {
      this.$emit('open-tab', url)
    },
    closeTab (furl, url) {
      this.$emit('close-tab', furl, url)
    },
    // TODO 获取推荐游戏
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
        if (data.success === 1) {
        }
      }, (rep) => {
        // error
      })
    },
    openExternal (fn) {
      if (fn.split(':')[1] > 200) return this.openBG(fn)
      // this.formData = {}
      this.$http.get(api.loginVr, {channelId: fn || 12}).then(({data}) => {
        //
        this.formData[fn] = data.vrurl
        this.__openWindowWithPost(fn)
        // if (data.success === 1) {
        //   // this.openWindowWithPost(data)
        //   this.formData[fn] = data
        // } else {
        //   // this.$message.error({target: this.$el, message: data.msg || '第三方游戏获取失败！'})
        // }
      }).catch(rep => {
        // this.$message.error({target: this.$el, message: '第三方游戏获取失败！'})
      })
    },
    openBG (fn) {
      if (fn.split(':')[2] === 'iframe') this.$router.push('/game/1-8-1')
      // this.formData = {}
      this.$http.get(api.gameUrl, {gameid: fn.split(':')[1] || 201, platid: fn.split(':')[0]}).then(({data}) => {
        //
        if (data.success) {
          // data.url && (data.url.iframe = true)
          this.formData[fn] = data.url
          this.__openWindowWithPost(fn)
        }
        // if (data.success === 1) {
        //   // this.openWindowWithPost(data)
        //   this.formData[fn] = data
        // } else {
        //   // this.$message.error({target: this.$el, message: data.msg || '第三方游戏获取失败！'})
        // }
      }).catch(rep => {
        // this.$message.error({target: this.$el, message: '第三方游戏获取失败！'})
      })
    },
    openWindowWithPost ({data, version, id, vrurl, msg}) {
      if (!data) return this.$message.error({target: this.$el, message: msg || '第三方游戏获取失败！'}) && false
      let f = document.getElementById('TheForm')
      f.data.value = data
      f.version.value = version
      f.id.value = id
      f.action = vrurl
      window.open('', 'TheWindow')
      f.submit()
    },
    __openWindowWithPost (fn) {
      if (typeof this.formData[fn] === 'string') {
        if (fn.split(':')[2] === 'iframe') {
          this.ifsrc = this.formData[fn]
          this.formData[fn] = undefined
          // this.$router.push('/game/1-8-1')
          this.__setCall({fn: '__setIframeSrc', args: this.ifsrc})
          return false
        }
        return window.open(this.formData[fn])
      }
      return this.formData[fn] ? this.openWindowWithPost(this.formData[fn] || {}) : this.openExternal(fn)
    }
  },
  components: {
    Guide,
    Pages,
    CopyRight,
    Me,
    MyMenu
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  // @import '../path.stylus'
  // @import '../main.stylus'
  // @import '../classic.stylus'
  // @import '../night.stylus'
  // @import '../1280X800.stylus'
  // @import '../chat.stranger.1366.stylus'
  // @import '../classic.v2.stylus'
  .new-home .el-carousel__container
    height 180px
    @media screen and (min-width: 1200px)
        height 272px
    @media screen and (min-width: 1600px)
        height 372px
    @media screen and (min-width: 1920px)
        height 400px

</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .new-home .dialog-container
    top 0
    z-index 2

  W = 1.5rem
  H = 1.4rem
  .top-games
    // height 6rem
    position relative
    margin .3rem 0
    padding PW
    padding-left 43%
    text-align center
    radius()
    background url(../assets/v2/index_bg02.png) no-repeat
    &:before
      content ''
      position absolute
      display inline-block
      top 0
      bottom 0
      left 0
      right 60%
      background url(../assets/v2/girl.png)  no-repeat
    .intro
      font-shadow(none)
      text-align left
      padding PW
      // padding-bottom 0
      padding-right 0
      transform translateX(-.38rem)
      .line
          margin PW 0
          border-bottom 1px solid rgba(255, 255, 255, .3)
      .gt
          font-size .24rem
          line-height .3rem
          color #ffff00
      .en-name
          color #ccc
          font-size .18rem
          margin-left PW
      .number
          font-size .12rem
          line-height .2rem
          radius(50%)
          background-color #fff
          border 2px solid #ff9731
          display inline-block
          width .18rem
          height .18rem
          text-align center
          color #000

      .right
          float right

    .el-col:not(.pool)
      position relative
      min-width W
      height H
      overflow hidden
      radius()
      background-position 50%
      cursor pointer
      padding-top H
      transition all ease-in-out .3s
      &.index_icon_01
        background url(../assets/v2/index_icon_01.png) 50% no-repeat
      &.index_icon_02
        background url(../assets/v2/index_icon_02.png) 50% no-repeat
      &.index_icon_03
        background url(../assets/v2/index_icon_03.png) 50% no-repeat
      &.index_icon_04
        background url(../assets/v2/index_icon_04.png) 50% no-repeat
      &.index_icon_05
        background url(../assets/v2/index_icon_05.png) 50% no-repeat
      &.index_icon_06
        background url(../assets/v2/index_icon_06.png) 50% no-repeat
      &.index_icon_07
        background url(../assets/v2/index_icon_07.png) 50% no-repeat
      &.index_icon_08
        background url(../assets/v2/index_icon_08.png) 50% no-repeat
      &.index_icon_09
        background url(../assets/v2/index_icon_09.png) 50% no-repeat
      &.index_icon_10
        background url(../assets/v2/index_icon_10.png) 50% no-repeat
      &.index_icon_11
        background url(../assets/v2/index_icon_11.png) 50% no-repeat
      &.index_icon_12
        background url(../assets/v2/index_icon_12.png) 50% no-repeat
      &.index_icon_13
        background url(../assets/v2/index_icon_13.png) 50% no-repeat

      &:hover
        padding-top H - 2*PW
        background-position 50% 20%
        background-color rgba(255, 255, 255, .2)
        box-shadow 0 .3rem 1rem rgba(0, 0, 0, .2)
        opacity 1

    .el-col.pool
      font-family Roboto
      color YELLOW
      padding-right .5rem
      font-size .36rem
      padding-top .55rem
      line-height 1
      text-align center
      display block
      clear both
      overflow hidden
      height .55rem
      background url(../assets/v2/jiangchi.png) 30% center no-repeat
      span
        font-size .14rem
        color #fff

  .picture
    position relative
    cursor pointer
    height 2.8rem
    .co
      width 100%
      height 100%
      overflow hidden
    img
      position relative
      left 0
      top 0
      width 100%
      // opacity .8
      transition all ease-in-out .3s

    &:hover
      img
        opacity 1
        width 110%
        left -5%
        top -5%
  .picture.wait:after
    content '敬请期待'
    display inline-block
    position absolute
    color #fff
    top 0
    right 8px
    width .8rem
    height .36rem
    line-height .36rem
    text-align center
    background-color rgba(0, 0, 0, .3)

</style>

