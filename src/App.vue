<template lang="jade">

  div#app(:class=" [state.user.model, 'app'] ")
    
    // vue-progress-bar
    
    // header
    transition(name="slide-up" appear=true)
      dsHeader(:tabs="tabs" v-bind:starTabs="starTabs" v-on:open-tab="openTab" v-on:close-tab="closeTab" v-if="state.hasHeader && tabs.length > 0")
    
    // pages
    // keep-alive
    transition(name="fade" appear=true)
      router-view.scroll-content.page(:pages="tabs" v-bind:prehref="prev.href" v-bind:menus="menus" v-on:close-tab="closeTab" v-on:open-tab="openTab" v-on:get-menus="getUserPrefence" v-on:get-userfund="__getUserFund"  v-bind:class="{ 'has-header': state.hasHeader, 'has-footer': state.hasFooter }" v-bind:loop="loop" v-bind:max-pages="maxPages")

    // footer
    transition(name="slide-down" appear=true)
      dsFooter(:menus="menus" v-bind:name="state.user.name" v-bind:money="state.user.amoney" v-bind:free="state.user.free" v-on:open-page="openTab" v-if="state.hasFooter" v-on:logout="logout")
      
    // Chat

</template>

<script>
// import util from './util'
import dsHeader from './components/Header'
import dsFooter from './components/Footer'
// import Chat from './components/Chat'
import base from './components/base'
import store from './store'
import cookie from 'js-cookie'
import api from './http/api'
export default {
  name: 'App',
  mixins: [base],
  data () {
    return {
      // skin: 'day',
      loop: true,
      maxPages: 10,
      state: store.state,
      tabs: [],
      menus: [
        {
          class: 'ds-icon-gift',
          hide: true,
          url: 'activity',
          groups: [
            {
              items: [
                {id: '5-1-1', menuid: '71', title: '活动中心', url: 'Activity'},
                {id: '5-2-1', title: '亿元豪送', url: 'ForRegister'},
                {id: '5-2-2', title: '新用户有礼', url: 'ForNewUser'},
                {id: '5-2-3', title: '全民签到', url: 'ForAll'},
                {id: '5-2-4', title: '充值送', url: 'ForTopup'},
                {id: '5-2-5', title: '首提大返利', url: 'ForWithdraw'},
                {id: '5-2-6', title: '充值送', url: 'ForTopupA'},
                {id: '5-2-7', title: '最新活动', url: 'ForOther'}
              ]
            }
          ]
        },
        {
          class: 'ds-icon-record',
          hide: true,
          url: 'form',
          groups: [
            {
              items: [
                {
                  id: '4-2-2',
                  menuid: '54',
                  title: '追号记录详情',
                  url: 'FollowDetail',
                  position: {
                    width: '10rem'
                  }
                }
              ]
            }
          ]
        },
        {
          class: 'ds-icon-download',
          hide: true,
          url: 'download',
          groups: [
            {
              items: [
                {
                  id: '7-1-1',
                  title: '下载中心',
                  url: 'Download'
                }
              ]
            }
          ]
        },
        {
          class: 'ds-icon-group',
          hide: true,
          url: 'group',
          groups: [
            {
              items: [
                {
                  id: '3-3-2',
                  menuid: '29',
                  title: '分红详情',
                  url: 'StockDetail',
                  position: {
                    width: '5.4rem',
                    height: '6.8rem'
                  }
                }
              ]
            }
          ]
        },
        {
          class: 'ds-icon-record',
          hide: true,
          url: 'form',
          groups: [
            {
              items: [
                {
                  id: '4-5-4',
                  title: '个人盈亏明细',
                  url: 'ProfitLossDetail'
                }
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
              // id: 2,
              // width: '8rem',
              items: [
                {class: 'ds-icon-game-chq', id: '1-1-1', menuid: '8', title: '重庆时时彩', gameid: 1},
                {class: 'ds-icon-game-xj', id: '1-1-2', menuid: '16', title: '新疆时时彩', gameid: 3},
                {class: 'ds-icon-game-tj', id: '1-1-3', menuid: '15', title: '天津时时彩', gameid: 4},
                {class: 'ds-icon-game-bjssc', id: '1-1-4', menuid: '10', title: '北京时时彩', gameid: 17},
                {class: 'ds-icon-game-twssc', id: '1-1-5', menuid: '13', title: '台湾时时彩', gameid: 20}
              ]
            },
            {
              url: 'SSC',
              // id: 2,
              // width: '8rem',
              items: [
                {class: 'ds-icon-game-cb30', id: '1-2-1', menuid: '9', title: '畅博30秒', gameid: 16},
                {class: 'ds-icon-game-cb60', id: '1-2-2', menuid: '18', title: '畅博60秒', gameid: 12},
                {class: 'ds-icon-game-cb120', id: '1-2-3', menuid: '14', title: '畅博120秒', gameid: 21},
                {class: 'ds-icon-game-hg15', id: '1-2-4', menuid: '11', title: '韩国1.5分彩', gameid: 18},
                {class: 'ds-icon-game-dj15', id: '1-2-5', menuid: '12', title: '东京1.5分彩', gameid: 19},
                {class: 'ds-icon-game-ffctx', id: '1-2-6', menuid: '17', title: '腾讯时时彩', gameid: 2}
              ]
            },
            {
              title: '11选5',
              // withIcon: true,
              // class: 'ds-icon-item',
              url: 'G115',
              // width: '1.8rem',
              items: [
                {class: 'ds-icon-game-gd', id: '1-3-1', menuid: '76', title: '广东十一选五', gameid: 8},
                {class: 'ds-icon-game-jx115', id: '1-3-2', menuid: '79', title: '江西十一选五', gameid: 7},
                {class: 'ds-icon-game-hb115', id: '1-3-3', menuid: '75', title: '湖北十一选五', gameid: 22},
                {url: 'G115', class: 'ds-icon-game-11ydj', id: '1-3-4', menuid: '73', title: '十一运夺金', gameid: 6},
                {url: 'G115', class: 'ds-icon-game-kt115', id: '1-3-5', menuid: '74', title: '快投11选5', gameid: 11}
              ]
            },
            {
              title: '快三',
              url: 'K3',
              // width: '1.8rem',
              items: [
                {class: 'ds-icon-game-ahK3', id: '1-4-1', menuid: '82', title: '安徽快三', gameid: 23},
                {class: 'ds-icon-game-jsK3', id: '1-4-2', menuid: '83', title: '江苏快三', gameid: 24},
                {class: 'ds-icon-game-jlK3', id: '1-4-3', menuid: '84', title: '吉林快三', gameid: 25},
                {class: 'ds-icon-game-bjK3', id: '1-4-4', menuid: '85', title: '北京快三', gameid: 26},
                {class: 'ds-icon-game-ktK3', id: '1-4-5', menuid: '81', title: '快投快三', gameid: 15}
              ]
            },
            {
              title: '其它游戏',
              // withIcon: true,
              // class: 'ds-icon-item',
              // url: 'K3',
              items: [
                {url: 'PK10', class: 'ds-icon-game-bjpk10', id: '1-5-1', menuid: '80', title: '北京PK10', gameid: 13},
                {url: 'SSL3D', class: 'ds-icon-game-fc', id: '1-5-2', menuid: '61', title: '福彩3D', gameid: 9},
                {url: 'SSL', class: 'ds-icon-game-pl35', id: '1-5-3', menuid: '60', title: '排列三、五', gameid: 10},
                {url: 'SSL', class: 'ds-icon-game-pl5', id: '1-5-4', menuid: '62', title: '排列五', gameid: 5},
                {url: 'SSL3D', class: 'ds-icon-game-kt3D', id: '1-5-5', menuid: '19', title: '快投3D', gameid: 14}
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
                  menuid: '87',
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
                // {
                //   id: '3-3-2',
                //   menuid: '29',
                //   title: '分红详情',
                //   url: 'StockDetail'
                //   // position: {
                //   //   width: '5.4rem',
                //   //   height: '6.8rem'
                //   // }
                // },
                {
                  id: '3-3-3',
                  menuid: '44',
                  title: '契约列表',
                  url: 'Contract'
                },
                {
                  id: '3-3-4',
                  title: '契约详情',
                  url: 'ContractDetail',
                  position: {
                    width: '5.4rem',
                    height: '6.8rem'
                  }
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
                  url: 'ChartAnalysis',
                  position: {
                    'min-width': '9.5rem'
                  }
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
                }
                // {
                //   id: '4-2-2',
                //   title: '追号记录详情',
                //   url: 'FollowDetail',
                //   position: {
                //     width: '10rem'
                //   }
                // }
              ]
            },
            // @TODO @next
            // {
            //   id: '4-3',
            //   title: '跟单中心',
            //   items: [
            //     {
            //       id: '4-3-1',
            //       menuid: '56',
            //       title: '跟单中心',
            //       url: 'FollowOrder'
            //     }
            //   ]
            // },
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
                // {
                //   id: '4-5-4',
                //   title: '个人盈亏明细',
                //   url: 'ProfitLossDetail'
                // },
                {
                  id: '4-5-2',
                  menuid: '67',
                  title: '帐变列表',
                  position: {
                    width: '12rem'
                  },
                  url: 'Account'
                },
                {
                  id: '4-5-3',
                  menuid: '89',
                  title: '走势图',
                  position: {
                    width: '16.3rem'
                  },
                  url: 'TrendChart'
                },
                {
                  id: '4-5-5',
                  menuid: '78',
                  title: '我的日工资详情',
                  url: 'DaySalary'
                }
              ]
            }
          ]
        },
        {
          id: 5,
          class: 'ds-icon-gift',
          title: '活动中心',
          // href: '/activity/5-1-1',
          url: 'activity',
          menuid: '6',
          groups: [
            {
              title: '活动中心',
              items: [
                {id: '5-1-1', menuid: '71', title: '活动中心', url: 'Activity'},
                {id: '5-1-2', menuid: '72', title: '礼品箱', url: 'Gift'}
              ]
            }
          ]
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
                  url: 'PlayHelp',
                  menuid: '68'
                },
                {
                  id: '6-1-2',
                  title: '功能介绍',
                  url: 'FunctionHelp',
                  menuid: '69'
                },
                {
                  id: '6-1-3',
                  title: '常见问题',
                  url: 'QuestionHelp',
                  menuid: '70'
                }
              ]
            },
            {
              id: '6-2',
              title: '系统',
              hide: true,
              items: [
                {
                  id: '6-2-1',
                  title: '系统公告',
                  menuid: '90',
                  url: 'System'
                  // menuid: '68'
                },
                {
                  id: '6-2-2',
                  title: '意见反馈',
                  menuid: '91',
                  url: 'Feedback'
                }
              ]
            }
          ]
        },
        {
          id: 7,
          class: 'ds-icon-download',
          href: '/download/7-1-1',
          title: '下载'
        },
        {
          id: 8,
          class: 'ds-icon-chat',
          url: 'chat'
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
        return t.opened && !t.removed
      })
    },
    currentab () {
      return this.ctabs.filter(t => {
        return t.active
      })
    },
    // 1: pre !== current 2: pre.size !== 'minus'
    prev () {
      let prev = {prev: 0, href: '/'}
      this.tabs.find(t => {
        if (t.prev > prev.prev && t.id !== (this.currentab[0] || {}).id && t.size !== 'minus') prev = t
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
          else this.tabs.find(t => t.id === tab.id && (t = tab))
        })
        this.tabs = this.tabs.filter(t => t.opened && !t.removed)
      }
    }
    // // 如果路由有变化，会再次执行该方法
    // '$route': 'openRoute'
  },
  mounted () {
    // 登录isTop = 1
    this.setPages(this._getPages())
    window.NProgress.done()
  },
  methods: {
    // openRoute ({path}) {
    //   // 如果出现在登录页面并且用户是登录状态
    //   if (path.startsWith('/login') && store.state.user.login) {
    //     this.logout(true)
    //   }
    // },
    _getPages () {
      console.log('menus changed!!! or Menu need reauthority')
      return this.menus.reduce((p, m, mi) => {
        // delete un authority
        if (this.menuids && m.menuid && this.menuids.indexOf(m.menuid) === -1) {
          // this.menus.splice(mi, 1)
          this.$set(m, 'removed', true)
          return p
        } else {
          this.$set(m, 'removed', false)
        }
        m.groups = m.groups || []
        return m.groups.reduce((p, g, gi) => {
          // delete un authority
          if (m.removed || (this.menuids && g.menuid && this.menuids.indexOf(g.menuid) === -1)) {
            // m.groups.splice(gi, 1)
            this.$set(g, 'removed', true)
            return p
          } else {
            this.$set(g, 'removed', false)
          }
          g.items = g.items || []
          // if (g.items.length >= 8) g.items = util.groupArray(g.items, 4)
          return g.items.reduce((p, i, ii) => {
            // delete un authority
            if (g.removed || (this.menuids && i.menuid && this.menuids.indexOf(i.menuid) === -1)) {
              // g.items.splice(ii, 1)
              this.$set(i, 'removed', true)
              return p
            } else {
              this.$set(i, 'removed', false)
            }
            i.menuClass = g.class || m.class
            i = Object.assign({}, {
              opened: false,
              active: false,
              // pre activated
              prev: 0,
              star: false,
              defaultSize: '',
              size: '',
              url: g.url || '',
              href: i.href || ('/' + m.url + '/' + i.id),
              // class: g.class || '',
              menuClass: g.class || m.class
              // can't be star
              // noStar: m.hide
            }, i)
            if (g.position) i.position = g.position
            p.push(i)
            return p
          }, p)
        }, p)
      }, [])
    },
    openTab (url, same) {
      if (this.$route.params.url === url) !this.openPage(url) && this.$router.push('/')
      else this.openAnotherPage(url)
    },
    openAnotherPage (url) {
      if (this.tabs.length < this.maxPages || this.loop || this.tabs.find(t => t.id === url)) this.state.pages.find(p => p.id === url) && this.$router.push(this.state.pages.find(p => p.id === url).href)
      // else {
      //   this.$modal.warn({
      //     content: '最大窗口打开数：' + this.maxPages,
      //     btn: ['确定']
      //   })
      // }
    },
    closeTab (url, nurl) {
      this.updatePage(url, {opened: false, position: null})
      this.$nextTick(() => {
        // after close open the pre one
        if (nurl) {
          this.openTab(nurl)
        } else if (this.tabs.length === 0) {
          setTimeout(() => {
            this.$router.push('/')
          }, 100)
        } else this.$router.push(this.prev.href)
      })
    },
    // setMenus (menus) {
    //   this.menus = menus
    // },
    logout (args) {
      this.$http.get(api.logout)
      this.setUser()
      cookie.remove('JSESSIONID')
      if (!args) this.$router.push('/login')
      if (args && args.fn) args.fn()
      this.__logoutChat()
    },
    __logout (args) {
      this.logout(args)
    },
    __logoutChat () {
      window.accessAngular.close('您已退出聊天系统！')
    },
    // 5、查询菜单、桌面、收藏夹 PC接口
    getUserPrefence () {
      this.$http.get(api.getUserPrefence).then(({data}) => {
        // success
        if (data.success === 1) {
          this.menuids = data.menuList
          this.setPages(this._getPages())
          this.tabs.forEach((t, i) => {
            if (!this.state.pages.find(x => x.id === t.id)) {
              this.tabs.splice(i, 1)
            } else {
              this.tabs.splice(i, 1, Object.assign(this.state.pages.find(x => x.id === t.id), {opened: true, size: 'minus'}))
            }
          })
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
          this.setUser({amoney: data.availableBalance, money: data.channelBalance, free: data.freeAvaiable})
        }
      }, (rep) => {
        // error
      })
    }
  },
  components: {
    dsHeader,
    dsFooter
    // Chat
  }
}
</script>
<style lang="stylus">
  @import './var.stylus'
  html
    height 100%
    width 100%
    font-size 100px
    overflow hidden
    min-height 600px
    min-width 800px
    font-family Arial, Helvetica, sans-serif, "Microsoft YaHei"
  
  body
    height 100%
    width 100%
    font-size .14rem
    color #666
    margin 0
    background url($ASSETS/bg.jpg) center center no-repeat
    background-size cover
  
  body:fullscreen #app > * {
    background url($ASSETS/bg.jpg) center center no-repeat
  }
  body:full-screen #app > * {
    background url($ASSETS/bg.jpg) center center no-repeat
  }
  body:-moz-full-screen #app > * {
    background url($ASSETS/bg.jpg) center center no-repeat
  }
</style>

<style lang="stylus">
  @import './var.stylus'
  @import './main.stylus'
  @import './night.stylus'
  @import './1600.stylus'
  // @import './chat.night.stylus'
  
  
    
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
    // z-index 1
  .scroll-content
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow-x hidden
    overflow-y auto
    overflow-scrolling touch
    // radius(x = .05rem)
    // &.has-header
    //   top HH
    &.has-footer
      bottom FH
      @media(max-width: 1362px)
        bottom 2*FH
      @media(max-width: 862px)
        bottom 3*FH 
    
      

// define transition common timming function and time
[class*=-enter]
[class*=-leave]
// [class*=-move]
  transition all linear .2s // @static 2

.zoom-enter-active, .zoom-leave-active
    // opacity 0
    // transform perspective(500px) translateZ(-5000px)
    opacity .2
    transform perspective(500px) translateZ(-1000px)
    
    
.slide-enter, .slide-leave-active
  opacity 0
  transform translateX(100%)
  
.slide-up-enter, .slide-up-leave-active
  opacity 0
  transform translateY(-100%)
.slide-down-enter, .slide-down-leave-active
  opacity 0
  transform translateY(100%)
.slide-left-enter, .slide-left-leave-active
  opacity 0
  transform translateX(-100%)
.fade-enter, .fade-leave-active
  opacity 0
  &.dialog-container
    transition all linear 0s // @static 2

  
  

// define for main page
.page
  &[class*=-leave]
    // transition-delay .5s
  
  // &[adjusting]
  //   top 0
  //   bottom 0
    
.back
  // define for main page when back 
  &>.page
    &[class*=-leave]
      transition-delay 0s
      z-index 1
    &[class*=-enter]
      transform none

// .dialog-container .dialog-page>.scroll-content
//   width 100%
//   left 50%
//   transform translateX(-50%)
</style>
