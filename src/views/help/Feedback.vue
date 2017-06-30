<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.feedback-help
      label.item
        span 标题：
        input.ds-input.block(ref="t" v-model="t" placeholder="请输入意见标题")

      label.item
        span 内容：
        el-input(v-model="v" type="textarea" v-bind:autosize="{ minRows: 5, maxRows: 20 }" placeholder="请输入您的意见哦，不得少于5个字（若意见被采纳，将有机会获得现金红包奖励）")
      
      .buttons.item
        .ds-button.primary.large(@click="addFeedback") 提交

    
</template>

<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        t: '',
        v: ''
      }
    },
    computed: {
    },
    watch: {
      t () {
        this.t = this.t.trim()
      },
      v () {
        this.v = this.v.trim()
      }
    },
    mounted () {
    },
    methods: {
      // 意见反馈
      // http://192.168.169.161:8080/cagamesclient//help/feeback.do?method=add&title=xxx&content=xxxxx&priority=1
      addFeedback () {
        if (!this.t) return this.$message.warning('请输入意见标题') && this.$refs.t.focus()
        if (!this.v || this.v.length < 5) return this.$message.warning('请输入您的意见哦，不得少于5个字') && this.$el.querySelector('textarea').focus()
        this.$http.get(api.addFeedback, {priority: 1, title: this.t, content: this.v}).then(({data}) => {
          if (data.success === 1) {
            this.$modal.success({
              target: this.$el,
              content: '感谢您宝贵的建议，我们会仔细核对您的建议，让平台越来越好。',
              btn: ['确定']
            })
            this.t = ''
            this.v = ''
          } else this.$message.warning({target: this.$el, message: '反馈添加失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '反馈添加失败！'})
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .feedback-help
    top TH
    padding 2*PW 2*PWX
    .item
      position relative
      display block
      line-height .3rem
      margin PW 0
      padding-left .5rem
      span
        position absolute
        left 0
        
</style>
