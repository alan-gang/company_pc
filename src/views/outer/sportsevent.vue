// 三方 体育赛事
<template>
  <div class="outer-Common sportsevent">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/sportsevent/3.png" />
      <el-row class="list">
        <el-col :span="8">
          <div class="gamelist">
            <div class="gameimg pointer" @click="gosf('9:203:iframe:/sports')">
              <img src="../../assets/outer/sportsevent/4.jpg" />
            </div>
            <div class="gametext">
              <div class="gametitle">沙巴体育</div>
              <div>余额: {{numberWithCommas(user.sbmoney)}}</div>
              <!-- <div class="sub" v-on:click="goTransferAccounts()">转账</div> -->
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gamelist">
            <div class="gameimg pointer" @click="gosf('19:203:iframe:/sports')">
              <img src="../../assets/outer/sportsevent/5.jpg" />
            </div>
            <div class="gametext">
              <div class="gametitle">平博体育</div>
              <div>余额: {{numberWithCommas(user.pbAmount)}}</div>
              <!-- <div class="sub" v-on:click="goTransferAccounts()">转账</div> -->
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="gamelist">
            <div class="gameimg expect">
              <div>
                <p>
                  <span>敬请</span>
                  <span>期待</span>
                </p>
              </div>
            </div>
            <!-- <div class="gametext">
              <div class="gametitle">沙巴体育</div>
              <div>余额: 9999.999</div>
              <div class="sub">转账</div>
            </div>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import { numberWithCommas, digitUppercase } from '../../util/Number'
export default {
  props: [],
  data() {
    return {
      user: store.state.user,
      numberWithCommas: numberWithCommas
    }
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
    gosf(fn) {
      this.__setCall({fn: '__openWindowWithPost', args: fn})
    }
  }
};
</script>
<style lang="less">
.sportsevent {
  position: relative;
  height: ceil(1090px + 930px);
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1090px;;
    position: absolute;
    left: 0;
    top: 0;
    background: url("~@/assets/outer/sportsevent/1.jpg") no-repeat center bottom;
  }

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 930px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("~@/assets/outer/sportsevent/2.jpg") no-repeat center 0;
  }
  .pointer {
    cursor: pointer;
  }
  .titleimg {
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: calc(-856px / 2);
  }
  .cw {
    .list {
      padding-top: 770px;
      text-align: center;
      img {
        width: 100%;
        vertical-align: top;
      }
      .gamelist {
        padding: 0 20px;
      }
      .expect {
        height: ceil(389px + 180px);
        background: rgba(0, 0, 0, 0.3);
        div {
          margin: 0px auto;
          display: -webkit-box;
          -webkit-box-orient: horizontal;
          -webkit-box-pack: center;
          -webkit-box-align: center;
          display: -moz-box;
          -moz-box-orient: horizontal;
          -moz-box-pack: center;
          -moz-box-align: center;
          display: -o-box;
          -o-box-orient: horizontal;
          -o-box-pack: center;
          -o-box-align: center;
          display: -ms-box;
          -ms-box-orient: horizontal;
          -ms-box-pack: center;
          -ms-box-align: center;
          display: box;
          box-orient: horizontal;
          box-pack: center;
          box-align: center;
          height: 100%;
        }
        p {
          width: 164px;
          height: 164px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.3);
          font-size: 36px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 48px;
          letter-spacing: 3px;
          color: #ffa930;
          border: solid 2px #ffa930;
          vertical-align: middle;
          display: table-cell;
        }
        span {
          display: block;
        }
      }
      .gametext {
        height: 180px;
        background: #fff;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #242124;
      }
      .gametitle {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #242124;
        padding: 34px 0 22px 0;
      }
      .sub {
        width: 90px;
        height: 27px;
        line-height: 27px;
        background-color: #ffffff;
        border-radius: 2px;
        border: solid 1px #000000;
        margin: 20px auto 0 auto;
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
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
