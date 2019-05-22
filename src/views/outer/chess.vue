<template lang="jade">
  .chess-page(v-if="show" v-show="!isRetract")
    .transfer-bar.pl20
      el-select(v-model="t" style="width: 1.9rem" placeholder="请选择")
        el-option(v-for="(n, i) in accoutns" v-bind:label=" n.split(':')[0] " v-bind:value="i" )
      InputNumber(v-bind:defaultValue="amount" v-on:enter="transfer" v-on:change="amount = $event" placeholder="请输入整数金额") 
      span.yuan 元
      .ds-button.primary.large.ml15(@click="transfer") 确定
      span.btn-retract(@click="retract")
    .chess-iframe-wp
      iframe(v-bind:src="url")
</template>

<script>
import api from '../../http/api'
import InputNumber from 'components/InputNumber'
export default {
  data () {
    return {
      url: '',
      amount: '',
      accoutns: ['彩票账户 转 棋牌账户']
    }
  },
  components: {
    InputNumber
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isRetract: {
      type: Boolean,
      default: false
    },
    gameId: String,
    platId: String
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getExternalInfo(this.gameId, this.platId)
    },
    getExternalInfo (gameId, platId) {
      this.$http.get(api.gameUrl, {gameid: gameId, platid: platId}).then(({data}) => {
        if (data.success) {
          if (data.userName && data.password) {
            this.url = '?un=' + data.userName + '&pwd=' + data.password
          }
          this.url = data.url
        }
      }).catch(rep => {
      })
    },
    retract () {

    },
    transfer () {
      if (!this.amount) return this.$message.warning({target: this.$el, message: '请输入转换金额！'})
      // if (this.ccm > this.fm) return this.$message.warning({target: this.$el, message: '转出账户余额不足！'})
      this.btn = true
      let t = setTimeout(() => {
        if (this.btn) this.btn = false
      }, 10000)
      this.$message.success({target: this.$el, message: (['', '', 'BG', 'IBC', '棋牌', 'PT', 'AG', '沙巴', '乐游', 'U赢', 'KG', '微游', '平博', 'LG', '幸运'][Math.max(this.f, this.t + 2)] + '余额转账已提交！')})
      this.$http.get(this.bgAPI, {amount: this.amount, platid: this.platId}).then(({data}) => {
        if (data.success === 1) {
        } else {
        }
      }).catch(rep => {
      }).finally(() => {
        this.btn = false
        clearTimeout(t)
        t = 0
      })
    }
  }
}
</script>

<style lang="stylus">
.chess-page
  width 9.7rem
  height 5.3rem
  position fixed
  right 0.9rem
  bottom 0rem
  z-index 101
  .i-num-input
    width 1.38rem
    line-height 0.28rem
    margin-left 0.1rem
  .yuan
    color #aaaaaa
    padding-left 0.05rem
  .btn-retract
    display inline-block
    width 1rem
    height .54rem
    background url('../../assets/outer/chess/icon_Retract.png') no-repeat center
    float right
  .transfer-bar
    line-height .54rem
    background-color #1d384f
  .chess-iframe-wp
    iframe
      width 100%
      height 100%
      height 4.7rem
      border none
</style>
