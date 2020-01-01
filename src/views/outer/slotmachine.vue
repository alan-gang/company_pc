// 三方 电子电竞
<template>
  <div class="outer-Common slotmachine">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/slotmachine/2.png" />
      <img class="titleimg2" src="../../assets/outer/slotmachine/3.png" alt="">
      <div class="accounts-list">
        <div class="left">
          <div class="item" v-bind:class="{active: index === navIndex}" v-for="(nav, index) in navList" v-bind:key="nav.platId" v-on:click="navIndex = index">
            <div class="top">
              <span class="name">{{nav.title}}</span>
              <span class="go-lobby" v-on:click="open(gameInfo[index + 1])">进入大厅</span>
            </div>
            <div class="bottom">
              账户余额：<span class="balance">¥{{numberWithCommas(user[nav.attr])}}</span>
              <i class="refresh" v-on:click.stop="getBalanceById(nav.platId, nav.attr)"></i>
              <span class="transfer-accounts" v-on:click="goTransferAccounts()">转账 ></span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="game-group more">
            <div class="game-list">
              <div class="game" v-for="(temp, idx) in activeNav.children" v-bind:key="idx" @click="goGame(temp)">
                <div class="game-img" :style="{backgroundImage: `url(${temp.imageUrl})`}"></div>
                <p class="name">{{temp.gameName}}</p>
              </div>
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
import api from '../../http/api'
import gameouterMixins from '../../mixins/gameouter'
import 'swiper/dist/css/swiper.css'
export default {
  props: ['menus'],
  components: {
    swiper,
    swiperSlide,
    'el-icon': Icon
  },
  mixins: [gameouterMixins],
  data() {
    return {
      flag: false,
      user: store.state.user,
      numberWithCommas: numberWithCommas,
      navList: [
        // {
        //   title: 'PT老虎机',
        //   attr: 'ptmoney',
        //   platId: 5,
        //   children: ''
        // },
        {
          title: 'AG老虎机',
          attr: 'agmoney',
          platId: 4,
          children: ''
        },
        {
          title: 'BG老虎机',
          attr: 'bgmoney',
          platId: 2,
          children: ''
        },
        {
          title: 'LG老虎机',
          attr: 'lgAmount',
          platId: 21,
          children: ''
        },
        {
          title: 'SA老虎机',
          attr: 'saEgameAmount',
          platId: 32,
          children: ''
        }
      ],
      gameGroupId: 2,
      pageSize: 12,
      navIndex: 0
    };
  },
  computed: {
    tabIndex () {
      return this.$route.params.tabIndex
    },
    activeNav() {
      return this.navList[this.navIndex]
    },
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '老虎机'
      }).info
    }
  },
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
    switch (this.tabIndex) {
      case '1':
        this.navIndex = 2
        break
      case '2':
        this.navIndex = 0
        break
      case '3':
        this.navIndex = 3
        break
      default:
        this.navIndex = 0
    }
    this.navIndex = this.tabIndex ? Number(this.tabIndex) : 0
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
    overflow hidden
    .left
      width 290px
      float left
    .right
      width 882px
      float right
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
      margin-bottom 16px
      cursor pointer
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
          font-size 16px
          font-weight bold
          display inline-block
          vertical-align middle
        .transfer-accounts
          float right
          cursor pointer
          padding 0 12px
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
  .game-group
    .game-list
      overflow hidden
      .game
        display inline-block
        width 210px
        height 230px
        box-sizing border-box
        margin-right 14px
        margin-bottom 14px
        cursor pointer
        float left
        &:nth-child(4n)
          margin-right 0
        .game-img
          height 180px
          background-repeat no-repeat
          background-position left top
          background-size 100% 100%
          border-radius: 10px 10px 0 0
        .name
          line-height 50px
          background #fff
          text-align center
          color #333
          border-radius 0 0 10px 10px
</style>
