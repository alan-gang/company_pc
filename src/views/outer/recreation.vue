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
      <div class="nav-list">
        <el-icon name="arrow-left" v-show="flag" v-on:click.native="pagination(0)"></el-icon>
        <el-icon name="arrow-right" v-show="!flag" v-on:click.native="pagination(1)"></el-icon>
        <swiper class="my-swiper" v-bind:options="swiperOption" ref="mySwiper">
          <swiper-slide
            class="item"
            v-on:click="activeIndex = 0"
            v-for="(nav, idx) in navList"
            v-bind:key="nav.title"
            v-on:click.native="navIndex = idx"
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
          </swiper-slide>
        </swiper>
      </div>

      <div class="game-list" v-bind:class="'group' + (navIndex + 1)">
        <div class="game" v-for="game in navList[navIndex].children" v-bind:key="game">
          <p class="name">{{game}}</p>
        </div>
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
export default {
  props: ['menus'],
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
        {
          title: 'PT真人娱乐',
          attr: 'ptmoney',
          children: ['传统百家乐', '特色百家乐', '骰宝', '轮盘', '龙虎', '牛牛', '炸金花']
        },
        {
          title: 'AG真人娱乐',
          attr: 'agmoney',
          children: ['百家乐', '极速百家乐', '炸金花', '21点', '龙虎', '轮盘', '骰宝']
        },
        {
          title: 'BG真人娱乐',
          attr: 'bgmoney',
          children: ['轮盘', '21点', '百家乐', '扑克', '骰子', '实况高低牌', '盈利轮盘', '龙虎']
        },
        {
          title: 'GD真人娱乐',
          attr: 'gdAmount',
          children: ['传统百家乐', '竞咪百家乐', '骰宝', '轮盘', '龙虎', '牛牛', '炸金花']
        }
      ],
      navIndex: 0,
      flag: false,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
        onSlideChangeStart: swiper => {
          if (swiper.realIndex) {
            this.flag = true
          } else {
            this.flag = false
          }
        }
      }
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
.recreation {
  height: ceil(900px + 1240px);
  position: relative;
  .titleimg1,
  .titleimg2,
  .titleimg3,
  .titleimg4,
  .titleimg5,
  .titleimg6 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .titleimg1 {
    z-index: -1;
  }
  .titleimg2 {
    left: 69%;
    top: 94px;
    z-index: -3;
  }
  .titleimg3 {
    left: 21%;
    top: 48px;
    z-index: -2
  }
  .titleimg4 {
    left: 70.5%;
    top: 55px;
    z-index: -2;
  }
  .titleimg5 {
    top: 94px;
    left: 20%;
    z-index: -3;
  }
  .titleimg6 {
    top: 395px;
    z-index: 9;
    left: 45%;
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
  .cw {
    z-index: 1;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding-top: 640px;
    box-sizing: border-box;
  }
}
</style>

<style lang="stylus">
.recreation
  .nav-list
    height 120px
    position relative
    .el-icon-arrow-left
    .el-icon-arrow-right
      position absolute
      top 50%
      left -46px
      transform translateY(-50%)
      font-size 40px
      color #999
      z-index 9
      cursor pointer
      &.el-icon-arrow-right
        right -46px
        left auto
    .item.active
      background #d2be83
      .name
        color #333
      .go-lobby
        background #6a604a
        color #fbe3a8
    .item
      width 390px
      height 120px
      background #302b2a
      border-radius 8px
      box-sizing border-box
      padding 30px 26px 0px
      position relative
      float left
      margin-right 15px
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
  .game-list
    margin-top 35px
    .game
      width 390px
      height 230px
      box-sizing border-box
      padding-top 180px
      float left
      background-repeat no-repeat
      .name
        line-height 50px
        text-align center
        color #333
        font-size 18px
        background #fff
        margin-right 10px
        margin-bottom 25px
        &:nth-child(3n)
          margin-right 0

  .group1
    .game:nth-child(1)
      background-image url('~@/assets/outer/recreation/pt01.jpg')
    .game:nth-child(2)
      background-image url('~@/assets/outer/recreation/pt02.jpg')
    .game:nth-child(3)
      background-image url('~@/assets/outer/recreation/pt03.jpg')
    .game:nth-child(4)
      background-image url('~@/assets/outer/recreation/pt04.jpg')
    .game:nth-child(5)
      background-image url('~@/assets/outer/recreation/pt05.jpg')
    .game:nth-child(6)
      background-image url('~@/assets/outer/recreation/pt06.jpg')
    .game:nth-child(7)
      background-image url('~@/assets/outer/recreation/pt07.jpg')
  .group2
    .game:nth-child(1)
      background-image url('~@/assets/outer/recreation/ag01.jpg')
    .game:nth-child(2)
      background-image url('~@/assets/outer/recreation/ag02.jpg')
    .game:nth-child(3)
      background-image url('~@/assets/outer/recreation/ag03.jpg')
    .game:nth-child(4)
      background-image url('~@/assets/outer/recreation/ag04.jpg')
    .game:nth-child(5)
      background-image url('~@/assets/outer/recreation/ag05.jpg')
    .game:nth-child(6)
      background-image url('~@/assets/outer/recreation/ag06.jpg')
    .game:nth-child(7)
      background-image url('~@/assets/outer/recreation/ag07.jpg')
  .group3
    .game:nth-child(1)
      background-image url('~@/assets/outer/recreation/bg01.jpg')
    .game:nth-child(2)
      background-image url('~@/assets/outer/recreation/bg02.jpg')
    .game:nth-child(3)
      background-image url('~@/assets/outer/recreation/bg03.jpg')
    .game:nth-child(4)
      background-image url('~@/assets/outer/recreation/bg04.jpg')
    .game:nth-child(5)
      background-image url('~@/assets/outer/recreation/bg05.jpg')
    .game:nth-child(6)
      background-image url('~@/assets/outer/recreation/bg06.jpg')
    .game:nth-child(7)
      background-image url('~@/assets/outer/recreation/bg07.jpg')
    .game:nth-child(8)
      background-image url('~@/assets/outer/recreation/bg08.jpg')
  .group4
    .game:nth-child(1)
      background-image url('~@/assets/outer/recreation/gd01.jpg')
    .game:nth-child(2)
      background-image url('~@/assets/outer/recreation/gd02.jpg')
    .game:nth-child(3)
      background-image url('~@/assets/outer/recreation/gd03.jpg')
    .game:nth-child(4)
      background-image url('~@/assets/outer/recreation/bg01.jpg')
    .game:nth-child(5)
      background-image url('~@/assets/outer/recreation/gd05.jpg')
    .game:nth-child(6)
      background-image url('~@/assets/outer/recreation/gd06.jpg')
    .game:nth-child(7)
      background-image url('~@/assets/outer/recreation/gd07.jpg')
</style>
