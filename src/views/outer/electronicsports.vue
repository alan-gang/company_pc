// 三方 电子电竞
<template>
  <div class="outer-Common electronicsports">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/electronicsports/2.png" />
      <div class="accounts-list">
        <div class="item uwin" v-bind:class="{active: activeIndex === 0}" v-on:click="activeIndex = 0">
          <div class="top">
            <span class="go-lobby" v-on:click.stop="open(gameInfo[1])">进入大厅</span>
          </div>
          <div class="bottom">
            账户余额：<span class="balance">¥{{numberWithCommas(user.uwinmoney)}}</span>
            <i class="refresh" v-on:click.stop="getBalanceById(17, 'uwinmoney')"></i>
            <!-- <span class="transfer-accounts" v-on:click.stop="goTransferAccounts()">转账 ></span> -->
          </div>
        </div>
        <div class="item" v-bind:class="{active: activeIndex === 1}" v-on:click="activeIndex = 1">
          <div class="top">
            <span class="go-lobby" v-on:click.stop="open(gameInfo[2])">进入大厅</span>
          </div>
          <div class="bottom">
            账户余额：<span class="balance">¥{{numberWithCommas(user.jjbAmount)}}</span>
            <i class="refresh" v-on:click.stop="getBalanceById(29, 'jjbAmount')"></i>
            <!-- <span class="transfer-accounts" v-on:click.stop="goTransferAccounts()">转账 ></span> -->
          </div>
        </div>
      </div>

      <div class="game-logo-list">
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3296)" class="item">DOTA2</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3319)" class="item">王者荣耀</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3286)" class="item">CSGO</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3315)" class="item">魔兽争霸3</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3269)" class="item">守望先锋</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3307)" class="item">星际争霸2</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, activeIndex ? 203 : 3327)" class="item">彩虹六号</div>
        <div v-on:click="goGame(activeIndex ? 29 : 17, 203)" class="item">全部</div>
      </div>

      <div class="game-list">
        <div class="uwin-list" v-show="activeIndex === 0">
          <div class="t-l" v-on:click="goGame(17, 3296)">
            <img alt="DOTA2" src="../../assets/outer/electronicsports/17.jpg" />
          </div>
          <div class="t-r">
            <img v-on:click="goGame(17, 3319)" alt="王者荣耀" src="../../assets/outer/electronicsports/18.jpg" />
            <img v-on:click="goGame(17, 3269)" alt="守望先锋" class="f-l" src="../../assets/outer/electronicsports/19.jpg" />
            <img v-on:click="goGame(17, 3307)" alt="星际争霸2" src="../../assets/outer/electronicsports/20.jpg" class="f-r">
          </div>
          <div class="b-l">
            <img v-on:click="goGame(17, 3327)" alt="彩虹六号" src="../../assets/outer/electronicsports/21.jpg">
          </div>
          <div class="b-r">
            <img v-on:click="goGame(17, 3286)" alt="CSGO" src="../../assets/outer/electronicsports/22.jpg">
          </div>
        </div>
        <div class="xa-list" v-show="activeIndex === 1">
          <div class="t-l">
            <img v-on:click="goGame(29, 203)" alt="DOTA2" src="../../assets/outer/electronicsports/23.jpg"/>
          </div>
          <div class="t-r">
            <img v-on:click="goGame(29, 203)" alt="王者荣耀" src="../../assets/outer/electronicsports/24.jpg" />
            <img v-on:click="goGame(29, 203)" alt="守望先锋" class="f-l" src="../../assets/outer/electronicsports/25.jpg" />
            <img v-on:click="goGame(29, 203)" alt="星际争霸2" src="../../assets/outer/electronicsports/26.jpg" class="f-r">
          </div>
          <div class="b-l">
            <img v-on:click="goGame(29, 203)" alt="彩虹六号" src="../../assets/outer/electronicsports/27.jpg">
          </div>
          <div class="b-r">
            <img v-on:click="goGame(29, 203)" alt="CSGO" src="../../assets/outer/electronicsports/28.jpg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import api from '../../http/api'
import { numberWithCommas, digitUppercase } from '../../util/Number'
export default {
  props: ['menus'],
  data() {
    return {
      activeIndex: 0,
      user: store.state.user,
      numberWithCommas: numberWithCommas
    };
  },
  watch: {},
  computed: {
    gameInfo() {
      return this.menus.find(item => {
        return item.title === '电竞'
      }).info
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
    },
    goGame (platId, gameId) {
      this.$http.get(api.gameUrl, {platid: platId, gameid: gameId})
      .then(({data}) => {
        if (data.success === 1) {
          let gameUrl = window.location.origin + '/static/sanfang/index.html?platId=' + platId + '&gameUrl='
          gameUrl += encodeURIComponent(data.url)
          window.open(gameUrl)
        }
      })
    },
    getBalanceById (platId, name) {
      this.$http.get(api.getBalanceByPID, {platId}).then(({data: {bal, success}}) => {
        if (success) {
          let b = {}
          b[name] = Number(bal)
          store.actions.setUser(b)
        }
      })
    }
  }
};
</script>
<style lang="less">
.electronicsports {
  height: ceil(900px + 1240px);
  position: relative;
  .cw {
    padding-top: 810px;
  }
  .titleimg {
    position: absolute;
    top: 210px;
    left: 50%;
    margin-left: calc(-484px / 2);
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

.outer-Common.electronicsports {
  position: relative !important;
  background-repeat: no-repeat;
  // background-size: cover;
  background-position: center 0;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  width: 100%;
  background url("~@/assets/outer/electronicsports/1.jpg") no-repeat center 0 #18171b
  background-size auto 810px
  .cw {
    z-index: 1;
    position: relative;
    width: 1300px;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>

<style lang="stylus">
.electronicsports
  .accounts-list
    position absolute
    top 660px
    left 50%
    transform translateX(-50%)
    white-space nowrap
    .item
      display inline-block
      width 390px
      height 120px
      box-sizing border-box
      padding 16px 26px
      background url('~@/assets/outer/electronicsports/3.jpg') no-repeat
      background-size cover
      font-size 12px
      position relative
      &:first-child
        margin-right 15px
      &.uwin .top
        background url('~@/assets/outer/electronicsports/5.png') no-repeat
      &.active:after
        content ''
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        background url('~@/assets/outer/electronicsports/4.png') no-repeat
        background-size contain
        pointer-events none
      .top
        height 42px
        line-height 42px
        background url('~@/assets/outer/electronicsports/7.png') no-repeat
        background-position left center
        .go-lobby
          float right
          width 80px
          height 30px
          line-height 30px
          text-align center
          background url('~@/assets/outer/electronicsports/6.png') no-repeat
          background-size cover
          color #333
          margin-top 6px
          cursor pointer
      .bottom
        margin-top 22px
        color #adaeb2
        line-height 32px
        .balance
          color #ff3854
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
  .game-logo-list
    height 150px
    background url('~@/assets/outer/electronicsports/16.jpg')
    box-shadow 0 20px 30px #222123
    margin-bottom 55px
    .item
      text-align center
      padding-top 100px
      box-sizing border-box
      width (100/8)%
      float left
      height 150px
      background-repeat no-repeat
      background-position center 40px
      color #6d6d6d
      transition .2s
      cursor pointer
      &:hover
        color #ffb92c
      &:nth-child(1)
        background-image url('~@/assets/outer/electronicsports/8.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/8-1.png')
      &:nth-child(2)
        background-image url('~@/assets/outer/electronicsports/9.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/9-1.png')
      &:nth-child(3)
        background-image url('~@/assets/outer/electronicsports/10.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/10-1.png')
      &:nth-child(4)
        background-image url('~@/assets/outer/electronicsports/11.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/11-1.png')
      &:nth-child(5)
        background-image url('~@/assets/outer/electronicsports/12.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/12-1.png')
      &:nth-child(6)
        background-image url('~@/assets/outer/electronicsports/13.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/13-1.png')
      &:nth-child(7)
        background-image url('~@/assets/outer/electronicsports/14.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/14-1.png')
      &:nth-child(8)
        background-image url('~@/assets/outer/electronicsports/15.png')
        &:hover
          background-image url('~@/assets/outer/electronicsports/15-1.png')
  .game-list
    > div
      img
        cursor pointer
        display block
        transition .2s
        &:hover
          transform translate(-3px, -3px)
          box-shadow 5px 5px 10px #18171b
    .t-l
    .b-l
      margin-right 16px
      float left
      width 640px
    .t-l
    .t-r
      margin-bottom 18px
    .t-r
    .b-r
      float right
    .t-r
      img:nth-child(1)
        margin-bottom 14px
    .f-l
      float left
    .f-r
     float right


</style>
