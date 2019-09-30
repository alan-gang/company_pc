// 三方 电子电竞
<template>
  <div class="outer-Common chesspage">
    <div class="cw">
      <img src="~@/assets/outer/chesspage/3.png" alt="" class="titleimg1">
      <img src="~@/assets/outer/chesspage/4.png" alt="" class="titleimg2">
      <img src="~@/assets/outer/chesspage/5.png" alt="" class="titleimg3">
      <img src="~@/assets/outer/chesspage/6.png" alt="" class="titleimg4">
      <img src="~@/assets/outer/chesspage/7.png" alt="" class="titleimg5">
      <div class="main">
        <div class="left">
          <div
            class="item"
            v-on:click="activeIndex = 0"
            v-for="(nav, idx) in navList"
            v-bind:key="nav.title"
            @click="navIndex = idx"
            v-bind:class="{active: navIndex === idx}"
          >
            <div class="top">
              <span class="name">{{ nav.title }}</span>
              <span class="go-lobby" v-on:click="open(gameInfo[idx + 1])">进入大厅</span>
            </div>
            <div class="bottom">
              账户余额：<span class="balance">¥{{numberWithCommas(user[nav.attr])}}</span>
              <i class="refresh"></i>
              <span class="transfer-accounts" v-on:click="goTransferAccounts()">转账 ></span>
            </div>
          </div>
        </div>
        <div class="right" :class="'nav-list' + (navIndex + 1)">
          <div class="game-item" v-for="(game, idx) in activeNav.children" :key="idx">
            <p class="name">{{game}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import { numberWithCommas, digitUppercase } from '../../util/Number'
export default {
  props: ['menus'],
  components: {
  },
  data() {
    return {
      user: store.state.user,
      numberWithCommas: numberWithCommas,
      navList: [
        {
          title: '开元棋牌',
          attr: 'kymoney',
          children: ['德州扑克', '二八杠', '抢庄牛牛', '炸金花', '押庄龙虎', '21点', '通比牛牛', '极速炸金花', '十三水', '二人麻将', '斗地主', '押庄牌九']
        },
        {
          title: '乐游棋牌',
          attr: 'lymoney',
          children: ['捕鱼大作战', '极速炸金花', '跑得快', '斗地主', '看三张抢庄牛牛', '抢庄牛牛', '二十一点', '喜钱炸金花', '二八杠', '二人麻将']
        },
        {
          title: '幸运棋牌',
          attr: 'xyqpAmount',
          children: ['通比牛牛', '抢庄牛牛', '二八杠', '极速炸金花', '打地鼠', '极速狂飙', '飞禽走兽', '百人牛牛', '二十一点', '抢红包']
        },
        {
          title: '财神棋牌',
          attr: 'vgAmount',
          children: ['抢庄牛牛', '百人牛牛', '通比牛牛', '炸金花', '十三水', '竞咪楚汉德州', '保险楚汉德州', '百人三公', '必下德州', '推筒子', '红黑大战', '百家乐 ']
        },
        {
          title: '德胜棋牌',
          attr: 'dsAmount',
          children: ['百人牛牛', '百人炸金花', '百人龙虎', '斗地主', '百人德州', '百家乐', '二十一点', '二人斗地主', '二八杠', '二人牛牛', '二人麻将', '德州扑克']
        }
      ],
      navIndex: 0
    };
  },
  watch: {},
  computed: {
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '棋牌'
      }).info
    },
    activeNav() {
      return this.navList[this.navIndex]
    }
  },
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    open (item, index) {
      this.__setCall({
        fn: '__closeGuide'
      })
      // this.$nextTick(() => {
      //   this.shows[index] = false
      //   this.openPage(item.id)
      // })
      if (item.id) {
        if (item.ff) {
          return this.$router.push(item.ff)
        }
        if (item.fn) {
          return this.__setCall({fn: '__openWindowWithPost', args: item.fn})
          // return this.openWindowWithPost(this.formData[item.fn] || {})
        } else {
          setTimeout(() => {
            this.shows[index] = false
            this.openPage(item.id)
          }, 0)
        }
      }
    },
    openPage (url) {
      this.$emit('open-page', url)
    },
    goTransferAccounts() {
      this.$router.push({path: '/me/2-1-3'})
    }
  }
};
</script>
<style lang="less">
.chesspage {
  height: ceil(900px + 1240px);
  position: relative;
  .titleimg1,
  .titleimg2,
  .titleimg3,
  .titleimg4,
  .titleimg5 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .titleimg1 {
    z-index: -1;
  }
  .titleimg2 {
    left: 85%;
  }
  .titleimg3 {
    left: 10%;
    top: 260px;
  }
  .titleimg4 {
    left: 90%;
    top: 5%;
  }
  .titleimg5 {
    top: 450px;
    left: 46%;
  }
}
</style>
<style lang="stylus">
@import '../../var.stylus';

.outer-Common {
  & ~ .el-carousel.ad, & ~ .our-game {
    display: none;
  }
}
.outer-Common.chesspage {
  position: relative !important;
  background-repeat: no-repeat;
  // background-size: cover;
  background-position: center 0;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  width: 100%;
  background url("~@/assets/outer/chesspage/1.jpg") no-repeat center 0 #1a145e
  background-size auto 810px
  .cw {
    z-index: 1;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding-top: 660px;
    box-sizing: border-box;
  }
}
</style>

<style lang="stylus">
.chesspage
  .main
    overflow hidden
    .left
      float left
      width 310px
      .item.active
        &:nth-child(1)
          background url('~@/assets/outer/chesspage/14.png') no-repeat
        &:nth-child(2)
          background url('~@/assets/outer/chesspage/15.png') no-repeat
        &:nth-child(3)
          background url('~@/assets/outer/chesspage/16.png') no-repeat
          .top
            background url('~@/assets/outer/chesspage/10-2.png') no-repeat
        &:nth-child(4)
          background url('~@/assets/outer/chesspage/17.png') no-repeat
          .top
            background url('~@/assets/outer/chesspage/11-2.png') no-repeat
        &:nth-child(5)
          background url('~@/assets/outer/chesspage/18.png') no-repeat
          .top
            background url('~@/assets/outer/chesspage/12-2.png') no-repeat
        .bottom
          color #333
          .balance
            color #ff5230
        .top
          .name
            color #333
          .go-lobby
            background #302b2a
            color #fff
      .item
        display inline-block
        width 310px
        height 140px
        box-sizing border-box
        padding 30px 0 0 20px
        background #645dc1
        border-radius 6px
        background-size cover
        font-size 12px
        position relative
        margin-bottom 10px
        &:nth-child(1) .top
          background url('~@/assets/outer/chesspage/8-2.png') no-repeat
        &:nth-child(2) .top
          background url('~@/assets/outer/chesspage/9-2.png') no-repeat
        &:nth-child(3) .top
          background url('~@/assets/outer/chesspage/10-1.png') no-repeat
        &:nth-child(4) .top
          background url('~@/assets/outer/chesspage/11-1.png') no-repeat
        &:nth-child(5) .top
          background url('~@/assets/outer/chesspage/12-1.png') no-repeat
        .top
          height 42px
          line-height 42px
          background url('~@/assets/outer/chesspage/8-2.png') no-repeat
          background-position left center
          .name
            font-size 24px
            font-weight bold
            padding-left 76px
            display inline-block
            line-height 36px
            margin-top 6px
            color #fff
          .go-lobby
            float right
            width 90px
            height 36px
            line-height 36px
            text-align center
            background-color #ffc230
            border-radius 18px 0 0 18px
            color #333
            margin-top 6px
            cursor pointer
        .bottom
          margin-top 24px
          color #fff
          line-height 32px
          .balance
            color #ffc230
            font-size 20px
            font-weight bold
            display inline-block
            vertical-align middle
          .transfer-accounts
            float right
            padding 0 12px
            color #fff
            cursor pointer
    .right
      width 880px
      float right
      .game-item
        width 210px
        height 256px
        box-sizing border-box
        padding-top 200px
        background-repeat no-repeat
        float left
        margin-right 10px
        margin-bottom 10px
        border-radius 8px 8px 0 0
        .name
          background #fff
          color #333
          font-size 12px
          text-align center
          line-height 56px
          border-radius 0 0 8px 8px

.nav-list1
  .game-item:nth-child(1)
    background-image url('~@/assets/outer/chesspage/ky1.jpg')
  .game-item:nth-child(2)
    background-image url('~@/assets/outer/chesspage/ky2.jpg')
  .game-item:nth-child(3)
    background-image url('~@/assets/outer/chesspage/ky3.jpg')
  .game-item:nth-child(4)
    background-image url('~@/assets/outer/chesspage/ky4.jpg')
  .game-item:nth-child(5)
    background-image url('~@/assets/outer/chesspage/ky5.jpg')
  .game-item:nth-child(6)
    background-image url('~@/assets/outer/chesspage/ky6.jpg')
  .game-item:nth-child(7)
    background-image url('~@/assets/outer/chesspage/ky7.jpg')
  .game-item:nth-child(8)
    background-image url('~@/assets/outer/chesspage/ky8.jpg')
  .game-item:nth-child(9)
    background-image url('~@/assets/outer/chesspage/ky9.jpg')
  .game-item:nth-child(10)
    background-image url('~@/assets/outer/chesspage/ky10.jpg')
  .game-item:nth-child(11)
    background-image url('~@/assets/outer/chesspage/ky11.jpg')
  .game-item:nth-child(12)
    background-image url('~@/assets/outer/chesspage/ky12.jpg')
.nav-list2
  .game-item:nth-child(1)
    background-image url('~@/assets/outer/chesspage/ly01.jpg')
  .game-item:nth-child(2)
    background-image url('~@/assets/outer/chesspage/ly02.jpg')
  .game-item:nth-child(3)
    background-image url('~@/assets/outer/chesspage/ly03.jpg')
  .game-item:nth-child(4)
    background-image url('~@/assets/outer/chesspage/ly04.jpg')
  .game-item:nth-child(5)
    background-image url('~@/assets/outer/chesspage/ly05.jpg')
  .game-item:nth-child(6)
    background-image url('~@/assets/outer/chesspage/ly06.jpg')
  .game-item:nth-child(7)
    background-image url('~@/assets/outer/chesspage/ly07.jpg')
  .game-item:nth-child(8)
    background-image url('~@/assets/outer/chesspage/ly08.jpg')
  .game-item:nth-child(9)
    background-image url('~@/assets/outer/chesspage/ly09.jpg')
  .game-item:nth-child(10)
    background-image url('~@/assets/outer/chesspage/ly10.jpg')
.nav-list3
  .game-item:nth-child(1)
    background-image url('~@/assets/outer/chesspage/xy01.jpg')
  .game-item:nth-child(2)
    background-image url('~@/assets/outer/chesspage/xy02.jpg')
  .game-item:nth-child(3)
    background-image url('~@/assets/outer/chesspage/xy03.jpg')
  .game-item:nth-child(4)
    background-image url('~@/assets/outer/chesspage/xy04.jpg')
  .game-item:nth-child(5)
    background-image url('~@/assets/outer/chesspage/xy05.jpg')
  .game-item:nth-child(6)
    background-image url('~@/assets/outer/chesspage/xy06.jpg')
  .game-item:nth-child(7)
    background-image url('~@/assets/outer/chesspage/xy07.jpg')
  .game-item:nth-child(8)
    background-image url('~@/assets/outer/chesspage/xy08.jpg')
  .game-item:nth-child(9)
    background-image url('~@/assets/outer/chesspage/xy09.jpg')
  .game-item:nth-child(10)
    background-image url('~@/assets/outer/chesspage/xy10.jpg')
.nav-list4
  .game-item:nth-child(1)
    background-image url('~@/assets/outer/chesspage/VG01.jpg')
  .game-item:nth-child(2)
    background-image url('~@/assets/outer/chesspage/VG02.jpg')
  .game-item:nth-child(3)
    background-image url('~@/assets/outer/chesspage/VG03.jpg')
  .game-item:nth-child(4)
    background-image url('~@/assets/outer/chesspage/VG04.jpg')
  .game-item:nth-child(5)
    background-image url('~@/assets/outer/chesspage/VG05.jpg')
  .game-item:nth-child(6)
    background-image url('~@/assets/outer/chesspage/VG06.jpg')
  .game-item:nth-child(7)
    background-image url('~@/assets/outer/chesspage/VG07.jpg')
  .game-item:nth-child(8)
    background-image url('~@/assets/outer/chesspage/VG08.jpg')
  .game-item:nth-child(9)
    background-image url('~@/assets/outer/chesspage/VG09.jpg')
  .game-item:nth-child(10)
    background-image url('~@/assets/outer/chesspage/VG10.jpg')
  .game-item:nth-child(11)
    background-image url('~@/assets/outer/chesspage/VG11.jpg')
  .game-item:nth-child(12)
    background-image url('~@/assets/outer/chesspage/VG12.jpg')
.nav-list5
  .game-item:nth-child(1)
    background-image url('~@/assets/outer/chesspage/ds01.jpg')
  .game-item:nth-child(2)
    background-image url('~@/assets/outer/chesspage/ds02.jpg')
  .game-item:nth-child(3)
    background-image url('~@/assets/outer/chesspage/ds03.jpg')
  .game-item:nth-child(4)
    background-image url('~@/assets/outer/chesspage/ds04.jpg')
  .game-item:nth-child(5)
    background-image url('~@/assets/outer/chesspage/ds05.jpg')
  .game-item:nth-child(6)
    background-image url('~@/assets/outer/chesspage/ds06.jpg')
  .game-item:nth-child(7)
    background-image url('~@/assets/outer/chesspage/ds07.jpg')
  .game-item:nth-child(8)
    background-image url('~@/assets/outer/chesspage/ds08.jpg')
  .game-item:nth-child(9)
    background-image url('~@/assets/outer/chesspage/ds09.jpg')
  .game-item:nth-child(10)
    background-image url('~@/assets/outer/chesspage/ds10.jpg')
  .game-item:nth-child(11)
    background-image url('~@/assets/outer/chesspage/ds11.jpg')
  .game-item:nth-child(12)
    background-image url('~@/assets/outer/chesspage/ds12.jpg')
</style>
