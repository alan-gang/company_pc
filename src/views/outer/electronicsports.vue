// 三方 电子电竞
<template>
  <div class="outer-Common electronicsports">
    <div class="cw">
      <img class="titleimg" src="../../assets/outer/electronicsports/2.png" />
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
  background: url("~@/assets/outer/electronicsports/1.jpg") no-repeat center 0
    #18171b;
  .titleimg {
    position: absolute;
    top: 210px;
    left: 50%;
    margin-left: calc(-484px / 2);
  }
  .cw {
    .list {
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
