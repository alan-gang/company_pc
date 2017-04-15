<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content
      
      
      .form(v-if="stepIndex === 0 ")
        
        div(style="text-align: center")
          .ds-button-group
            .ds-button.x-small.text-button(:class=" { selected: type === 0 } " @click=" type = 0 " ) 我的契约
            .ds-button.x-small.text-button(:class=" { selected: type === 1 } " @click=" type = 1 " ) 下级契约

        label.item 契约结束时间从 
          el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
          |  至 
          el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")
          
        label.item  &nbsp;状态 
          el-select(clearable v-model="s"  placeholder="全")
            el-option( v-for="S in STATUS" v-bind:label="S.title" v-bind:value="S")
        | &nbsp;&nbsp;
        .ds-button.primary.large.bold(@click="contract") 搜索

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName")

          el-table-column(prop="nickName" label="用户名" width="150" v-if="type === 1")

          el-table-column(prop="expireTm" label="契约结束时间" width="150" )

          el-table-column(prop="beginTm" label="契约开始时间" width="150" )

          el-table-column(prop="status" label="状态" align="center" width="150")
            template(scope="scope")
              span(:class=" { 'text-danger': scope.row.stat === '未签订',  'text-blue': scope.row.stat === '待确认', 'text-green': scope.row.stat === '已签订'} ") {{ scope.row.stat }}

          el-table-column(label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(v-if=" scope.row.stat !== '未签订' "  style="padding: 0 .05rem" @click=" goContractDetail(scope.row.id) ") 查看详情
              .ds-button.text-button.blue(v-if=" type === 1 && scope.row.stat === '未签订' " style="padding: 0 .05rem" @click="++stepIndex && (user = scope.row)") 新建契约
              .ds-button.text-button.blue(v-if=" type === 1 && scope.row.stat === '待确认'" style="padding: 0 .05rem" @click="++stepIndex && (user = scope.row)") 重新发起
      

      div(v-if="stepIndex === 1 ")
        p.title(style="padding: .1rem 0 .1rem .2rem; color: #333")
          span.ds-button.text-button.blue(style="float: right" @click="stepIndex--") {{ '<返回上一页' }}


        div(style="margin: 0 10% 0 25%; margin-top: .3rem; min-width: 6rem" v-bind:class="[ user.state ]")

          p.item.block
            span.text-danger *
            | 用户名：&nbsp;&nbsp;&nbsp;&nbsp;
            span(style="color: #333") {{ user.nickName }}

          .item.block
            span.text-danger *
            | 契约时间：
            div(style="display: inline-block")
              
              el-date-picker(v-model="st1" type="datetime" placeholder="请选择日期时间")
              |  至 
              el-date-picker(v-model="et1" type="datetime" placeholder="请选择日期时间")

          // p.item.block
          //   span.text-danger *
          //   | 按时间：
 
          //   label(style="color: #333; padding: 0 .1rem").ds-radio-label(@click=" AT = 0 " v-bind:class=" { active: AT === 0 } ")
          //     span.ds-radio.white
          //     | 月
 
          //   label(style="color: #333; padding: 0 .1rem").ds-radio-label(@click=" AT = 1 " v-bind:class=" { active: AT === 1 } ")
          //     span.ds-radio.white
          //     | 周
 
          //   label(style="color: #333; padding: 0 .1rem").ds-radio-label(@click=" AT = 2 " v-bind:class=" { active: AT === 2} ")
          //     span.ds-radio.white
          //     | 日

          p.item.block(v-for=" (CR, i) in CRULES ")
            span.text-danger {{ i===0? '*': '&nbsp;'}}
            | {{ TYPE[CR.ruletype].title }} ：&nbsp;&nbsp;&nbsp;
            span(style="color: #333") 累计 
            el-select(clearable v-model="CR.ruletype" style="width: .7rem" placeholder="全")
              el-option(v-for="R in TYPE" v-bind:label="R.title" v-bind:value="R.id")
            | &nbsp;&nbsp;
            el-input-number.text-danger.text-right(style="width: .5rem;" v-model="CR.sales")
            span(style="color: #333")  万，分红比例 
            el-input-number.text-danger.text-right(style="width: .5rem;" v-model="CR.bounsRate")
            |  %

          .buttons.item.block(style="padding-left: .55rem" v-if="ruleLength < 11")
            .ds-button.x-small.text-button.el-icon-plus.blue(@click=" ruleLength++ ")
              span(style="color: #333") &nbsp;再加一行

            .ds-button.x-small.text-button.el-icon-minus.blue(@click=" ruleLength-- " v-if="ruleLength > 3 ")
              span(style="color: #333") &nbsp;减最后一行

          .buttons.item.block(style="padding-left: .6rem")
            .ds-button.primary.bold(@click="createContract") 确认发送


        
</template>

<script>
  import api from '../../http/api'
  import { dateTimeFormat } from '../../util/Date'
  export default {
    data () {
      return {
        // 0 我的契约
        // 1 下级契约
        type: 0,
        st: '',
        et: '',
        STATUS: [
          {id: 0, title: '待确认'},
          {id: 1, title: '已签订'},
          {id: 2, title: '未签订', reason: '已作废'},
          {id: 3, title: '已拒绝', reason: '已拒绝'},
          {id: 4, title: '待确认', reason: '重新发起'}
        ],
        s: {},
        data: [],

        stepIndex: 0,
        user: {},
        st1: '',
        et1: '',
        AT: 0,
        // 规则一：累计
        TYPE: [{id: 0, title: '销售'}, {id: 1, title: '盈利'}],
        r: {id: 0, title: '销售'},
        RULES: [
          {title: '规则一', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则二', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则三', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则四', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则五', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则六', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则七', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则八', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则九', ruletype: 0, sales: 0, bounsRate: 0},
          {title: '规则十', ruletype: 0, sales: 0, bounsRate: 0}
        ],
        ruleLength: 3
      }
    },
    computed: {
      CRULES () {
        return this.RULES.slice(0, this.ruleLength)
      }
    },
    watch: {
      type () {
        this.contract()
      }
    },
    mounted () {
      this.contract()
    },
    methods: {
      goContractDetail (id) {
        this.$router.push({
          path: '/group/3-3-4',
          query: {id: id, self: !this.type}
        })
      },
      contract () {
        let loading = this.$loading({
          text: '契约列表加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(this.type === 0 ? api.queryMyContract : api.mySubContract, {
          startDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
          endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
          status: this.s.id || ''
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            // data.mySubContract && data.mySubContract.forEach(c => {
            //   if (c.id <= 0) {
            //     c.stat = 2
            //     c.beginTm = '--'
            //     c.expireTm = '--'
            //   }
            // })
            this.data = data.contractList || data.mySubContract
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else {
            this.data = []
            loading.text = '加载失败!'
          }
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      },
      createContract () {
        let data = this.CRULES.slice()
        data.forEach(c => {
          c.bounsRate /= 100
          delete c.title
        })
        this.$http.post(api.createContract, {
          beginTm: this.st1 ? dateTimeFormat(this.st1.getTime()).replace(/[\s:-]*/g, '') : '',
          expireTm: this.et1 ? dateTimeFormat(this.et1.getTime()).replace(/[\s:-]*/g, '') : '',
          userId: this.user.userId,
          // sharecycle: this.AT,
          bonusRuleList: JSON.stringify(data)
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.$modal.success({
              content: '发送成功！',
              btn: ['确定'],
              target: this.$el,
              close () {
                this.contract()
              },
              O: this
            })
          }
        }, (rep) => {
          // error
          this.$message.error('契约创建失败！')
        })
      },
      qryContractById (contractId) {
        this.$http.post(api.qryContractById, {
        }).then(({data}) => {
          // success
          if (data.success === 1) {
          }
        }, (rep) => {
          // error
          this.$message.error('契约创建失败！')
        })
      },
      qryBonusById (contractId) {
        this.$http.post(api.qryBonusById, {
        }).then(({data}) => {
          // success
          if (data.success === 1) {
          }
        }, (rep) => {
          // error
          this.$message.error('契约创建失败！')
        })
      }
      // 按ID查询契约
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=qryContractById&contractId=12
      // qryContractById: api + 'team/contractBonus.do?method=qryContractById',
      // 按ID查询奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=qryBonusById&bonusId=1
      // qryBonusById: api + 'team/contractBonus.do?method=qryBonusById'
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
    &.block
      display block
  
  .el-select
  .el-input-number 
    width 1rem

</style>