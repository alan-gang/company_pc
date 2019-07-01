<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .ad.scroll-content

      .bgc-w.mg_20.t_c
        .pd_25
          p.ft18(style="padding: 0rem 1rem") 您的推广码： 
            span.text-blue {{ promotionCode }}
        
        hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin: 0 .2rem 0 .2rem ")

        .pd_25
          p.ft18.pb_25 推广链接设置
          .mh_500.w_700.mg_0a.t_l
            .mb_20.wp_50.inlb.v_t(v-for=" (v, i) in  data" v-bind:key="i")
              span.text-danger.pd_5 *
              span(v-if=" !v.groupname ") 彩票返点 
              span(v-else) {{ v.groupname  }}返水 
              el-select(v-model="v.$" clearable style="width: 1.7rem")
                el-option(v-bind:label=" '0.0' " v-bind:value=" '0.0' ")
                el-option(v-for=" (x, j) in v.$s " v-bind:label=" (x * 0.1).toFixed(1) " v-bind:value=" (x * 0.1).toFixed(1) ")

              span(v-if=" !v.groupname ")
                span.text-blue  % 
                span.c_03（百分符）
              span(v-else) 
                span.text-blue  ‰
                span.text-999（千分符）


        hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin: 0 .2rem 0 .2rem ")
        
        .pd_25
          p.ft18.pb_25 自动注册地址
          
          div(style="user-select: text;") 
            .box
              div.text-blue.inlb.ml_40.mr_40.v_t(v-for=" (url, i) in urls ")
                input.ds-input(v-bind:value="url") 
                span.ds-button.text-button.blue(v-clipboard:copy=" url " v-clipboard:success="copySuccess"  v-clipboard:error="copyError" style="position: absolute;padding: 0 10px") 复制
                br
                .QR.ds-icon-QR(:style="QRS[i]")
                  p.text-black(style="font-weight: bold; padding-top: 1.5rem;") 扫码注册
              

          .buttons(style="padding: .1rem 2.03rem")
            .ds-button.primary.large.bold.w_140.hlh_40(@click="setKeepPoint") 提交


        

      
</template>

<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        // 调点
        urls: [],
        qrs: [],
        promotionCode: '',
        data: []
      }
    },
    computed: {
      myQR () {
        return {
          background: 'url(' + api.createQr + ') left top no-repeat',
          height: '1.96rem',
          width: '1.4rem',
          textAlign: 'center'
        }
      },
      QRS () {
        return this.qrs.map(q => {
          return (q = {
            background: 'url(' + 'data:image/png;base64,' + q + ') left top no-repeat',
            height: '1.96rem',
            width: '1.4rem',
            marginTop: '.15rem',
            textAlign: 'center',
            display: 'inline-block'
          })
        })
      }
    },
    mounted () {
      this.showSpreadLinks()
      this.getQR()
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
      getQR () {
        this.$http.get(api.createQr).then(({data}) => {
          // success
          if (data.success === 1) {
            this.qrs = data.qrStr
          } else this.$message.error(data.msg || '二维码获取失败！')
        }, (rep) => {
          // error
          this.$message.error('二维码获取失败！')
        })
      },
      showSpreadLinks () {
        this.$http.get(api.showSpreadLinks).then(({data}) => {
          // success
          if (data.success === 1) {
            this.promotionCode = data.promotionCode
            this.urls = data.url
            data.back.unshift({
              backwater: data.userPoint
            })
            data.back.forEach((x, i) => {
              x.$ = (x.backwater - x.value).toFixed(4) * 1000
              x.$s = x.backwater * (i ? 10000 : 10)
            })
            data.back[0].$ = (data.userPoint - data.autoPoint).toFixed(1)
            this.data = data.back
          } else this.$message.error(data.msg || '自动注册链接获取失败！')
        }, (rep) => {
          // error
          this.$message.error('自动注册链接获取失败！')
        })
      },
      setKeepPoint () {
        this.$http.get(api.setKeepPoint, {
          keepPoint: (this.data[0].backwater - this.data[0].$).toFixed(1),
          pointArr: JSON.stringify({
            myBack: this.data.slice(1).map(x => {
              return {
                groupid: x.groupid,
                groupname: x.groupname,
                backwater: (x.backwater - x.$ / 1000).toFixed(4)
              }
            })
          })
        }).then(({data}) => {
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
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .ad
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
    line-height .22rem
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
  
  .hlh_40
    line-height .4rem
  ul
    list-style none
  .c_03
    color #033333
</style>
