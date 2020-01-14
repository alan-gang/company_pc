// 三方 真人娱乐
<template>
  <div class="outer-Common recreation">
    <div class="cw">
      <img src="~@/assets/outer/recreation/4.png" alt="" class="titleimg5">
      <img src="~@/assets/outer/recreation/5.png" alt="" class="titleimg2">
      <img src="~@/assets/outer/recreation/6.png" alt="" class="titleimg3">
      <img src="~@/assets/outer/recreation/7.png" alt="" class="titleimg4">
      <img src="~@/assets/outer/recreation/8.png" alt="" class="titleimg1">
      <img src="~@/assets/outer/recreation/9.png" alt="" class="titleimg6">
      <img src="~@/assets/outer/recreation/2.png" alt="" class="titleimg7">
      <img src="~@/assets/outer/recreation/3.png" alt="" class="titleimg8">
      <div class="nav-list left">
        <!-- <el-icon name="arrow-left" v-show="flagLeft" v-on:click.native="pagination(0, swiperIndex - 1)"></el-icon> -->
        <!-- <el-icon name="arrow-right" v-show="flagRight" v-on:click.native="pagination(1, swiperIndex + 1)"></el-icon> -->
        <!-- <swiper class="my-swiper swiper-no-swiping" v-bind:options="swiperOption" ref="mySwiper"> -->
          <div
            class="item"
            v-for="(nav, idx) in navList"
            v-bind:key="nav.title"
            v-on:click="navIndex = idx"
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
        <!-- </swiper> -->
      </div>

      <div class="game-list right" v-bind:class="'group' + (navIndex + 1)">
        <template v-if="navList[navIndex].children">
          <div class="game" v-for="(game, idx) in navList[navIndex].children" v-bind:key="game.gameName + idx" @click="goGame(game)">
            <div class="game-img" :style="`${game.imageUrl ? 'background-image: url(' + game.imageUrl + ')' : ''}`"></div>
            <p class="name">{{game.gameName}}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import {Icon} from 'element-ui'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { numberWithCommas, digitUppercase } from '../../util/Number'
import api from '../../http/api'
import gameouterMixins from '../../mixins/gameouter'
export default {
  props: ['menus'],
  mixins: [gameouterMixins],
  components: {
    swiper,
    swiperSlide,
    'el-icon': Icon
  },
  data() {
    return {
      user: store.state.user,
      numberWithCommas: numberWithCommas,
      navList: [
        // {
        //   title: 'PT真人娱乐',
        //   attr: 'ptmoney',
        //   platId: 5,
        //   children: [
        //     {
        //       gameName: '传统百家乐',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '特色百家乐',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '骰宝',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '轮盘',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '龙虎',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '牛牛',
        //       platId: 5,
        //       gameId: 203
        //     },
        //     {
        //       gameName: '炸金花',
        //       platId: 5,
        //       gameId: 203
        //     }
        //   ]
        // },
        {
          title: 'AG真人娱乐',
          attr: 'agmoney',
          platId: 4,
          gameId: 10,
          children: ''
        },
        {
          title: 'BG真人娱乐',
          attr: 'bgmoney',
          platId: 2,
          gameId: 1,
          children: ''
        },
        {
          title: 'GD真人娱乐',
          attr: 'gdAmount',
          platId: 26,
          gameId: 22,
          children: ''
        },
        {
          title: 'SA真人娱乐',
          attr: 'saAmount',
          platId: 31,
          gameId: 35,
          children: ''
        },
        {
          title: 'OG真人娱乐',
          attr: 'dfAmount',
          platId: 34,
          gameId: 41,
          children: ''
        }
      ],
      flagLeft: false,
      flagRight: true,
      swiperIndex: 0,
      pageSize: 9,
      gameGroupId: 3
    };
  },
  watch: {},
  computed: {
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '真人'
      }).info
    },
    activeNav() {
      return this.navList[this.navIndex]
    }
  },
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
    this.getThirdGames()
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
.recreation {
  position: relative;
  .titleimg1,
  .titleimg2,
  .titleimg3,
  .titleimg4,
  .titleimg5,
  .titleimg6,
  .titleimg7,
  .titleimg8 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .titleimg1 {
    z-index: -1;
    left: 60%;
  }
  .titleimg2 {
    left: 79%;
    top: 94px;
    z-index: -3;
  }
  .titleimg3 {
    left: 31%;
    top: 48px;
    z-index: -2
  }
  .titleimg4 {
    left: 80.5%;
    top: 55px;
    z-index: -2;
  }
  .titleimg5 {
    top: 94px;
    left: 30%;
    z-index: -3;
  }
  .titleimg6 {
    top: 395px;
    z-index: 9;
    left: 55%;
  }
  .titleimg7 {
    top: 216px;
    left: 13%;
    z-index: -4;
  }
  .titleimg8 {
    top: 216px;
    left: 96%;
    z-index: -4;
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
.outer-Common.recreation {
  position: relative !important;
  background-repeat: no-repeat;
  // background-size: cover;
  background-position: center 0;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  width: 100%;
  background url("~@/assets/outer/recreation/1.png") no-repeat center 0 #000000
  background-size auto 810px
  height: 1800px
  .cw {
    z-index: 1;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding-top: 696px;
    box-sizing: border-box;
  }
}
</style>

<style lang="stylus">
.recreation
  overflow hidden
  .left
    width 310px
    float left
  .right
    width 850px
    float right
  .nav-list
    height 120px
    position relative
    .item.active
      background #d2be83
      .name
        color #333
      .go-lobby
        background #6a604a
        color #fbe3a8
      .transfer-accounts
        color #333
    .item
      width 310px
      height 120px
      background #302b2a
      border-radius 8px
      box-sizing border-box
      padding 30px 26px 0px
      position relative
      float left
      margin-bottom 15px
      &:last-child
        margin-right 0
      .name
        font-size 24px
        color #d4bc8a
        font-weight bold
      .go-lobby
        position absolute
        right 22px
        top 0
        width 80px
        height 35px
        line-height 35px
        color #333
        background url('~@/assets/outer/electronicsports/6.png') no-repeat
        background-size cover
        background-color #a89169
        border-radius 0 0 8px 8px
        text-align center
        font-size 12px
        cursor pointer
      .bottom
        color #7c6e55
        margin-top 24px
        .transfer-accounts
          float right
          padding 0 12px
          cursor pointer
        .balance
          color #ff3854
          font-size 18px
          font-weight bold
          vertical-align middle
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
  .game-list
    .game
      width 270px
      height 270px
      box-sizing border-box
      float left
      background-repeat no-repeat
      margin-right 20px
      cursor pointer
      margin-bottom 25px
      &:nth-child(3n)
        margin-right 0
      &:hover .game-img
        background-size 110% 110%
      .game-img
        height 220px
        background-size 100% 100%
        border-radius 10px 10px 0 0
        transition .2s ease
        background-position: center center
      .name
        line-height 50px
        text-align center
        color #333
        font-size 18px
        background #fff
        border-radius 0 0 10px 10px
        &:nth-child(3n)
          margin-right 0

  .group1
    .game .game-image
      background-size cover
      background-position center
    .game:nth-child(1)
      .game-img
        background-image url('~@/assets/outer/recreation/pt01.jpg')
    .game:nth-child(2)
      .game-img
        background-image url('~@/assets/outer/recreation/pt02.jpg')
    .game:nth-child(3)
      .game-img
        background-image url('~@/assets/outer/recreation/pt03.jpg')
    .game:nth-child(4)
      .game-img
        background-image url('~@/assets/outer/recreation/pt04.jpg')
    .game:nth-child(5)
      .game-img
        background-image url('~@/assets/outer/recreation/pt05.jpg')
    .game:nth-child(6)
      .game-img
        background-image url('~@/assets/outer/recreation/pt06.jpg')
    .game:nth-child(7)
      .game-img
        background-image url('~@/assets/outer/recreation/pt07.jpg')
  // .group2
  //   .game:nth-child(1)
  //     background-image url('~@/assets/outer/recreation/ag01.jpg')
  //   .game:nth-child(2)
  //     background-image url('~@/assets/outer/recreation/ag02.jpg')
  //   .game:nth-child(3)
  //     background-image url('~@/assets/outer/recreation/ag03.jpg')
  //   .game:nth-child(4)
  //     background-image url('~@/assets/outer/recreation/ag04.jpg')
  //   .game:nth-child(5)
  //     background-image url('~@/assets/outer/recreation/ag05.jpg')
  //   .game:nth-child(6)
  //     background-image url('~@/assets/outer/recreation/ag06.jpg')
  //   .game:nth-child(7)
  //     background-image url('~@/assets/outer/recreation/ag07.jpg')
  // .group3
  //   .game:nth-child(1)
  //     background-image url('~@/assets/outer/recreation/bg01.jpg')
  //   .game:nth-child(2)
  //     background-image url('~@/assets/outer/recreation/bg02.jpg')
  //   .game:nth-child(3)
  //     background-image url('~@/assets/outer/recreation/bg03.jpg')
  //   .game:nth-child(4)
  //     background-image url('~@/assets/outer/recreation/bg04.jpg')
  //   .game:nth-child(5)
  //     background-image url('~@/assets/outer/recreation/bg05.jpg')
  //   .game:nth-child(6)
  //     background-image url('~@/assets/outer/recreation/bg06.jpg')
  //   .game:nth-child(7)
  //     background-image url('~@/assets/outer/recreation/bg07.jpg')
  //   .game:nth-child(8)
  //     background-image url('~@/assets/outer/recreation/bg08.jpg')
  // .group4
  //   .game:nth-child(1)
  //     background-image url('~@/assets/outer/recreation/gd01.jpg')
  //   .game:nth-child(2)
  //     background-image url('~@/assets/outer/recreation/gd02.jpg')
  //   .game:nth-child(3)
  //     background-image url('~@/assets/outer/recreation/gd03.jpg')
  //   .game:nth-child(4)
  //     background-image url('~@/assets/outer/recreation/bg01.jpg')
  //   .game:nth-child(5)
  //     background-image url('~@/assets/outer/recreation/gd05.jpg')
  //   .game:nth-child(6)
  //     background-image url('~@/assets/outer/recreation/gd06.jpg')
  //   .game:nth-child(7)
  //     background-image url('~@/assets/outer/recreation/gd07.jpg')
  // .group5
  //   .game:nth-child(1)
  //     background-image url('~@/assets/outer/recreation/gd01.jpg')
  //   .game:nth-child(2)
  //     background-image url('~@/assets/outer/recreation/gd02.jpg')
  //   .game:nth-child(3)
  //     background-image url('~@/assets/outer/recreation/gd03.jpg')
  //   .game:nth-child(4)
  //     background-image url('~@/assets/outer/recreation/bg01.jpg')
  //   .game:nth-child(5)
  //     background-image url('~@/assets/outer/recreation/gd05.jpg')
  //   .game:nth-child(6)
  //     background-image url('~@/assets/outer/recreation/gd06.jpg')
  //   .game:nth-child(7)
  //     background-image url('~@/assets/outer/recreation/gd07.jpg')
</style>
