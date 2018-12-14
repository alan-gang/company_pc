
<template lang="jade">
  dl.menu
    .menu-con
      dd.title(v-for="menu in menus" v-bind:class="{ selected:  menu.title === title, 'is-link': !menu.groups}" @click="menu.title !== title && setMenu(menu) " v-if=" menu && menu.groups && menu.groups.filter(function(g){ return g.items.filter(function(x){return !x.hide})[0] })[0] " style="line-height: .36rem") {{menu.title}}
        .submenu-group(v-if="menu.groups")
          dl.submenu(v-for="group in menu.groups")
            dt(v-if="group.title") 
              span {{ group.title }}
            dd(v-for="item in group.items" @click="setType(item)" v-bind:class="{ selected:  item.id === type.id}" style="height: .26rem; line-height: .26rem") {{ item.title }}
  
      //- dd.title.switch(v-if="mt && gameid !== 17 && gameid !== 21 " @click=" __setCall({fn: '__switchMT'}) ") {{ mt === 'normal' ? '快钱玩法' : '官方玩法' }}
      dd.title.switch(v-if="mt && gameid !== 17 && gameid !== 21 ") 
        el-switch(v-model=" mmt " on-text="快钱玩法" off-text="官方玩法"  on-color="#f17d0b" off-color="#666" v-bind:width="90") {{ mt === 'normal' ? '快钱玩法' : '官方玩法' }}

    el-row.row(v-for=" g in cm.groups " v-if="cm.groups && g.items.filter(function(x){return !x.hide})[0]")
      .subtitle(v-if="g.title")
        span {{ g.title }}
      .ds-button.text-button.text-666.small.btn1(v-show=" !item.hide " v-for=" item in g.items " v-bind:class=" { selected: item.id === type.id } " @click="setType(item)" style="height: .26rem; line-height: .26rem") {{ item.title }}
    
    div(style="padding-bottom: .08rem; background: #fafafa; border-bottom: 1px solid #d8d8d8" v-if=" !historyItems[0] ")

    el-row.row.history(style="padding-top: .1rem; padding-bottom: .05rem; border-bottom: 1px solid #d8d8d8" v-if=" historyItems[0] ")
      div(style="border-top: 1px dashed #d8d8d8; padding-bottom: .05rem ")
      .subtitle
        span(style="color: #f17d0b") 历史玩法
      
      .ds-button.text-button.text-666.small(v-if=" !item.hide " v-for=" item in historyItems || [] " v-bind:class=" { selected: item.id === type.id } " @click="setType(item)" style="height: .26rem; line-height: .26rem") {{ item.upTitle === item.title ? item.title : item.upTitle + '_' + item.title }}


    el-row.row.ins(style="background: #fff; padding-top: .1rem; padding-bottom: 0")
      .subtitle(style="padding-left: .1rem; color: #333") {{ title !== type.title ? title + '_' + type.title : title }}

      label(@click=" showIns = !showIns ")
        .ds-checkbox(:class=" {active: showIns} " ) 
        | 玩法说明

      .ds-button.text-button.text-666.small.f_r(@click=" __setCall({fn: '__random'}) " style="height: .26rem; line-height: .26rem") 机选

      p.text-999(v-if=" showIns " style="padding-left: .1rem; line-height: 1.5; padding-bottom: .05rem ") {{ type.description }}





</template>

<script>
  export default {
    props: ['type', 'menus', 'getTitle', 'mt', 'gameid', 'gameType'],
    data () {
      return {
        mmt: 0,
        t: -1,
        historyItems: JSON.parse(window.localStorage.getItem('historyItems' + this.gameType + this.gameid + this.mt) || '[]'),
        showIns: window.localStorage.getItem('showIns') === 'true'
      }
    },
    mounted () {
      this.setType((this.menus.find(m => m.title === this.title) || {}).groups ? this.menus.find(m => m.title === this.title).groups[this.type.id.match(/\d/g)[1] - 1].items.find(m => m.id === this.type.id) : this.menus.find(m => m.id === this.type.id))
      this.mmt = (this.mt !== 'normal')
    },
    watch: {
      mt () {
        // this.mmt = (this.mt !== 'normal')
      },
      mmt () {
        this.t++
        this.t && this.__setCall({fn: '__switchMT'})
      },
      showIns () {
        window.localStorage.setItem('showIns', this.showIns)
      }
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
      },
      __getHistoryItems () {
        this.historyItems = JSON.parse(window.localStorage.getItem('historyItems' + this.gameType + this.gameid + this.mt) || '[]')
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
      
    .menu-con
      border: solid 1px #e4e4e4;
      background-image: linear-gradient(
    #eeeeee, 
    #eeeeee), 
  linear-gradient(0deg, 
    #ffffff 0%, 
    #e3e3e3 100%);

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
    
    .title.switch
      float right
      // background-color #302b2a
      margin .03rem
      height .28rem !important
      line-height .28rem !important
      border none !important
      width 1rem !important
      &:hover
        background none !important
        box-shadow none !important
        
      
    .row
      &:last-child
        padding-bottom .1rem
      display none
      background-color #fafafa
      padding .02rem .12rem
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
          color #999
          // background-color #d9d9d9
          // radius()
          // border-top-right-radius .20rem 50%
          // border-bottom-right-radius .20rem 50%
          
      .ds-button
        font-size .12rem
        border 1px solid #d8dee8
        margin 0 .02rem
        &.text-666
          color #666
        
        &:hover
          color BLUE
          text-decoration none
          box-shadow 0px 3px 3px 0px #e3e3e3
          
        &.selected
          background-color BLUE
          color #FFF
          border-color rgba(0,0,0,0)
    
    .row.history
      .ds-button
        background-image: linear-gradient(0deg, #fff8d0 0%, #fffbe1 100%);
        border: solid 1px #e2daa9;
        color #666
        &:hover
          color BLUE
  
  .btn1.ds-button
    background-color #fff
    
</style>



