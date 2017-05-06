<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    
    .contract.scroll-content(:class="{ center: !stock }")

      div(v-if="stock" style="margin: .3rem" v-bind:class=" ['ds-icon-stock-' + STATUS[stock.isDone].class ] ")
        h2.text-black(style="margin: .3rem 0; text-align: center") 分红详情
        p.item 用户名：&nbsp;&nbsp;&nbsp;{{ stock.nickName }} 
        p.item 分红状态：{{  STATUS[stock.isDone].title }} 
        p.item 本期时间：{{ stock.times }}
        p.item 时间类型：按{{ TIME[stock.shareCycle] }} 

        .item.text-danger(style="display: inline-block; margin: 0") 累计{{ TYPE[stock.ruleType].title }} {{ stock.sales }} 万，需发放 {{ stock.bouns }} 元
          // p.text-green(style="text-align: right; margin: .05rem 0") 分红已发放 100000 元
          // p.text-green(style=" margin: .05rem 0") 分红已全额发完

        .item.buttons(style="margin: .3rem 0" v-if=" !self && stock.isDone === 0  ")
          button.ds-button.large.bold.primary(@click="paid") 内部帐户发放
          button.ds-button.large.bold.cancel(@click="paidOut")平台外发放

        .item.buttons(style="margin: .3rem 0" v-if=" self && stock.isDone === 1  ")
          button.ds-button.large.bold.primary(@click="subCheckBonus") 已收到分红


      
</template>

<script>
  import store from '../../store'
  import api from '../../http/api'
  export default {
    data () {
      return {
        me: store.state.user,
        // 我的分红
        self: true,
        // 分红状态
        STATUS: [
          {id: 0, title: '未发放', class: 'waiting-pay'},
          {id: 1, title: '待确认', class: 'wait'},
          {id: 2, title: '已发放', class: 'paid'},
          {id: 3, title: '平台外已发放', class: 'paid-out'}
        ],
        // 契约时间类型
        TIME: ['月', '周', '日'],
        // 销售盈亏类型
        TYPE: [
          {id: 1, title: '销售'},
          {id: 2, title: '盈亏'}
        ],
        stock: null
      }
    },
    computed: {
      // apiBonusDetail () {
      //   return this.me.role < 4 ? api.topBonuDetail + '&issue=' : api.qryBonusById + '&bonusId='
      // }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'openRoute'
    },
    mounted () {
      this.self = this.$route.query.self
      this.qryBonusById(this.$route.query.id || '')
    },
    methods: {
      back () {
        this.$modal.redpocket({
          target: this.$el,
          content: '<h2 class="title">为jerry发放红包</h2><p class="content"><span class="amount">2236.00</span> 元</p>',
          btn: ['下一步']
        })
        this.$modal.redpocket({
          target: this.$el,
          content: '<p class="ds-icon-success-large" style="min-height: 64px"></p><h2 class="title">发放成功！</h2> ',
          btn: ['下一步']
        })
        this.$modal.redpocket({
          target: this.$el,
          content: '<h2 class="title">免责声明</h2><p class="content" style="text-align: left;">我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭</p>',
          btn: ['我知道了，下一步']
        })
        this.$modal.redpocket({
          target: this.$el,
          content: '<pstyle="min-height: 64px"></p><h2 class="title">已在平台外发放？</h2> ',
          btn: ['是的', '还没']
        })
      },
      openRoute ({path, query: {id, self}}) {
        if (path !== '/group/3-3-2') return false
        this.self = self
        if (id) this.qryBonusById(id)
      },
      qryBonusById (id) {
        let loading = this.$loading({
          text: '分红详情加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.qryBonusById, {
          bonusId: id
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.stock = (this.self && this.me.role < 4) ? data.topDetailList : data
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      },
      paid () {
        let modal = this.$modal.redpocket({
          target: this.$el,
          content: '<h2 class="title">为j' + this.stock.nickName + '发放红包</h2><p class="content"><span class="amount">2236.00</span> 元</p>',
          btn: ['下一步'],
          O: this,
          ok () {
            if (modal.btn[0] === '下一步') {
              modal.btn = ['确认发放']
              return false
            } else {
              this.paraentCheckBonus(1)
            }
          }
        })
      },
      paidOut () {
        let modal = this.$modal.redpocket({
          target: this.$el,
          content: '<h2 class="title">免责声明</h2><p class="content" style="text-align: left;">我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭我今天没有吃饭</p>',
          btn: ['我知道了，下一步'],
          O: this,
          ok () {
            if (modal.btn[0] === '我知道了，下一步') {
              modal.content = '<p style="min-height: 64px"></p><h2 class="title"> 已在平台外发放？</h2>'
              modal.btn = ['是的', '还没']
              return false
            } else {
              this.paraentCheckBonus(2)
            }
          }
        })
      },
      // 上级确认奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=paraentCheckBonus&bonusId=1&sendType=1
      paraentCheckBonus (type) {
        this.$http.get(api.paraentCheckBonus, {
          bonusId: this.stock.id,
          sendType: type
        }).then(({data}) => {
          if (data.success === 1) {
            if (type === 1) {
              this.$modal.redpocket({
                target: this.$el,
                content: '<p class="ds-icon-success-large" style="min-height: 64px"></p><h2 class="title">发放成功！</h2> ',
                btn: ['确定']
              })
            }
            this.qryBonusById(this.$route.query.id || '')
          }
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        })
      },
      subCheckBonus () {
        this.$http.get(api.subCheckBonus, {
          bonusId: this.stock.id
        }).then(({data}) => {
          if (data.success === 1) {
            this.$modal.success({
              target: this.$el,
              content: '恭喜您，分红收到确认成功！',
              btn: ['确定']
            })
            this.qryBonusById(this.stock.id)
          }
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        })
      }
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=subCheckBonus&bonusId=1
    }
  }
</script>

<style lang="stylus" scoped>

  @import '../../var.stylus'
  
  .contract
    top TH
    radius()
    // background #fff
    // text-align left
    &.center:after
      content ''
      height 100%
      width 0
      vertical-align middle
      display inline-block
    .form
      padding PWX

  .item
    margin .24rem 0
    text-align left
    padding-left 20%
  

 
</style>