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
        template(v-if="data.length")
          .pd_25
            p.ft18.pb_25 推广链接设置
            .mh_500.mg_0a.t_l(style="width:4.6rem")
              template(v-for=" (v, i) in  data")
                .mb_20.v_t(v-bind:key="i")
                  span.text-danger.pd_5 *
                  span.label(v-if=" !v.groupname ") 彩票返点
                  span.label(v-else) {{ v.groupname  }}返水
                  el-select(v-model="v.$" clearable style="width: 1.7rem")
                    el-option(v-bind:label=" '0.0' " v-bind:value=" '0.0' ")
                    el-option(v-for=" (x, j) in v.$s " v-bind:label=" (x * 0.1).toFixed(1) " v-bind:value=" (x * 0.1).toFixed(1)*1 ")

                  span(v-if=" !v.groupname ")
                    span.text-blue  %
                    span.c_03（百分符）
                  span(v-else)
                    span.text-blue  ‰
                    span.text-999（千分符）
                  //- 彩票奖金
                  //- 奖金计算公式 20 * 返点 + 1800
                  div(v-if=" !v.groupname ")
                    span.label(style="width:0.92rem;")
                    el-slider.slidername(
                      v-model="v.$"
                      v-bind:max="v.backwater" 
                      v-bind:step="0.1" 
                      v-bind:show-tooltip="false" 
                      v-bind:disabled="!v.backwater"
                      show-input
                      style="width: 1.7rem"
                    )
                    span.tips 奖金：{{20 * v.$ + 1800}}
                    span.tips 返点：{{v.$}}%

        hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin: 0 .2rem 0 .2rem ")
        .pd_25
          .mh_500.mg_0a.t_l(style="width:4.6rem")
            .mb_20.v_t
              span.label 链接备注
              input.ds-input.large(v-model="form.remarks" maxlength="10" placeholder="（10个字以内）")
              span.tips 例：百度贴吧彩票1900
            .mb_20.v_t
              span.label 手机号码
              input.ds-input.large(v-model="form.tel" @keyup="form.tel=form.tel.replace(/[^0-9]/ig,'')" maxlength="11" placeholder="选填")
            .mb_20.v_t
              span.label QQ号码
              input.ds-input.large(v-model="form.qq" @keyup="form.tel=form.tel.replace(/[^0-9]/ig,'')" maxlength="11" placeholder="选填")
            .mb_20.v_t
              span.label 微信号码
              input.ds-input.large(v-model="form.wechat" placeholder="选填")
            .mb_20.v_t
              span 注：您所填写的联系方式将会展示在本链接对应的注册页面，以方便下级用户在新注册时遇到问题联系您。

          hr(style="height: 0; border: 0; border-top: 1px solid #d4d4d4; margin: 0 .2rem 0 .2rem ")

        .pd_25
          p.ft18.pb_25 自动注册地址

          div(style="user-select: text;")
            .box
              div.text-blue.inlb.ml_40.mr_40.v_t(v-for=" (url, i) in urls ")
                input.ds-input(v-bind:value="url" readonly)
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
        data: [],
        form: {
          remarks: '',
          tel: '',
          qq: '',
          wechat: ''
        }
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
          type: "success",
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
            // $$ 保存初始值, 根据初始值是否大于零来控制是否展示
            data.back.forEach((x, i) => {
              x.$ = ((x.backwater - x.value).toFixed(4) * 1000).toFixed(1)
              x.$s = Math.ceil(x.backwater * (i ? 10000 : 10))
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
        this.$http.post(api.setKeepPoint, {
          lineRemards: this.form.remarks,
          phone: this.form.tel,
          qq: this.form.qq,
          weChant: this.form.wechat,
          linesArr: JSON.stringify({
            linesArr: this.urls.map(x => {
              return {'line': x};
            })
          }),
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
<style lang="less">
.ad {
  .label {
    width: 0.75rem;
    display: inline-block;
  }

  .tips {
    margin-left: 0.2rem;
  }

  .el-slider__button-wrapper {
    top: -8px;
  }
  .slidername {
    width: 2rem;
    .el-slider__runway.show-input {
      margin-right: 80px;
    }
    .el-input-number .el-icon-minus,
    .el-input-number .el-icon-plus {
      display: inline-block;
    }
    .el-input-number .el-input {
      display: none;
    }
    .el-input-number__increase,
    .el-input-number__decrease {
      border: 0 none;
    }
  }
}
</style>