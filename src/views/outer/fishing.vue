// 三方 捕鱼
<template>
  <div class="outer-Common fishing">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/fishing/3.png" />
      <img class="girl" src="../../assets/outer/fishing/4.png" />
      <el-row class="list mt">
        <el-col :span="8">
          <div class="gameimg" @click="goGame(agId, 'SB36')">
            <img src="../../assets/outer/fishing/7.png" />
            <img class="gametextimg" src="../../assets/outer/fishing/8.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(agmoney)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gameimg" @click="goGame(bgId, 105)">
            <img src="../../assets/outer/fishing/10.png" />
            <img class="gametextimg" src="../../assets/outer/fishing/11.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(user.bgmoney)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gameimg"  @click="goPt">
            <img src="../../assets/outer/fishing/12.png" />
            <img class="gametextimg" src="../../assets/outer/fishing/13.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(user.ptmoney)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col :span="8">
          <div class="gameimg" @click="goGame(saId, 'EG-FISHING-001')">
            <img src="../../assets/outer/fishing/15.png" />
            <img class="gametextimg game-sa" src="../../assets/outer/fishing/14.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(user.saEgameAmount)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gameimg" @click="goGame(kyId, 510)">
            <img src="../../assets/outer/fishing/16.png" />
            <img class="gametextimg game-ky" src="../../assets/outer/fishing/17.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(user.kymoney)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gameimg" @click="goGame(lyId, 510)">
            <img src="../../assets/outer/fishing/18.png" />
            <img class="gametextimg game-ly" src="../../assets/outer/fishing/19.png" />
          </div>
          <div class="gametext">
            余额: {{numberWithCommas(user.lymoney)}}
            <div class="sub" v-on:click="goTransferAccounts()">转账</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import { numberWithCommas, digitUppercase } from '../../util/Number'
import api from '@/http/api'
export default {
  props: [],
  data() {
    return {
      user: store.state.user,
      numberWithCommas: numberWithCommas,
      gameGroupId: 5,
      agId: 4,
      ptId: 5,
      lyId: 15,
      kyId: 7,
      bgId: 2,
      saId: 32
    };
  },
  watch: {},
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    goTransferAccounts() {
      this.$router.push({path: '/me/2-1-3'})
    },
    goGame(platId, gameId) {
      this.$http.get(api.gameUrl, {platid: platId, gameid: gameId})
      .then(({data}) => {
        if (data.success === 1) {
          let gameUrl = window.location.origin + '/static/sanfang/index.html?platId=' + platId + '&gameUrl='
          gameUrl += encodeURIComponent(data.url)
          window.open(gameUrl)
        }
      })
    },
    goPt() {
      this.$router.push('/ptgame')
      this.__setCall({fn: '__openWindowWithPost', args: '5:203:iframe:/egame/2'})
    }
  }
};
</script>
<style lang="less">
.fishing {
  height: 1854px;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    left: 0;
    top: 0;
    background: url("~@/assets/outer/fishing/1.jpg") no-repeat center bottom;
  }
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("~@/assets/outer/fishing/2.jpg") no-repeat center 0;
  }
  .titleimg {
    position: absolute;
    top: 90px;
    left: 50%;
    margin-left: calc(-633px / 2);
  }
  .girl {
    position: absolute;
    top: 90px;
    left: -120px;
  }
  .cw {
    .list {
      text-align: center;
      margin-bottom: 60px;
      &:last-child {
        margin-bottom: 0;
      }
      &.mt {
        padding-top: 580px;
      }
      .gameimg {
        position: relative;
        height: 434px;
        overflow-y: hidden;
        cursor: pointer;
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url("~@/assets/outer/fishing/5.png") no-repeat center 0;
          z-index: -2;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url("~@/assets/outer/fishing/6.png") no-repeat center
            bottom;
          z-index: -1;
        }
        .gametextimg {
          margin: -30px auto 0 auto;
          &.game-sa {
            margin-top: 10px;
          }
          &.game-ky {
            margin-top: -10px
          }
          &.game-ly {
            margin-top: -50px;
          }
        }
      }
      .gametext {
        margin-top: 10px;
        color: #ecfee5;
        font-size: 18px;
        .sub {
          color: #7df9fe;
          width: 150px;
          height: 39px;
          line-height: 39px;
          background-color: rgba(123, 247, 253, 0.1);
          border-radius: 20px;
          border: solid 1px #7bf7fd;
          margin: 20px auto 0 auto;
          cursor: pointer;
          user-select: none;
          &:hover {
            background-color: rgba(123, 247, 253, 0.4);
          }
        }
      }
    }
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

.outer-Common {
  position: relative !important;
  background-repeat: no-repeat;
  // background-size: cover;
  background-position: center 0;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  width: 100%;

  .cw {
    z-index: 1;
    position: relative;
    width: 1260px;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
