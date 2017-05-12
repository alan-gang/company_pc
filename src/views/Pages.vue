<template lang="jade">

  transition-group(appear=true name="zoom" tag="section")
    component.dialog-page(v-for="(page, index) in pages" v-on:close="close" v-bind:key="page.href" v-bind:is="page.url" v-bind:page="page"  v-bind:class="[{active: page.active}, page.size, 'page-' + page.id ]" v-bind:style="[ Object.assign({},  pageSizes.default,  (page.position = Object.assign(PPP[index], page.position)), page.position, pageSizes[page.size] || {})]" v-moveable="" v-resizeable="" @mousedown.native="openAPage(page.id)")

        .cover(slot="cover" v-bind:class="{show: !page.active}" )
        .move-bar(slot="movebar")
        .resize-x(slot="resize-x")
        .resize-y(slot="resize-y")
        ToolBar(slot="toolbar" v-bind:title="page.title" v-bind:class="[ page.menuClass +  '-small']" v-bind:star="page.star" v-on:full="full(page, this)" v-on:minus="minus(page)" v-on:close="close(page.id)" v-on:star="star(page)")

</template>

<script>
import api from '../http/api'
import base from 'components/base'
import ToolBar from 'components/ToolBar'
// game
import SSC from './game/SSC'
import SSL from './game/SSL'
import G115 from './game/G115'
import PK10 from './game/PK10'
import KL8 from './game/KL8'
import K3 from './game/K3'
import util from '../util'

// me
import Me from './me/Me'
import SafeCenter from './me/SafeCenter'
import Bonus from './me/Bonus'
import TopUp from './me/TopUp'
import WithDraw from './me/WithDraw'
import Bank from './me/Bank'

// group
import UserList from './group/UserList'
import AddUser from './group/AddUser'
import Ad from './group/Ad'
import Contract from './group/Contract'
import ContractDetail from './group/ContractDetail'
import Stock from './group/Stock'
import StockDetail from './group/StockDetail'
import DataAnalysis from './group/DataAnalysis'
import ChartAnalysis from './group/ChartAnalysis'

// Form
import Account from './form/Account'
import Follow from './form/Follow'
import FollowDetail from './form/FollowDetail'
import FollowOrder from './form/FollowOrder'
import Order from './form/Order'
import ProfitLoss from './form/ProfitLoss'
import ProfitLossDetail from './form/ProfitLossDetail'
import Today from './form/Today'
// 趋势图
import TrendChart from './form/TrendChart'

// Help
import PlayHelp from './help/PlayHelp'
import FunctionHelp from './help/FunctionHelp'
import QuestionHelp from './help/QuestionHelp'

// 帮助中心
import Activity from './activity/Activity'
import Gift from './activity/Gift'

// 活动详情
import ForRegister from './activity/ForRegister'
import ForNewUser from './activity/ForNewUser'
import ForAll from './activity/ForAll'
import ForTopup from './activity/ForTopup'
import ForTopupA from './activity/ForTopupA'
import ForWithdraw from './activity/ForWithdraw'

export default {
  components: {
    ToolBar,
    // game
    SSC,
    SSL,
    G115,
    PK10,
    KL8,
    K3,
    // me
    Me,
    SafeCenter,
    Bonus,
    WithDraw,
    TopUp,
    Bank,
    // group
    UserList,
    AddUser,
    Ad,
    Contract,
    ContractDetail,
    Stock,
    StockDetail,
    DataAnalysis,
    ChartAnalysis,
    // form
    Account,
    Follow,
    FollowDetail,
    FollowOrder,
    Order,
    ProfitLoss,
    ProfitLossDetail,
    Today,
    // 走势图
    TrendChart,
    // Help
    PlayHelp,
    FunctionHelp,
    QuestionHelp,
    // 活动
    Activity,
    Gift,
    // 活动详情
    ForRegister,
    ForNewUser,
    ForAll,
    ForTopup,
    ForTopupA,
    ForWithdraw
  },
  name: 'Pages',
  mixins: [base],
  props: ['pages', 'prehref'],
  data () {
    return {
      // 可打开的最大的页数
      pageSizes: {
        full: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        },
        minus: {
          top: '80%',
          transform: 'perspective(500px) translateZ(-50rem) translateX(50%)',
          opacity: 0
        },
        default: {
          top: '15%',
          left: '25%',
          width: '9.3rem',
          height: '6.4rem'
        }
      },
      // 提供随机的位置
      // 没有记录过位置的窗口将自动分配位置
      PPP: [
        // center
        {
          top: '15%',
          left: '25%',
          width: '9.3rem',
          height: '6.4rem'
        },
        // left top
        {
          left: '.15rem',
          top: '.15rem',
          right: 'auto',
          bottom: 'auto'
        },
        // right top
        {
          right: '.15rem',
          top: '.15rem',
          left: 'auto',
          bottom: 'auto'
        },
        // left bottom
        {
          left: '.15rem',
          bottom: 'auto',
          top: '50%',
          right: 'auto'
        },
        // right bottom
        {
          right: '.15rem',
          bottom: 'auto',
          top: '50%',
          left: 'auto'
        },
        // center left top
        {
          top: '5%',
          left: '10%',
          right: 'auto',
          bottom: 'auto'
        },
        // center right top
        {
          top: '5%',
          right: '10%',
          left: 'auto',
          bottom: 'auto'
        },
        // center left bottom
        {
          bottom: 'auto',
          left: '10%',
          right: 'auto',
          top: '30%'
        },
        // center right bottom
        {
          bottom: 'auto%',
          right: '10%',
          left: 'auto',
          top: '30%'
        }
      ]

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'openRoute'
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      return vm.openAPage(to.params.url)
    })
  },
  beforeDestroy () {
    this.pages.forEach(t => this.updatePage('', {size: 'minus'}, t))
  },
  methods: {
    openRoute ({path, params: {url}}) {
      if (url) this.openAPage(url)
    },
    openAPage (url) {
      this.$emit('open-tab', url)
    },
    full (page) {
      if (page.size !== 'full') this.setDefaultPosition(page)
      this.updatePage(page.url, {size: page.size === 'full' ? '' : 'full'}, page)
    },
    minus (page) {
      if (page.size !== 'full') this.setDefaultPosition(page)
      this.updatePage(page.id, {size: 'minus'}, page)
      this.prehref && this.$router.push(this.prehref)
    },
    close (url) {
      this.$emit('close-tab', url)
    },
    star (page) {
      if (!page.star) this.addPrefence(page)
      else this.delPrefence(page)
    },
    addPrefence (page) {
      this.$http.get(api.addPrefence, {
        menuId: page.menuid,
        isDesk: 0,
        sort: 1
      }).then(({data}) => {
        // success
        if (data.success === 1) {
          this.updatePage(page.id, {star: !page.star}, page)
        } else this.$message.warning('收藏失败!')
      }, (rep) => {
        // error
        this.$message.warning('收藏失败!')
      })
    },
    delPrefence (page) {
      this.$http.get(api.delPrefence, {
        menuId: page.menuid,
        isDesk: 0,
        sort: 1
      }).then(({data}) => {
        // success
        if (data.success === 1) {
          this.updatePage(page.id, {star: !page.star}, page)
        } else this.$message.warning(data.msg || '收藏删除失败!')
      }, (rep) => {
        // error
        this.$message.warning('收藏删除失败!')
      })
    },
    setDefaultPosition (page) {
      let el = this.$el.querySelector('.page-' + page.id)
      console.log(el.style.top, el.style.left, el.style.width, el.style.height)
      let position = {
        top: el.style.top,
        left: el.style.left,
        right: el.style.right,
        bottom: el.style.bottom,
        width: el.style.width,
        height: el.style.height
      }
      this.updatePage(page.id, {position: position}, page)
    }
  },
  directives: {
    moveable: {
      inserted (el, binding, vnode) {
        let canMove = false
        let {top, left, width, height} = util.getOffset(el, 0)
        let boxOffset = util.getOffset(el.parentNode)
        let target = el.querySelector('.move-bar')
        let sx = 0
        let sy = 0
        let dx = 0
        let dy = 0
        util.addEvent('mousedown', target, (evt) => {
          target.setAttribute('expand', 'expand')
          let offset = util.getOffset(el, 0)
          top = offset.top
          left = offset.left
          width = offset.width
          height = offset.height
          boxOffset = util.getOffset(el.parentNode)
          canMove = true
          el.style.transition = 'none'
          sx = evt.clientX
          sy = evt.clientY
        })
        util.addEvent('mousemove', target, (evt) => {
          if (!canMove) return
          dx = evt.movementX || (evt.clientX - sx)
          dy = evt.movementY || (evt.clientY - sy)
          if (dx > 0 && (boxOffset.width - 15 <= left + width)) dx = 0
          if (dx < 0 && left <= 15) dx = 0
          if (dy > 0 && (boxOffset.height - 15 <= top + height)) dy = 0
          if (dy < 0 && top <= 15) dy = 0
          if (dx === 0 && dy === 0) return
          left += dx
          el.style.left = left + 'px'
          sx = evt.clientX
          top += dy
          el.style.top = top + 'px'
          sy = evt.clientY
        })
        util.addEvent('mouseup', target, (evt) => {
          target.removeAttribute('expand')
          canMove = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', target, (evt) => {
          target.removeAttribute('expand')
          canMove = false
          el.style.transition = ''
        })
      },
      unbind (el) {
      }
    },
    resizeable: {
      inserted (el, binding) {
        let canResizeX = false
        let canResizeY = false
        let {top, left, width, height} = util.getOffset(el, 0)
        let boxOffset = util.getOffset(el.parentNode)
        let targetX = el.querySelector('.resize-x')
        let targetY = el.querySelector('.resize-y')
        let sx = 0
        let sy = 0
        let dx = 0
        let dy = 0
        // X
        util.addEvent('mousedown', targetX, (evt) => {
          targetX.setAttribute('expand', 'expand')

          evt.preventDefault()
          evt.stopPropagation()
          let offset = util.getOffset(el, 0)
          top = offset.top
          left = offset.left
          width = offset.width
          height = offset.height
          boxOffset = util.getOffset(el.parentNode)
          canResizeX = true
          el.style.transition = 'none'
          sx = evt.clientX
        })
        util.addEvent('mousemove', targetX, (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          if (!canResizeX) return
          dx = evt.movementX || (evt.clientX - sx)
          if (dx > 0 && (boxOffset.width - 15 <= left + width)) return
          width += dx
          el.style.width = width + 'px'
          if (width > 800) el.removeAttribute('w')
          if (width < 800) el.setAttribute('w', '800')
          if (width < 700) el.setAttribute('w', '700')
          sx = evt.clientX
        })
        util.addEvent('mouseup', targetX, (evt) => {
          targetX.removeAttribute('expand')
          evt.preventDefault()
          evt.stopPropagation()
          canResizeX = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', targetX, (evt) => {
          targetX.removeAttribute('expand')
          canResizeX = false
          el.style.transition = ''
        })
        // Y
        util.addEvent('mousedown', targetY, (evt) => {
          targetY.setAttribute('expand', 'expand')
          evt.preventDefault()
          evt.stopPropagation()
          let offset = util.getOffset(el)
          top = offset.top
          left = offset.left
          width = offset.width
          height = offset.height
          boxOffset = util.getOffset(el.parentNode)
          canResizeY = true
          el.style.transition = 'none'
          sy = evt.clientY
        })
        util.addEvent('mousemove', targetY, (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          if (!canResizeY) return
          dy = evt.movementY || (evt.clientY - sy)
          if (dy > 0 && (boxOffset.height - 15 <= top + height)) return
          height += dy
          el.style.height = height + 'px'
          sy = evt.clientY
        })
        util.addEvent('mouseup', targetY, (evt) => {
          targetY.removeAttribute('expand')
          evt.preventDefault()
          evt.stopPropagation()
          canResizeY = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', targetY, (evt) => {
          targetY.removeAttribute('expand')
          canResizeY = false
          el.style.transition = ''
        })
      },
      unbind (el) {
      }
    }
  }
}
</script>

<style lang="stylus">
  // @media(max-width: 1024px)
  //   html
  //     overflow auto
  //     font-size 80px
  //   header
  //     display none
  //   footer
  //     z-index 1
  //     background none
  //     background-color GREY !important
  //   .page
  //   .game-content
  //   .dialog-page
  //     position relative !important
  //     left 0 !important
  //     top 0 !important
  //   .dialog-page
  //     width 100% !important
  //     height 80% !important
  //     .cover
  //     .move-bar
  //     .resize-x
  //     .resize-y
  //     .tool-bar
  //       display none !important
  //     .amout-bar
  //       position relative !important
      
  //     // max-width 1024px !important
  //   .dialog-page ~ .dialog-page
  //     display none
  // @media(max-width: 600px)
  //   footer
  //     position relative !important
  //     top 0 !important
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .cover 
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    z-index 1
    display none
    background-color rgba(0,0,0,.2)
    opacity 0
    &.show
      display: block
    // &.show ~ .move-bar
    // &.show ~ .resize-x
    // &.show ~ .resize-y
    //   display none
  .move-bar
    user-select none
    position absolute
    top 0
    left 4 * TH
    right 4 * TH
    height TH
    cursor move
    z-index 1
    &:hover
      height 2 * TH
      top -1 * TH
    &[expand]
      height 4 * TH
      top -2 * TH
      
      
  .resize-x
    user-select none
    position absolute
    right - TH
    top TH
    bottom TH
    width TH
    z-index 1
    cursor e-resize
    &:hover
      width 2 * TH
      right -1 * TH
    &[expand]
      width 4 * TH
      right -2 * TH
      
  
  .resize-y
    user-select none
    position absolute
    right .5rem
    bottom - TH
    left .5rem
    height TH
    z-index 1
    cursor n-resize
    &:hover
      height 2 * TH
      bottom -1.5 * TH
    &[expand]
      height 4 * TH
      bottom -2 * TH
  .page
    overflow hidden
  .dialog-page
    position absolute !important
    min-width 5.4rem
    min-height 4rem
    overflow visible
    z-index 0
    radius()
    // background-color #fff
    background-color #ededed
    box-shadow 0 0 .1rem rgba(0,0,0,.5)
    transition transform linear 0.2s, width linear 0.2s, height linear 0.2s, left linear 0.2s, top linear 0.2s
    
    &.active
      z-index 1
    // &.minus
    //   transition all linear 0.2s
      
    &.full
      .move-bar
        cursor default
        &:hover
          height TH
          top 0
          z-index 0
</style>


