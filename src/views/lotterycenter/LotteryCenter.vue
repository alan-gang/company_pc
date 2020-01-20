<template lang="jade">
  div.lottery-center
    div.content-width
      div.page-position
        span.title 您的位置：
        router-link(class="home" to="/") 首页
        span.icon-slice >
        span 开奖中心
      div.nav-list
        span(class="item" @click="navIndex = index" v-for="(nav, index) in navList" v-bind:class="nav.cls + (index === navIndex ? `-active active` : '')") {{nav.title}}
      div.main
        div.radio-list
          el-radio(v-model="radio" label="0") 显示全部
          el-radio(v-model="radio" label="1") 保留选中
          el-radio(v-model="radio" label="2") 隐藏选中
        div.lottery-center-table(v-loading="loading")
          div.thead
            span.th.title(v-for="headName in thead") {{headName}}
          div.tbody
            div.tr(v-for="lottery in list" v-bind:key="lottery.gameid + 'id' + lottery.issue")
              div.td
                el-checkbox(v-model="checkedList" v-bind:label="lottery.title")
              div.td {{`第${lottery.issue}期开奖`}}
              div.td {{dayjs(lottery.openDate).format('YYYY.MM.DD HH:mm:ss')}}
              div.td.open-code
                span.num(v-for="num in lottery.code.split(',')" v-bind:class="{'m-r-5': lottery.code.split(',').length > 5}") {{num}}
              div.td
                span.icon-zst(@click="goZst(lottery)")
              div.td
                span.open-more(@click="go(lottery, 'more')") 更多开奖
                span.bet(@click="go(lottery)") 购买彩票
</template>

<script>
import {Radio, Checkbox} from 'element-ui'
import dayjs from 'dayjs'
import {Link} from 'vue-router'
import api from '../../http/api'
export default {
  name: 'lottery-center',
  components: {
    'el-radio': Radio,
    'el-checkbox': Checkbox
  },
  data() {
    return {
      radio: '0',
      dayjs: dayjs,
      thead: ['彩种', '期号', '开奖时间', '开奖号码', '走势图表', '操作'],
      checkedList: [],
      lotteryHistory: [],
      navList: [
        {
          title: '全部',
          cls: 'icon-all'
        }, {
          title: '时时彩',
          cls: 'icon-ssc'
        },
        {
          title: '11选5',
          cls: 'icon-11x5'
        },
        {
          title: '快3',
          cls: 'icon-k3'
        },
        {
          title: 'PK10',
          cls: 'icon-pk10'
        },
        {
          title: '其他',
          cls: 'icon-other'
        }
      ],
      navIndex: 0,
      loading: false
    }
  },
  computed: {
    list() {
      let arr = this.lotteryHistory
      if (this.radio !== '0') {
        arr = arr.filter(lottery => {
          let flag = this.checkedList.includes(lottery.title)
          return this.radio === '1' ? flag : !flag
        })
      }
      if (this.navIndex !== 0) {
        let map = {
          1: 'SSC',
          2: 'G115',
          3: 'K3',
          4: 'PK10',
          5: 'OTHER'
        }
        arr = arr.filter(lottery => lottery.groupType === map[this.navIndex])
      }
      return arr
    }
  },
  created() {
    this.getData()
    if (window.sessionStorage.getItem('kaijiangzhongxin')) {
      let data = JSON.parse(window.sessionStorage.getItem('kaijiangzhongxin'))
      this.radio = data.radio
      this.checkedList = data.checkedList
    }
  },
  destroyed() {
    let data = JSON.stringify({checkedList: this.checkedList, radio: this.radio})
    window.sessionStorage.setItem('kaijiangzhongxin', data)
  },
  methods: {
    __openWinCode (x) {
      let flag = this.lotteryHistory.some(lottery => {
        if (String(lottery.gameid) === String(x.lottId)) {
          lottery.issue = x.issue
          lottery.code = x.code
          lottery.openDate = x.openDate
          return true
        }
      })
      if (!flag) {
        let obj = this.getLotteryById(x.lottId)
        if (!obj) return false
        obj.code = x.code
        obj.issue = x.issue
        this.lotteryHistory.unshift(obj)
      }
      this.lotteryHistory = [...this.lotteryHistory]
    },
    getData() {
      this.loading = true
      this.$http.get(api.getAllLastLottery)
      .then(({data}) => {
        if (data.success) {
          let arr = data.items
          let temp = []
          arr.forEach((lottery, idx) => {
            let obj = this.getLotteryById(lottery.lotteryid)
            if (obj && lottery.code && !obj.removed) temp.push(Object.assign(obj, lottery))
          })
          this.lotteryHistory = temp
        }
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
    },
    go(lottery, type) {
      if (type) {
        this.$router.push('/lotteryhistory/' + (lottery.gameid || lottery.lotteryId))
      } else {
        if (!lottery.menuid) lottery = Object.assign(this.getLotteryById(lottery.lotteryId) || {}, lottery)
        if (lottery.menuid) {
          this.$router.push('/game/' + lottery.id)
        }
      }
    },
    getLotteryById(id) {
      let game = null
      if (this.$attrs.menus && this.$attrs.menus[6]) {
        this.$attrs.menus[6].groups.some(item => {
          return item.items.some(lottery => {
            if (Number(lottery.gameid) === Number(id)) {
              lottery.groupType = item.url
              game = lottery
              return true
            }
          })
        })
      }
      return game
    },
    goZst(lottery) {
      let href = window.location.href
      let url = 'https://www.ds-graph.com:8000/xy/'
      if (href.indexOf('.net') !== -1) url = 'https://graph.dongsens.net:8000/xy/'
      if (href.indexOf('192.168.') !== -1 || href.indexOf('www.game.com') !== -1) url = 'http://192.168.169.75:8000/xy/'
      window.open(url + '#?gameid=' + lottery.lotteryid)
    }
  }
}
</script>

<style lang="stylus">
.lottery-center ~ .el-carousel.ad
.lottery-center ~ .our-game
  display none
.lottery-center
  position relative
  padding-bottom .6rem
  user-select none
  .lottery-center-table
    line-height .48rem
    .icon-zst
      background url('~@/assets/lotterycenter/icon-zst.png') no-repeat
      background-position center center
      height .48rem
      width 100%
      display inline-block
      vertical-align middle
      cursor pointer
    .thead
       background-image: linear-gradient(0deg,
        #e7e7e7 0%,
        #cccccc 100%),
      linear-gradient(
        #ececec,
        #ececec);
      background-blend-mode: normal,
        normal;
    .thead
      padding-left .18rem
    .th
    .td
      text-align center
      display inline-block
      height 100%
      &:nth-child(1)
        width 1.3rem
        text-align left
        &.th
          text-align center
      &:nth-child(2)
        width 1.72rem
      &:nth-child(3)
        width 1.6rem
      &:nth-child(4)
        width 4.1rem
      &:nth-child(5)
        width 1rem
      &:nth-child(6)
        width 2.1rem
    .tr
      padding-left .18rem
      background #fff
      display flex
      align-items center
      &:nth-child(even)
        background-image: linear-gradient(
          #fafafa,
          #fafafa),
        linear-gradient(
          #e7e7e7,
          #e7e7e7);
        background-blend-mode: normal,
          normal;
    .open-code
      .num
        display inline-block
        width .36rem
        height .36rem
        line-height .36rem
        background-color #f37e0c
        border-radius 50%
        color #fff
        margin-right .22rem
        &.m-r-5
          margin-right 5px
        &:last-child
          margin-right 0
    .open-more
    .bet
      display inline-block
      width .8rem
      line-height .26rem
      border-radius 4px
      text-align center
      cursor pointer
      &.open-more
        margin-right 6px
        box-sizing border-box
        color #f37e0c
        border 1px solid #f37e0c
      &.bet
        background-image: linear-gradient(90deg,
          #f17d0b 0%,
          #ff5429 100%),
        linear-gradient(
          #ffffff,
          #ffffff);
        background-blend-mode: normal,
          normal;
        color #fff
  .radio-list
    line-height .5rem
    height .5rem
    padding-left .16rem
    .el-radio__input.is-checked .el-radio__inner
      background-color #ffa930
      border-color #ffa930
    .el-radio__inner:hover
      border-color #ffa930
  .nav-list
    height .62rem
    line-height .62rem
    background-color #fff
    border-radius: 0px 4px 4px 0px;
    padding-left .28rem
    .item
      display inline-block
      width 1.2rem
      height .42rem
      line-height .42rem
      transition .2s ease
      border-radius 4px
      color #333
      font-size .14rem
      box-sizing border-box
      padding-left .64rem
      cursor pointer
      background-position .32rem center
      background-repeat no-repeat
      &.icon-all
        background-image url('~@/assets/lotterycenter/icon-all.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-all.png')
      &.icon-ssc
        background-image url('~@/assets/lotterycenter/icon-ssc.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-ssc.png')
      &.icon-11x5
        background-image url('~@/assets/lotterycenter/icon-11x5.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-11x5.png')
      &.icon-k3
        background-image url('~@/assets/lotterycenter/icon-k3.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-k3.png')
      &.icon-pk10
        background-image url('~@/assets/lotterycenter/icon-pk10.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-pk10.png')
      &.icon-other
        background-image url('~@/assets/lotterycenter/icon-other.png')
        &-active
          background-image url('~@/assets/lotterycenter/icon-active-other.png')
      &.active
        background-color #ffa930
        color #fff
  .content-width
    background-image: linear-gradient(
      #e9e9e9,
      #e9e9e9),
    linear-gradient(
      #ffffff,
      #ffffff);
    background-blend-mode: normal,
      normal;
    padding: 0 .1rem .2rem;
  div.page-position
    line-height .5rem
    font-size 12px
    color #999
    .home
      padding-left .2rem
      background url('~@/assets/lotterycenter/icon-home.png') no-repeat
      background-position left .16rem
      margin-left: .08rem
      display inline-block
      color #999
      transition .2s
      &:hover
        color #666
    .icon-slice
      display inline-block
      width .2rem
      text-align center
</style>
