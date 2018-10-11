<template lang="jade">
  .new-footer
    div.t
      el-row.content-width.bt-logo

        el-popover(placement="top"  trigger="click"  v-bind:popper-class=" 'popover-vertion-tip' " offset="20")
          
          .version-tip
            
            p v1.4.6
            ul
              li 增加新游戏幸运飞艇
              li 注册界面支持手动输入推广码
              li 调整契约规则-分红比例为下拉选择

            p v1.4.5
            ul
              li 增加汇总报表，活动报表
              li 调整了部分报表功能
              li PT真人和捕鱼游戏上线
              li AG真人、电游、捕鱼游戏上线

            p v1.4.4
            ul
              li 登录页面增加客服功能
              li 平台增加棋牌游戏和和PT电子游戏
              li 增加充提报表、版本信息
              li 相关报表做了适量调整


          span.pointer(slot="reference")
            span.ll.text-666 版本说明 ：
            span.rr V1.4.6
          

        span &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        span.ll.text-666 技术支持：
        span.rr 创优科技

    el-row.content-width.b.a.text-666
      el-col(:span="6" v-for=" (info, i) in infos ").j
        .c(v-bind:class=" info.class ")
          .d
            .e {{ info.title }}
              .f {{ info.subtitle }}
            .g {{ info.number }}
              span.h &nbsp;&nbsp;{{ info.tail }}
          .i {{ info.detail }}

    el-row.content-width.b
      el-col.l.text-666(:span="12")
        | 信游娱乐郑重提示：本平台已获得 菲律宾PAGCOR博彩牌照，请放心购彩。
        br
        | 购彩有风险，下注需谨慎，绝不向未满18岁的青少年出售彩票
        br
        | ©2018-2019 信游娱乐 版权所有 all right reserved
        br
        br
        | 建议使用分辨率：
        span.text-999 1920x1080
        br
        | 建议使用浏览器为： 
        br  

      el-col.r(:span="12")
        .ra
        
        

</template>
<script>
  export default {
    data () {
      return {
        infos: [
          {class: 'load', title: '充值', subtitle: '到账时间', number: '0.3', tail: '秒', detail: '平台支持超过28家银行充值，可24小时在线充值。充值平均每笔到账时间为0.3秒，充值贴心，所有充值方式包括移动端均不收取手续费。'},
          {class: 'with', title: '提款', subtitle: '到账时间', number: '30', tail: '秒', detail: '平台拥有自主研发全自动审核及付款系统，提款平均每笔到账时间为30秒，提款极速到账，无需更多等待。'},
          {class: 'plat', title: '火爆', subtitle: '存款人数', number: '5000', tail: '人', detail: '采用最先进的数据加密技术。交易信息以非明文方式传输和存储，即使外部入侵，数据也不可读，确保万无一失。'},
          {class: 'bank', title: '诚信', subtitle: '今日兑奖', number: '8000', tail: '元', detail: '目前合作的银行有28家，并且还在努力为用户提供更多的银行可供选择，以及支持更多的移动支付方式。'}
        ],
        // need jump numbers
        jump: true
      }
    },
    watch: {
      global: {
        deep: true,
        handler () {
          if (this.jump && this.global.st > (this.global.sh * 0.37)) this.doing()
        }
      }
    },
    methods: {
      doing () {
        this.jump = false
        this.infos[2].number = 1000
        this.infos[3].number = 6000
        let t = setInterval(() => {
          this.infos[2].number += 11
          this.infos[3].number += 11
          if (this.infos[2].number > 5000) this.infos[2].number = 5000
          if (this.infos[3].number > 8000) this.infos[3].number = 8000
          if (this.infos[2].number === 5000 && this.infos[3].number === 8000) clearInterval(t)
        }, 5)
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '../var.stylus'
.new-footer
  .pointer:hover
    opacity .8
  .b
    padding .25rem 0
  .a
     border-bottom 3px solid
     border-image url(../assets/footer/0.png) 30
  .j
    padding-right .6rem
  .c
    background-size .52rem
    background-repeat no-repeat
  .d
    // text-align right
    
  .e
    padding-right .15rem
    padding-left .7rem
  .e
  .g
  .h
    text-align left
    display inline-block
    color #fff
    font-size .18rem
    
  .g
    color BLUE
    font-size .36rem
    font-family Roboto, Arial
    line-height 1
  .f
  .h
    font-size .12rem
  .load
    background-image url(../assets/footer/1.png)
  .with
    background-image url(../assets/footer/2.png)
  .plat
    background-image url(../assets/footer/3.png)
  .bank
    background-image url(../assets/footer/4.png)
  
</style>
<style lang="stylus" >
  @import '../var.stylus'
  @import '../path.stylus'
  
  .popover-vertion-tip.el-popover
    background-color #efefef
    
    
  .t
    height .68rem
    // background-color #232227
    // background-color rgba(255, 255, 255, .05)
    
  .bt-logo
    height .68rem
    background url(../assets/v2/logo_bt.png) left center no-repeat
    text-align right
    line-height .68rem
    .rr
      color #ccc

  .new-footer
    // padding PW
    background-color #27262b
    color #ccc
    font-size .12rem
    line-height 2
    background-image url(../assets/footer/footer_bg.jpg)
    background-repeat no-repeat
    background-size 100% 100%
    
    
    .l
      // padding-top .4rem
      // background url(../assets/accredited.png) no-repeat
      // padding-bottom .2rem
      p
        padding-bottom .1rem
        font-size 18px
        font-style italic
        
      background url(../assets/browser.png) 1.15rem 1.18rem no-repeat
      @media(max-height: 900px)
        background url(../assets/browser.png) 1.2rem 1.3rem no-repeat
    .r
      min-height 1.6rem
      background url(../assets/v2/logo_bt03.png) right 1.6rem top .2rem no-repeat
    .ra
      float right
      width 1.28rem
      height 1.75rem
      background url(../assets/footer/index_pz.jpg) left top no-repeat
  
  

  
</style>
