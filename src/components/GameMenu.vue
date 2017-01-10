
<template lang="jade">
  dl.menu

    dd.title(v-for="menu in menus" v-bind:class="{ selected:  menu.title === title, 'is-link': !menu.groups}" @click=" !menu.groups && setType(menu) ") {{menu.title}}
      .submenu-group(v-if="menu.groups")
        dl.submenu(v-for="group in menu.groups")
          dt(v-if="group.title") 
            span {{ group.title }}
          dd(v-for="item in group.items" @click="setType(item)" v-bind:class="{ selected:  item.id === type.id}") {{ item.title }}

</template>

<script>
  export default {
    props: ['type', 'menus', 'getTitle'],
    created () {
      this.setType((this.menus.find(m => m.title === this.title) || {}).groups ? this.menus.find(m => m.title === this.title).groups[this.type.id.match(/\d/g)[1] - 1].items.find(m => m.id === this.type.id) : this.menus.find(m => m.id === this.type.id))
    },
    computed: {
      title () {
        return typeof this.getTitle === 'function' ? this.getTitle() : ''
      }
    },
    methods: {
      setType (item) {
        this.$emit('type', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import '../var.stylus'
  .menu
    height GMH
    line-height GMH
    margin 0
    padding-left .2rem
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
        background-color rgba(22, 113, 188, .9)
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
        background-color rgba(22, 113, 188, .9)
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
      
</style>



