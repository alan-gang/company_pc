<template lang="jade">
  section.home
    Me
    Menu(:menus="menus" v-on:open-page="openTab")

    el-carousel(:interval="4000" type="card" height="450px")
      el-carousel-item(v-for="item in sources" v-bind:key="item" v-bind:style="{ ba }")
        img(:src=" item.src ")
    
    .our-game.content-width
      p.title.text-white.pl1.pr1(style="line-height: .36rem") 我们的游戏
        router-link.ds-button.text-button(:to=" 'game/1-1-1 ' " style="float: right") 更多游戏

      el-row.collects.font-white.top-games(:gutter="0")
        el-col(:span="5" v-for=" (c, index) in topgames " v-if="c" v-bind:class="[c.title? c.class || c.menuClass :'empty ds-icon-add-item']" @click.native=" openTab(c.id) ") {{ c.title }}
        


    CopyRight


    Guide(v-if="me.guide")
    
    keep-alive
      transition(name="fade" appear=true)
        router-view.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )


</template>

<script>
import base from 'components/base'
import api from '../http/api'
import store from '../store'
import Guide from './Guide'
import Pages from './Pages'
import CopyRight from 'components/CopyRight'
import Me from 'components/Me'
import Menu from 'components/Menu'
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus', 'pages', 'prehref', 'loop', 'maxPages', 'transition', 'free', 'money'],
  data () {
    return {
      me: store.state.user,
      sources: [
        {href: '/activity/5-2-9', src: '/static/activity/activity9.jpg', title: '王者争霸赛', describe: '王者争霸赛，注册就送2万体验币'},
        {href: '/activity/5-2-1', src: '/static/activity/nds/activity1.jpg', title: '注册就送', describe: '全新的游戏体验，来玩就送'},
        {href: '/activity/5-2-2', src: '/static/activity/nds/activity2.jpg', title: '新用户有礼了', describe: '绑定手机、银行卡、邮箱，即可领取58元优惠券'},
        {href: '/activity/5-2-3', src: '/static/activity/nds/activity3.jpg', title: '每日签到', describe: '每日来我签到，好礼不断'}
      ],
      topgames: [{class: 'ds-icon-game-chq', id: '1-1-1', title: '时时彩'}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}]
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    openTab (url) {
      this.$emit('open-tab', url)
    },
    closeTab (url) {
      this.$emit('close-tab', url)
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
    }
  },
  components: {
    Guide,
    Pages,
    CopyRight,
    Me,
    Menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .el-carousel__item
    img
      width 100%
      height 100%

  W = 1.5rem
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
      padding-top H - 2*PW
      // background-color rgba(0, 0, 0, .2)
      // box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
      background-position 50% 35% 
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
</style>



