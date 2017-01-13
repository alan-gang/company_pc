<template lang="jade">
  section.home
    .container
      el-row.font-light.public(:gutter="0")
        el-col(:span="12")
          .ds-button.small.stick 中奖公告
          | 重庆时时彩203984期 
          span.userName.font-blue {{ userName }}
          |  喜中 
          span.money.font-danger {{ money }}
          |  元
        el-col(:span="12")
          .ds-button.small.stick 系统公告
          | {{ public }}
          
      el-row.collects.font-white(:gutter="0")
        el-col(:span="5" v-for=" (c, index) in collects " v-if="c" v-bind:class="[c.title?c.class:'empty ds-icon-add-item']" @click.native="!c.title && (adding = true) && (addIndex = index)") {{ c.title }}
          .delete-bar
            .el-icon-close.font-light.ds-button.text-button.light(@click.stop="remove(c)")




      el-dialog(title="添加收藏" v-model="adding" size="small" custom-class="dialog-collect")
        el-row.content
          el-col.left(:span="5")
            .item(v-for=" (m, index) in  canCollectMenus" v-bind:class="[m.class + '-small', {active: index === activeIndex}]" @click="activeIndex = index") {{ m.title }}
          el-col.right(:span="19")

            // v-bind:class="{'with-icon': group.withIcon}"          
            dl.submenu(v-for="group in canCollectMenus[activeIndex].groups" )
              dt {{ group.title }}
              // v-bind:class="[item.class || group.class]"
              dd(v-for="item in group.items"  @click="add(item)" v-if="item.title" v-bind:class="[{disabled: item.showInHome}]") 
                | {{ item.title }}

              dd.inner-submenu(v-if="!item.title" v-for="item in group.items" )
                dl
                  dd( v-for="i in item"  @click="add(i)" v-bind:class="[{disabled: item.showInHome}]") {{ i.title }}


</template>

<script>
import base from 'components/base'
import api from '../http/api'
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus'],
  data () {
    return {
      userName: 'ls123',
      money: '50万',
      public: '系统预计12月21日02：30会有版本迭代，请各玩家知悉。',
      adding: false,
      addIndex: 0,
      activeIndex: 0,
      collects: Array(8).fill({})
    }
  },
  created () {
    this.collects = [
      {id: 1, title: '尊皇时时彩', class: 'ds-icon-game'},
      {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
      {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
      {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
      {id: 1, title: '尊皇时时彩', class: 'ds-icon-game'},
      {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
      {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
      {}
    ]
    this.$emit('get-menus')
    this.$emit('get-userfund')
    this.rewardNotices()
    this.sysNotices()
  },
  computed: {
    canCollectMenus () {
      return this.menus.filter(m => m.groups.length > 0)
    }
  },
  watch: {
  },
  methods: {
    add (i) {
      this.collects[this.addIndex].title = i.title
      this.collects[this.addIndex].id = i.id
      this.collects[this.addIndex].class = i.class
      this.adding = false
    },
    remove (c) {
      for (let p in c) {
        c[p] = undefined
      }
    },
    // // 6、用户资金信息  ALL
    // __getUserFund () {
    //   this.$http.get(api.getUserFund).then(({data}) => {
    //     // success
    //     if (data.success) {
    //       this.setUser({money: data.availableBalance, free: data.freeAvaiable})
    //     }
    //   }, (rep) => {
    //     // error
    //   })
    // },
    // 10、中奖公告   ALL
    rewardNotices () {
      this.$http.get(api.rewardNotices).then(({data}) => {
        // success
        if (data.success) {
        }
      }, (rep) => {
        // error
      })
    },
    // 11、系统公告   ALL
    sysNotices () {
      this.$http.get(api.rewardNotices).then(({data}) => {
        // success
        if (data.success) {
        }
      }, (rep) => {
        // error
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  WW = 9rem
  WH = 4.3rem
  IH = .36rem
  
  H = .44rem
  W = .32rem
  .dialog-collect
    min-width WW
    min-height WH
    .el-dialog__title
      &:before
        content ''
        position relative
        top .03rem
        display inline-block
        width .16rem
        height .16rem
        margin-right .05rem
        background url('../assets/+.png') center center no-repeat
    .content
      .el-col
        min-height WH - IH
      .left
        padding .1rem 0
        background-color #d9e1e7
        font-size .14rem
        color #666
        .item
          line-height IH
          padding 0 PW 0 .54rem
          cursor pointer
          &:hover
            color #333
            background-color #baccd9
          &.active
            color WHITE
            background-color BLUE
      .right
        padding 0 .05rem
        .submenu
          float left
          display inline-block
          margin 0 PW
          // &:not(:first-child)
          //   margin-left .3rem
          dt
            font-size .18rem
            color BLUE
            // font-shadow()
            padding .23rem 0 .18rem 0
          .disabled
            color #bbb !important
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  W = 2.7rem
  H = 1.8rem
  .container
    max-width 12rem
    min-width 6rem
    margin 0 auto
    margin-top 10%
    @media(max-height: 768px)
        margin-top 0
    .public
      .el-col
        min-width 2*W
        padding PW
        height auto
        
    .collects
      padding PW 0
      text-align center
      .el-col
        position relative
        min-width W
        height H
        margin 0 PW
        margin-bottom .3rem
        overflow hidden
        radius()
        padding-top H - 3*PW
        background-color rgba(255, 255, 255, .2)
        box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
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
          
  .stick
    margin-right .1rem
    background rgba(255, 255, 255, .2)
    box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .3)
    cursor default
  .delete-bar
    display none
    position absolute
    right 0 
    left 0 
    bottom 0 
    height 2*PW
    background-color rgba(0,0,0,.4)
    line-height 2*PW
    text-align right
    .ds-button
      padding 0 .1rem
    
</style>



