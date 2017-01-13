<template lang="jade">

  div#app

    // header
    transition(name="slide-up" appear=true)
      dsHeader(:tabs="tabs" v-bind:likedTabs="likedTabs" v-on:open-tab="openTab" v-on:close-tab="closeTab" v-if="state.hasHeader && tabs.length > 0")
    
    // pages
    // keep-alive
    transition(name="zoom" appear=true)
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
          id: 0,
          class: 'ds-icon-home',
          href: '/home',
          titl: '首页'
        },
        {
          id: 1,
          class: 'ds-icon-game',
          title: '游戏',
          url: 'game',
          groups: [
            {
              title: '时时彩',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'SSC',
              id: 2,
              items: [
                {id: '1-1', title: '30秒时时彩', showInHome: true, liked: true},
                {id: '1-2', title: '尊皇时时彩', showInHome: true, liked: true},
                {id: '1-3', title: '广东时时彩', showInHome: true, liked: true},
                {id: '1', title: '重庆时时彩', showInHome: true, liked: true},
                {id: '1-5', title: '新疆时时彩', showInHome: true, liked: true},
                {id: '1-6', title: '江西时时彩', showInHome: true, liked: true}
              ]
            },
            {
              title: '时时乐',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'SSC',
              items: [
                {id: '2-1', title: '广东时时乐'}
              ]
            },
            {
              title: '11选5',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'G115',
              items: [
                {id: '3-1', title: '广东11选5'},
                {id: '3-2', title: '新疆11选5'}
              ]
            },
            {
              title: '北京快乐8',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'KL8',
              items: [
                {id: '4-1', title: '北京快乐8'}
              ]
            },
            {
              title: '北京PK10',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'PK10',
              items: [
                {id: '5-1', title: '北京PK10'}
              ]
            },
            {
              title: '快三',
              withIcon: true,
              class: 'ds-icon-item',
              url: 'K3',
              items: [
                {id: '6-1', title: '快三'}
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
          url: 'group',
          groups: [
            {
              id: '3-1',
              title: '用户列表',
              items: [
                {
                  id: '3-1-1',
                  title: '用户列表',
                  url: 'UserList'
                },
                {
                  id: '3-1-2',
                  title: '充值',
                  url: 'Recharge'
                },
                {
                  id: '3-1-3',
                  title: '调点',
                  url: 'AdjustPoint'
                },
                {
                  id: '3-1-4',
                  title: '开户额'
                }
              ]
            },
            {
              id: '3-2',
              title: '开户中心',
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
    }
  },
  computed: {
    likedTabs () {
      return this.state.pages.filter(t => t.liked)
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
  created () {
    this.setPages(this._getPages())
  },
  methods: {
    _getPages () {
      console.log('menus changed!!!')
      return this.menus.reduce((p, m) => {
        m.groups = m.groups || []
        return m.groups.reduce((p, g) => {
          g.items = g.items || []
          if (g.items.length >= 8) g.items = util.groupArray(g.items, 4)
          return g.items.reduce((p, i) => {
            i = Object.assign({}, {
              opened: false,
              active: false,
              // pre activated
              prev: 0,
              star: false,
              size: '',
              url: g.url || '',
              href: '/' + m.url + '/' + i.id,
              class: g.class || ''
            }, i)
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
      this.$http.post(api.logout)
      this.setUser()
      cookie.remove('JSESSIONID')
      this.$router.push('/login')
    },
    // 5、查询菜单、桌面、收藏夹 PC接口
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
        // if (data.success > 0) this.menus = data.items
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
    user-select none
  
  body
    height 100%
    font-size .14rem
    margin 0
    background url(./assets/bg.jpg) center center no-repeat
    background-size cover
  
  body:fullscreen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
  body:-webkit-full-screen #app > * {
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
    -webkit-overflow-scrolling touch
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
    opacity 0
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
  transform opacity .5s

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
