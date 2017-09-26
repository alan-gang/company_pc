<template lang="jade">
  el-row.game-info

    el-col.left(:span="18")
      span.title {{ CNPER }}
      | &nbsp;&nbsp;期
      span.ds-icon-clock {{ showTime }}

      el-popover(placement="bottom-start" trigger="click" v-model="more" v-bind:popper-class="'popover-instruction font-white'" )
        span(slot="reference")
          span.ds-button.instruction.primary(ref="instruction") ? {{ type.title }}
        slot
            p(style="line-height: .25rem")
              span.label.font-gold 玩法说明：
              {{ type.description || '暂无' }}
            p(style="line-height: .25rem")
              span.label.font-gold 中奖举例：
              {{ type.example || '暂无' }}

      
      router-link.ds-icon-polyline.ds-button.outline.small(:to=" {path: '/form/4-5-3', query: { gameid:  gameid}}  " @click.native.stop="") 走势图
      .ds-button.outline(style="margin-left: .05rem;padding: 0 .15rem" @click="__setCall({fn: '__random'})") 机选

    el-col.right(:span="6")
      el-button-group.right
        router-link.ds-button.text-button(:to=" {path: '/form/4-2-1', query: { gameid:  gameid}} " @click.native.stop="") 追号记录

        el-popover(placement="bottom-start" trigger="hover"  v-bind:popper-class="'popover-orderlist'" ref="MO")
          span(slot="reference")
            router-link.ds-button.text-button(:to=" {path: '/form/4-1-1', query: { gameid:  gameid}} " @click.native.stop="" @mouseover.native="Orderlist") 投注记录
          slot
            el-table.header-bold.nopadding(:data="Cdata" v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" style="margin-top: .1rem")

              el-table-column(prop="issue" label="期号" width="100")

              el-table-column(prop="methodName" label="玩法" width="100")

              el-table-column(prop="code" label="投注内容" min-width="120" show-overflow-tooltip=true)
                template(scope="scope")
                  p {{ scope.row.code }}
                    span(v-if="scope.row.position") [{{ scope.row.position }}]  

              el-table-column(prop="totalPrice" label="总金额" width="80")
                template(scope="scope")
                  span(v-if="!scope.row.last") {{ scope.row.totalPrice }}
                  span.text-danger(v-if="scope.row.last") {{ scope.row.expenditure }}

              el-table-column(label="状态" width="70")
                template(scope="scope")
                  span(:class="{ 'text-danger': scope.row.stat === 3,  'text-grey': scope.row.stat === 0, 'text-green': scope.row.stat === 2, 'text-black': scope.row.stat === 1}") {{ STATUS[scope.row.stat] }}
              
              el-table-column(label="操作" wdith="50")
                template(scope="scope")
                  div(v-if="!scope.row.last")
                    .ds-button.text-button.blue(v-if=" scope.row.canCancel === 1 " style="padding: 0 .05rem" @click=" cancel(scope.row) ") 撤消

        
</template>

<script>
import util from '../util'
import api from '../http/api'
export default {
  props: {
    // NPER: Number,
    CNPER: String,
    timeout: Number,
    type: Object,
    gameid: Number
    // title: String
  },
  data () {
    return {
      // 默认倒计时
      time: 0,
      interval: 0,
      Cdata: [],
      STATUS: ['未开奖', '已中奖', '未中奖', '已撤单']
    }
  },
  computed: {
    showTime () {
      return util.timeFormat(this.time)
    },
    callId () {
      return this.gameid + '|' + this.type.id
    }
  },
  mounted () {
    this.time = this.timeout
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--
      }
    }, 1000)
    // this.Orderlist()
  },
  watch: {
    // type () {
    //   if (!this.$refs.instruction.style.transform) {
    //     this.$refs.instruction.style.transform = 'perspective(100px) translateZ(30px)'
    //     setTimeout(() => {
    //       this.$refs.instruction.style.transform = ''
    //     }, 200)
    //   }
    // },
    timeout () {
      this.time = Math.floor(this.timeout)
    },
    time () {
      if (this.time <= 0) {
        //  this.__setCall({
        //   fn: '__getIssue'
        // })
        // this.__setCall({
        //   fn: '__getTraceIssueList'
        // })
        // this.__setCall({
        //   fn: '__recentlyCode'
        // })
        this.$emit('set-timeout', 0)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ableRowClassName (row, index) {
      if (row.selected) return 'selected-row'
    },
    setSelected (row) {
      this.$set(row, 'selected', !row.selected)
      // row.selected = !row.selected
    },
    Orderlist () {
      this.$http.post(api.Orderlist, {
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
    cancel (row) {
      let loading = this.$loading({
        text: '撤单中...',
        target: this.$refs.MO.$refs.popper
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
  @import '../var.stylus'
  .popover-orderlist
    width 5.5rem
    background-color #ff
    border 1px solid #ccc
    shadow(0 0 10px rgba(0,0,0,.3))
    
  .popover-instruction
    // display none
    // top 100%
    transition none
    max-width 4.5rem
    transform translateX(.2rem) translateY(-.1rem)
    padding PW .2rem 0 .2rem
    text-align left
    background-color rgba(22, 113, 188, .95)
    box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
    radius()
    border-top-left-radius 0
    z-index 1
    cursor text
    user-select text
    
    p
      
      min-width 3.6rem
      padding-left .75rem
      margin 0 0 PW 0
      .label
        &::selection
          background-color GOLD
        position absolute
        left .2rem


</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  F = .3rem
  .game-info
    &.fixed
      z-index 1
      overflow-x hidden
    background-color: #ededed;
    // height GH
    line-height GH
    margin 0
    padding 0 .1rem 0 .2rem
    font-size .12rem
    font-weight normal
    color #666
    background-position .2rem .2rem
    

  .ds-icon-clock
    margin-left .2rem
    padding-left .32rem
    font-size F
    color DANGER
    font-family Roboto
    font-weight bold
      
  .left
    min-width 6rem
    .title
      padding-left .8rem
      font-size F
      font-family Roboto
      font-weight bold
      color #666
    .outline
      vertical-align super
      margin-left .2rem
      padding-left .08rem
      padding-right .1rem
    .ds-icon-polyline
      padding 0 .1rem 0 .36rem
      margin-left .1rem
    .instruction
      transition transform .2s linear
      position relative
      vertical-align super
      margin-left .2rem
      padding-left .08rem
      padding-right .1rem
      font-size .12rem
      height .32rem
      line-height .32rem

      &:hover
        color WHITE
        background-color rgba(22, 113, 188, .9)
        border-bottom-left-radius 0
        border-bottom-right-radius 0
        border-color BLUE
        .popover-instruction
          display block
    
  .right
    min-width 1.5rem
    text-align right
    .text-button
      font-size .12rem
      color #666
      text-shadow none
      padding PW .1rem
      &:hover
        color BLUE
      &:active
        color #087ad8
  
  
</style>
