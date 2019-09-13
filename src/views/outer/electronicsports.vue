// 三方 电子电竞
<template>
  <div class="outer-Common electronicsports">
    <div class="bg">
      <img class="titleimg" src="../../assets/outer/electronicsports/2.png" />
      <div class="accounts-list">
        <div class="item uwin">
          <div class="top">
            <span class="go-lobby">进入大厅</span>
          </div>
          <div class="bottom">
            账户余额：<span class="balance">¥500.00</span>
            <i class="refresh"></i>
            <span class="transfer-accounts">转账 ></span>
          </div>
        </div>
        <div class="item">
          <div class="top">
            <span class="go-lobby">进入大厅</span>
          </div>
          <div class="bottom">
            账户余额：<span class="balance">¥500.00</span>
            <i class="refresh"></i>
            <span class="transfer-accounts">转账 ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="cw">
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  watch: {},
  created() {
    // this.__setCall({fn: '__openThirdPart', args: {id: 1, fn: '3:301:iframe:/sports'}})
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="less">
.electronicsports {
  height: ceil(900px + 1240px);
  position: relative;
  background: #18171b;
  .titleimg {
    position: absolute;
    top: 26%;
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

<style lang="stylus">
  .bg
    padding-top 46.88%
    background url("~@/assets/outer/electronicsports/1.jpg") no-repeat
    background-size contain
    position relative
    min-width 1200px
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
        &:first-child
          margin-right 15px
        &.uwin .top
          background url('~@/assets/outer/electronicsports/5.png') no-repeat
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


</style>
