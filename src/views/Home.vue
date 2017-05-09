<template lang="jade">
  section.home
    .container
      el-row.font-light.public(:gutter="0")
        el-col(:span="12")
          .ds-button.small.stick 中奖公告
          span(v-for=" (msg, ii) in msgs " v-show="ii === j")
            | {{ msg.cnName }}{{ msg.issue }}期 
            span.userName.font-blue {{ msg.nickName }}
            |  喜中 
            span.money.font-danger {{ msg.amount }}
            |  元
        el-col(:span="12")
          .ds-button.small.stick 系统公告
          span(v-for=" (msg, ii) in notices " v-show="ii === i") {{ msg.subject }}
          
      el-row.collects.font-white(:gutter="0")
        el-col(:span="5" v-for=" (c, index) in collects " v-if="c" v-bind:class="[c.title? c.class || c.menuClass :'empty ds-icon-add-item']" @click.native="!c.title ? (adding = true) && (addIndex = index) : openTab(c.id) ") {{ c.title }}
          .delete-bar
            .el-icon-close.font-light.ds-button.text-button.light(@click.stop="delPrefence(index)")




      el-dialog(title="添加收藏" v-model="adding" size="small" custom-class="dialog-collect")
        el-row.content
          el-col.left(:span="5")
            .item(v-for=" (m, index) in  canCollectMenus" v-bind:class="[m.class + '-small', {active: index === activeIndex}]" @click="activeIndex = index") {{ m.title }}
          el-col.right(:span="19"  v-if="canCollectMenus[0]")

            // v-bind:class="{'with-icon': group.withIcon}"          
            dl.submenu(v-for="group in canCollectMenus[activeIndex].groups")
              dt {{ group.title }}
              // v-bind:class="[item.class || group.class]"
              dd(v-for="item in group.items"  @click="collectsIds.indexOf(item.id) === -1 && addPrefence(item)" v-if="item.title" v-bind:class="[{disabled: collectsIds.indexOf(item.id) !== -1 }]") 
                | {{ item.title }}

              dd.inner-submenu(v-if="!item.title" v-for="item in group.items" )
                dl
                  dd( v-for="i in item"  @click="addPrefence(i)" v-bind:class="[{disabled: item.desk}]") {{ i.title }}
    Guide(v-if="me.guide")
    // Guide

</template>

<script>
import base from 'components/base'
import api from '../http/api'
import store from '../store'
import Guide from './Guide'
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus'],
  data () {
    return {
      pages: store.state.pages,
      me: store.state.user,
      userName: 'ls123',
      money: '50万',
      public: '系统预计12月21日02：30会有版本迭代，请各玩家知悉。',
      j: 0,
      msgs: [],
      i: 0,
      notices: [],
      adding: false,
      addIndex: 0,
      activeIndex: 0,
      collects: [{class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}, {class: '', id: '', title: ''}]
    }
  },
  computed: {
    canCollectMenus () {
      return this.menus.filter(m => m.id > -1 && m.groups && m.groups.length > 0)
    },
    collectsIds () {
      return this.collects.reduce((p, c) => {
        if (c.id) p.push(c.id)
        return p
      }, [])
    }
  },
  watch: {
  },
  mounted () {
    // this.collects = [
    //   {id: 1, title: '尊皇时时彩', class: 'ds-icon-game'},
    //   {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
    //   {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
    //   {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
    //   {id: 1, title: '尊皇时时彩', class: 'ds-icon-game'},
    //   {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
    //   {id: 2, title: '重庆时时彩', class: 'ds-icon-game'},
    //   {}
    // ]
    this.$emit('get-menus')
    this.$emit('get-userfund')
    this.rewardNotices()
    this.sysNotices()
    this.getUserPrefence()
    this.switchI()
  },
  methods: {
    switchI () {
      setInterval(() => {
        this.i++
        if (this.i === this.notices.length) this.i = 0
      }, 5000)
    },
    switchJ () {
      setInterval(() => {
        this.j++
        if (this.j === this.msgs.length) this.j = 0
      }, 5000)
    },
    openTab (id) {
      this.$emit('open-tab', id)
    },
    // addPrefence: api + 'home/userMenus.do?method=addPrefence&menuId=1&userId=1&isDesk=1&sort=1',
    // delPrefence: api + 'home/userMenus.do?method=delPrefence&userId=1&menuId=1&isDesk=0',
    addPrefence (i) {
      this.$http.get(api.addPrefence, {
        menuId: i.menuid,
        isDesk: 1,
        sort: this.addIndex + 1
      }).then(({data}) => {
        // success
        if (data.success === 1) {
          this.add(i)
        } else this.$message.warning('桌面添加失败!')
      }, (rep) => {
        // error
        this.$message.warning('桌面添加失败!')
      })
    },
    delPrefence (i) {
      this.$http.get(api.delPrefence, {
        menuId: this.collects[i].menuid,
        isDesk: 1,
        sort: i + 1
      }).then(({data}) => {
        // success
        if (data.success === 1) {
          this.remove(i)
        } else this.$message.warning(data.msg || '桌面删除失败!')
      }, (rep) => {
        // error
        this.$message.warning('桌面删除失败!')
      })
    },
    add (i) {
      this.collects[this.addIndex].title = i.title
      this.collects[this.addIndex].id = i.id
      this.collects[this.addIndex].menuid = i.menuid
      this.collects[this.addIndex].class = i.class || i.menuClass
      this.adding = false
    },
    remove (i) {
      this.collects[i].title = ''
      this.collects[i].id = ''
      this.collects[i].class = ''
    },
    // 5、查询菜单、桌面、收藏夹 PC接口
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
        if (data.success === 1) {
          data.deskList.forEach((d, i) => {
            if (i > 7) return
            this.addIndex = d.sort - 1
            this.add(this.pages.find(p => p.menuid === d.menuId + '') || {})
          })
        }
      }, (rep) => {
        // error
      })
    },
    // 10、中奖公告   ALL
    rewardNotices () {
      this.$http.get(api.rewardNotices).then(({data}) => {
        // success
        if (data.success) {
          this.msgs = data.rewardNotices || []
        }
      }, (rep) => {
        // error
      })
    },
    // 11、系统公告   ALL
    sysNotices () {
      this.$http.get(api.sysNotices).then(({data}) => {
        // success
        if (data.success) {
          this.notices = data.sysNotices || []
        }
      }, (rep) => {
        // error
      })
    }
  },
  components: {
    Guide
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  WW = 10rem
  WH = 5rem
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
        background-color  #ededed
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
          dd
            cursor pointer
          
          dd:not(.inner-submenu)
            height H - .06rem
            line-height H - .06rem
            // &[class*=ds-icon]
            //   padding-left W + .05rem
            &:not(.disabled):hover
              color BLUE-HOVER
          dd.disabled
            color #bbb
            cursor not-allowed 
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
    // background-color rgba(0,0,0,.4)
    line-height 2*PW
    text-align right
    .ds-button
      font-size .1rem
      padding 0 .09rem
      color #fff
      radius(50%)
      transform perspective(500px) translateZ(-77px)
      &:hover
        background-color rgba(0,0,0, .6)
        color #fff
      

      // color LIGHT
      // float right
      // transform perspective(500px) translateZ(-150px)
      // radius(50%)
      // display inline-block
      // // width .2342rem
      // // height .2342rem
      // padding .0571rem .0571rem
      // &:hover
      //   color WHITE
      //   background-color rgba(0,0,0, .6)
        
      // position relative
      // top .02rem
      // left .05rem
      // font-size .1rem
      // text-shadow none
      // margin 0 .1rem
    
</style>



