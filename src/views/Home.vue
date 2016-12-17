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
  mixins: [base],
  data () {
    return {
      hasHeader: true,
      userName: 'ls123',
      money: '50万',
      public: '系统预计12月21日02：30会有版本迭代，请各玩家知悉。',
      adding: false,
      addIndex: 0,
      activeIndex: 0,
      collects: Array(8).fill({}),
      menus: []
    }
  },
  created () {
    this.menus = [
      {
        id: 0,
        class: 'ds-icon-home',
        url: '/home',
        titl: '首页'
      },
      {
        id: 1,
        class: 'ds-icon-game',
        title: '游戏',
        groups: [
          {
            title: '时时彩',
            withIcon: true,
            class: 'ds-icon-item',
            url: 'SSC',
            items: [
              {id: '1-1', title: '30秒时时彩', showInHome: true, liked: true},
              {id: '1-2', title: '尊皇时时彩', showInHome: true, liked: true},
              {id: '1-3', title: '广东时时彩', showInHome: true, liked: true},
              {id: '1-4', title: '重庆时时彩', showInHome: true, liked: true},
              {id: '1-5', title: '新疆时时彩', showInHome: true, liked: true},
              {id: '1-6', title: '江西时时彩', showInHome: true, liked: true}
            ]
          },
          {
            title: '时时乐',
            withIcon: true,
            class: 'ds-icon-item',
            url: 'ZHSSC',
            items: [
              {id: '2-1', title: '广东时时乐'}
            ]
          },
          {
            title: '11选5',
            withIcon: true,
            class: 'ds-icon-item',
            items: [
              {id: '3-1', title: '广东11选5'},
              {id: '3-2', title: '新疆11选5'}
            ]
          },
          {
            title: '北京快乐8',
            withIcon: true,
            class: 'ds-icon-item',
            items: [
              {id: '4-1', title: '北京快乐8'}
            ]
          },
          {
            title: '北京PK10',
            withIcon: true,
            class: 'ds-icon-item',
            items: [
              {id: '5-1', title: '北京PK10'}
            ]
          },
          {
            title: '快三',
            withIcon: true,
            class: 'ds-icon-item',
            items: [
              {id: '6-1', title: '北京PK10'}
            ]
          }
        ]
      },
      {
        id: 2,
        class: 'ds-icon-me',
        title: '个人中心',
        groups: [
          {
            id: '2-1',
            title: '个人信息',
            items: [
              {
                id: '2-1-1',
                title: '个人信息'
              }
            ]
          },
          {
            id: '2-2',
            title: '安全中心',
            items: [
              {
                id: '2-2-1',
                title: '显示信息'
              },
              {
                id: '2-2-2',
                title: '修改登录密码'
              },
              {
                id: '2-2-3',
                title: '修改资金密码'
              },
              {
                id: '2-2-4',
                title: '修改昵称'
              },
              {
                id: '2-2-5',
                title: '绑定/解绑邮箱'
              },
              {
                id: '2-2-6',
                title: '绑定/解绑手机'
              },
              {
                id: '2-2-7',
                title: '设置身份验证'
              },
              {
                id: '2-2-8',
                title: '设置安全问题'
              }
            ]
          },
          {
            id: '2-3',
            title: '充值',
            items: [
              {
                id: '2-3-1',
                title: '显示信息'
              }
            ]
          },
          {
            id: '2-4',
            title: '充值',
            items: [
              {
                id: '2-4-1',
                title: '充值申请'
              },
              {
                id: '2-4-2',
                title: '充值记录'
              }
            ]
          },
          {
            id: '2-5',
            title: '提现',
            items: [
              {
                id: '2-5-1',
                title: '提现申请'
              },
              {
                id: '2-5-2',
                title: '提现记录'
              }
            ]
          },
          {
            id: '2-6',
            title: '银行卡',
            items: [
              {
                id: '2-6-1',
                title: '银行卡列表'
              },
              {
                id: '2-6-2',
                title: '绑定银行卡'
              },
              {
                id: '2-6-1',
                title: '解绑银行卡'
              },
              {
                id: '2-6-2',
                title: '锁定银行卡'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        class: 'ds-icon-group',
        title: '团队管理',
        groups: [
          {
            id: '3-1',
            title: '用户列表',
            items: [
              {
                id: '3-1-1',
                title: '用户列表'
              },
              {
                id: '3-1-2',
                title: '充值'
              },
              {
                id: '3-1-3',
                title: '调点'
              },
              {
                id: '3-1-4',
                title: '开启额'
              }
            ]
          },
          {
            id: '3-2',
            title: '开启中心',
            items: [
              {
                id: '3-2-1',
                title: '增加用户'
              },
              {
                id: '3-2-2',
                title: '推广设置'
              }
            ]
          },
          {
            id: '3-3',
            title: '契约分红',
            items: [
              {
                id: '3-3-1',
                title: '我的契约'
              },
              {
                id: '3-3-2',
                title: '我的分红'
              },
              {
                id: '3-3-3',
                title: '下级契约列表'
              }
            ]
          },
          {
            id: '3-4',
            title: '团队统计',
            items: [
              {
                id: '3-4-1',
                title: '团队数据统计'
              },
              {
                id: '3-4-2',
                title: '团队图表分析'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        class: 'ds-icon-record',
        title: '报表统计',
        groups: [
          {
            id: '4-1',
            title: '投注记录',
            items: [
              {
                id: '4-1-1',
                title: '投注记录列表'
              },
              {
                id: '4-1-2',
                title: '投注记录详情'
              },
              {
                id: '4-1-3',
                title: '发起跟单'
              },
              {
                id: '4-1-4',
                title: '投注撤单'
              }
            ]
          },
          {
            id: '4-2',
            title: '追号记录',
            items: [
              {
                id: '4-2-1',
                title: '追号记录列表'
              },
              {
                id: '4-2-2',
                title: '追号记录详情'
              },
              {
                id: '4-2-3',
                title: '追号撤单'
              }
            ]
          },
          {
            id: '4-3',
            title: '跟单记录',
            items: [
              {
                id: '4-3-1',
                title: '跟单记录'
              }
            ]
          },
          {
            id: '4-4',
            title: '今日报表',
            items: [
              {
                id: '4-4-1',
                title: '今日报表列表'
              }
            ]
          },
          {
            id: '4-5',
            title: '盈亏报表',
            items: [
              {
                id: '4-5-1',
                title: '盈亏报表列表'
              },
              {
                id: '4-5-2',
                title: '明细'
              }
            ]
          }
        ]
      },
      {
        id: 5,
        class: 'ds-icon-gift',
        title: '优惠活动'
      },
      {
        id: 6,
        class: 'ds-icon-help',
        title: '帮助中心'
      },
      {
        id: 7,
        class: 'ds-icon-download'
      },
      {
        id: 8,
        class: 'ds-icon-chat'
      }
    ]
    this.$emit('set-menus', this.menus)
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
    this.getUserPrefence()
    this.getUserFund()
  },
  computed: {
    canCollectMenus () {
      return this.menus.filter(m => m.groups)
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
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
      }, (rep) => {
        // error
      })
    },
    getUserFund () {
      this.$http.get(api.getUserFund).then(({data}) => {
        // success
        if (data.success) {
          this.setUser({money: data.availableBalance, free: data.freeAvaiable})
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
  WW = 8.3rem
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



