<template lang="jade">
  footer
    el-row
      el-col.menu(:span="10" v-bind:offset="0")
        el-popover(v-for=" (menu, index) in menus" placement="top" trigger="hover" options="{ removeOnDestroy: true }" v-bind:popper-class="'footer-popover font-white ' + menu.url + ' ' + (menu.groups && menu.groups[0] ? true : false)" offset="0" v-model="shows[index]" v-if="!menu.hide") 
          .icon-button(v-bind:class="[menu.class + '-middle']" slot="reference" v-if="!menu.href && !menu.removed" v-on:mouseover="mouseover(menu)" @click="openChat(menu.url)")
          router-link.icon-button(:to="menu.href"  v-bind:class="[menu.class + '-middle']" slot="reference" v-if="menu.href && !menu.removed")
          slot
            dl.submenu(v-for="group in menu.groups" v-bind:class="[menu.url, {'with-icon': group.withIcon}]" v-bind:style="{ width: group.width }")
              dt(v-if="group.title") {{ group.title }}
              dd(v-for="item in group.items" v-bind:class="[item.class]" @click="open(item, index)" v-if="item.title && !item.removed") 
                .ds-button(style="position: relative; left: -.2rem") {{ menu.url === 'game' ? '' : item.title }}

              dd.inner-submenu(v-if="!item.title" v-for="item in group.items" )
                dl
                  dd( v-for="i in item"  @click="open(i, index)") {{ i.title }}

      el-col.info(:span="10" v-bind:offset="4")
        span.name.ds-icon-m.font-light(v-show="!hide") {{ name }}
        span.money.ds-icon-money.font-gold(v-show="!hide") {{ money || '0.000' }}
        span.free.ds-icon-free.font-light(v-show="!hide") {{ free || '0.000' }}
        span.collapse.el-icon-caret-left.ds-button.text-button.light(@click="hide = !hide") 
          span(v-show="!hide") 隐藏
          span(v-show="hide") 展开
        span.ds-button.danger(@click="doRecharge") 充值
        span.ds-button.primary(@click="withDraw") 提现
        // el-switch(v-model="night" on-text="夜间" off-text="白天" on-color="#13ce66" off-color="#13ce66")

        span.ds-button.text-button.light.logout(@click="logout") 退出

    router-link.logo.ds-icon-logo-middle(:to="' /home '")

</template>

<script>
// import api from '../http/api'
import util from '../util'
export default {
  props: ['menus', 'name', 'money', 'free'],
  data () {
    return {
      shows: {},
      // name: '一介草民',
      hide: false,
      night: false
    }
  },
  mounted () {
    this.initShows()
    this.setFarChat()
    setTimeout(this.getPos, 0)
    util.addEvent('resize', window, () => {
      this.getPos()
    })
  },
  activated () {
    this.setFarChat()
    setTimeout(this.getPos, 0)
  },
  computed: {
  },
  methods: {
    setFarChat () {
      let chat = document.querySelector('.custom-service-box')
      chat.style.top = '200000px'
      chat.style.left = '-200000px'
    },
    getPos () {
      if (this.$el.querySelector('.icon-button.ds-icon-chat-middle')) {
        let pos = util.getOffset(this.$el.querySelector('.icon-button.ds-icon-chat-middle'))
        let chat = document.querySelector('.custom-service-box')
        if (chat && pos.top !== 0) {
          chat.style.top = pos.top + 'px'
          chat.style.left = pos.left + 'px'
        }
      }
    },
    mouseover (menu) {
      console.log(menu)
      if (menu.url === 'game') {
        this.__setCall({
          fn: '__guideStep'
        })
      }
    },
    openChat (url) {
      if (url === 'chat') {
        window.accessAngular.open()
      }
    },
    initShows () {
      this.shows = this.menus.reduce((p, m, i) => {
        p[i] = false
        return p
      }, {})
    },
    openPage (url) {
      this.$emit('open-page', url)
    },
    open (item, index) {
      this.__setCall({
        fn: '__closeGuide'
      })
      // this.$nextTick(() => {
      //   this.shows[index] = false
      //   this.openPage(item.id)
      // })
      setTimeout(() => {
        this.shows[index] = false
        this.openPage(item.id)
      }, 0)
    },
    logout () {
      this.$emit('logout')
    },
    doRecharge () {
      // this.$http.get(api.doRecharge).then(({data}) => {
      //   if (data.success === 1) {
      //     this.$modal.warn({
      //       content: '充值验证码为：' + data.securityCode,
      //       btn: ['去充值'],
      //       href: [data.path],
      //       // target: this.$el.parentNode,
      //       ok () {
      //         return false
      //       }
      //     })
      //   } else {
      //     this.$message.error({target: this.$el, message: data.msg || '充值请求失败！'})
      //   }
      // }).catch(rep => {
      //   this.$message.error({target: this.$el, message: '充值请求失败！'})
      // })
      this.$router.push('/me/2-4-1')
    },
    withDraw () {
      this.$router.push('/me/2-5-1')
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
  @import '../var.stylus'
  H = .44rem
  W = .32rem
  .el-popover .popper__arrow
    display none
  .footer-popover
    transform translateY(.05rem)
    &.game
      max-width 9rem
      .submenu
        width 3rem
      
    .submenu
      float left
      display inline-block
      margin 0 .3rem
      dt
        font-size .18rem
        color BLUE
        font-shadow()
        padding PW 0 .18rem 0
      dd:not(.inner-submenu)
        height H - .06rem
        line-height H - .06rem
        // &[class*=ds-icon]
        //   padding-left W + .05rem
        cursor pointer
        // &:hover
        //   color BLUE-HOVER
        .ds-button
          border none
          background none
          box-shadow none
          text-shadow none
          &:hover
            background-color BLUE
          
      &.with-icon
        dt
          padding PW 0
        dt
        dd
          padding-left W + .05rem
        dd:not(.inner-submenu)
          height H
          line-height H
          // &[class*=ds-icon]
          //   padding-left W + .05rem
      &.game
        dd
          display inline-block
          margin-right PWX
          width .6rem + .4rem
          height .6rem + .4rem
          // margin-top PW
          margin -.1rem 0 0 -.1rem
          float left
          transition all linear .2s // @static 2
          transform perspective(100px) translateZ(-30px)
          
          &:hover
            // transform perspective(100px) translateZ(30px)
            transform perspective(100px) translateZ(0)
          
      .inner-submenu
        float left
        &:not(:last-child)
          margin-right .2rem
</style>
<style lang="stylus" scoped>
  @import '../var.stylus'
  
  footer
    // height FH
    text-align center
    bg-gradient(180deg, rgba(255, 255, 255, .1), rgba(0, 0, 0, .1))
    // @media screen and (max-width: 1100px)
      // height 2 * FH
    .logo
      position absolute
      top -.2rem
      left 50%
      transform translateX(-50%)
      display inline-block
      width 1rem
      height .88rem
      z-index 1
      
      
  .el-row
    text-align left
    z-index 1
    padding 0 .3rem 0 .1rem
    overflow hidden
    .el-col
      &:first-child
        // margin-right .5rem
      &:last-child
        // margin-left .5rem
      // height FH
      
      
  .menu
    min-height 1px
    .icon-button
      position relative
      display inline-block
      width FH
      height FH
      vertical-align middle
      radius()
      
      &:hover:after
        content ''
        display block
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        background linear-gradient(top left, rgba(255, 255, 255, .4), rgba(255, 255, 255, .1), rgba(255, 255, 255, .4))
        radius()
        
      &:before
        content ''
        display block
        position absolute
        top .1rem
        left .1rem
        width FH - .2rem
        height FH - .2rem
        box-sizing border-box
        background-color 
        z-index -1
        box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
        radius(50%)
  
  NW = .26rem
  MW = .26rem
  FW = .26rem
  PW = .05rem
  .info
    text-align right
    line-height FH
    .name
      padding 2*PW 0
      padding-left NW + .03rem
      margin-right 2*PW
    .money
      padding 2*PW 0
      padding-left FW + .03rem
      margin-right 2*PW
    .free
      padding 2*PW 0
      padding-left FW + .03rem
      margin-right 2*PW
    .collapse
      margin-right 2*PW
      &:before
        font-size .08rem
    .danger
      margin-right PW
    .text-button
      padding 0
    .logout
      margin-left .1rem
  
</style>
