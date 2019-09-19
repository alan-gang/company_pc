<template lang="jade">
  .game-recent
    .a.hlh36.notice(style="margin: 0; padding: 0 .1rem; line-height: .3rem; border: none; border-top: 1px solid #eee")
        //- marquee
        .aa_box(v-bind:style=" aa_box_style ")
          .aa.inlb.hlh36(v-for=" (w, i) in winners ")
            span.aaa {{ w.name }}
            span  喜中
            span.aab.text-oblue {{ w.game }}
            span.aac.text-blue {{ w.prize._nwc() }}
            span 元


    .b.hlh36.plr15.ft12
      span.ba.bold 近期开奖号码
      span.bb.f_r.pointer(@click=" ME.login ? goTrend() : __setCall({fn: '__popLogin', args: 'Login'}) ") 走势图>

    .c.t_c.ft12(:class=" gameType ")
      .ca.hlh36.text-999(style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd")
        span.caa.inlb 期号
        span.cab.inlb 开奖号码
        pre.cac.inlb(v-if=" ccs " )
          span(v-for=" t in  ccs.title ") {{ t }}

    .c.t_c.absolute.ft12(:class=" gameType ")

      .ca.hlh3(v-for=" (r, i) in allLuckyNumbers ")
        span.caa.inlb {{ r.issue.substr(-4) }}

        span.cab.inlb
          span.caba(v-for=" (n, i) in r.code.split(',') " v-bind:class=" setPosColor(i) ")  {{ n }}
              br(v-if=" i === 9 ")

          .number-gaps(v-if=" gameType === 'PCDD' ")
            .number-gap +
            .number-gap +
            .number-gap =
            .number.number-gap {{ r.code.split(',')[0] * 1 + r.code.split(',')[1] * 1 + r.code.split(',')[2] * 1 }}


        pre.cac.inlb(v-if=" codeStyle && row_ccs(r) ")
          | &nbsp;
          span(v-if=" row_ccs(r) && !row_ccs(r).value.join ") row_ccs(r).value

          span(v-if=" row_ccs(r) && row_ccs(r).value.join " v-for=" (v, i) in  row_ccs(r).value" v-bind:class=" colorOfV(v) ") {{ ccs.title && v.length < ccs.title[i].length ? padStart(v, ccs.title[i].length, ' ') : v }}




</template>

<script>
import store from '../store'
import api from '../http/api'
import { padStart } from '../util/base'
export default {
  components: {
  },
  name: 'game-recent',
  props: ['gameid', 'gameType', 'allLuckyNumbers', 'methodid'],
  data () {
    return {
      ME: store.state.user,
      winners: [
        // {name: '111jxief3994', game: '重庆时时彩', prize: 188888.88},
        // {name: '222jxief3994', game: '重庆时时彩', prize: 188888.88},
        // {name: '333jxief3994', game: '重庆时时彩', prize: 188888.88}
      ],
      wi: 0
    }
  },
  computed: {
    aa_box_style () {
      return {
        transform: 'translateY(' + 0.36 * this.wi * -1 + 'rem)'
      }
    },
    codeStyle () {
      return this.allLuckyNumbers[0] && this.allLuckyNumbers[0].codeStyle ? this.allLuckyNumbers[0].codeStyle : ''
      // return ''
    },
    cs () {
      return this.codeStyle ? JSON.parse(this.codeStyle) : []
    },
    ccs () {
      const r = this.cs.filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
      if (r && ['String', 'Array'].indexOf(Object.prototype.toString.call(r.value[0]).slice(8, -1)) !== -1) {
        return r
      } else {
        return undefined
      }
      // return this.cs.filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    }
  },
  created () {
    this.getWinners()
  },
  methods: {
    goTrend() {
      if (this.gameType === 'OTHER') {
        this.$router.push('/form/4-5-3?gameid=' + this.gameid)
      } else {
        let typeName = document.querySelector('dd.title.selected').firstChild.textContent
        let navName = document.querySelector('.ds-button.selected').parentElement.firstElementChild.textContent
        let map = {
          'devbuild': 'http://192.168.169.75:8000/xy/index.html#',
          'release': 'https://graph.dongsens.net:8000/xy/index.html#',
          'production': 'https://www.ds-graph.com:8000/xy/index.html#'
        }
        let attr = 'devbuild'
        if (!process.env.NODE_ENV_PATH) {
          let now = window.location.href
          if (now.indexOf('192.') !== -1) {
            attr = 'devbuild'
          } else if (now.indexOf('xy-text') !== -1) {
            attr = 'release'
          } else {
            attr = 'production'
          }
        } else {
          attr = process.env.NODE_ENV_PATH
        }
        let url = map[attr]
        console.log(process.env.NODE_ENV_PATH)
        window.open(url + '/?gameid=' + this.gameid + '&typeName=' + typeName + '&navName=' + navName)
      }
    },
    getWinners () {
      this.$http.get(api.rewardInfo).then(({data: {success, winners}}) => {
        if (success === 1) {
          this.wi = 0
          this.winners = winners
          winners.length > 1 && this.startSlide()
        }
      })
    },
    startSlide (t = 5000) {
      setTimeout(() => {
        // if ()
        this.wi++
        this.winners.push(this.winners[this.wi - 1])
        if (this.wi === 100) {
          // resume
          return this.getWinners()
        }
        this.startSlide()
      }, t)
    },
    row_cs (row) {
      return row.codeStyle ? JSON.parse(row.codeStyle) : ''
    },
    row_ccs (row) {
      const r = (this.row_cs(row) || []).filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
      if (r && ['String', 'Array'].indexOf(Object.prototype.toString.call(r.value[0]).slice(8, -1)) !== -1) {
        return r
      } else {
        return undefined
      }
      // return (this.row_cs(row) || []).filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    },
    padStart: padStart,
    setPosColor (i) {
      if (this.ccs) {
        switch (this.ccs.pos) {
          case 'q5':
            if (i < 5) return 'text-blue'
            break
          case 'q4':
            if (i < 4) return 'text-blue'
            break
          case 'q2':
            if (i < 2) return 'text-blue'
            break
          case 'q3':
            if (i < 3) return 'text-blue'
            break
          case 'z3':
            if (i < 4 && i > 0) return 'text-blue'
            break
          case 'h2':
            if (i > 2) return 'text-blue'
            break
          case 'h3':
            if (i > 1) return 'text-blue'
            break
          case 'h4':
            if (i > 0) return 'text-blue'
            break
        }
      } else {
        return ''
      }
    },
    colorOfV (v) {
      switch (v) {
        // 五星
        case '组选120':
        case '组选24':
        case '组六':
        case '顺子':
        case '大单':
        case '龙':
          return 'type-color-1'
        case '组选60':
        case '组选12':
        case '组三':
        case '对子':
        case '大双':
        case '虎':
        case '牛1':
        case '牛2':
        case '牛3':
        case '牛4':
        case '牛5':
          return 'type-color-2'
        case '组选30':
        case '组选6':
        case '豹子':
        case '小单':
        case '和':
        case '牛6':
        case '牛7':
        case '牛8':
        case '牛9':
        case '牛牛':
          return 'type-color-3'
        case '组选20':
        case '组选4':
        case '小双':
          return 'type-color-4'
        case '组选10':
          return 'type-color-5'
        case '组选5':
        case '没牛':

          return 'type-color-6'
        default:
          return 'type-color-6'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层


.game-recent
  border-left 5px solid #d9d9d9

  .a
    overflow hidden

  .aa_box
    transition transform 3s linear

  .b
    background-color #eee
  .ba
    font-weight bold
    color #000
  .bb
    color #333
    &:hover
      color #000

  .c
    background-color #fff
    &.PK10
    &.HC6
      .caa
        width 25%
      .cab
        width 75%

    &.PK10.absolute
      .ca
        height .24rem
        line-height .24rem

    &.KL8
      .caa
        width 25%
      .cab
        width 75%

    &.KL8.absolute
       .ca
         height .48rem
         line-height .24rem

    &.PCDD
      .caa
        width 25%
      .cab
        width 75%

      .cab
        position relative

      .number-gap
        position absolute
        top 0
        width .1rem
        line-height .3rem
        font-size .12rem
        display inline-block
        text-align center
        // border 1px solid red
        &:nth-child(1)
          left .67rem
        &:nth-child(2)
          left 1.05rem
        &:nth-child(3)
          left 1.45rem
        &:nth-child(4)
          width .24rem
          left 1.55rem

      .caba
        display inline-block
        width .24rem
        margin-right .12rem

    &.K3
      .caa
      .cab
        width 25%
      .cac
        width 50%
      




  .c.absolute
    top 1.11rem
    left 0
    right 0
    bottom 0
    border-left inherit
    overflow auto
    &::-webkit-scrollbar
      width 5px
      height 5px
    .ca
      // margin 0 .05rem
      border-bottom 1px dashed #ddd
      &:hover
        background-color #f4f4f4

  .caa
  .cac
    width 30%
    margin 0
    vertical-align top
  .cab
    width 40%
    vertical-align top

  .type-color-1
    color #1f8eec
  .type-color-2
    color #10c614
  .type-color-3
    color #e850ff
  .type-color-4
    color #c29909
  .type-color-5
    color #f17d0b
  .type-color-6
    color #000

</style>
<!-- // 五星
case '组120':
case '组60':
case '组30':
case '组20':
case '组10':
case '组5':
// 四星
case '组24':
case '组12':
case '组6':
case '组4':
// 三星
case '组六':
case '组三':
case '顺子':
case '对子':
case '豹子':
// 趣味
case '大':
case '小':
case '单':
case '双':
// 龙虎和
case '龙':
case '虎':
case '和':
// 牛牛
case '没牛':
case '牛一':
case '牛二':
case '牛三':
case '牛四':
case '牛五':
case '牛六':
case '牛七':
case '牛八':
case '牛九':
case '牛牛': -->
