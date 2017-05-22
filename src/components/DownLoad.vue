s<template lang="jade">
  dl.download
    dd.ds-button.text-button.light.icon-list.ds-icon-windows Windows        
    dd.ds-button.text-button.light.icon-list.ds-icon-apple iPhone        
    dd.ds-button.text-button.light.icon-list.ds-icon-android Android        
</template>

<style lang="stylus">
  @import '../var.stylus'
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
    background url(../assets/windows.png) center 30% no-repeat
  .ds-icon-apple
    background url(../assets/apple.png) center 30% no-repeat
  .ds-icon-android
    background url(../assets/android.png) center 30% no-repeat
</style>
