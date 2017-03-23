<template lang="jade">

  div#app

    // header
    transition(name="slide-up" appear=true)
      dsHeader(:tabs="tabs" v-bind:starTabs="starTabs" v-on:open-tab="openTab" v-on:close-tab="closeTab" v-if="state.hasHeader && tabs.length > 0")
    
    // pages
    // keep-alive
    transition(name="fade" appear=true)
      router-view.scroll-content.page(:pages="tabs" v-bind:menus="menus" v-on:close-tab="closeTab" v-on:open-tab="openTab" v-on:get-menus="getUserPrefence" v-on:get-userfund="__getUserFund"  v-bind:class="{ 'has-header': state.hasHeader, 'has-footer': state.hasFooter }")

    // footer
    transition(name="slide-down" appear=true)
      dsFooter(:menus="menus" v-bind:name="state.user.name" v-bind:money="state.user.money" v-bind:free="state.user.free" v-on:open-page="openTab" v-if="state.hasFooter" v-on:logout="logout")

</template>

<script>
import util from './util'
import dsHeader from './components/Header'
import dsFooter from './components/Footer'
import base from './components/base'
import store from './store'
import cookie from 'js-cookie'
import api from './http/api'
export default {
  name: 'App',
  mixins: [base],
  data () {
    return {
      maxPages: 10,
      state: store.state,
      tabs: [],
      menus: [
        {
          id: -1,
          class: 'ds-icon-gift',
          groups: [
            {
              items: [
                {id: '5-1-1', menuid: '6', title: '活动中心', url: 'Activity', showInHome: false, liked: false}
              ]
            }
          ]
        },
        {
          id: 0,
          class: 'ds-icon-home',
          href: '/home',
          titl: '首页',
          menuid: '1'
        },
        {
          id: 1,
          menuid: '2',
          class: 'ds-icon-game',
          title: '游戏',
          url: 'game',
          groups: [
            {
              title: '时时彩',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'SSC',
              id: 2,
              items: [
                {class: 'ds-icon-game-chq', id: '1-1-1', menuid: '11', title: '重庆时时彩', gameid: 1},
                // {class: 'ds-icon-game-chq', menuid: '2', title: '黑龙江时时彩', showInHome: false, liked: false},
                {class: 'ds-icon-game-xj', id: '1-1-2', menuid: '12', title: '新疆时时彩', gameid: 3},
                {class: 'ds-icon-game-tj', id: '1-1-3', menuid: '13', title: '天津时时彩', gameid: 4}
                // {class: 'ds-icon-game-chq', menuid: '10', title: '排列三、五', showInHome: true, liked: true},
                // {class: 'ds-icon-game-chq', menuid: '12', title: '欢乐分分彩', showInHome: true, liked: true}
              ]
            },
            {
              title: '时时乐',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'SSL',
              items: [
                {class: 'ds-icon-game-shh', id: '1-2-1', menuid: '14', title: '上海时时乐', gameid: 5},
                {class: 'ds-icon-game-xf', id: '1-2-3', menuid: '16', title: '幸福三分彩'},
                {class: 'ds-icon-game-hl', id: '1-2-4', menuid: '17', title: '欢乐分分彩', gameid: 12}
                // {class: 'ds-icon-game-hl', menuid: '9', title: '福彩3D'}
              ]
            },
            {
              title: '11选5',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'G115',
              // width: '1.8rem',
              items: [
                // {class: '', menuid: '6', title: '十一运夺金'},
                {class: 'ds-icon-game-gd', id: '1-3-1', menuid: '18', title: '广东十一选五', gameid: 8},
                {class: 'ds-icon-game-dj', id: '1-3-2', menuid: '19', title: '夺金120秒'},
                {class: 'ds-icon-game-dl', id: '1-3-3', menuid: '15', title: '多乐彩', gameid: 7}
                // {class: '', menuid: '11', title: '重庆十一选五'}
              ]
            },
            {
              title: '北京PK10',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'PK10',
              items: [
                {class: 'ds-icon-game-bjpk10', id: '1-4-1', menuid: '20', title: '北京PK10', gameid: 13}
              ]
            },
            {
              title: '北京快乐8',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'KL8',
              items: [
                {class: 'ds-icon-game-bj', id: '1-5-1', menuid: '21', title: '北京快乐8', gameid: 14}
              ]
            },
            {
              title: '快三',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'K3',
              width: '1.8rem',
              items: [
                {class: 'ds-icon-game-ks', id: '1-6-1', menuid: '22', title: '快三', gameid: 15}
              ]
            },
            {
              title: '其它游戏',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'K3',
              items: [
                {url: 'G115', class: 'ds-icon-game-11ydj', id: '1-7-1', menuid: '23', title: '十一运夺金', gameid: 6},
                {url: 'SSL', class: 'ds-icon-game-fc', id: '1-7-2', menuid: '24', title: '福彩3D', gameid: 9},
                {url: 'SSC', class: 'ds-icon-game-pl', id: '1-7-3', menuid: '25', title: '排列三、五', gameid: 10}
              ]
            }
          ]
        },
        {
          id: 2,
          menuid: '3',
          class: 'ds-icon-me',
          title: '',
          url: 'me',
          groups: [
            {
              id: '2-1',
              title: '个人中心',
              items: [
                {
                  id: '2-1-1',
                  menuid: '20',
                  title: '个人信息',
                  url: 'Me'
                },
                {
                  id: '2-2-1',
                  menuid: '21',
                  title: '安全中心',
                  url: 'SafeCenter'
                },
                {
                  id: '2-3-1',
                  menuid: '29',
                  title: '奖金详情',
                  url: 'Bonus'
                },
                {
                  id: '2-4-1',
                  menuid: '30',
                  title: '充值申请',
                  url: 'TopUp'
                },
                {
                  id: '2-5-1',
                  menuid: '32',
                  title: '提现申请',
                  url: 'WithDraw'
                },
                {
                  id: '2-6-1',
                  menuid: '34',
                  title: '我的银行卡',
                  url: 'Bank'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          class: 'ds-icon-group',
          title: '团队管理',
          menuid: '4',
          url: 'group',
          groups: [
            {
              id: '3-1',
              title: '用户中心',
              items: [
                {
                  id: '3-1-1',
                  menuid: '38',
                  title: '用户列表',
                  url: 'UserList',
                  position: {
                    width: '11rem'
                  }
                }
              ]
            },
            {
              id: '3-2',
              title: '开户中心',
              items: [
                {
                  id: '3-2-1',
                  menuid: '42',
                  title: '增加用户',
                  url: 'AddUser'
                },
                {
                  id: '3-2-2',
                  menuid: '43',
                  title: '推广设置',
                  url: 'Ad'
                }
              ]
            },
            {
              id: '3-3',
              title: '契约分红',
              items: [
                {
                  id: '3-3-1',
                  menuid: '45',
                  title: '分红列表',
                  url: 'Stock'
                },
                {
                  id: '3-3-2',
                  // menuid: '29',
                  title: '分红详情',
                  url: 'StockDetail',
                  position: {
                    width: '5.4rem',
                    height: '6.8rem'
                  }
                },
                {
                  id: '3-3-3',
                  menuid: '44',
                  title: '契约列表',
                  url: 'Contract'
                },
                {
                  id: '3-3-4',
                  title: '契约详情',
                  position: {
                    width: '5.4rem',
                    height: '6.8rem'
                  },
                  url: 'ContractDetail'
                }
              ]
            },
            {
              id: '3-4',
              title: '团队统计',
              items: [
                {
                  id: '3-4-1',
                  menuid: '47',
                  title: '团队数据统计',
                  url: 'DataAnalysis'
                },
                {
                  id: '3-4-2',
                  menuid: '48',
                  title: '团队图表分析',
                  url: 'ChartAnalysis'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          class: 'ds-icon-record',
          title: '报表统计',
          menuid: '5',
          url: 'form',
          groups: [
            {
              id: '4-1',
              title: '投注记录',
              items: [
                {
                  id: '4-1-1',
                  menuid: '50',
                  title: '投注记录列表',
                  url: 'Order',
                  position: {
                    width: '13rem'
                  }
                }
              ]
            },
            {
              id: '4-2',
              title: '追号记录',
              items: [
                {
                  id: '4-2-1',
                  menuid: '53',
                  title: '追号记录列表',
                  url: 'Follow',
                  position: {
                    width: '12rem'
                  }
                },
                {
                  id: '4-2-2',
                  title: '追号记录详情',
                  url: 'FollowDetail',
                  position: {
                    width: '10rem'
                  }
                }
              ]
            },
            {
              id: '4-3',
              title: '跟单记录',
              items: [
                {
                  id: '4-3-1',
                  menuid: '56',
                  title: '跟单记录',
                  url: 'FollowOrder'
                }
              ]
            },
            {
              id: '4-4',
              title: '今日报表',
              items: [
                {
                  id: '4-4-1',
                  menuid: '57',
                  title: '今日报表列表',
                  url: 'Today'
                }
              ]
            },
            {
              id: '4-5',
              title: '盈亏报表',
              items: [
                {
                  id: '4-5-1',
                  menuid: '58',
                  title: '盈亏报表列表',
                  url: 'ProfitLoss'
                },
                {
                  id: '4-5-4',
                  title: '个人盈亏明细',
                  url: 'ProfitLossDetail'
                },
                {
                  id: '4-5-2',
                  menuid: '59',
                  title: '帐变列表',
                  position: {
                    width: '12rem'
                  },
                  url: 'Account'
                },
                {
                  id: '4-5-3',
                  menuid: '60',
                  title: '走势图',
                  position: {
                    width: '16.3rem'
                  },
                  url: 'TrendChart'
                }
              ]
            }
          ]
        },
        {
          id: 5,
          class: 'ds-icon-gift',
          title: '活动中心',
          href: '/activity/5-1-1',
          url: 'Activity',
          menuid: '6'
        },
        {
          id: 6,
          class: 'ds-icon-help',
          title: '帮助中心',
          url: 'help',
          menuid: '7',
          groups: [
            {
              id: '6-1',
              title: '帮助中心',
              items: [
                {
                  id: '6-1-1',
                  title: '玩法介绍',
                  url: 'PlayHelp'
                },
                {
                  id: '6-1-2',
                  title: '功能介绍',
                  url: 'FunctionHelp'
                },
                {
                  id: '6-1-3',
                  title: '常见问题',
                  url: 'QuestionHelp'
                }
              ]
            }
          ]
        },
        {
          id: 7,
          class: 'ds-icon-download'
        },
        {
          id: 8,
          class: 'ds-icon-chat'
        }
      ],
      menuids: ''
    }
  },
  computed: {
    starTabs () {
      return this.state.pages.filter(t => t.star)
    },
    ctabs () {
      return this.state.pages.filter(t => {
        return t.opened
      })
    },
    prev () {
      let prev = {prev: 0, href: '/'}
      this.tabs.find(t => {
        if (t.prev > prev.prev) prev = t
      })
      return prev
    }
  },
  watch: {
    menus () {
      this.setPages(this._getPages())
    },
    // tabs () {
    //   return this..filter(p => {
    //     console.log(p.opened, 2)
    //     return p.opened
    //   })
    // }
    'ctabs': {
      // deep: true,
      immediate: true,
      handler () {
        this.ctabs.forEach(tab => {
          if (!this.tabs.find(t => t.id === tab.id)) this.tabs.push(tab)
        })
        this.tabs = this.tabs.filter(t => t.opened)
      }
    }
  },
  mounted () {
    this.setPages(this._getPages())
  },
  methods: {
    _getPages () {
      console.log('menus changed!!! or Menu need reauthority')
      return this.menus.reduce((p, m, mi) => {
        // delete un authority
        if (this.menuids && m.menuid && this.menuids.indexOf(m.menuid) === -1) {
          this.menus.splice(mi, 1)
          return p
        }
        m.groups = m.groups || []
        return m.groups.reduce((p, g, gi) => {
          // delete un authority
          if (this.menuids && g.menuid && this.menuids.indexOf(g.menuid) === -1) {
            m.groups.splice(gi, 1)
            return p
          }
          g.items = g.items || []
          if (g.items.length >= 8) g.items = util.groupArray(g.items, 4)
          return g.items.reduce((p, i, ii) => {
            // delete un authority
            if (this.menuids && i.menuid && this.menuids.indexOf(i.menuid) === -1) {
              g.items.splice(ii, 1)
              return p
            }
            i.menuClass = g.class || m.class
            i = Object.assign({}, {
              opened: false,
              active: false,
              // pre activated
              prev: 0,
              star: false,
              size: '',
              url: g.url || '',
              href: '/' + m.url + '/' + i.id,
              // class: g.class || '',
              menuClass: g.class || m.class
            }, i)
            if (g.position) i.position = g.position
            p.push(i)
            return p
          }, p)
        }, p)
      }, [])
    },
    openTab (url) {
      if (this.$route.params.url === url) !this.openPage(url) && this.$router.push('/')
      else this.openAnotherPage(url)
    },
    openAnotherPage (url) {
      if (this.tabs.length < this.maxPages || this.tabs.find(t => t.id === url)) this.$router.push(this.state.pages.find(p => p.id === url).href)
      else console.log('max opened page size is: ', this.maxPages)
    },
    closeTab (url) {
      this.updatePage(url, {opened: false, position: null})
      this.$nextTick(() => {
        // after close open the pre one
        if (this.tabs.length === 0) {
          setTimeout(() => {
            this.$router.push('/')
          }, 100)
        }
        // else this.$router.push(this.prev.href)
      })
    },
    // setMenus (menus) {
    //   this.menus = menus
    // },
    logout () {
      this.$http.get(api.logout)
      this.setUser()
      cookie.remove('JSESSIONID')
      this.$router.push('/login')
    },
    __logout () {
      this.logout()
    },
    // 5、查询菜单、桌面、收藏夹 PC接口
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
        if (data.success === 1) {
          this.menuids = data.menuList
          this._getPages()
          this.$nextTick(() => {
            data.favoriteList.forEach((d, i) => {
              store.actions.updatePage(d.menuId + '', {star: true})
            })
            // data.deskList.forEach((d, i) => {
            //   store.actions.updatePage(d.menuId + '', {desk: true})
            // })
          })
        }
      }, (rep) => {
        // error
      })
    },
    // 6、用户资金信息  ALL
    __getUserFund () {
      this.$http.get(api.getUserFund).then(({data}) => {
        // success
        if (data.success) {
          this.setUser({money: data.availableBalance, free: data.freeAvaiable})
        }
      }, (rep) => {
        // error
      })
    }
  },
  components: {
    dsHeader,
    dsFooter
  }
}
</script>

<style lang="stylus">
  @import './var.stylus'
  @import './main.stylus'
  
  html
    height 100%
    font-size 100px
    overflow hidden
    min-height 600px
    min-width 800px
    font-family Arial, Helvetica, sans-serif, "微软雅黑"
    // user-select none
  
  body
    height 100%
    font-size .14rem
    color #666
    margin 0
    background url(./assets/bg.jpg) center center no-repeat
    background-size cover
  
  body:fullscreen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
  body:full-screen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
  body:-moz-full-screen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
    
  header
    position absolute
    top 0
    right: 0
    left: 0
    height HH
    z-index 1
    & + .scroll-content
      top HH
  footer
    position absolute
    bottom 0
    left 0
    right 0
    min-width 8.5rem
    z-index 1
  .scroll-content
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow-x hidden
    overflow-y auto
    overflow-scrolling touch
    radius(x = .05rem)
    // &.has-header
    //   top HH
    &.has-footer
      bottom FH
      @media(max-width: 1362px)
        bottom 2*FH 
    
      

// define transition common timming function and time
[class*=-enter]
[class*=-leave]
  transition all linear .2s // @static 2

.zoom-enter-active, .zoom-leave-active
    // opacity 0
    transform perspective(500px) translateZ(-5000px)
.slide-enter, .slide-leave-active
  transform translateX(100%)
.slide-up-enter, .slide-up-leave-active
  transform translateY(-100%)
.slide-down-enter, .slide-down-leave-active
  transform translateY(100%)
.slide-left-enter, .slide-left-leave-active
  transform translateX(-100%)
.fade-enter, .fade-leave-active
  opacity 0

// define for main page
.page
  &[class*=-leave]
    // transition-delay .5s
.back
  // define for main page when back 
  &>.page
    &[class*=-leave]
      transition-delay 0s
      z-index 1
    &[class*=-enter]
      transform none

</style>
