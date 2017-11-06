s<template lang="jade">
  dl.download
    a.ds-button.text-button.light.icon-list.ds-icon-windows(target="_blank" href="http://www.changbo.net/#/download") Windows        
    a.ds-button.text-button.light.icon-list.ds-icon-apple(target="_blank" href="https://fir.im/t6rk") iPhone        
    a.ds-button.text-button.light.icon-list.ds-icon-android(target="_blank" href="https://fir.im/2819") Android        
</template>

<style lang="stylus">
  @import '../var.stylus'
  @import '../path.stylus'
  .download
    text-align center
    .icon-list
      display inline-block
      width DLH
      height DLH
      padding 0
      line-height 1.5rem
      color LIGHT
      font-size .12rem
      cursor pointer
  .ds-icon-windows
    background url($CASSETS/windows.png) center 30% no-repeat
  .ds-icon-apple
    background url($CASSETS/apple.png) center 30% no-repeat
  .ds-icon-android
    background url($CASSETS/android.png) center 30% no-repeat
</style>
