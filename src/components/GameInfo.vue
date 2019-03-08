<template lang="jade">
  .game-header.relative
    .wrap
      .game-logo
      .volume.ds-icon-volume.pointer(:class="{ on: !volume }" @click=" setVolume() ")
      .game-countdow.inlb.text-666
        .vm.inlb.t_r.ft12
          span.title {{ CNPER }}
          span &nbsp;&nbsp;期
          p 截止时间
        .vm.inlb.time-box.text-black.ft36
          span {{ showTime.split(':')[0] }}
          span.text-999.time-dot :
          span {{ showTime.split(':')[1] }}
          span.text-999.time-dot :
          span {{ showTime.split(':')[2] }}

      .game-win.inlb.text-666
        .vm.inlb.t_r.ft12
          span.title {{ NPER }}
          span &nbsp;&nbsp;期
          //- p.text-danger.pointer(@click="__setCall({fn: '__recentlyCode'})" v-if="overtime") 开奖超时，请刷新
          el-popover(ref="popover4" placement="bottom"  trigger="hover" v-bind:popper-class=" 'wb-intro' " v-bind:visible-arrow=" va ") 
            p.text-blue(slot="reference" v-if=" gameid === 150 || gameid === 151 " style="cursor: pointer;") 开奖号码说明
            slot
              div(style="width: 8.5rem")
                div(v-if=" gameid === 150 ")
                  p 微博5分彩，开奖数据源于每5分钟微博热搜榜前20名关键词的搜索次数。
                  br
                  p 取排名第1、第6、第11、第16名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【万位】的开奖号码；
                  p 取排名第2、第7、第12、第17名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【千位】的开奖号码；
                  p 取排名第3、第8、第13、第18名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【百位】的开奖号码；
                  p 取排名第4、第9、第14、第19名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【十位】的开奖号码；
                  p 取排名第5、第10、第15、第20名的各个关键词的搜索次数的尾数相加，再取这个数的尾数 作为【个位】的开奖号码。
                  br
                  p 以开奖号码的【万位】为例：
                  p 00:05分第1名关键词的搜索次数为 80000 次（尾数为0），
                  p 00:05分第6名关键词的搜索次数为 56789 次（尾数为9）， 
                  p 00:05分第11名关键词的搜索次数为 36748次（尾数为8），
                  p 00:05分第16名关键词的搜索次数为 17890 次（尾数为0），
                  p 则：0+9+8+0=27，27的尾数为7 ，所以01期开奖号码的【万位】就是7。
                  br
                  p 微博热搜的排名数据可参见微博官网：<a class="default" target="_blank" href="https://s.weibo.com/top/summary?cate=realtimehot">https://s.weibo.com/top/summary?cate=realtimehot</a>  或 齐聚数据网：<a class="default" target="_blank" href="https://www.qiju.info/#/qijuData/1">https://www.qiju.info/#/qijuData/1</a>

                div(v-if=" gameid === 151 ")
                  p 腾讯PK10，每期开奖号码以【腾讯在线人数】、【统计时间】与【在线人数数字之和】为基础，使用哈希算法（SHA512）得到对应的哈希值，再以哈希值中每个数字（0到9） 第一次出现的先后顺序作为赛车比赛的结果，数字【0】代表【10号赛车】。
                  br
                  p 例如：统计时间为： 2019-03-06 21:58:00，当时的腾讯在线人数为：322446581，在线人数数字之和为：3+2+2+4+4+6+5+8+1=35。
                  p 用【腾讯在线人数】+【统计时间】+【在线人数数字之和】，即： 3224465812019-03-06 21:58:0035 来执行SHA512哈希算法，并得到哈希值：
                  p(style="word-break: break-all") <span class="text-danger">6354</span>6e<span class="text-danger">9</span>46<span class="text-danger">1</span>136bb5e1<span class="text-danger">0</span>e3cf1bc<span class="text-danger">8</span>1a03<span class="text-danger">2</span>4cbe36e231360<span class="text-danger">7</span>bcf2b1cb5da1f121e3f4e4a7c7b699251922483c5f63d5fed714f4a2387ad6282eced6386e9c3551c6
                  p 在这个哈希值中，数字6最先出现，数字3次之，再是数字5，之后分别是数字4、数字9、数字1、数字0、数字8、数字2、数字7。
                  p 因此当期的赛车结果为：6,3,5,4,9,1,10,8,2,7。
                  br
                  p 腾讯PK10的在线人数与统计时间及对应的赛车结果，请参见齐聚数据网：<a class="default" target="_blank" href="https://www.qiju.info/#/qijuData/3">https://www.qiju.info/#/qijuData/3</a>

        .vm.inlb

          RollingNumbers(v-bind:numbers=" numbers " v-bind:game-type="gameType" v-bind:hl=" ccs ? ccs.pos : '' ") 

        el-popover(ref="popover5" placement="bottom"  trigger="hover" v-bind:popper-class=" 'hot-rank' " v-bind:visible-arrow=" va ") 
          span(slot="reference" v-if=" gameid === 150 " @mouseover=" getWeiBoHot ") 热搜排名 >
          slot
            div(style="width: 5rem")
              dl
                dt.text-black.text-bold
                  .th.inlb 排名
                  .th.inlb 搜索关键词
                  .th.inlb 搜索次数
                dd.text-center.text-999.ptb15(v-if=" !ranks[0] ") 暂无数据...
                dd(v-for=" r in ranks ")
                  .th.inlb {{ r.rank }}
                  .th.inlb {{ r.title }}
                  .th.inlb {{ r.num }}
    
      
        
</template>

<script>
import util from '../util'
import RollingNumbers from './RollingNumbers'
import api from 'src/http/api'
export default {
  props: {
    NPER: String,
    CNPER: String,
    timeout: Number,
    gameType: String,
    allLuckyNumbers: Array,
    lucknumbers: Array,
    methodid: String,
    overtime: Boolean,
    gameid: Number
  },
  components: {
    RollingNumbers
  },
  data () {
    return {
      va: false,
      time: 0,
      interval: 0,
      t: 0,
      volume: false,
      ranks: []
    }
  },
  computed: {
    numbers () {
      return (this.allLuckyNumbers[0] || {lucknumbers: this.lucknumbers}).lucknumbers
    },
    showTime () {
      return util.timeFormat(this.time)
    },
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
  mounted () {
    this.time = this.timeout
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--
      }
    }, 1000)
    this.volume = !!parseInt(window.localStorage.getItem('volume')) || false
  },
  watch: {
    overtime () {
      if (!this.overtime) this.openpk10Game()
    },
    t () {
      if (this.t !== 0) {
        setTimeout(() => {
          this.t = 0
        }, this.t)
      }
    },
    timeout () {
      this.time = Math.floor(this.timeout)
    },
    time () {
      if (this.time <= 0) {
        this.$emit('set-timeout', 0)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    __startpk10Game () {
      let e = document.querySelector('#pk10df')
      if (!e) return
      let w = e.contentWindow
      w.createGame(this.CNPER, this.time, (e) => {
        switch (e.action) {
          case 'finish_game':
            this.__startpk10Game()
            break
        }
      })
    },
    openpk10Game () {
      let e = document.querySelector('#pk10df')
      if (!e) return
      let w = e.contentWindow
      // if (this.allLuckyNumbers[0] && this.allLuckyNumbers[0].code)
      w.endGame(this.lucknumbers.map(e => {
        return parseInt(e)
      }))
    },
    setVolume () {
      this.volume = !this.volume
      window.localStorage.setItem('volume', this.volume ? 1 : 0)
    },
    getWeiBoHot () {
      this.$http.get(api.getWeiBoHot + this.NPER).then(({data: {items}}) => {
        this.ranks = items.reverse()
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  .game-header
    for n, i in chq xj tj hlj hlffc cb120 ffctx '11ydj' jx115 gd hb115 js115 sh115 ah115 kt115 kt115 ahK3 jsK3 jlK3 bjK3 xfK3 bjpk10 pk10sc pk10ft kl8 fc hl3d shssl pl35 lhc lhc pcdd wbwfc txsc tx2fcjs tx2fcos
      &.game-header-ds-icon-game-{n}
        .wrap
          background-image url('../assets/gameheader/ng/' + n '.png')
      &.game-header-ds-icon-game-wbwfc .wrap
          background-size 1.85rem
          

    .wrap
      height .8rem
      background-color #fff
      background-repeat no-repeat
      background-position left .2rem center      
      background-size 2.3rem
      padding-left 2.5rem
    
    .volume
      position absolute
      left 2.3rem
      top .05rem
      width .2rem
      height .2rem
      padding .05rem
      background url(../assets/gameheader/off.png) center no-repeat
      &.on
          background url(../assets/gameheader/on.png) center no-repeat
      
      &:hover
        border: solid 1px #d8dee8;
        background-color #fefefe
        box-shadow: 0px 3px 3px 0px #e3e3e3;

    .vm
      vertical-align middle
    
    .game-countdow
      padding .12rem .25rem
      height .56rem
      
    .time-box
      height 100%
      line-height .56rem
      margin-left .1rem
      // font-family Arial-BoldMT
      border-radius 5px
      box-shadow 0 0 10px rgba(0,0,0, .4) inset
      padding 0 .2rem
      font-weight bold
      letter-spacing: 0px;
    .time-dot
      padding 0 .04rem
      
    .game-win
      // padding .12rem 0
      
  .wb-intro.el-popover
    margin-top 25px
    background-color #fffde8   
    
  .hot-rank.el-popover
    margin-top 35px
    transform translateX(-1.85rem)
    background-color #fffde8
    padding 10px 0
    dd
    dt
      height .36rem
      line-height .36rem
      
    dd:nth-child(even)
      background-color #f7f1da
    .th
      &:nth-child(1)
        width 20%
        text-align center
      &:nth-child(2)
        width 50%
        padding-left 5%
      &:nth-child(3)
        width 25%

</style>


