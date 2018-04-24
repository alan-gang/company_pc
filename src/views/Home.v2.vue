<template lang="jade">
  section.new-home
    Me
    
    MyMenu(:menus="menus" v-on:open-page="openTab")

    // el-carousel(:interval="4000" type="card" height="450px")
      el-carousel-item(v-for="item in sources" v-bind:key="item" v-bind:style="{ ba }")
        img(:src=" item.src ")
    .ad(style="height: 400px; background: url(/static/activity/activity9.jpg) center no-repeat; background-size: 100% 400px")
    
    .our-game.content-width
      p.title.text-white.pl1.pr1(style="line-height: .36rem") 我们的游戏
        router-link.ds-button.text-button(:to=" 'game/1-1-1 ' " style="float: right") 更多游戏

      el-row.collects.font-white.top-games
        el-col(:span="5" v-for=" (c, index) in topgames " v-if="c" v-bind:class="[c.title? c.class || c.menuClass :'empty ds-icon-add-item']" @click.native=" openTab(c.id) ") {{ c.title }}
          p {{ c.descr }}
      
      el-row(:gutter=15 style="padding-bottom: .1rem")
        el-col.picture.wait.lhg(:span="12")
          img(src="/static/pic/lhg.png")
        el-col.picture.bjl(:span="12")
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
      topgames: [{class: 'ds-icon-game-chq', id: '1-1-1', title: '时时彩', descr: '最受彩民认可的游戏'}, {class: 'ds-icon-game-cb30', id: '1-2-1', title: '快投30秒', descr: '开奖最快的游戏'}, {class: 'ds-icon-game-gd', id: '1-3-1', title: '广东11选5', descr: '一款权威的官彩游戏'}, {class: 'ds-icon-game-ahK3', id: '1-4-1', title: '安徽快三'}, {class: 'ds-icon-game-bjpk10', id: '1-5-1', title: '北京PK10'}, {class: 'ds-icon-game-lhc', id: '1-1-6', title: '六合彩'}, {class: 'ds-icon-game-ffctx', id: '1-1-7', title: '腾讯分分彩'}, {class: 'ds-icon-game-fc', id: '1-5-2', title: '福彩3D'}],
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
    this.openExternal(1)
    this.openExternal(2)
    this.openExternal(11)
    this.openExternal(13)
    this.openExternal(15)
  },
  beforeDestroy () {
  },
  methods: {
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
      // this.formData = {}
      this.$http.mypost(api.loginVr, {channelId: fn || 12}).then(({data}) => {
        //
        this.formData[fn] = data
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
      return this.openWindowWithPost(this.formData[fn] || {})
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
  .el-carousel__item
    img
      width 100%
      height 100%

  W = 1.95rem
  H = 1.5rem
  .top-games
    margin PW 0
    padding PW 0
    text-align center
    radius()
    background-color rgba(255, 255, 255, .1)
    .el-col
      position relative
      min-width W
      height H
      margin 0 PW
      margin-bottom .3rem
      overflow hidden
      radius()
      padding-top H - 2.5*PW
      // background-color rgba(0, 0, 0, .2)
      // box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
      background-position 50% 25% 
      cursor pointer
      // &:not(:first-child)
      //   margin-left .3rem
      &:hover
       background-color rgba(255, 255, 255, .4)
      &.empty
        padding-top 0
        line-height H
        font-size .8rem
        font-weight 100
        background-position 50%
          
      &:not(.empty)
        &:hover
          .delete-bar
            display block
        &:before
          content ''
          display block
          width .96rem
          height .96rem
          box-sizing border-box
          z-index -1
          box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
          radius(50%)
          center()
          top 42.5%
  .picture
    position relative
    cursor pointer
    img
      width 100%
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



