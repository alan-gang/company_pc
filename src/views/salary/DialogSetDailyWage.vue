<template lang="jade">
  .modal.inner-modal.dialog-set-daily-wage(v-show="showDialogSetWage" )
    .mask
    .box-wrapper
      .box(ref="box")
        .tool-bar
          span.title 日工资设置
          el-button-group
            el-button.close(icon="close" @click=" did = ''")

        p(style="padding-left: 30%; margin-top: .7rem")
          span.text-danger * 日工资：&nbsp;&nbsp;
          el-select(v-model="o" style="width: 2.2rem; position: relative; top: -.01rem")
            el-option(v-for="O in OL.filter(x => x.value >= user.daySalary) " v-bind:label="O.name" v-bind:value="O.value")

        p(style="padding-left: 30%; margin-top: .15rem") 
          | 团队销量：
          el-input-number(v-model="teamSales")
          |  万

        p(style="padding-left: 30%; margin-top: .15rem") 
          | 有效用户：
          el-input-number(v-model="activityCount")
          |  人
          span.text-999 （投注达到500为有效用户）
          br
          span.ds-button.primary.large.bold(style="margin-left: .7rem; margin-top: .15rem" @click="setSalary") 确认

</template>

<script>
import api from '../../http/api'
export default {
  name: '',
  data () {
    return {
      OL: [],
      userId: '',
      activityCount: 0,
      teamSales: ''
    }
  },
  props: {
    showDialogSetWage: {
      type: Boolean,
      default: false
    },
    id: Number
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList (id, page, fn) {
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
        }
      }, (rep) => {
        // error
      }).finally(() => {
      })
    },
    // 设置日工资：
    setSalary () {
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
    }
  }
}
</script>

<style lang="stylus">
.dialog-set-daily-wage
  .box
    width: 10rem 
    max-height 9rem 
    height 6.2rem
  
</style>
