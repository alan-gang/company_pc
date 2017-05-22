<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      
      .form

        div(style="text-align: center")
          .ds-button-group
            .ds-button.x-small.text-button(:class=" { selected: type === 0 } " @click=" type = 0 " ) 我的分红
            .ds-button.x-small.text-button(:class=" { selected: type === 1 } " @click=" type = 1 " ) 下级分红
        label.item 契约结束时间从 
          el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
          |  至 
          el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")
          
        label.item  &nbsp;状态 
          el-select(v-model="s")
            el-option(v-for="S in STATUS" v-bind:label="S.title" v-bind:value="S")

        .ds-button.primary.large.bold(@click="bonus") 搜索

        el-table.header-bold.nopadding(:data="bonusList" v-bind:row-class-name="tableRowClassName" max-height="400" v-show=" !(type === 0 && me.role < 4)")

          el-table-column(prop="nickName" label="用户名" width="80" v-if="type === 1")

          el-table-column(prop="expireTm" label="契约结束时间" width="140" )

          el-table-column(prop="beginTm" label="契约开始时间" width="140" )

          el-table-column(label="累计销量" width="100" align="right")
            template(scope="scope")
              span {{ scope.row.ruleType === 0 ? scope.row.sales : '--' }}

          el-table-column(label="累计盈亏" width="100" align="right")
            template(scope="scope")
              span {{ scope.row.ruleType === 1 ? scope.row.sales : '--' }}

          el-table-column(prop="bouns" label="理论分红金额" width="120" align="right")

          el-table-column(prop="status" label="状态" align="center" width="80")
             template(scope="scope")
              span(:class="{ 'text-green': scope.row.isDone > 1, 'text-blue': scope.row.isDone < 2 }") {{ STATUS[scope.row.isDone].title }}

          el-table-column(prop="userpoint" label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(style="padding: 0 .05rem" @click="goStockDetail(scope.row.id)") 查看详情


        el-table.header-bold.nopadding(:data="topBonuList" max-height="400" v-on:expand="expand" v-show=" (type === 0 && me.role < 4)")

          el-table-column(type="expand")
            template(scope="scope")
              el-table.header-bold.nopadding(:data="topDetailList")
                el-table-column(prop="creatTime" label="创建日期" width="140" )
                el-table-column(prop="times" label="发放日期" width="140" )
                // el-table-column(prop="startDate" label="分红开始日期" width="140" )
                // el-table-column(prop="endDate" label="分红结束日期" width="140" )
                el-table-column(prop="relatName" label="关联用户" width="80" )
                // el-table-column(prop="conBeginTm" label="契约开始日期" width="140" )
                // el-table-column(prop="conExPireTm" label="契约过期日期" width="140" )
                el-table-column(prop="bonusRate" label="分红比率" width="80" )
                el-table-column(prop="saleAmount" label="销售金额" width="100" )
                el-table-column(prop="profitAmoun" label="盈亏金额" width="100" )
                el-table-column(prop="bonusBook" label="理论分红" width="100" )
                el-table-column(prop="bonus" label="实际分红" width="100" )
                el-table-column(prop="" label="状态" align="center" width="80")
                   template(scope="scope")
                    span(:class="{ 'text-green': scope.row.isDone > 0, 'text-blue': scope.row.isDone < 1 }") {{ ['未发放', '已发放'][scope.row.isDone]}}
                el-table-column(prop="userpoint" label="操作" align="center")
                    template(scope="scope")
                      .ds-button.text-button.blue(style="padding: 0 .05rem" @click="goContractDetail(scope.row.contractId)") 查看契约详情

          el-table-column(prop="issue" label="期号" width="140")
          el-table-column(prop="date" label="理论发放日期" width="140" )
          el-table-column(prop="uTime" label="更新时间" width="140" )
          el-table-column(prop="monthlyBuy" label="月销售额" width="140" )
          el-table-column(prop="monthlyProfit" label="月盈亏额" width="140" )
          el-table-column(prop="bookProfit" label="理论盈亏" width="140" )
          el-table-column(prop="totalProfit" label="总盈亏" width="140" )
          el-table-column(prop="shareBook" label="理论分红金额" width="140" )
          el-table-column(prop="shareAmount" label="分红金额" width="140" )
          el-table-column(label="奖金类型" align="center" width="80")
            template(scope="scope")
              span {{ ['团队分红', '关联分红'][scope.row.bonusType - 1]}}

          el-table-column(label="是否累积" align="center" width="80")
            template(scope="scope")
              span {{ ['否', '是'][scope.row.isGrand]}}


          el-table-column(prop="" label="状态" align="center" width="80")
             template(scope="scope")
              span(:class="{ 'text-green': scope.row.isSend > 0, 'text-blue': scope.row.isSend < 1 }") {{ ['未发放', '已发放'][scope.row.isSend]}}
      


      
</template>

<script>
  import api from '../../http/api'
  import store from '../../store'
  import { dateTimeFormat } from '../../util/Date'
  export default {
    data () {
      return {
        me: store.state.user,
        // 0 我的分红
        // 1 下级分红
        type: 0,
        st: '',
        et: '',
        // 分红状态
        STATUS: [
          {id: 0, title: '未发放', class: 'waiting-pay'},
          {id: 1, title: '待确认', class: 'wait'},
          {id: 2, title: '已发放', class: 'paid'},
          {id: 3, title: '平台外已发放', class: 'paid-out'}
        ],
        s: {},
        bonusList: [],
        topBonuList: [],
        topDetailList: []
      }
    },
    computed: {
      apiBonus () {
        return this.me.role < 4 ? [api.topBonus, api.mySubBouns][this.type] : [api.myBonus, api.mySubBouns][this.type]
      }
    },
    watch: {
      type () {
        this.bonus()
      }
    },
    mounted () {
      this.bonus()
    },
    methods: {
      expand (row, expanded) {
        if (expanded && !row.topDetailList) {
          this.topBonuDetail(row)
        }
      },
      topBonuDetail (row) {
        let loading = this.$loading({
          text: '分红详情加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.topBonuDetail, {
          issue: row.issue
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.topDetailList = data.topDetailList
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
      goContractDetail (id) {
        this.$router.push({
          path: '/group/3-3-4',
          query: {id: id}
        })
      },
      goStockDetail (id) {
        this.$router.push({
          path: '/group/3-3-2',
          query: {id: id, self: !this.type}
        })
      },
      bonus () {
        let loading = this.$loading({
          text: '分红加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(this.apiBonus, {
          startDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
          endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
          status: this.s.id || ''
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            let bonus = data.myBonus || data.mySubBonus
            this.bonusList = bonus
            data.topBonuList && (this.topBonuList = data.topBonuList)
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
      }
      // 查询我的奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=myBonus&startDate=20170101200000&endDate=20170115200000
      // 查询下级奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=mySubContract&issue=20170301&sendType=1

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .stock-list
    top TH
    .form
      padding 0 PWX

  .item
    display inline-block
    margin 0 PW .1rem 0

    
  .el-select
  .el-input-number
    width 1rem

</style>
