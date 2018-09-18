<template lang="jade">
  section.new-home(@scroll="scrollHander")
    Me(:menus="menus" v-on:open-page="openTab")
    
    MyMenu(:menus="menus.slice(0, 12).concat(menus[16])" v-on:open-page="openTab")

    router-view.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )


    el-carousel.ad(:interval="4000" arrow="always")
      el-carousel-item(v-for="(item, i) in sources" v-bind:key=" i " v-bind:style="{ ba }")
        img(:src=" item.webBanner " style="width: 100%; min-width: 8rem; cursor: pointer;" @click=" openBanner() ")
    
    .box.our-game
      .content-width
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

        //- .title 
          p.t1 我们的游戏
          p.t2 OUR GAMES

        el-row(:gutter=15 style="padding-bottom: .2rem")
          
          el-col.picture.lhg(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '5:203:iframe:/egame'}}) ")
            .co
              img(src="/static/pic/lhg.jpg")
            //- p
              span.t1 体育竞技 &nbsp;&nbsp;
              span.t2 SPORTS
              span.f_r 立即进行 >
          el-col.picture.bjl(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '2:201'}}) ")
            .co
              img(src="/static/pic/bjl.jpg")

            //- p
              span.t1 真人娱乐 &nbsp;&nbsp;
              span.t2 CASINO
              span.f_r 立即进行 >

        //- el-row(:gutter=15 style="padding-bottom: .3rem")
          el-col.picture.a.lhg(:span="8" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '5:203:iframe:/egame'}}) ")
            .co
              img(src="/static/pic/home/3.jpg")
            p
              span.t1 电子游戏 &nbsp;&nbsp;
              span.t2 ELECTRIC
              span.f_r 立即进行 >
          el-col.picture.a.fish(:span="8" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '2:202'}}) ")
            .co
              img(src="/static/pic/home/4.jpg")

            p
              span.t1 捕鱼达人 &nbsp;&nbsp;
              span.t2 FISHING
              span.f_r 立即进行 >

          el-col.picture.a.chess(:span="8" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: '7:202'}}) ")
            .co
              img(src="/static/pic/home/5.jpg")

            p
              span.t1 棋牌游戏 &nbsp;&nbsp;
              span.t2 CHESS
              span.f_r 立即进行 >
        //- .title 
          p.t1 精彩活动
          p.t2 ACTIVITY
        //- el-row(:gutter=15 style="padding-bottom: .3rem")
          el-col.picture.b.lhg(:span="6" @click.native=" openBanner() ")
            .co
              img(src="/static/pic/home/6.jpg")
            p 信游抢楼大抽奖，每天3888无限送
          el-col.picture.b.bjl(:span="6" @click.native=" openBanner() ")
            .co
              img(src="/static/pic/home/7.jpg")

            p 体育高返水，每周无限返水

          el-col.picture.b.bjl(:span="6" @click.native=" openBanner() ")
            .co
              img(src="/static/pic/home/8.jpg")

            p 真人、电游、捕鱼返水进行时

          el-col.picture.b.bjl(:span="6" @click.native=" openBanner() ")
            .co
              img(src="/static/pic/home/9.jpg")

            p 上班工资每月发，平台工资天天领






    


    CopyRight


    // a submit form
    form(id="TheForm" method="post" action="" target="TheWindow")
      input(type="hidden" name="data" value="")
      input(type="hidden" name="version" value="")
      input(type="hidden" name="id" value="")




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
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus', 'pages', 'prehref', 'loop', 'maxPages', 'transition', 'free', 'money'],
  data () {
    return {
      hasFooter: true,
      me: store.state.user,
      sources: [
      ],
      topgames: [
        {class: 'index_icon_01', id: '1-1-1', title: '重庆时时彩'},
        {class: 'index_icon_02', id: '1-3-1', title: '广东11选5'},
        {class: 'index_icon_03', id: '1-4-1', title: '安徽快三'},
        {class: 'index_icon_13', id: '1-1-4', title: '欢乐分分彩'},
        {class: 'index_icon_06', id: '1-5-1', title: '北京PK10'},
        {class: 'index_icon_04', id: '1-5-2', title: '福彩3D'},
        {class: 'index_icon_05', id: '1-5-3', title: '排列三、五'},
        {class: 'index_icon_10', id: '1-1-6', title: '六合彩'}
      ],
      formData: {
      },
      ns: [1, 2, 3, 4, 5],
      timeout: 0,
      ifsrc: '',
      sports: false
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
    this.getActivityBanner()
    this.__recentlyCode()
  },
  beforeDestroy () {
    clearInterval(this.timeout)
    this.timeout = 0
  },
  methods: {
    getActivityBanner () {
      this.$http.get(api.getActivityBanner).then(({data}) => {
        if (data.success === 1) {
          this.sources = data.webBanner || 0
        } else {
        }
      }).catch(rep => {
      })
    },
    openBanner () {
      this.$router.push('/activity/5-1-1')
    },
    scrollHander (evt) {
      this.lefter = this.lefter || document.getElementsByClassName('lefter')[0]
      if (this.lefter) {
        this.lefter.style.transition = 'transform linear 0s'
        this.lefter.style.transform = 'translateX(-7rem) translateY(-' + Math.min(115, this.$el.scrollTop) + 'px)'
      }
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
      if (fn.split(':')[1]) return this.openBG(fn)
      // this.formData = {}
      this.$http.get(api.loginVr, {channelId: fn || 12}).then(({data}) => {
        //
        this.formData[fn] = data.vrurl
        this.__openWindowWithPost(fn)
      }).catch(rep => {
      })
    },
    openBG (fn) {
      if (fn.split(':')[2] === 'iframe') this.$router.push(fn.split(':')[3] || '/game/1-8-1')
      // this.formData = {}
      this.$http.get(api.gameUrl, {gameid: fn.split(':')[1] || 201, platid: fn.split(':')[0]}).then(({data}) => {
        //
        if (data.success) {
          // data.url && (data.url.iframe = true)
          if (data.userName && data.password) {
            data.url = '?un=' + data.userName + '&pwd=' + data.password
          }
          this.formData[fn] = data.url
          this.__openWindowWithPost(fn)
        }
      }).catch(rep => {
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
          this.__setCall({fn: '__setIframeSrc', args: this.ifsrc})
          this.__setCall({fn: '__setIframeSrcKey', args: fn})
          return false
        }
        window.open(this.formData[fn])
        this.formData[fn] = undefined
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
    
    @media screen and (min-width: 2560px)
        height 533px

</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .new-home .dialog-container
    top 0
    z-index 3
  .box
    // background-image url(/static/pic/home/0.jpg)
    // background-repeat no-repeat
    // background-size 100%
    // background-color #fff
    padding-top .3rem
    
  W = 1.5rem
  H = 1.4rem
  .top-games
    // height 6rem
    position relative
    margin-bottom .3rem
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
    height 2.7rem
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
  .picture.a
    height 1.9rem
  .picture.b
    height 1.5rem
  .title
    border-left 3px solid BLUE
    padding-left .1rem
    margin .1rem 0
    .t1
      color #333
      font-size .2rem
      font-weight bold
  
  .picture
    margin-bottom .1rem
    .t1
      font-size .16rem
      color #333
      font-weight bold
    .t2
      color #999
    .f_r
      float right
      color BLUE
      // margin-right .3rem
      padding 0 .2rem
      &:hover
        background-color BLUE
        color #fff
    p
      padding .05rem 0
      line-height .3rem

</style>

