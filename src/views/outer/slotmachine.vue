// 三方 电子电竞
<template>
  <div class="outer-Common slotmachine">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/slotmachine/2.png" />
      <img class="titleimg2" src="../../assets/outer/slotmachine/3.png" alt="">
      <div class="accounts-list">
        <el-icon name="arrow-left" v-show="flag" v-on:click.native="pagination(0)"></el-icon>
        <el-icon name="arrow-right" v-show="!flag" v-on:click.native="pagination(1)"></el-icon>
        <swiper class="my-swiper" v-bind:options="swiperOption" ref="mySwiper">
          <swiper-slide class="item" v-bind:class="{active: index === swiperIndex}" v-for="(nav, index) in gameList" v-bind:key="nav" v-on:click.native="swiperIndex = index">
            <div class="top">
              <span class="name">{{nav}}</span>
              <span class="go-lobby" v-on:click="open(gameInfo[index + 1])">进入大厅</span>
            </div>
            <div class="bottom">
              账户余额：<span class="balance">¥{{numberWithCommas(user[mList[index]])}}</span>
              <el-icon name="refresh"></el-icon>
              <span class="transfer-accounts" v-on:click="goTransferAccounts()">转账 ></span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="game-group">
        <div class="group hot">
          <h3 class="title">热门游戏</h3>
          <div class="game-list">
            <div class="game" v-for="(temp, index) in new Array(5)" v-bind:key="index">
              <p class="name">急速百家乐</p>
            </div>
          </div>
        </div>
        <div class="group more">
          <h3 class="title">更多游戏</h3>
          <div class="game-list">
            <div class="game" v-for="(temp, idx) in new Array(10)" v-bind:key="idx">
              <p class="name">急速百家乐</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import { numberWithCommas, digitUppercase } from '../../util/Number'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {Icon} from 'element-ui'
import 'swiper/dist/css/swiper.css'
export default {
  props: ['menus'],
  components: {
    swiper,
    swiperSlide,
    'el-icon': Icon
  },
  data() {
    return {
      flag: false,
      user: store.state.user,
      numberWithCommas: numberWithCommas,
      gameList: ['PT老虎机', 'AG老虎机', 'BG老虎机', 'LG老虎机', 'SA老虎机'],
      mList: ['ptmoney', 'agmoney', 'bgmoney', 'lgAmount', 'saEgameAmount'],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 12,
        onSlideChangeStart: swiper => {
          if (swiper.realIndex) {
            this.flag = true
          } else {
            this.flag = false
          }
        }
      },
      swiperIndex: 0
    };
  },
  watch: {},
  computed: {
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '老虎机'
      }).info
    }
  },
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    pagination(type) {
      if (type) {
        this.$refs.mySwiper.swiper.slideNext()
        this.flag = true
      } else {
        this.$refs.mySwiper.swiper.slidePrev()
        this.flag = false
      }
    },
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
.slotmachine {
  height: ceil(900px + 1240px);
  position: relative;
  .titleimg,
  .titleimg2 {
    position: absolute;
    top: 27px;
    left: 50%;
    transform: translateX(-50%);
  }
  .titleimg2 {
    top: 155px;
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
.outer-Common.slotmachine {
  position: relative !important;
  background-repeat: no-repeat;
  // background-size: cover;
  background-position: center 0;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  width: 100%;
  background url("~@/assets/outer/slotmachine/1.jpg") no-repeat center 0 #191c25
  background-size auto 810px
  .cw {
    z-index: 1;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding-top: 625px;
    box-sizing: border-box;
  }
}
</style>

<style lang="stylus">
.slotmachine
  .accounts-list
    position relative
    .el-icon-arrow-left
    .el-icon-arrow-right
      position absolute
      left -4%
      top 50%
      transform translate(0, -50%)
      font-size 40px
      cursor pointer
      color #999
      transition .2s
      &:hover
        color #fff
      &.el-icon-arrow-right
        left auto
        right -4%
        transform translate(0, -50%)
    .item
      width 290px
      height 120px
      background url('~@/assets/outer/slotmachine/5.png') no-repeat
      background-size contain
      box-sizing border-box
      padding 35px 0 25px 28px
      position relative
      transition .2s
      border-radius 8px
      &.active
        background #d2be83
        .name
         color #333
        .go-lobby
          background #a27f4f
          color #ddc07d
        .transfer-accounts
         color #333
      .top
        margin-bottom 22px
      .name
        font-size 22px
        font-weight bold
        color #aeaeae
        line-height 1
      .go-lobby
        position absolute
        right 0
        top 20px
        width 80px
        height 35px
        line-height 35px
        background url('~@/assets/outer/electronicsports/6.png') no-repeat
        background-size auto 100%
        color #333
        border-radius 18px 0 0 18px
        text-align center
        font-size 12px
        cursor pointer
      .bottom
        line-height 30px
        color #928364
        font-size 12px
        .balance
          color #ff3854
        .transfer-accounts
          float right
          cursor pointer
          padding 0 12px
  .game-group
    .group
      margin-top 20px
      .title
        padding-left 46px
        color #fff
        font-size 18px
        background-repeat no-repeat
        background-position 8px 3px
        line-height 40px
        margin-bottom 20px
      &.hot .title
        background-image url('~@/assets/outer/slotmachine/7.png')
      &.more .title
        background-image url('~@/assets/outer/slotmachine/8.png')
    .game-list
      .game
        display inline-block
        width 230px
        height 200px
        box-sizing border-box
        padding-top 150px
        margin-right 10px
        background-repeat no-repeat
        background-position left top
        margin-bottom 10px
        &:last-child
          margin-right 0
        .name
          line-height 50px
          background #fff
          text-align center
          color #333
    .hot .game
      &:nth-child(1)
        background-image url('~@/assets/outer/slotmachine/g1.jpg')
      &:nth-child(2)
        background-image url('~@/assets/outer/slotmachine/g2.jpg')
      &:nth-child(3)
        background-image url('~@/assets/outer/slotmachine/g3.jpg')
      &:nth-child(4)
        background-image url('~@/assets/outer/slotmachine/g4.jpg')
      &:nth-child(5)
        background-image url('~@/assets/outer/slotmachine/g5.jpg')
    .more .game
      &:nth-child(1)
        background-image url('~@/assets/outer/slotmachine/g6.jpg')
      &:nth-child(2)
        background-image url('~@/assets/outer/slotmachine/g7.jpg')
      &:nth-child(3)
        background-image url('~@/assets/outer/slotmachine/g8.jpg')
      &:nth-child(4)
        background-image url('~@/assets/outer/slotmachine/g9.jpg')
      &:nth-child(5)
        background-image url('~@/assets/outer/slotmachine/g10.jpg')
      &:nth-child(6)
        background-image url('~@/assets/outer/slotmachine/g11.jpg')
      &:nth-child(7)
        background-image url('~@/assets/outer/slotmachine/g12.jpg')
      &:nth-child(8)
        background-image url('~@/assets/outer/slotmachine/g13.jpg')
      &:nth-child(9)
        background-image url('~@/assets/outer/slotmachine/g14.jpg')
      &:nth-child(10)
        background-image url('~@/assets/outer/slotmachine/g15.jpg')

</style>
