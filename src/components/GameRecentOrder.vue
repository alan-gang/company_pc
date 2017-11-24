<template lang="jade">
  el-row.game-recent-order
    br
    p.text-blue 最近投注记录

    el-table.header-bold.nopadding(:data="Cdata" v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" style="margin-top: .1rem;")

      el-table-column(prop="issue" label="期号" width="100")

      el-table-column(prop="methodName" label="玩法" width="100")

      el-table-column(prop="code" label="投注内容" min-width="120" show-overflow-tooltip=true)
        template(scope="scope")
          p {{ scope.row.code }}
            span(v-if="scope.row.position") [{{ scope.row.position }}]  

      el-table-column(prop="totalPrice" label="总金额" width="80")
        template(scope="scope")
          span {{ scope.row.totalPrice }}

      el-table-column(class-name="pr2" prop="bonus" label="奖金" width="60" align="right")
        template(scope="scope")
          span {{ scope.row.bonus }}

      el-table-column(label="状态" width="70")
        template(scope="scope")
          span(:class="{ 'text-danger': scope.row.stat === 3,  'text-grey': scope.row.stat === 0, 'text-green': scope.row.stat === 2, 'text-black': scope.row.stat === 1}") {{ STATUS[scope.row.stat] }}
      
      el-table-column(label="操作" wdith="50")
        template(scope="scope")
          div
            .ds-button.text-button.blue(v-if=" scope.row.canCancel === 1 " style="padding: 0 .05rem" @click=" cancel(scope.row) ") 撤消
            .ds-button.text-button.blue(style="padding: 0 .05rem" @click.stop=" callPrint(scope.row) ") 打印


        
</template>

<script>
// import util from '../util'
import api from '../http/api'
// import M from '../util/M'
export default {
  props: {
    type: Object,
    gameid: Number
    // gameType: String,
    // allLuckyNumbers: Array
    // title: String
  },
  data () {
    return {
      Cdata: [],
      STATUS: ['未开奖', '已中奖', '未中奖', '已撤单']
    }
  },
  computed: {
    callId () {
      return this.gameid + '|' + this.type.id
    }
  },
  mounted () {
    this.Orderlist()
  },
  methods: {
    callPrint (row) {
      this.__setCall({
        fn: '__print',
        args: {
          // '注单编号': row.projectId,
          // '用户': row.userName,
          '投注时间': row.writeTime,
          '游戏': row.lotteryName,
          '玩法': row.methodName,
          '期号': row.issue,
          // '投注内容': row.code,
          // '投注位置': row.position,
          '投注内容': row.code + (row.position ? '[' + row.position + ']' : ''),
          // '倍数': row.multiple,
          // '模式': row.modes,
          '总金额': row.totalPrice + '元'
          // '奖金': row.bonus,
          // '开奖号码': row.prizeCode
        },
        callId: undefined
      })
    },
    ableRowClassName (row, index) {
      if (row.selected) return 'selected-row'
    },
    setSelected (row) {
      this.$set(row, 'selected', !row.selected)
      // row.selected = !row.selected
    },
    __orderlist () {
      this.Orderlist()
    },
    Orderlist () {
      this.$http.mypost(api.Orderlist, {
        scope: 0,
        lotteryId: this.gameid,
        page: 1,
        pageSize: 5
      }).then(({data}) => {
        // success
        if (data.success === 1) {
          this.Cdata = data.recordList
        }
      }, (rep) => {
        // error
      })
    },
    cancel (row, force) {
      if (!force && parseInt(row.totalPrice) >= 5000) {
        return this.$modal.question({
          content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">投注注单金额超过 <span class="text-danger">5000</span> 会收取 <span class="text-danger">0.5%</span> 的手续费注，将扣除您<span class="text-danger"> ' + parseFloat(row.totalPrice) * 0.005 + ' </span>元手续费， 您确定要撤单吗？</div>',
          target: this.$el.parentNode,
          O: this,
          ok () {
            this.cancel(row, true)
          }
        })
      }
      let loading = this.$loading({
        text: '撤单中...',
        target: this.$el
      }, 10000, '撤单超时...')
      this.$http.get(api.cancel, {id: row.projectId}).then(({data}) => {
        // success
        if (data.success === 1) {
          setTimeout(() => {
            loading.text = '撤单成功!'
            setTimeout(() => {
              this.Orderlist()
              this.__setCall({fn: '__getUserFund', callId: undefined})
            }, 500)
          }, 500)
        } else loading.text = '撤单失败!'
      }, (rep) => {
        // error
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 1000)
      })
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
  .game-recent-order
    .el-table__empty-block
      position relative
      height 0
      background none
      &:after
        content '投注记录当前为空！'
      .el-table__empty-text
        display none
        
    
    
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .game-recent-order
    overflow-y auto
    padding 0 PW
    radius()
    background #ededed
    display none
    position absolute
    left 0
    right 0
    top "calc(100% - %s)" % 1.85rem
    min-height 1rem
    max-height 1.9rem
    
     
</style>
