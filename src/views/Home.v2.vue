<template lang="jade">
  section.new-home
    Me(:menus="menus" v-on:open-page="openTab")
    
    MyMenu(:menus="menus.slice(0, 10)" v-on:open-page="openTab")

    // el-carousel(:interval="4000" type="card" height="450px")
      el-carousel-item(v-for="item in sources" v-bind:key="item" v-bind:style="{ ba }")
        img(:src=" item.src ")
    img.ad(src="/static/pic/banner.jpg" width="100%")
    
    .our-game.content-width
      p.title.text-white.pl1.pr1(style="line-height: .36rem") 我们的游戏
        // router-link.ds-button.text-button(:to=" '/game/1-1-1' " style="float: right") 更多游戏

      el-row.collects.font-white.top-games(style="margin-top: .00rem")
        el-col(:span="4" v-for=" (c, index) in topgames " v-if="c" v-bind:class="[c.title? c.class || c.menuClass :'empty ds-icon-add-item']" @click.native=" openHomeTab(c) ") 
          p {{ c.title }}
          // p {{ c.descr }}
      
      el-row(:gutter=15 style="padding-bottom: .1rem")
        el-col.picture.lhg(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: 203}}) ")
          .co
            img(src="/static/pic/lhg.png")
        el-col.picture.bjl(:span="12" @click.native=" __setCall({fn: '__openThirdPart', args: {id: 1, fn: 201}}) ")
          .co
            img(src="/static/pic/bjl.png")


    CopyRight


    // Guide(v-if="me.guide")
    
    // keep-alive
    //   transition(name="fade" appear=true)
    
    router-view.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )
    

    // a submit form
    form(id="TheForm" method="post" action="" target="TheWindow")
      input(type="hidden" name="data" value="")
      input(type="hidden" name="version" value="")
      input(type="hidden" name="id" value="")

</template>

<script>
import base from 'components/base'
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
        {href: '/activity/5-2-9', src: '/static/activity/activity9.jpg', title: '王者争霸赛', describe: '王者争霸赛，注册就送2万体验币'},
        {href: '/activity/5-2-1', src: '/static/activity/nds/activity1.jpg', title: '注册就送', describe: '全新的游戏体验，来玩就送'},
        {href: '/activity/5-2-2', src: '/static/activity/nds/activity2.jpg', title: '新用户有礼了', describe: '绑定手机、银行卡、邮箱，即可领取58元优惠券'},
        {href: '/activity/5-2-3', src: '/static/activity/nds/activity3.jpg', title: '每日签到', describe: '每日来我签到，好礼不断'}
      ],
      topgames: [
        {class: 'index_icon_01', id: '1-1-1', title: '时时彩'},
        {class: 'index_icon_02', id: '1-3-1', title: '广东11选5'},
        {class: 'index_icon_03', id: '1-4-1', title: '安徽快三'},
        {class: 'index_icon_04', id: '1-2-1', title: '快投30秒'},
        {class: 'index_icon_05', id: '1-3-4', title: '11运夺金'},
        {class: 'index_icon_06', id: '1-5-1', title: '北京PK10'},
        {class: 'index_icon_07', id: '1-5-2', title: '福彩3D'},
        {class: 'index_icon_08', id: '1-5-3', title: '排列三、五'},
        {class: 'index_icon_09', id: '1-5-4', title: '快投排列五'},
        {class: 'index_icon_10', id: '1-1-6', title: '六合彩'},
        {class: 'index_icon_11', id: '1-7-4', fn: 2, title: 'VR赛车'},
        {class: 'index_icon_12', id: '1-7-6', fn: 15, title: 'VR百家乐'}
      ],
      formData: {
        // data: '',
        // version: 0,
        // id: '',
        // vrurl: ''
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    // this.openExternal(1)
    // this.openExternal(2)
    // this.openExternal(11)
    // this.openExternal(13)
    // this.openExternal(15)
  },
  beforeDestroy () {
  },
  methods: {
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
      if (fn > 200) return this.openBG(fn)
      // this.formData = {}
      this.$http.get(api.loginVr, {channelId: fn || 12}).then(({data}) => {
        //
        this.formData[fn] = data
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
      // this.formData = {}
      this.$http.get(api.gameUrl, {gameid: fn || 201}).then(({data}) => {
        //
        if (data.success) {
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
      if (typeof this.formData[fn] === 'string') return window.open(this.formData[fn])
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .new-home .dialog-container
    top 0
    z-index 2
  // .el-carousel__item
  //   img
  //     width 100%
  //     height 100%

  W = 1.5rem
  H = 1.5rem
  .top-games
    margin PW 0
    padding PW
    text-align center
    radius()
    background url(../assets/v2/index_icon_bg.jpg)
    // background-color rgba(255, 255, 255, .1)
    .el-col
      position relative
      min-width W
      height H
      // margin .075rem PW
      // margin-bottom .3rem
      overflow hidden
      radius()
      // background-color rgba(0, 0, 0, .2)
      // box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
      background-position 50% 
      cursor pointer
      // &:not(:first-child)
      //   margin-left .3rem
      padding-top H
      // background-color rgba(255, 255, 255, .4)
      transition all ease-in-out .3s
      // opacity .8
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

      &:hover
        padding-top H - 2*PW
        background-position 50% 20%
        background-color rgba(255, 255, 255, .2)
        box-shadow 0 .3rem 1rem rgba(0, 0, 0, .2)
        opacity 1

      





      // &.empty
      //   padding-top 0
      //   line-height H
      //   font-size .8rem
      //   font-weight 100
      //   background-position 50%
          
      // &:not(.empty)
      //   &:hover
      //     .delete-bar
      //       display block
      //   &:before
      //     content ''
      //     display block
      //     width .96rem
      //     height .96rem
      //     box-sizing border-box
      //     z-index -1
      //     box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
      //     radius(50%)
      //     center()
      //     top 42.5%
  .picture
    position relative
    cursor pointer
    height 3rem
    .co
      width 100%
      height 100%
      overflow hidden
    img
      position relative
      left 0
      top 0
      width 100%
      opacity .8
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



