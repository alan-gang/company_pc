<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .ad.scroll-content

      div

        .notice(style="margin: .2rem; margin-bottom: .1rem")
          span.title 自动注册说明：
          p.content
            | 1. 请选择自动注册用户时，您自身希望保留的返点值
            br
            | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：您当前的直选返点为
            span 6.5% 
            | 而您在下面 “
            span.text-blue 保留返点
            | ”处填写 
            span.text-danger 0.5
            br
            | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那么：您自动注册的新账户的
            span.text-blue 直选返点
            即为 
            span.text-danger 6.0%    
            br
            | 2. 自动注册用户最大返点级别为 
            span.text-danger 6.5
            ，自动注册不需要开户配额
            br
            | 3. 自动注册设置完成之后，页面下方将会显示自动注册推广链接地址
        
        p(style="padding: 0rem 1rem") 您的返点级别：
          span.amount {{ userPoint.toFixed(1) }}

        p(style="padding: .05rem 1rem") 保留返点： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          el-select(v-model="p")
            el-option(v-for="P in PS" v-bind:label="P" v-bind:value="P")
       
        p(style="padding: .05rem 0.15rem 0.05rem 1rem; user-select: text;") 自动注册地址： &nbsp;
          span.text-blue(style="display: inline-block") {{ url }} 
            span.ds-button.text-button.green(v-clipboard:copy=" url " v-clipboard:success="copySuccess"  v-clipboard:error="copyError") 复制注册地址
           
        div.buttons(style="padding: .1rem 2.03rem")
          .ds-button.primary.large.bold(@click="setKeepPoint") 提交

        div(style="padding: .4rem 2.03rem")
          .QR.ds-icon-QR(style="height: 1.96rem; width: 1.4rem; text-align: center")
            p(style="color: #333; font-weight: bold; padding-top: 1.5rem;") 扫码注册

        

      





      
</template>

<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        // 调点
        PS: [],
        p: 0,
        url: '',
        userPoint: 0
      }
    },
    computed: {
    },
    mounted () {
      this.showSpreadLinks()
    },
    methods: {
      copySuccess () {
        this.$message({
          message: '复制成功'
        })
      },
      copyError () {
        this.$message({
          message: '复制失败!'
        })
      },
      showSpreadLinks () {
        this.$http.get(api.showSpreadLinks).then(({data}) => {
          // success
          if (data.success === 1) {
            this.userPoint = data.userPoint
            this.url = data.url
            this.p = data.autoPoint.toFixed(1)
            for (let i = data.range.min; i <= data.range.max; i += 0.1) {
              this.PS.push(i.toFixed(1))
            }
          } else this.$message.error(data.msg || '自动注册链接获取失败！')
        }, (rep) => {
          // error
          this.$message.error('自动注册链接获取失败！')
        })
      },
      setKeepPoint () {
        this.$http.get(api.setKeepPoint, {keepPoint: this.p}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.$message.success(data.msg || '保留返点设置成功！')
            this.showSpreadLinks()
          } else this.$message.error(data.msg || '保留返点设置失败！')
        }, (rep) => {
          // error
          this.$message.error('保留返点设置失败！')
        })
      }
      // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=setKeepPoint&keepPoint=0.1

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .ad
    top TH
    .form
      padding PWX

    
  .el-select
  .el-input-number
    width 1rem
  .el-select
    position relative
    top .01rem
  .amount
    font-family Roboto
    font-size 0.72rem
    color #333

  
  .notice
    font-size .12rem
    margin 0 .2rem
    padding PWX
    background-color #fffde8
    border 1px solid #d5d09b
    radius()
    .content
      display inline-block
      margin 0
      line-height .25rem
      vertical-align top
</style>