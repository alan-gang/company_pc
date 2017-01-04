<template lang="jade">
  section
      component(v-for="(page, index) in pages" v-bind:key="page.id" v-bind:is="page.url" v-bind:page="page" v-bind:class="[{active: page.active}, page.size, 'page-' + page.id ]" v-bind:style="[ Object.assign({},  pageSizes.default, page.position || (page.position = (pages.length > 1 ? P[index] : null)), pageSizes[page.size] || {})]" v-moveable="" v-resizeable="")
        .cover(slot="cover" v-bind:class="{show: !page.active}" @mousedown="openAPage(page.id)")
        .move-bar(slot="movebar")
        .resize-x(slot="resize-x")
        .resize-y(slot="resize-y")
        ToolBar(slot="toolbar" v-bind:title="page.title" v-bind:class="['ds-icon-game-small']" v-bind:star="page.star" v-on:full="full(page, this)" v-on:minus="minus(page)" v-on:close="close(page.id)" v-on:star="star(page)")

</template>

<script>
import base from 'components/base'
import SSC from './games/SSC'
import G115 from './games/G115'
import PK10 from './games/PK10'
import KL8 from './games/KL8'
import K3 from './games/K3'
import util from '../util'
import ToolBar from 'components/ToolBar'

export default {
  mixins: [base],
  props: ['pages'],
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
          top: '70%',
          transform: 'perspective(500px) translateZ(-50rem) translateX(50%)',
          opacity: 0
        },
        default: {
          top: '5%',
          left: '25%',
          width: '9.3rem',
          height: '6.4rem'
        }
      },
      // 提供随机的位置
      // 没有记录过位置的窗口将自动分配位置
      P: [
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
          bottom: '.15rem',
          top: 'auto'
        },
        // right bottom
        {
          right: '.15rem',
          bottom: '.15rem',
          top: 'auto',
          left: 'auto'
        },
        // center
        {
          top: '5%',
          left: '25%',
          width: '9.3rem',
          height: '6.1rem'
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
  methods: {
    openRoute ({params: {url}}) {
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
    },
    close (url) {
      this.$emit('close-tab', url)
    },
    star (page) {
      this.updatePage(page.id, {star: !page.star}, page)
    },
    setDefaultPosition (page) {
      let el = this.$el.querySelector('.page-' + page.id)
      console.log(el.style.top, el.style.left, el.style.width, el.style.height)
      let position = {
        top: el.style.top,
        left: el.style.left,
        width: el.style.width,
        height: el.style.height
      }
      this.updatePage(page.id, {position: position}, page)
    }
  },
  components: {
    SSC,
    G115,
    PK10,
    KL8,
    K3,
    ToolBar
  },
  directives: {
    moveable: {
      inserted (el, binding, vnode) {
        // console.log(el, binding, vnode)
        let canMove = false
        let {top, left, width, height} = util.getOffset(el, 0)
        let boxOffset = util.getOffset(el.parentNode)
        let target = el.querySelector('.move-bar')
        let sx = 0
        let sy = 0
        let dx = 0
        let dy = 0
        util.addEvent('mousedown', target, (evt) => {
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
          canMove = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', target, (evt) => {
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
          sx = evt.clientX
        })
        util.addEvent('mouseup', targetX, (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          canResizeX = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', targetX, (evt) => {
          canResizeX = false
          el.style.transition = ''
        })
        // Y
        util.addEvent('mousedown', targetY, (evt) => {
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
          evt.preventDefault()
          evt.stopPropagation()
          canResizeY = false
          el.style.transition = ''
        })
        util.addEvent('mouseleave', targetY, (evt) => {
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
    &.show{
      display: block
    }
    &.show ~ .move-bar
    &.show ~ .resize-x
    &.show ~ .resize-y
      display none
  .move-bar
    position absolute
    top 0
    left 4 * TH
    right 4 * TH
    height TH
    cursor move
    &:hover
      height 2 * TH
      top -1 * TH
      
      z-index 1
      
  .resize-x
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
      
  
  .resize-y
    position absolute
    right 0
    bottom - TH
    left 0
    height TH
    z-index 1
    cursor n-resize
    &:hover
      height 2 * TH
      bottom -1 * TH
  .page
    overflow hidden
  .dialog-page
    position absolute
    min-width 7rem
    min-height 4rem
    overflow visible
    z-index 0
    radius()
    background-color #ededed
    box-shadow 0 0 .1rem rgba(0,0,0,.5)
    &.active
      z-index 1
    &.full
      .move-bar
        cursor default
        &:hover
          height TH
          top 0
          z-index 0
    
    
  
      
</style>



