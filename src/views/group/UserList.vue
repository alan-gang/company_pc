<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content
      
      // 用户列表
      .form.form-filters(v-show="stepIndex === 0")
        label.item 用户名 
          input.ds-input.small(v-model="name" @keyup.enter="searNow")

        label.item 返点级别 
          el-input(v-model="minPoint" style="width: .5rem")
          |  至 
          el-input(v-model="maxPoint" style="width: .5rem")
        

        label.item 注册方式 
          el-select(clearable v-model="rg" placeholder="全部" style="width: .8rem")
            el-option(v-for="F in RG" v-bind:label="F.title" v-bind:value="F.id")

        label.item 排序 
          el-select(clearable v-model="f" placeholder="默认排序" style="width: 1.1rem")
            el-option(v-for="F in Filters" v-bind:label="F.title" v-bind:value="F.id")
        label.item 
          el-select(clearable v-model=" btos " placeholder="默认" style="width: .8rem")
            el-option(v-for="(F, i) in ['升序', '降序']" v-bind:label="F" v-bind:value=" i ")
        | &nbsp;&nbsp;

        .buttons(style="margin-left: .45rem;")
          .ds-button.primary.large.bold(@click="searNow") 搜索
          .ds-button.primary.large.bold(style="float: right" @click.stop="addUserNow") 增加用户
          .ds-button.cancel.large(@click="clear") 清空
      
      .table-list(style="padding: .15rem .2rem " v-show="stepIndex === 0")
        p(style="margin: 0 0 .15rem 0" )
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" @click.native=" link(B, i) " ) {{ i === 0 ? '我的用户' : B.userName }}

        el-table.header-bold.nopadding(ref="table" v-bind:data="data" v-bind:max-height=" MH "  @cell-click="cellClick" v-bind:row-class-name="tableRowClassName" stripe)
          
          // 用户名
          el-table-column(class-name="pl2" prop="userName"  label="用户名" min-width=" 100 ")
            template(scope="scope")
              div
                span.pointer.text-blue(:class=" { 'text-danger': scope.row.userId === id } ") {{ scope.row.userName }}
                span.text-danger(v-if=" scope.row.isFrozen  ") (已冻结)

          // 返点级别
          el-table-column(prop="userPoint"  label="返点级别")
          
          // 团队总数
          el-table-column(prop="teamCount"  label="团队总数" )
          
          // 日工资 ? if showSalary
          el-table-column(prop="daySalary"  label="日工资" v-if=" showSalary  ")

          el-table-column(prop="teamBalance"  label="主帐户余额"  align="right")
              template(scope="scope")
                  span {{ numberWithCommas(scope.row.teamBalance) }}

          el-table-column(prop="speBalance"  label="特殊余额"  align="right")
              template(scope="scope")
                  span {{ numberWithCommas(scope.row.speBalance) }}


          el-table-column.pl1(class-name=" pl2"  prop="registerTime" label="注册时间" show-overflow-tooltip min-width="100" align="center")
            template(scope="scope")
              el-popover(v-bind:popper-class=" 'table-popover' " trigger="hover" placement="top")
                span(slot="reference") {{ scope.row.registerTime.split(' ')[0] }}
                slot
                  span {{ scope.row.registerTime }}

          el-table-column.pl1(prop="lastTime" label="最后登录时间" min-width="100")
            template(scope="scope")
              el-popover(v-bind:popper-class=" 'table-popover' " trigger="hover" placement="top")
                span(slot="reference") {{ scope.row.lastTime.split(' ')[0] }}
                slot
                  span {{ scope.row.lastTime }}

               


          el-table-column(label="代充"  align="center")
            template(scope="scope")
              span {{ scope.row.uploadlevel !== "0" ? '开启' : '关闭' }}

          el-table-column.pl1(class-name=" pl1 " label="注册方式" )
            template(scope="scope")
              span {{ scope.row.isAuto ? '自动' : '手动' }}


          el-table-column(label="操作" width="300")
            template(scope="scope")
              .ds-button.text-button.blue(v-if=" canTopUp && (scope.row.userId !== id) "  style="padding: 0 .05rem" @click=" (stepType = 'topUp') && ++stepIndex && (user = scope.row) ") 充值

              .ds-button.text-button.blue(v-if=" scope.row.isSub "  style="padding: 0 .05rem" @click=" (stepType = 'point') && ++stepIndex && (user = scope.row) && showAdjustInfo()  ") 调点

              .ds-button.text-button.blue(v-if=" (scope.row.userId !== id) && isAddAccount"  style="padding: 0 .05rem" @click=" (stepType = 'open') && ++stepIndex && (user = scope.row) && showUserAddCount()  ") 开户额
              
              .ds-button.text-button.blue(style="padding: 0 .05rem" v-if=" showSalary && scope.row.isSub" @click.stop=" (stepType = 'salary') && ++stepIndex && (user = scope.row) && ((o = scope.row.daySalary) || ( oo = scope.row.winSalary ))   ") 调整工资

              .ds-button.text-button.blue(style="padding: 0 .05rem;" @click="getTeamBalance(scope.row)") 团队余额
                
                div(v-if="scope.row.showTeanBalance")

                 span.text-danger {{numberWithCommas(scope.row.myTeamBalance) }}
        
        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > pageSize " v-on:current-change="pageChanged")

      // 充值
      transition-group(name="slide" appear=true tag="div")
        div(key="1" v-show="stepIndex === 1 && stepType === 'topUp' ")
          p.title.text-black(style="padding: .2rem 0 .2rem .2rem") 您正在给下级用户 
            span.text-blue {{ user.userName }}
            |  进行充值
            span.ds-button.text-button.blue(style="float: right" @click="topUpIndex > 0 ? topUpIndex-- : stepIndex--") {{ '<返回上一页' }} 

          p(style="padding-left: 30%; margin-top: .7rem" v-if="topUpIndex === 0") 
            
            | 资金密码：&nbsp;&nbsp;&nbsp;
            input.ds-input.large(v-model="cpwd" type="password" @keyup.enter="checkSecurityPwd")
            span(v-if=" me.safeCheck ")
              br
              br
              label(v-if=" me.safeCheck && me.safeCheck !== 3" ) 安全验证码：
                  input.ds-input.large(v-model="safeCheckCode" @keyup.enter="checkNow")
                  button.ds-button.secondary.outline(style="margin-left: .1rem;" @click="me.safeCheck === 1 ? sendSms() :  sendMail()"  v-bind:class="{ disabled: me.safeCheck === 1 ? pt_: et_ }" v-bind:disabled="(me.safeCheck === 1 ? pt_ : et_) > 0") 
                    span(v-if="!(me.safeCheck === 1 ? pt_ : et_ )") 发送验证码
                    span.text-black(v-if="(me.safeCheck === 1 ? pt_ : et_  )") {{ (me.safeCheck === 1 ? pt_ : et_ ) }} 
                      span.text-999 秒后可重新发送

              label(v-if="me.safeCheck === 3 " style="margin: .2rem 0") 信游安全码：
                  input.ds-input.large(v-model="safeCheckCode" @keyup.enter="checkNow")
            br
            span.ds-button.primary.large.bold(style="margin-left: .85rem; margin-top: .2rem" @click="checkNow") 下一步


          p(style="padding-left: 30%; margin-top: .7rem" v-if="topUpIndex === 1") 
            | 代充来源：&nbsp;&nbsp;&nbsp;
            el-select(v-model=" mtype " style="width: 2.2rem; position: relative; top: -.01rem")
              el-option(v-for=" (m, i) in moneyTypes " v-bind:label=" m " v-bind:value="i ")
            br
            br
            | 可用余额：&nbsp;&nbsp;&nbsp;&nbsp;{{ mtype ? me.smoney : me.amoney }}
            br
            br
            |充值金额：&nbsp;&nbsp;&nbsp;
            el-input-number.large(style="width: 2.2rem" v-model="money" @keyup.enter.native=" checkTopup ") 
            span.text-money  {{ textMoney }}
            span.text-999(v-if=" topUpMax || topUpMin ")  ({{ topUpMin }} - {{ topUpMax }}元)

            <br>
            span.ds-button.primary.large.bold(style="margin-left: .85rem; margin-top: .2rem" @click=" checkTopup") 下一步

          p(style="padding-left: 30%; margin-top: .7rem" v-if="topUpIndex === 2") 充值金额：
            span.amount {{ money }}
            | 元   
            span.text-money  {{ textMoney }}
            br
            span.ds-button.primary.large.bold(style="margin-left: .85rem; margin-top: .15rem" @click="recharge") 确认

        div(key="2" v-if="stepIndex === 1 && stepType === 'salary' ")
          p.title.text-black(style="padding: .2rem 0 .2rem .2rem") 您正在给下级用户 
            span.text-blue {{ user.userName }}
            |  调整工资级别
            span.ds-button.text-button.blue(style="float: right" @click="stepIndex--") {{ '<返回上一页' }} 

          p(style="padding-left: 30%; margin-top: .7rem")
            span.text-danger *
            日工资：&nbsp;&nbsp;
            el-select(v-model="o" style="width: 2.2rem; position: relative; top: -.01rem")
              el-option(v-for="O in OL" v-bind:label="O.name" v-bind:value="O.value")

          p(style="padding-left: 30%; margin-top: .15rem") 
            | 团队销量：
            el-input-number(v-model="teamSales")
            |  万

          p(style="padding-left: 30%; margin-top: .15rem") 
            | 有效用户：
            el-input-number(v-model="activityCount")
            |  人
            span.text-999（投注达到500为有效用户）
            br
            span.ds-button.primary.large.bold(style="margin-left: .7rem; margin-top: .15rem" @click="setSalary") 确认




        // 升点、降点
        div(key="3" v-show="stepIndex === 1 && stepType === 'point' ")

          p.title.text-black(style="padding: .2rem 0 .2rem .2rem") 您正在给下级用户 
            span.text-blue {{ user.userName }}
            |  进行调点
            span.ds-button.text-button.blue(style="float: right" @click=" stepIndex-- ") {{ '<返回上一页' }} 

          p(style="text-align: center; margin-top: .2rem") 
            | &nbsp;&nbsp;&nbsp;&nbsp;您的返点级别：
            span.text-danger {{ myPoint }}
            
          div(style="text-align: center; margin-top: .1rem")
            .ds-button-group(style="margin: 0")
              .ds-button.text-button(:class=" { selected: pointType === 'up' } " @click=" pointType='up' ") 升点
              .ds-button.text-button(:class=" { selected: pointType === 'down' }" @click=" pointType='down'  ") 降点


          .notice(style="margin: .2rem" v-if=" pointType === 'down' ")
            p.content
              | 降点必须量
              span.text-danger 低于
              | 最低量要求，才能降点

          div(style="padding: 0 .2rem" v-if=" pointType === 'down' ")

            el-table.header-bold(:data="pointData[pointType]"  style="margin: .2rem 0")

              el-table-column(prop="level" label="返点等级" )

              el-table-column(prop="prize" label="最高奖金" )

              el-table-column(prop="30Days" label="30天投注量(万)" )

          hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin:  .1rem")
        
          p(style="padding: .1rem .4rem" v-if=" pointType === 'down' ") 该帐户30天总量：
            span.text-danger {{ thirtyDaysAmount }}


          p(style="padding: .1rem .4rem" v-if="PS.length !== 0") 剩余开户额：&nbsp;&nbsp;
            label(style="display: inline-block")
              span(style="margin: 0 .15rem " v-for="P in PS")
                span.text-blue [{{ P.point }}]:
                span.text-danger {{ P.n }}个


          p(style="padding: 0rem .4rem") 您下级( 
            span.text-blue {{ user.userName }}
            |  )的返点级别：
            span.amount {{ user.userPoint }}
            | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ pointType === 'up' ? '上升返点：' : '下降返点：' }}
            el-input( v-model="point" style="width: .6rem")

            span.text-money  (可填范围：{{ range[pointType].min }}~{{ range[pointType].max }})


          div.buttons(style="padding: .1rem .4rem")
            .ds-button.primary.large.bold(@click="adjustPoint") {{ pointType === 'up' ? '升点' : '降点' }}

        
        // 开户额
        div(key="4" v-show="stepIndex === 1 && stepType === 'open' ")
          p.title.text-black(style="padding: .2rem 0 .2rem .2rem") 您正在给下级用户 
              span.text-blue {{ user.userName }}
              |  调整开户额
              span.ds-button.text-button.blue(style="float: right" @click=" stepIndex-- ") {{ '<返回上一页' }} 

            p(style="text-align: center; margin-top: .2rem") 帐号: 
              span.text-blue {{ user.name }} 
              | &nbsp;&nbsp;&nbsp;&nbsp;昵称: 
              span.text-black {{ user.userName }} 
              | &nbsp;&nbsp;&nbsp;&nbsp;返点级别：
              span.text-danger {{ user.userPoint }}

          div(style="padding: 0 1rem")

            el-table.header-bold.margin(:data="openUserData" style="margin: .2rem auto; width: 6rem")

              el-table-column(prop="name" label="开户级别" align="center" width="120" v-if=" platform !== 'ds' ")

              el-table-column(prop="src" label="我的剩余开户额" width="150" align="right")

              el-table-column(prop="dest" label="下级剩余开户额" width="150" align="right")

              el-table-column(label="为下级增加开户额" align="center")
                template(scope="scope")
                  el-input-number.center(v-model="scope.row.i" v-bind:min="0" v-bind:max="scope.row.src")
                  
    
          hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin:  .1rem")
          div.buttons(style="padding: .1rem .4rem; text-align: center")
            .ds-button.primary.large.bold(v-if="openUserData[0]" @click="distriAddCount") 分配开户额






      
</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import { digitUppercase, numberWithCommas } from '../../util/Number'
  import store from '../../store'
  import xhr from 'components/xhr'
  import api from '../../http/api'
  export default {
    mixins: [xhr, setTableMaxHeight],
    data () {
      return {
        numberWithCommas: numberWithCommas,
        TH: 300,
        showDaySalary: 0,
        showSalary: 0,
        // me: store.state.user,
        me: store.state.user,
        id: '',
        myPoint: '',
        stepIndex: 0,
        // topUp, point
        stepType: 'topUp',
        topUpIndex: 0,
        pointType: 'up',
        name: '',
        minMoney: '',
        maxMoney: '',
        minPoint: '',
        maxPoint: '',
        // 日工资
        OL: [],
        o: '',
        // 中奖工资
        OOL: [],
        oo: '',
        rg: '',
        RG: [
          {id: 1, title: '自动'},
          {id: 2, title: '手动'}
        ],
        // 默认排序 返点级别，账户余额，注册时间，登录时间，日工资
        f: '',
        Filters: [
          {id: 1, title: '返点级别'},
          {id: 2, title: '帐户余额'},
          {id: 3, title: '注册时间'},
          {id: 4, title: '登录时间'}
          // {id: 5, title: '日工资'}
        ],
        // o: {},
        // // 用户级别
        // UL: [
        //   {id: 1, title: '代理用户'},
        //   {id: 2, title: '会员用户'}
        // ],
        // u: {},
        // 从大到小
        btos: 0,
        // 面包
        BL: [
          {title: '我的用户'},
          {}
        ],
        data: [],
        pageSize: 20,
        // pageSize: 10,
        total: 0,
        currentPage: 1,
        preOptions: {},
        // 下级
        user: { account: 'xxxx', name: 'xxxxx', point: 7.5 },
        cpwd: '',
        money: 0,

        // 调点
        PS: [],
        // 调点类型 1 2
        AT: 0,
        pointData: {
          up: [],
          down: []
        },
        range: {
          up: {},
          down: {}
        },
        point: '',
        threeDaysAmount: 0,
        sevenDaysAmount: 0,
        thirtyDaysAmount: 0,
        openUserData: [],
        isAddAccount: 0,
        // 给下级充值
        canTopUp: false,
        safeCheckCode: '',
        // checkSafeCodeUrl: ['', api.checkMailVerifyCode, api.checkSmsVerifyCode, api.checkGoogleAuth],
        checkSafeCodeUrl: ['', api.person_checkSmsVerifyCode, api.person_checkMailVerifyCode, api.checkGoogleAuth],
        topUpMax: '',
        topUpMin: '',
        moneyTypes: ['可用余额', '特殊金额'],
        mtype: 0,
        teamSales: 0,
        activityCount: 0
      }
    },
    computed: {
      textMoney () {
        return digitUppercase(this.money)
      }
    },
    watch: {
      // point () {
      //   setTimeout(() => {
      //     let i = (this.point + '').lastIndexOf('.')
      //     if (i !== -1 && (this.point + '').slice(i).length > 2) {
      //       this.point = parseFloat((Math.floor(this.point * 100) / 100).toFixed(1))
      //     }
      //   })
      // },
      stepIndex () {
        if (this.stepIndex === 0) this.getUserList()
      },
      point () {
        setTimeout(() => {
          this.point = this.point.trim()
          this.point = this.point.replace(/[^0-9,.]/g, '').replace(/[,.]{2,}/g, ',')
          let [l, r, t] = this.point.split('.')
          if (r) this.point = l + '.' + r.slice(0, 1)
          if ((r && r.split(/[,]/)[1]) || t) this.point = l + '.' + r.split(/[.,]/)[0].slice(0, 1)
        }, 0)
      }
    },
    mounted () {
      this.getUserList()
    },
    methods: {
      // &salary=20&teamSale=200&actvityCount=0&userId=7
      // 设置日工资：
      setSalary () {
        // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=recharge&destId=5&amount=100.5
        let loading = this.$loading({
          text: '工资调整中...',
          target: this.$el
        }, 10000, '工资调整超时...')
        this.$http.post(api.setSalary, {
          userId: this.user.userId,
          salary: this.o,
          activityCount: this.activityCount,
          teamSale: this.teamSales
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '工资调整成功!'
              this.stepIndex = 0
              // this.subSalaryList()
            }, 100)
          } else loading.text = data.msg || '工资调整失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      pageChanged (cp) {
        this.getUserList('', cp, () => {
          this.currentPage = cp
        })
      },
      tableRowClassName (row) {
        if (this.id === row.userId) return 'text-danger'
      },
      checkTopup () {
        if ((this.money <= (this.mtype ? this.me.smoney : this.me.amoney)) && (this.topUpMax || this.topUpMin) && (this.money <= this.topUpMax && this.money >= this.topUpMin) || !(this.topUpMax || this.topUpMin)) {
          this.topUpIndex++
        } else {
          this.$message.warning({target: this.$el, message: '您输入的金额过小或过大！'})
        }
      },
      getTeamBalance (row) {
        row.showTeanBalance = !row.showTeanBalance
        if (!row.showTeanBalance) return false
        this.$http.post(api.getTeamBalance, {userId: row.userId}).then(({data}) => {
          if (data.success === 1) {
            // row.myTeamBalance = data.
            // this.pt_ = this.time_
            row.myTeamBalance = data.teamBalance
          } else {
            this.$message.error({target: this.$el, message: data.msg || '团队余额获取失败！'})
          }
        }).catch(rep => {
        })
      },
      sendSms () {
        this.$http.post(api.person_sendSms, {}).then(({data}) => {
          if (data.success === 1) {
            this.$message.success({target: this.$el, message: '恭喜您， 手机验证码发送成功，请注意查收。'})
            this.pt_ = this.time_
          } else {
            this.$message.error({target: this.$el, message: data.msg || '手机验证码发送失败！'})
          }
        }).catch(rep => {
        })
      },
      sendMail () {
        this.$http.post(api.person_sendMail, {}).then(({data}) => {
          if (data.success === 1) {
            this.$message.success({target: this.$el, message: '恭喜您， 邮箱验证码发送成功，请注意查收。'})
            this.et_ = this.time_
          } else {
            this.$message.error({target: this.$el, message: data.msg || '邮箱验证码发送失败！'})
          }
        }).catch(rep => {
        })
      },
      checkNow () {
        if (!this.cpwd) return this.$message.warning({target: this.$el, message: '请输入资金密码！'})
        if (this.me.safeCheck && !this.safeCheckCode) return this.$message.warning({target: this.$el, message: '请输入安全验证码！'})
        this.checkSecurityPwd()
      },
      checkSafeCode () {
        this.$http.post(this.checkSafeCodeUrl[this.me.safeCheck], {verifyCode: this.safeCheckCode}).then(({data}) => {
          if (data.success === 1) {
            this.topUpIndex++
            this.$message.success({target: this.$el, message: data.msg || '安全码验证成功！'})
            this.__setCall({fn: '__getUserFund'})
            // this.getUserBankCards()
          } else {
            this.$message.error({target: this.$el, message: data.msg || '安全码错误！'})
          }
        }).catch(rep => {
          this.$message.error({target: this.$el, message: '安全验证失败！'})
        })
      },
      // 设置日工资：
      // http://192.168.169.161:8080/cagamesclient/team/useList.do?method=setSubDaySalary&destUserId=51&daySalary=50
      setSubDaySalary () {
        // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=recharge&destId=5&amount=100.5
        let loading = this.$loading({
          text: '工资调整中...',
          target: this.$el
        }, 10000, '工资调整超时...')
        this.$http.get(api.setSubDaySalary, {
          destUserId: this.user.userId,
          // daySalary: this.o
          winSalary: this.oo,
          loseSalary: this.o
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '工资调整成功!'
              this.stepIndex = 0
              this.topUpIndex = 0
            }, 100)
          } else loading.text = data.msg || '工资调整失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      clear () {
        this.name = ''
        // this.minMoney = ''
        // this.maxMoney = ''
        this.minPoint = ''
        this.maxPoint = ''
        this.rg = ''
        this.f = ''
        this.btos = ''
      },
      // sortByteamBalance (a, b) {
      //   console.log(a, b)
      //   return a > b
      // },
      cellClick (row, column, cell, event) {
        if (column.property === 'userName') {
          this.clear()
          // this.BL.push({
          //   id: row.userId,
          //   title: row.userName
          // })
          this.getUserList(row.userId)
        }
      },
      link (B, i) {
        // if (i !== B.length - 1) {
          // this.BL = this.BL.slice(0, i + 1)
          // this.getUserList()
        // }
        this.clear()
        this.getUserList(B.id)
      },
      searNow () {
        this.BL = this.BL.slice(0, 1)
        this.getUserList()
      },
      addUserNow () {
        this.$router.push('/group/3-2-1')
      },
      getUserList (id, page, fn) {
        // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=getUserList&userName=dd&minPoint=0&maxPoint=8&maxBalance=100000&minBalance=0&startRegistTime=20161101000000&endRegistTime=20161231000000
        // console.log(this.$refs['table'])
        let loading = this.$loading({
          text: '用户列表加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')

        if (!fn) {
          this.preOptions = {
            userId: id || this.BL[this.BL.length - 1].id,
            userName: this.name,
            minPoint: this.minPoint,
            maxPoint: this.maxPoint,
            cType: this.rg,
            sortType: this.f,
            sort: !this.btos ? 1 : 2,
            // minBalance: this.minMoney || '',
            // maxBalance: this.maxMoney || '',
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }

        this.$http.post(api.getUserList, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            // 当前登录用户的固定信息
            this.id = data.currUserId
            // 开户
            this.isAddAccount = data.isAddAccount
            // 代充
            this.canTopUp = data.uploadLevel !== '0'
            // 代充范围
            if (this.canTopUp) {
              this.topUpMax = parseInt(data.uploadLevel.split('-')[1])
              this.topUpMin = parseInt(data.uploadLevel.split('-')[0])
            }
            this.BL = (data.userBreads).concat([{}])

            // static 1st
            data.subUserInfo[0] && (data.subUserInfo[0].static = true)
            // self = self and 1st
            // data.subUserInfo[0] && (this.BL.length === 1) && (data.subUserInfo[0].userId === data.currUserId) && (data.subUserInfo[0].self = true)

            // 日工资已迁移至新页面
            // this.showSalary = data.showSalary
            // this.showDaySalary = data.showDaySalary
            // this.OL = data.loseSlaryData
            // this.OOL = data.winSlaryData
            this.showSalary = data.showSalary
            this.OL = data.salaryComb

            this.data = data.subUserInfo.map(o => {
              o.showTeanBalance = false
              o.myTeamBalance = '获取中...'
              return o
            })
            this.total = data.totalSize || this.data.length
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            // this.data = data.recordList
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      checkSecurityPwd () {
        this.$http.post(api.checkSecurityPwd, {password: this.cpwd}).then(({data}) => {
          if (data.success === 1) {
            if (this.me.safeCheck) {
              return this.checkSafeCode()
            } else this.topUpIndex++
            // this.topUpIndex++
            // this.$message.success({target: this.$el, message: data.msg || '资金密码密码验证成功！'})
          } else {
            this.$message.error({target: this.$el, message: data.msg || '资金密码错误！'})
          }
        }).catch(rep => {
          this.$message.error({target: this.$el, message: '资金密码密码验证失败！'})
        })
      },
      recharge () {
        // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=recharge&destId=5&amount=100.5
        let loading = this.$loading({
          text: '充值中...',
          target: this.$el
        }, 10000, '充值超时...')
        this.$http.get(api.recharge, {
          destId: this.user.userId,
          amount: this.money,
          isSpe: this.mtype
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '充值成功!'
              this.stepIndex = 0
              this.topUpIndex = 0
            }, 100)
          } else loading.text = data.msg || '充值失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=showAdjustInfo&destUserId=5
      showAdjustInfo () {
        this.$http.get(api.showAdjustInfo, {
          destUserId: this.user.userId
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.myPoint = data.userpoint
            this.pointData = data.downPoint
            this.range.up = data.rang.up
            this.range.down = data.rang.down
            this.pointData.up = data.upPoint
            this.pointData.down = data.downPoint
            this.threeDaysAmount = data['3DaysAmount']
            this.sevenDaysAmount = data['7DaysAmount']
            this.thirtyDaysAmount = data['buy30Amount']
            this.PS = (data.addUsersKeys || []).map(k => {
              return (k = {
                point: k,
                n: data[k]
              })
            })
          }
        }, (rep) => {
          // error
        })
      },
      adjustPoint () {
        if (this.point > this.range[this.pointType].max || this.point < this.range[this.pointType].min) return this.$message.warning({target: this.$el, message: '返点值太大或太小！'})
        this.$http.get(api.adjustPoint, {
          destUserId: this.user.userId,
          adjustType: this.pointType === 'up' ? 0 : 1,
          increaseType: this.AT,
          point: this.point
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.$message.success('调点成功！')
            this.stepIndex = 0
          } else this.$message.error(data.msg || '调点失败！')
        }, (rep) => {
          // error
        })
      },
      showUserAddCount () {
        this.$http.post(api.showUserAddCount, {
          destUserId: this.user.userId
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            data.addUsersKeys.forEach(k => {
              k.i = 0
            })
            this.openUserData = data.addUsersKeys
          } else {
            this.openUserData = []
            this.$message.error(data.msg || '开户额数据获取失败！')
          }
        }, (rep) => {
          // error
          this.$message.error('开户额数据获取失败！')
        })
      },
      distriAddCount () {
        let items = []
        if (!this.openUserData.find(o => o.i > 0)) return this.$message.warning({target: this.$el, message: '您确定要调整下级开户额吗？ 输入的值需 >0 哦'})
        this.openUserData.forEach(o => {
          items.push({
            gId: o.gId,
            n: o.i
          })
        })
        this.$http.post(api.distriAddCount, {
          destUserId: this.user.userId,
          items: JSON.stringify(items)
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.showUserAddCount()
            this.$message.success('开户额调整成功！')
            this.stepIndex = 0
          } else this.$message.error(data.msg || '开户额调整失败！')
        }, (rep) => {
          // error
          this.$message.error('开户额调整失败！')
        })
      },
      goBonus () {
        if (this.user.userId) {
          this.$router.push({
            path: '/me/2-3-1',
            query: {
              userId: this.user.userId
            }
          })
        }
      }
      // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=distriUserAddCount&destUserId=5&levelVip=1&levelOne=1&levelTwo=1&levelThree1
      // 用配额点
      // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=adjustPoint&destUserId=5&adjustType=0&increaseType=1&point=0.1
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .user-list
    top TH
    .form
      padding PWX

  .item
    display inline-block
    margin 0 PW .1rem 0

    
  .el-select
  .el-input-number
    width 1.2rem
  .el-select
    position relative
    top .01rem
  .amount
    font-family Roboto
    font-size 0.72rem
    color #333
  .text-money
    color #999
  
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
