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
              <span class="go-lobby" v-on:click.stop="goGame(nav)">进入大厅</span>
            </div>
            <div class="bottom">
              账户余额：<span class="balance">¥{{numberWithCommas(user[nav.attr])}}</span>
              <i class="refresh" v-on:click.stop="getBalanceById(nav.platId, nav.attr)"></i>
              <!-- <span class="transfer-accounts" v-on:click.stop="goTransferAccounts()">转账 ></span> -->
            </div>
          </div>
        </div>
        <div class="right" :class="'nav-list' + (navIndex + 1)">
          <template v-if="activeNav.children">
            <div class="game-item" v-for="(game, idx) in activeNav.children" :key="idx" @click="goGame(game)" v-bind:style="{backgroundImage: `url(${game.imageUrl})`}">
              <p class="name">{{game.gameName}}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import api from '../../http/api'
import { numberWithCommas, digitUppercase } from '../../util/Number'
import gameouterMixins from '../../mixins/gameouter'
export default {
  props: ['menus'],
  mixins: [gameouterMixins],
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
          platId: 7,
          gameId: 8,
          children: ''
        },
        {
          title: '乐游棋牌',
          attr: 'lymoney',
          platId: 15,
          gameId: 25,
          children: ''
        },
        {
          title: '幸运棋牌',
          attr: 'xyqpAmount',
          platId: 22,
          gameId: 32,
          children: ''
        },
        // {
        //   title: '财神棋牌',
        //   attr: 'vgAmount',
        //   platId: 27,
        //   children: ''
        // },
        {
          title: '德胜棋牌',
          attr: 'dsAmount',
          platId: 28,
          gameId: 33,
          children: ''
        },
        {
          title: '欢乐棋牌',
          attr: 'hlAmount',
          platId: 44,
          gameId: 46,
          children: ''
        }
      ],
      gameGroupId: 4,
      pageSize: 12
    };
  },
  computed: {
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '棋牌'
      }).info
    }
  },
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
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
          .top
            background url('~@/assets/outer/chesspage/8-2.png') no-repeat
        &:nth-child(2)
          background url('~@/assets/outer/chesspage/15.png') no-repeat
          .top
            background url('~@/assets/outer/chesspage/9-2.png') no-repeat
            background-position left 10px
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
          background url('~@/assets/outer/chesspage/8-1.png') no-repeat
        &:nth-child(2) .top
          background url('~@/assets/outer/chesspage/9-1.png') no-repeat
          background-position left 10px
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
          .refresh
            display inline-block
            width 23px
            height 23px
            background-image url('~@/assets/outer/recreation/11.png')
            background-repeat no-repeat
            background-size contain
            vertical-align middle
            margin-left 8px
            cursor pointer
    .right
      width 880px
      float right
      .game-item
        width 210px
        height 256px
        box-sizing border-box
        padding-top 200px
        float left
        margin-right 10px
        margin-bottom 10px
        cursor pointer
        position relative
        border-radius 8px 8px 0 0
        background-position left top
        border-radius 8px 8px 0 0
        background-repeat no-repeat
        background-size: 210px 200px
        .name
          background #fff
          color #333
          font-size 12px
          text-align center
          line-height 56px
          border-radius 0 0 8px 8px

</style>
