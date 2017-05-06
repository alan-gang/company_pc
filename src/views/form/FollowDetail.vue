<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    div.info
      el-row
        el-col(:span="6")
          注单编号：
          span.text-black {{ detail.taskId }}
        el-col(:span="6")
          游戏用户：
          span.text-black {{ detail.nickName }}
        el-col(:span="6")
          追号时间：
          span.text-black {{ detail.begintime }}

        el-col(:span="6")
          游戏：
          span.text-black {{ detail.lotteryName }}

      el-row
        el-col(:span="6")
          玩法：
          span.text-black {{ detail.methodName }}
        el-col(:span="6")
          模式：
          span.text-black {{ MODES[detail.modes] }}
        el-col(:span="6")
          开始期号：
          span.text-black {{ detail.beginissue }}

        el-col(:span="6")
          追号期数:
          span.text-black {{ detail.issuecount }}
      
      el-row
        el-col(:span="6")
          完成期数：
          span.text-black {{ detail.finishedcount }}
        el-col(:span="6")
          取消期数：
          span.text-black {{ detail.cancelcount }}
        el-col(:span="6")
          追号总金额：
          span.text-black {{ detail.taskprice }}

        el-col(:span="6")
          完成金额：
          span.text-black {{ detail.finishprice }}

      el-row
        el-col(:span="6")
          中奖期数：
          span.text-black {{ detail.wincount }}
        el-col(:span="6")
          派奖总金额：
          span.text-black {{ detail.winprize }}
        el-col(:span="6")
          取消金额：
          span.text-black {{ detail.cancelPrice }}

        el-col(:span="6")
          中奖后终止任务：
          span.text-black {{ detail.stoponwin === 1 ? '是' : '否' }}

      el-row
        el-col(:span="6")
          追号内容：
          span.text-black {{ detail.codes }}
        el-col(:span="6")
          追号状态：
          span.text-black {{ STATUS[detail.status] }}
        el-col(:span="6")
        el-col(:span="6")

    .scroll-content.info(style="top: 2.1rem")
      el-table.header-bold.nopadding(:data="detail.taskDetailsList" max-height="600" @selection-change="handleSelectionChange")

        el-table-column(width="80" label="选择")
          template(scope="scope")
            .ds-checkbox-label.disabled(style="opacity: .4")
              .ds-checkbox.disabled(:class="{ active: scope.row.status === 0}")

        el-table-column(prop="issue" label="奖期")

        el-table-column(label="追号倍数")
          template(scope="scope")
            span {{ scope.row.multiple + '倍' }}
        el-table-column( label="追号状态" )
          template(scope="scope")
            span(:class="{ 'text-green': scope.row.status === 0, 'text-grey': scope.row.status === 2, 'text-danger': scope.row.status === 1}") {{ STATUS[scope.row.status] }}

        el-table-column(prop="userpoint" label="注单详情")
          template(scope="scope")
            .ds-button.text-button.blue(style="padding: 0 .05rem" @click="OrderDetail(scope.row.projectid)") 详情

    .buttons()
      .ds-button.primary.large.bold(@click="followCancel" v-if="canCancel") 终止追号 
    
    .modal(v-show="show" )
      .mask
      .box-wrapper
        .box
          .tool-bar
            span.title {{ title }} 投注详情
            el-button-group
              el-button(icon="close" @click="show = false")
          .content
            el-row
              el-col(:span="6")
                游戏用户：
                span.text-black {{ detail.name }}
              el-col(:span="6")
                游戏：
                span.text-black {{ detail.game }}
              el-col(:span="6")
                开奖号码：
                span.text-black {{ detail.game }}

              el-col(:span="6")
                总金额：
                span.text-black {{ detail.pay }}

            el-row
              el-col(:span="6")
                注单编号：
                span.text-black {{ detail.name }}
              el-col(:span="6")
                玩法：
                span.text-black {{ detail.game }}
              el-col(:span="6")
                注单状态：
                span.text-black {{ detail.game }}

              el-col(:span="6")
                倍数模式：
                span.text-black {{ detail.pay }}

            
            el-row
              el-col(:span="6")
                投单时间：
                span.text-black {{ detail.name }}
              el-col(:span="6")
                奖期：
                span.text-black {{ detail.game }}
              el-col(:span="6")
                注单奖金：
                span.text-black {{ detail.game }}

              el-col(:span="6")
                动态奖金返点：
                span.text-black {{ detail.pay }}

            p.textarea-label
              span.label 投注内容：
              el-input.font-12(v-model="value" type="textarea" autofocus  v-bind:autosize="{ minRows: 5, maxRows: 10 }" placeholder="每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开")

            p 可能中奖的情况：

            el-table.header-bold.nopadding(:data="[]" v-bind:row-class-name="tableRowClassName" style="margin: .15rem 0")

              el-table-column(prop="methodName" label="编号" width="160" )
                template(scope="scope")
                  .ds-button.text-button.blue(@click="") xxxx

              el-table-column(label="号码" width="160")
              

              el-table-column(prop="prize" label="倍数" width="80" align="right")

              el-table-column(prop="prize" label="奖级" width="80" align="right")

              el-table-column(prop="userpoint" label="奖金"  align="right")

</template>

<script>
  // import { digitUppercase } from '../../util/Number'
  // import store from '../../store'
  import api from '../../http/api'
  // import util from '../../util'
  export default {
    data () {
      return {
        MODES: ['元', '角', '分', '厘'],
        STATUS: ['进行中', '取消', '已完成'],
        show: false,
        detail: {}
        // multipleSelection: null
      }
    },
    computed: {
      canCancel () {
        return (this.detail.taskDetailsList || []).find(x => x.status === 0)
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'openRoute'
    },
    mounted () {
      if (this.$route.query.id) this.followDetail(this.$route.query.id)
      else this.$emit('close', '4-2-2')
    },
    methods: {
      openRoute ({path, query: {id}}) {
        if (path !== '/form/4-2-2') return false
        if (id) this.followDetail(id)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      followCancel () {
        let loading = this.$loading({
          text: '撤单中...',
          target: this.$el
        }, 10000, '撤单超时...')
        this.$http.get(api.followCancel, {id: this.detail.taskId}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.$modal.success({
              target: this.$el,
              content: '终止追号成功！',
              btn: ['确定']
            })
          } else {
            this.$modal.warn({
              target: this.$el,
              content: '终止追号失败！',
              btn: ['确定']
            })
          }
        }, (rep) => {
          // error
        }).finally(() => {
          loading.close()
        })
      },
      followDetail (id) {
        let loading = this.$loading({
          text: '追号详情加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.followDetail, {projectId: id}).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            this.detail = data
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      },
      OrderDetail (id) {
        let loading = this.$loading({
          text: '投注详情加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.OrderDetail, {projectId: id}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.show = true
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            this.order = data
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      }
      // 追号列表
      // http://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=list&beginDate=20170201000000&endDate=20170303000000&isFree=0&userName=test&scope=0&lotteryId=1&methodId=14&issue=170216085&modes=1&projectId=120
      // followList: api + 'report/taskBuy.do?method=list',
      // 根据追号号查看追号详情
      // http://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=detail&projectId=120
      // followDetail: api + 'report/taskBuy.do?method=detail',
      // 在追号详情页面，取消追号（没有）
      // http://192.168.169.44:9901/cagamesclient/booking.do?method=cancel&id=1304
      // followCancel: api + 'booking.do?method=cancel',
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .user-list
    top TH
    .form
      padding PWX
      font-size .12rem
      .el-table
        margin .3rem 0
        margin-top 1rem
        margin-bottom .6rem
  .group-page
    & > .info
    & > .buttons
      position absolute
      left 0
      right 0
      padding PWX
      // background-color #ededed
      z-index 0
    .info
      top TH
      font-size .12rem
      .el-row
        margin PW 0
    .buttons
      bottom 0  
      text-align center
      radius()
</style>



<style lang="stylus" scoped>

  @import '../../var.stylus'

  bg = #d8d8d8
  bg-hover = #ececec
  bg-active = #e2e2e2
  .tool-bar
    height TH
    line-height TH 
    background-color bg
    font-size .12rem
    border-top-right-radius .05rem
    border-top-left-radius .05rem
    overflow hidden
    background-position .2rem center

  .title
    color #333
    font-weight bold
    padding-left .41rem

  .el-button-group
    float right
    height 100%
    .el-button
      font-size .12rem
      color GREY
      border none
      height 100%
      width TH
      padding 0
      background-color transparent
      &:hover
        background-color bg-hover
      &:active
        background-color bg-active
      &:first-child
        font-size .16rem

  .modal 
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    text-align center
    z-index 9999
    
    .mask
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      opacity .5
      background #000
      z-index 9998
    .box-wrapper
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      text-align center
      z-index 9999
      &:after
        content ''
        height 100%
        width 0
        vertical-align middle
        display inline-block
    .box
      position relative
      text-align left
      display inline-block
      vertical-align middle
      background-color #ededed
      font-size .12rem
      width 7rem
      radius()
    .content
      margin 0 .2rem
      .el-row
        margin PW 0
      .textarea-label
        position relative
        margin .3rem .3rem .3rem 0
        .label
          position absolute
          left 0
          top .05rem
        .el-textarea
          display inline-bock
          vertical-align top
          padding-left .6rem 
          .textarea
            font-size .12rem

</style>

