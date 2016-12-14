<template lang="jade">
  footer
    el-row
      el-col.menu(:span="12")
        el-popover(v-for=" (menu, index) in menus" placement="top" trigger="click" v-bind:popper-class="'footer-popover font-white ' + (menu.groups && menu.groups[0] ? true : false)" offset="0" v-model="shows[index]") 
          .icon-button(v-bind:class="[menu.class + '-middle']" slot="reference" v-if="!menu.url")
          router-link.icon-button(:to="menu.url"  v-bind:class="[menu.class + '-middle']" slot="reference" v-if="menu.url")
          slot
            dl.submenu(v-for="group in menu.groups" v-bind:class="{'with-icon': group.withIcon}")
              dt {{ group.title }}
              dd(v-for="item in group.items" v-bind:class="[item.class || group.class + '-middle']" @click="open(item, index)" v-if="item.title") 
                | {{ item.title }}

              dd.inner-submenu(v-if="!item.title" v-for="item in group.items" )
                dl
                  dd( v-for="i in item"  @click="open(i, index)") {{ i.title }}

      el-col.info(:span="12")
        span.name.ds-icon-m.font-light(v-show="!hide") {{ name }}
        span.money.ds-icon-money.font-gold(v-show="!hide") {{ money }}
        span.free.ds-icon-free.font-light(v-show="!hide") {{ free }}
        span.collapse.el-icon-caret-left.ds-button.text-button.light(@click="hide = !hide") 
          span(v-show="!hide") 隐藏
          span(v-show="hide") 展开
        span.ds-button.danger 充值
        span.ds-button.primary 提现
        span.ds-button.text-button.light.logout(@click="logout") 退出

    .logo.ds-icon-logo-middle

</template>

<script>
export default {
  props: ['menus'],
  data () {
    return {
      shows: {},
      name: '一介草民',
      money: 1500.00,
      free: 1800,
      hide: false
    }
  },
  created () {
    this.initShows()
  },
  computed: {
  },
  methods: {
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
      this.shows[index] = false
      this.openPage(item.id)
    },
    logout () {
      this.$emit('logout')
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
    .submenu
      float left
      display inline-block
      &:not(:first-child)
        margin-left .3rem
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
        &:hover
          color BLUE-HOVER
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
      .inner-submenu
        float left
        &:not(:last-child)
          margin-right .2rem
</style>
<style lang="stylus" scoped>
  @import '../var.stylus'
  
  footer
    // height FH
    bg-gradient(top, rgba(255, 255, 255, .1), rgba(0, 0, 0, .1))
    // @media screen and (max-width: 1100px)
      // height 2 * FH
    .logo
      position absolute
      top -.2rem
      bottom 0
      left 0
      right 0
      
  .el-row
    z-index 1
    padding 0 .3rem 0 .1rem
    overflow hidden
    .el-col
      &:first-child
        padding-right .5rem
      &:last-child
        padding-left .5rem
      // height FH
      
      
  .menu
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
        background -webkit-linear-gradient(top left, rgba(255, 255, 255, .4), rgba(255, 255, 255, .1), rgba(255, 255, 255, .4))
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
  
  NW = .2rem
  MW = .2rem
  FW = .2rem
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
