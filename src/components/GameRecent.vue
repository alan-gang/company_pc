<template lang="jade">
  .game-recent
    .a.hlh36.notice(style="margin: 0; padding: 0 .1rem; line-height: .3rem; border: none; border-top: 1px solid #eee")
      marquee
        .aa.inlb(v-for=" w in winners ") 
          span.aaa {{ w.name }}
          span  喜中 
          span.aab.text-oblue {{ w.game }} 
          span.aac.text-blue {{ w.prize._nwc() }} 
          span 元

    .b.hlh36.plr15.ft12
      span.ba.bold 近期开奖号码
      span.bb.f_r.pointer(@click=" ME.login ? $router.push('/form/4-5-3?gameid=' + gameid) : __setCall({fn: '__popLogin', args: 'Login'}) ") 走势图>

    .c.t_c.ft12(:class=" gameType ")
      .ca.hlh36.text-999(style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd")
        span.caa.inlb 期号
        span.cab.inlb 开奖号码
        span.cac.inlb(v-if=" ccs ") {{ ccs.title.join(' ') }}

    .c.t_c.absolute.ft12(:class=" gameType ")

      .ca.hlh36(v-for=" (r, i) in allLuckyNumbers ")
        span.caa.inlb {{ r.issue.substr(-4) }}
        span.cab.inlb 
          span(v-for=" (n, i) in r.code.split(',') " v-bind:class=" setPosColor(i) ")  {{ n }} 
        pre.cac.inlb(v-if=" row_ccs(r) ") {{ row_ccs(r) && row_ccs(r).value.join ? row_ccs(r).value.map((x, i) => row_ccs(r).title && x.length < row_ccs(r).title[i].length ? (x = padStart(x, row_ccs(r).title[i].length, ' ')) : x ).join(' ') : '' }}



</template>

<script>
import store from '../store'
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
        {name: 'jxief3994', game: '重庆时时彩', prize: 188888.88},
        {name: 'jxief3994', game: '重庆时时彩', prize: 188888.88},
        {name: 'jxief3994', game: '重庆时时彩', prize: 188888.88},
        {name: 'jxief3994', game: '重庆时时彩', prize: 188888.88}
      ]
    }
  },
  computed: {
    codeStyle () {
      return this.allLuckyNumbers[0] && this.allLuckyNumbers[0].codeStyle ? this.allLuckyNumbers[0].codeStyle : this.allLuckyNumbers[1] ? this.allLuckyNumbers[1].codeStyle : ''
    },
    cs () {
      return this.codeStyle ? JSON.parse(this.codeStyle) : []
    },
    ccs () {
      return this.cs.filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    }
  },
  created () {
  },
  methods: {
    row_cs (row) {
      return row.codeStyle ? JSON.parse(row.codeStyle) : ''
    },
    row_ccs (row) {
      return (this.row_cs(row) || []).filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    },
    padStart: padStart,
    setPosColor (i) {
      if (this.ccs) {
        switch (this.ccs.pos) {
          case 'q2':
            if (i < 2) return 'text-danger'
            break
          case 'q3':
            if (i < 3) return 'text-danger'
            break
          case 'z3':
            if (i < 4 && i > 0) return 'text-danger'
            break
          case 'h2':
            if (i > 2) return 'text-danger'
            break
          case 'h3':
            if (i > 1) return 'text-danger'
            break
        }
      } else {
        return ''
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
      .caa
      .cab
        margin 0 .1rem
         
    &.PK10.absolute 
      .ca
        height .48rem
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
        
    

        

  .c.absolute
    top 1.11rem
    left 0
    right 0
    bottom 0
    border-left inherit
    overflow auto
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
    
    
</style>
