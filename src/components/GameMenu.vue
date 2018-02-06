
<template lang="jade">
  dl.menu
    .menu-con
      dd.title(v-for="menu in menus" v-bind:class="{ selected:  menu.title === title, 'is-link': !menu.groups}" @click="menu.title !== title && setMenu(menu) ") {{menu.title}}
        .submenu-group(v-if="menu.groups")
          dl.submenu(v-for="group in menu.groups")
            dt(v-if="group.title") 
              span {{ group.title }}
            dd(v-for="item in group.items" @click="setType(item)" v-bind:class="{ selected:  item.id === type.id}") {{ item.title }}

    el-row.row(v-for=" g in cm.groups " v-if="cm.groups")
      .subtitle(v-if="g.title")
        span {{ g.title }}
      .ds-button.text-button.text-666.small(v-for=" item in g.items " v-bind:class=" { selected: item.id === type.id } " @click="setType(item)") {{ item.title }}


</template>

<script>
  export default {
    props: ['type', 'menus', 'getTitle'],
    mounted () {
      this.setType((this.menus.find(m => m.title === this.title) || {}).groups ? this.menus.find(m => m.title === this.title).groups[this.type.id.match(/\d/g)[1] - 1].items.find(m => m.id === this.type.id) : this.menus.find(m => m.id === this.type.id))
    },
    computed: {
      title () {
        return typeof this.getTitle === 'function' ? this.getTitle() : ''
      },
      cm () {
        return this.menus.find(c => c.title === this.title) || {}
      }
    },
    methods: {
      setType (item) {
        this.$emit('type', item)
      },
      setMenu (m) {
        if (m.groups && m.groups[0] && m.groups[0].items && m.groups[0].items[0]) this.$emit('type', m.groups[0].items[0])
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import '../var.stylus'
  .menu
    & > *
      padding-left .2rem
    & > .menu-con + .row
      padding-top .1rem
      
    height GMH
    line-height GMH
    margin 0
    font-size .12rem
    color #666
    .title
      // position relative
      // display inline-block
      float left
      height 100%
      margin 0
      padding 0 .1rem
      oveflow visible
      cursor pointer
      radius()
      &.selected 
        color WHITE
        background-color rgba(22, 113, 188, .9)
        font-shadow()
        box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
        background-color BLUE
       
      &:hover
        background-color rgba(22, 113, 188, .95)
        color WHITE
        font-shadow()
        box-shadow none
        border-bottom-left-radius 0
        border-bottom-right-radius 0
        .submenu-group
          display block
      &.is-link
        radius()
        &:not(.disabled):hover
          background-color BLUE-HOVER
        &:not(.disabled):active
          background-color BLUE-ACTIVE
          
      .submenu-group
        transform translateX(-.1rem)
        display none
        oveflow-y auto
        position absolute
        // left 0
        color WHITE
        background-color rgba(22, 113, 188, .95)
        radius()
        border-top-left-radius 0
        cursor default
        z-index 10000
        .submenu
          float left
          display inline-block
          // min-width 1rem
          padding .15rem .1rem .1rem .1rem
          text-align center
          dt
            margin-bottom .05rem
            span
              padding .05rem .1rem
              background-color #2d3c49
              radius()
              BH = .06rem
              position relative
              &:before
                content ''
                border-top BH solid #2d3c49
                border-left .1*BH solid transparent
                border-right .9*BH solid transparent
                position absolute
                left 40%
                top 100%
          dd
            min-width .35rem
            cursor pointer
            padding 0 .1rem
            radius()
            &:hover
              background-color BLUE
              box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
              font-shadow()
            &.selected
              color #fff
              background-color BLUE
    
    .row
      &:last-child
        padding-bottom .1rem
      display none
      background-color #fff
      padding .02rem .2rem
      clear both
      // height GMH
      font-size .12rem
      .subtitle
        float left
        // min-width .6rem
        margin-right .1rem
        // font-size .14rem
        color #333
        span
          position relative
          padding .065rem .1rem
          padding-right .15rem
          background-color #d9d9d9
          radius()
          border-top-right-radius .20rem 50%
          border-bottom-right-radius .20rem 50%
          
      .ds-button
        font-size .12rem
        border 1px solid rgba(0,0,0,0)
        margin 0 .02rem
        &.text-666
          color #666
        
        &:hover
          color BLUE
          border-color BLUE
          text-decoration none
        &.selected
          background-color BLUE
          color #FFF
          

</style>



