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

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName" max-height="400")

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
      


      
</template>

<script>
  import api from '../../http/api'
  import { dateTimeFormat } from '../../util/Date'
  export default {
    data () {
      return {
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
        data: []
      }
    },
    computed: {
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
        this.$http.get(this.type === 0 ? api.myBonus : api.mySubBouns, {
          startDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
          endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
          status: this.s.id || ''
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            let bonus = data.myBonus || data.mySubBonus
            this.data = bonus
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