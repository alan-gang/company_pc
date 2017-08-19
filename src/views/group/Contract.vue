<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content
      
      
      .form(v-if="stepIndex === 0 ")
        
        div(style="text-align: center; min-height: .2rem")
          .ds-button-group(v-if="me.role > 2")
            .ds-button.x-small.text-button(:class=" { selected: type === 0 } " @click=" type = 0 " ) 我的契约
            .ds-button.x-small.text-button(:class=" { selected: type === 1 } " @click=" type = 1 " ) 下级契约
        label.item 契约生效时间范围 
          el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")

        // label.item 契约结束时间从 
        //   el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
        //   |  至 
        //   el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")
          
        label.item  &nbsp;状态 
          el-select(clearable v-model="s"  placeholder="全")
            el-option( v-for="S in STATUS.slice(0, 4)" v-bind:label="S.title" v-bind:value="S")
        | &nbsp;&nbsp;
        .ds-button.primary.large.bold(@click="contract") 搜索

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName")

          el-table-column(prop="userName" label="用户名" width="150" v-if="type === 1")

          el-table-column(prop="expireTm" label="契约结束时间" width="150" )

          el-table-column(prop="beginTm" label="契约开始时间" width="150" )

          el-table-column(prop="status" label="状态" align="center" width="150")
            template(scope="scope")
              span(:class=" { 'text-danger': scope.row.stat === '未签订',  'text-blue': scope.row.stat === '待确认', 'text-green': scope.row.stat === '已签订'} ") {{ scope.row.stat }}

          el-table-column(label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(v-if=" scope.row.stat !== '未签订' "  style="padding: 0 .05rem" @click.stop=" goContractDetail(scope.row.id) ") 查看详情
              .ds-button.text-button.blue(v-if=" type === 1 && scope.row.stat === '未签订' " style="padding: 0 .05rem" @click="++stepIndex && (user = scope.row)") 新建契约
              .ds-button.text-button.blue(v-if=" type === 1 && (scope.row.stat === '已签订' || scope.row.stat === '已拒绝' || scope.row.stat === '待确认')" style="padding: 0 .05rem" @click="++stepIndex && (user = scope.row)") 重新发起
      

      div(v-if="stepIndex === 1 ")

        .notice(style="margin-top: .2rem")
            span.title 温馨提示：
            p.content
              span.text-danger 在您和下级签订了签约以后，如果每期的下级契约分红没有完成发放，则您的提款和代充功能将暂时会被禁用
              br
              | 1. 
              span.text-danger 销量
              | 和
              span.text-danger 亏损
              | 只要达到规则，都应按照规则的分红比例派发分红
              br
              | 2. 
              span.text-danger [手动发放]
              | 即每次发分红的时候需要您进入团队管理的
              span.text-danger 分红列表-分红详情
              | 中进行点击确认发放
              br
              | 3. 
              span.text-danger [自动发放]
              | 是在您资金足够的情况下，由系统根据您设置的规则自动发放下级分红，资金不足则交由您
              span.text-danger 手动执行
              br
              | 4. 契约执行周期为：每月
              span.text-danger 1号
              | 和
              span.text-danger 16号
              

        p.title.text-black
          span.ds-button.text-button.blue(style="float: right" @click="stepIndex--") {{ '<返回上一页' }}


        div(style="margin: 0 10% 0 25%; margin-top: .3rem; min-width: 6rem" v-bind:class="[ user.state ]")

          

          p.item.block
            span.text-danger *
            | 用户名：&nbsp;&nbsp;&nbsp;&nbsp;
            span.text-black {{ user.userName }}

          .item.block
            span.text-danger *
            | 契约时间：
            el-date-picker(:picker-options="ApickerOptions" v-model="stEtA" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")
          
          p.item.block
             span.text-danger *
             | 发放周期：
             span.text-black(style="padding: 0 .16rem") {{ time[me.shareCycle] }}

          p.item.block
            span.text-danger *
            | 发放方式：
            label.text-black(style="padding: 0; margin-left: -.05rem ").ds-radio-label(@click=" sendType = 0 " v-bind:class=" { active: sendType === 0 } ")
               span.ds-radio.white.
               | 手动发放
            label.text-black(style="padding: 0 .1rem").ds-radio-label(@click=" sendType = 1 " v-bind:class=" { active: sendType === 1 } ")
              span.ds-radio.white.
              | 自动发放
              span.text-green  ( 推荐 )

          //p.item.block
          //   span.text-danger *
          //   | 按时间：
 
          //   label.text-black(style="padding: 0 .1rem").ds-radio-label.disabled(@click=" AT = 0 " v-bind:class=" { active: AT === 0 } ")
          //     span.ds-radio.white.
          //     | 月
          //   label.text-black(style="padding: 0 .1rem").ds-radio-label.disabled(@click=" AT = 1 " v-bind:class=" { active: AT === 1 } ")
          //     span.ds-radio.white.
          //     | 周
 
          //   label.text-black(style="padding: 0 .1rem").ds-radio-label.disabled(@click=" AT = 2 " v-bind:class=" { active: AT === 2} ")
          //     span.ds-radio.white.
          //     | 日

          p.item.block(v-for=" (CR, i) in CRULES ")
            span.text-danger {{ i===0? '*': '&nbsp;'}}
            | {{ CR.title }} ：&nbsp;&nbsp;&nbsp;
            span.text-black 累计 
            el-select(v-model="CR.ruletype" style="width: .7rem" placeholder="全")
              el-option(v-for="R in TYPE" v-bind:label="R.title" v-bind:value="R.id")
            | &nbsp;&nbsp;
            el-input-number.text-danger.text-right(style="width: .8rem;" v-model="CR.sales")
            span.text-black  万，分红比例 
            el-input-number.text-danger.text-right(style="width: .6rem;" v-model="CR.bounsRate" v-bind:max="99")
            |  %

          .buttons.item.block(style="padding-left: .55rem")
            .ds-button.x-small.text-button.el-icon-plus.blue(@click=" ruleLength++ " v-if="ruleLength < 11")
              span.text-black &nbsp;再加一行

            .ds-button.x-small.text-button.el-icon-minus.blue(@click=" ruleLength-- " v-if="ruleLength > 3 ")
              span.text-black &nbsp;减最后一行

          .buttons.item.block(style="padding-left: .6rem")
            .ds-button.primary.bold(@click="createContract") 确认发送


        
</template>

<script>
  import api from '../../http/api'
  import { dateTimeFormat } from '../../util/Date'
  import store from '../../store'
  export default {
    data () {
      return {
        // 0 我的契约
        // 1 下级契约
        pickerOptions: {
          shortcuts: [{
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 360)
              picker.$emit('pick', [start, end])
            }
          }]
          // disabledDate (time) {
          //   return time.getTime() > Date.now()
          // }
        },
        ApickerOptions: {
          shortcuts: [{
            text: '今起一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 360)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() < Date.now()
          }
        },
        defaultStEt: ['', ''],
        stEt: ['', ''],
        stEtA: ['', ''],
        me: store.state.user,
        time: ['', '月', '半月', '周'],
        type: 0,
        // st: '',
        // et: '',
        STATUS: [
          {id: '0', title: '待确认'},
          {id: 1, title: '已签订'},
          {id: 2, title: '未签订', reason: '已作废'},
          {id: 3, title: '已拒绝', reason: '已拒绝'},
          {id: 4, title: '待确认', reason: '重新发起'}
        ],
        s: {},
        data: [],

        stepIndex: 0,
        user: {},
        // st1: '',
        // et1: '',
        sendType: 1,
        AT: 0,
        // 规则一：累计
        TYPE: [{id: 0, title: '销售'}, {id: 1, title: '亏损'}],
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
      },
      dataRules () {
        return this.CRULES.filter(c => c.sales > 0 && c.bounsRate > 0).map(n => {
          return {
            ruletype: n.ruletype,
            sales: n.sales,
            bounsRate: n.bounsRate
          }
        })
      },
      hasRepeat () {
        return this.dataRules.reduce((p, m, i) => {
          let M = Object.assign({}, m)
          delete M.bounsRate
          if (p[JSON.stringify(M)]) {
            p.flag = true
          } else {
            p[JSON.stringify(M)] = true
          }
          return p
        }, {}).flag
      }
    },
    watch: {
      type () {
        this.contract()
      },
      hasRepeat () {
        this.hasRepeat && this.$modal.warn({
          target: this.$el,
          content: '请不要输入相同相似的规则!',
          btn: ['好的']
        })
      },
      stEt: {
        deep: true,
        handler () {
          if (!this.stEt) this.stEt = this.defaultStEt
          if (this.stEt[0] && this.stEt[1] && new Date(this.stEt[0]).getTime() === new Date(this.stEt[1]).getTime()) {
            this.stEt[1] = dateTimeFormat(new Date(this.stEt[1]).getTime() + 3600 * 1000 * 24 - 1000)
          }
        }
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
          // beginDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
          startDate: this.stEt[0] ? dateTimeFormat(new Date(this.stEt[0]).getTime()).replace(/[\s:-]*/g, '') : '',
          // endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
          endDate: this.stEt[1] ? dateTimeFormat(new Date(this.stEt[1]).getTime()).replace(/[\s:-]*/g, '') : '',
          // startDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
          // endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
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
        // let data = this.CRULES.slice()
        // data.forEach(c => {
        //   c.bounsRate /= 100
        //   delete c.title
        // })
        if (!this.stEtA[0] || !this.stEtA[1]) {
          return this.$message.warning({target: this.$el, message: '请选择契约时间！'})
        }
        if (!this.dataRules[0]) {
          return this.$message.warning({target: this.$el, message: '请至少设置一条契约规则！'})
        }
        if (this.hasRepeat) {
          return this.$modal.warn({
            target: this.$el,
            content: '请不要输入完全相同的规则!',
            btn: ['好的']
          })
        }
        this.$http.post(api.createContract, {
          beginTm: dateTimeFormat(new Date(this.stEtA[0]).getTime()).replace(/[\s:-]*/g, ''),
          expireTm: dateTimeFormat(new Date(this.stEtA[1]).getTime()).replace(/[\s:-]*/g, ''),
          userId: this.user.userId,
          sendType: this.sendType,
          // sharecycle: this.AT,
          // bonusRuleList: JSON.stringify(data)
          bonusRuleList: JSON.stringify(this.dataRules)
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.$modal.success({
              content: '契约发送成功！',
              btn: ['确定'],
              target: this.$el,
              close () {
                this.stepIndex--
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
  
  .notice
    font-size .12rem
    line-height .22rem
    margin 0 .2rem
    padding PWX
    background-color #fffde8
    border 1px solid #d5d09b
    radius()
    .content
      display inline-block
      margin 0
      line-height .25rem
      vertical-align top

</style>
