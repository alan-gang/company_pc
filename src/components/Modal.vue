<template lang="jade">

  transition(name="fade" appear=true)

    .modal(:class="[Cclass]")

      .mask(v-if="modal")

      .box-wrapper

        .box

          .header-bar(v-if="title || showclose")

            .title {{ title }} 

            .buttons
              i.el-icon-close.ds-button.text-button(@click="_close" )


          .content 
            div(:class="[typeIcon[type]]" v-html="content")

          .footer-bar(:class="[ 'btn' + btn.length ]")
            a(:href=" href[i] " target="_blank").ds-button.large.bold(v-for="(b, i) in btn" @click="btnClick(i)" v-bind:class="[ btnClass[type][i] ]") {{ b }}



      
</template>

<script>
  export default {
    name: 'Modal',
    data () {
      return {
        type: 'confirm',
        title: '',
        content: '',
        btn: ['确定', '取消'],
        href: [],
        showclose: true,
        // showok: true,
        // showcancel: true,
        modal: true,
        ok: null,
        O: null,
        customClass: '',
        typeIcon: {
          confirm: 'default',
          question: 'ds-icon-question-large',
          warn: 'ds-icon-notice-large',
          success: 'ds-icon-success-large',
          redpocket: 'ds-icon-redpocket'
        },
        btnClass: {
          confirm: ['primary', 'cancel'],
          question: ['success', 'cancel'],
          warn: ['danger', 'cancel'],
          success: ['success', 'cancel'],
          redpocket: ['gold', 'cancel']
        }
      }
    },
    computed: {
      Cclass () {
        return this.customClass + ' ' + this.type
      }
    },
    methods: {
      _close () {
        if (typeof this.close === 'function') {
          if (this.close.call(this.O) === false) return
        }
        this.$el &&
        this.$el.parentNode &&
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      _ok () {
        if (typeof this.ok === 'function') this.ok.call(this.O) !== false && this._close()
        else this._close()
      },
      _cancel () {
        if (typeof this.cancel === 'function') this.cancel.call(this.O) !== false && this._close()
        else this._close()
      },
      btnClick (i) {
        if (i === 0) this._ok()
        if (i === 1) this._cancel()
      }
    },
    mounted () {
    }
  }
</script>


<style lang="stylus" scoped>
  @import '../var.stylus' 
  .modal 
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    text-align center
    z-index 9999
    .mask
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      opacity .5
      background #000
      z-index 9998
    .box-wrapper
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      text-align center
      z-index 9999
      &:after
        content ''
        height 100%
        width 0
        vertical-align middle
        display inline-block
    .box
      position relative
      text-align left
      display inline-block
      vertical-align middle
      background-color #fff
      width 4.2rem
      radius()
      font-size 16px
    .header-bar
      position absolute
      top 0
      left 0
      right 0
      height .5rem
      padding-left PW
      z-index 1
      radius(15px)
      border-bottom-left-radius 0
      border-bottom-right-radius 0
      .title
        font-size .16rem
        font-weight 700
        color #333
        float left
        line-height .5rem
        max-width 50%
      .buttons
        float right
        max-width 50%
        .el-icon-close
          margin .08rem
          padding .05rem .1rem
          font-size .18rem
          color LIGHT
          &:hover
            color #fff
            background-color DANGER-HOVER
          &:active
            color #fff
            background-color DANGER-ACTIVE
    .footer-bar
      padding .4rem  .2rem
      text-align center
      .ds-button:not(:first-child)
        margin-left .1rem
      &.btn1
        .ds-button
          width 60%
        
    .content
      position relative
      padding 0 .3rem
      font-size 14px
      margin-top .5rem

  .ds-icon-success-large
  .ds-icon-notice-large
  .ds-icon-question-large
    padding-top 90px
    font-size .18rem
    text-align center
    color #333
  
  .ds-icon-redpocket
    color #fff
    padding-top 160px
    text-align center
    
  .modal.redpocket
    .box 
      width 330px
      background-color #d4322d
      radius(15px)
      
      .header-bar
        background-color #e23f38
      .content
        padding 0
      .footer-bar
        padding 0
        margin .3rem 0 .4rem 0 
    
      
    
    
</style>

