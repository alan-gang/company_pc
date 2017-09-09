<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content(:class="[myClass]" v-bind:style=" { backgroundColor: bg, color: color } ")
      img.banner(:src="src")
      .info
        .title 活动时间
        .content {{ st }} - {{ et }}

      .info
        .title 活动内容
        pre.content {{ content }}

      .info
        .title 活动规则
        pre.content {{ rule }}

        .list(v-if="list && list[0]" )

          el-row.list-title
            el-col(:span="8") {{ '首存金额'}}
            el-col(:span="5" style="text-align: right") {{ '现金礼包'}} 
            el-col(:span="8" style="text-align: right") {{ '累计投注额标准'}}  

          el-row.list-item(v-for=" l in list " )
            el-col(:span="8") {{ l.minSaveAmount }}-- {{ l.maxSaveAmount }}
            el-col(:span="5" style="text-align: right") {{ l.prizeAmount }}
            el-col(:span="8" style="text-align: right") {{ l.buyAmount }}

        .list(v-if="list9 && list9[0]" )

          el-row.list-title
            el-col(:span="8") {{ '名次' }}
            el-col(:span="5" style="text-align: right") {{ '金额' }} 
            el-col(:span="8" style="text-align: right") {{ '预算' }}  

          el-row.list-item(v-for=" l in list9 " )
            el-col(:span="8") {{ l.levelName }}
            el-col(:span="5" style="text-align: right") {{ l.prizeAmount }}
            el-col(:span="8" style="text-align: right") {{ l.buyAmount }}

        // 签到
        .list(v-if="expand && expand[0]" )

          el-row.list-title
            el-col(:span="8") 签到类型
            el-col(:span="5" style="text-align: right") 天数
            el-col(:span="8" style="text-align: right") 礼金

          el-row.list-item(v-for=" l in expand " )
            el-col(:span="8") {{ l.expandName }}
            el-col(:span="5" style="text-align: right") {{ l.expandValue + l.expandUnit }}
            el-col(:span="8" style="text-align: right") {{ l.expandPrize }}


      .actions(v-if="showBtns")
        // router-link.ds-button.tall.high-positive._3rem.oval(:to=" to " v-if="id === 1 && showbtn1" @click.native.stop="") 立即注册
        // router-link.ds-button.tall.high-positive._3rem.oval(:to=" to " v-if="id === 2 && showbtn1" @click.native.stop="") 立即绑定
        // router-link.ds-button.tall.high-positive._3rem.oval(:to=" to " v-if="id === 3 && showbtn1" @click.native.stop="") 立即参与
        // router-link.ds-button.tall.high-positive._3rem.oval(:to=" to " v-if="id === 4 || id === 6 && showbtn1" @click.native.stop="") 立即充值
        // router-link.ds-button.tall.high-positive._3rem.oval(:to=" to " v-if="id === 5 && showbtn1" @click.native.stop="") 立即提现
        router-link.ds-button.tall.high-positive._3rem.oval(:to=" '/activity/5-1-2' " v-if="showbtn2"  @click.native.stop="") 去领奖

</template>
<script>
import api from '../../http/api'
export default {
  data () {
    return {
      st: '',
      et: '',
      content: '',
      rule: '',
      enable: 1,
      list: [],
      expand: [],
      list9: []
    }
  },
  computed: {
    message () {
      switch (this.enable) {
        case -1:
          return '活动还没开始！'
        case -2:
          return '活动已经结束！'
        case -3:
          return '今日活动还没开始！'
        case 0:
          return '您不满足活动条件！'
        case 1:
          return '您满足活动条件！'
        default:
          return ''
      }
    },
    showBtns () {
      return this.enable !== -1 || this.enable !== 0
    },
    showbtn1 () {
      return this.enable !== 1
    },
    showbtn2 () {
      return this.enable === 1
    }
  },
  mounted () {
    // block8/3 console.log(this.$route.query.id, '???')
    if (this.$route.query.id) this.id = this.$route.query.id
    this.__getActivityDetail()
  },
  methods: {
    // 根据活动id查询活动详情
    // http://192.168.169.44:9901/cagamesclient/activity.do?method=getActivityDetail&entry=1
    // getActivityDetail: '/activity.do?method=getActivityDetail&entry=1',
    __getActivityDetail () {
      // let loading = this.$loading({
      //   text: '活动详情加载中...',
      //   target: this.$el
      // }, 10000, '加载超时...')
      this.$http.get(api.getActivityDetail, {entry: this.id}).then(({data}) => {
        // success
        if (data.success === 1) {
          this.enable = data.enable
          this.st = data.beginDate
          this.et = data.endDate
          this.content = data.content
          this.rule = data.ruleDesc
          console.log(String(this.id) === String(9))
          if (String(this.id) === String(9)) {
            this.list9 = data.saveDetail || []
          } else {
            this.list = data.saveDetail || []
          }
          this.expand = data.expand || []
          data.msg && this.$message.info(data.msg || this.message)
        } else this.$message.error(data.msg || '活动详情加载失败！')
      }, (rep) => {
        // error
        this.$message.error('活动详情加载失败！')
      }).finally(() => {
        // setTimeout(() => {
        //   loading.close()
        // }, 1500)
      })
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    &.content-shadow
      .content
        font-shadow()
    top TH
    border-bottom-left-radius .05rem    
    border-bottom-right-radius .05rem  
    color #fff
    .banner
      width 100%
    
    .info 
      margin .4rem PWX
      .title
        display inline-block
        padding 0 PWX
        height .4rem
        line-height .4rem
        background-color YELLOW
        radius(.2rem)
        font-size .18rem
        shadow()
        color #000
      .content
        margin PW
      .list
        min-width 5rem
        .list-title 
          height .36rem
          background-color rgba(0,0,0,.5)
          line-height .36rem
        .list-item 
          height .4rem
          line-height .4rem
          background-color rgba(255, 255, 255, .1)
          border-bottom 1px solid rgba(255, 255, 255, .1)
        .el-col
          min-width 1rem
          padding 0 PWX
      
    .actions
      margin .7rem PWX
      text-align center
        
</style>



