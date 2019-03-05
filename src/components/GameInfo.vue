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
                  p 腾讯PK10，每期开奖号码以【腾讯在线人数】与【统计时间】为基础，使用哈希算法（SHA512）得到对应的哈希值，再以哈希值中每个数字（0到9） 第一次出现的先后顺序作为赛车比赛的结果，数字【0】代表【10号赛车】。
                  br
                  p 例如：统计时间为： 2019-03-01 19:52:00，当时的腾讯在线人数为：328941452。
                  p 用【腾讯在线人数】+【统计时间】，即： 3289414522019-03-01 19:52:00 来执行SHA512哈希算法，并得到哈希值：
                  p(style="word-break: break-all") es<span class="text-danger">3</span>3<span class="text-danger">7</span>ff<span class="text-danger">9</span>9b<span class="text-danger">8</span>e<span class="text-danger">2</span><span class="text-danger">0</span>c<span class="text-danger">1</span>c<span class="text-danger">6</span>bd<span class="text-danger">5</span><span class="text-danger">4</span>f12e33c2401bdf88627bfdffea2c04d47f8373b1b597f52339e0fd97fc0a2ebf9f9de675136d481e0c672ba7185d714c4de0e77cf19
                  p 在这个哈希值中，数字3最先出现，数字7次之，再是数字9，之后分别是数字8、数字2、数字0、数字1、数字6、数字5、数字4。
                  p 因此当期的赛车结果为：3,7,9,8,2,10,1,6,5,4。
                  br
                  p 腾讯PK10的在线人数与统计时间及对应的赛车结果，请参见齐聚数据网：<a class="default" target="_blank" href="https://www.qiju.info/#/qijuData/3">https://www.qiju.info/#/qijuData/3</a>

        .vm.inlb

          RollingNumbers(v-bind:numbers=" numbers " v-bind:game-type="gameType" v-bind:hl=" ccs ? ccs.pos : '' ") 
    
      
        
</template>

<script>
import util from '../util'
import RollingNumbers from './RollingNumbers'
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
      volume: false
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
    }
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  .game-header
    for n, i in chq xj tj hlj hlffc cb120 ffctx '11ydj' jx115 gd hb115 js115 sh115 ah115 kt115 kt115 ahK3 jsK3 jlK3 bjK3 xfK3 bjpk10 pk10sc pk10ft kl8 fc hl3d shssl pl35 lhc lhc pcdd wbwfc txsc
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
</style>


