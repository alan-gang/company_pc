<template lang="jade">
  .me-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .me-detail-info.scroll-content
      .base-info
        div.info
          label(style="margin: 0 .2rem") 帐号
            span.account {{ account }}
          label(style="margin: 0 .2rem") 昵称：
            span.account {{ name }}
          label(style="margin: 0 .2rem") 
              span.text-blue 高频彩资金
              | 限额：
              span.account.text-danger {{ limitbonus }}
              | 元
          label(style="margin: 0 .2rem") 
              span.text-blue 低频彩资金
              | 限额：
              span.account.text-danger {{ dplimitbonus }} 
              | 元

        .ds-button-group
          .ds-button.x-small.text-button(v-for="(game, key, i) in games" v-bind:class="{selected: skey === key}" @click="skey = key") {{ key }}

      el-table.header-bold(:data="data" v-bind:row-class-name="tableRowClassName" style="width: 8rem; margin: 0 auto")
        el-table-column(prop="methodName" label="玩法" width="200" )
        el-table-column(label="奖级" width="200")
          template(scope="scope") 
            .level(v-for=" l in ((scope.row.level + '').split(',')) ") {{ l + '等奖' }}

        el-table-column(label="奖金" width="100" align="right")
          template(scope="scope") 
            .level(v-for=" p in ((scope.row.prize + '').split(',')) ") {{ p  }}

        el-table-column(prop="userPoint" label="返点" width="150" align="right")
        el-table-column(prop="status" label="状态" align="center" width="150")
          template(scope="scope") {{ scope.row.isClose === 0 ? '使用中' : '已关闭' }}



      
      
</template>

<script>
import api from '../../http/api'
// import store from '../../store'
export default {
  data () {
    return {
      // me: store.state.user,
      account: '',
      name: '',
      dplimitbonus: '',
      limitbonus: '',
      games: [],
      skey: ''
      // data: [
      //  {title: '五星直选', bonusLevel: '奖金', bonus: '180000.00', point: '7.5', status: '使用中'}
      // ]
    }
  },
  computed: {
    data () {
      return this.games[this.skey]
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'openRoute'
  },
  mounted () {
    this.getLotteryPrinzeInfo(this.$route.query.userId || '')
  },
  methods: {
    openRoute ({path, query: {userId}}) {
      if (path !== '/me/2-3-1') return false
      if (userId) this.getLotteryPrinzeInfo(userId)
    },
    tableRowClassName (row, index) {
      if (row.selected) return 'selected-row'
    },
    getLotteryPrinzeInfo (userId) {
      this.$http.get(api.getLotteryPrinzeInfo, {destUserId: userId || ''}).then(({data}) => {
        if (data.success === 1) {
          this.account = data.userName
          this.name = data.nickName
          this.dplimitbonus = data.dplimitbonus
          this.limitbonus = data.limitbonus
          // this.games = data.lotteryPrizeInfo
          this.games = data.lotteryPrizeInfo
          this.skey = Object.keys(this.games)[0]
        }
      }).catch(rep => {
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    top TH
  .me-detail-info
    padding PWX
    .base-info
      text-align center
      color #333
      padding 0 .5rem
    .el-table
      color #333
      .th .cell
        font-weight bold

</style>