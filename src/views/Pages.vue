<template lang="jade">
  section
    component(v-for="page in pages" v-bind:is="page.url" v-bind:page="page" v-bind:class="[{active: page.active}, page.size, 'page-' + page.url ]" v-bind:style="[ pageSizes[page.size] || page.position || pageSizes.default ]" v-moveable="" v-resizeable="")
      .cover(slot="cover" v-bind:class="{show: !page.active}" @mousedown="openAPage(page.url)")
      //.move-bar(slot="movebar")
      .resize-x(slot="resize-x")
      .resize-y(slot="resize-y")
      ToolBar(slot="toolbar" v-bind:title="page.name" v-bind:star="page.star" v-on:full="full(page, this)" v-on:minus="minus(page)" v-on:close="close(page.url)" v-on:star="star(page)")
      .scroll-content(slot="scroll-content") 
        LuckyNumber(v-bind:numbers="page.numbers" v-bind:NPER="page.NPER" v-bind:PNPER="page.PNPER" v-bind:FNPER="page.FNPER")
        GameInfo(v-bind:NPER="page.NPER" v-bind:timeout="page.timeout")
        GameMenu


    
</template>

<script>
import base from 'components/base'
import One from './One'
import Two from './Two'
import util from '../util'
import ToolBar from 'components/ToolBar'
import LuckyNumber from 'components/LuckyNumber'
import GameInfo from 'components/GameInfo'
import GameMenu from 'components/GameMenu'

export default {
  mixins: [base],
  props: ['pages'],
  data () {
    return {
      pageSizes: {
        full: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        },
        minus: {
          top: '99%',
          left: 0,
          width: 0,
          height: 0,
          minWidth: 0,
          minHeight: 0,
          opacity: 0
        },
        default: {
          top: '10%',
          left: '25%',
          width: '8rem',
          height: '6rem'
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      return vm.openAPage(to.params.url)
    })
  },
  computed: {
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'openRoute'
  },
  methods: {
    openRoute ({params: {url}}) {
      this.openAPage(url)
    },
    openAPage (url) {
      this.$emit('openTab', url)
    },
    full (page) {
      if (page.size !== 'full') this.setDefaultPosition(page)
      this.$emit('updatePage', page.url, {size: page.size === 'full' ? '' : 'full'}, page)
    },
    minus (page) {
      this.setDefaultPosition(page)
      this.$emit('updatePage', page.url, {size: 'minus'}, page)
    },
    close (url) {
      this.$emit('closeTab', url)
    },
    star (page) {
      this.$emit('updatePage', page.url, {star: !page.star}, page)
    },
    setDefaultPosition (page) {
      let el = this.$el.querySelector('.page-' + page.url)
      console.log(el.style.top, el.style.left, el.style.width, el.style.height)
      let position = {
        top: el.style.top,
        left: el.style.left,
        width: el.style.width,
        height: el.style.height
      }
      this.$emit('updatePage', page.url, {position: position}, page)
    }
  },
  components: {
    One,
    Two,
    ToolBar,
    LuckyNumber,
    GameInfo,
    GameMenu
  },
  directives: {
    moveable: {
      inserted (el, binding) {
        let canMove = false
        let {top, left, width, height} = util.getOffset(el, 0)
        let boxOffset = util.getOffset(el.parentNode)
        let target = el // el.querySelector('.move-bar')
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
          if (dx > 0 && (boxOffset.width - 20 <= left + width)) dx = 0
          if (dx < 0 && left <= 20) dx = 0
          if (dy > 0 && (boxOffset.height - 20 <= top + height)) dy = 0
          if (dy < 0 && top <= 20) dy = 0
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
          if (dx > 0 && (boxOffset.width - 20 <= left + width)) return
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
          if (dy > 0 && (boxOffset.height - 20 <= top + height)) return
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .cover 
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color rgba(200,200,200,.8)
    z-index 1
    display none
    &.show{
      display: block
    }
  .move-bar
    position absolute
    top 0
    left 0
    right 0
    height HH
    cursor move
  .resize-x
    position absolute
    right - (HH / 2)
    top HH
    bottom HH
    width HH
    z-index 1
    cursor e-resize
    &:hover
      width 8 * HH
      right -4 * HH
  
  .resize-y
    position absolute
    right 0
    bottom - (HH / 2)
    left 0
    height HH
    z-index 1
    cursor n-resize
    &:hover
      height 8 * HH
      bottom -4 * HH
      
  
  #app .page .scroll-content
      background-color #ddd
  
  .page
    position absolute
    // top 15%
    // left 25%
    // transform translate3d(-50%, -50%, 0)
    transition all linear .2s
    // transition-property top left right bottom
    // width 8rem
    // height 6rem
    min-width 8rem
    min-height 6rem
    border .01rem solid #ccc
    background-color #eee
    overflow visible
    box-shadow 0 0 .2rem .05rem #777
    z-index 0
    &.active
      z-index 1
    
    
  
      
</style>



