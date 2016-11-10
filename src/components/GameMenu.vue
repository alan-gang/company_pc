<template lang="jade">
  dl.menu

    // =======五星==========
    dd.title 五星
      .submenu-group
        dl.submenu
          dt 直选
          dd 直选复式
          dd 直选单式
          dd 直选组合
        dl.submenu
          dt 组选
          dd 组选120
          dd 组选60
          dd 组选30
          dd 组选20
          dd 组选10
        dl.submenu
          dt 特殊
          dd 一帆风顺
          dd 好事成双
          dd 三星报喜
          dd 四季发财

    // =======四星==========
    dd.title 四星
      .submenu-group
        dl.submenu
          dt 前四直选
          dd 直选复式
          dd 直选单式
          dd 直选组合
        dl.submenu
          dt 前四组选
          dd 组选24
          dd 组选12
          dd 组选6
          dd 组选4
        dl.submenu
          dt 后四直选
          dd 直选复式
          dd 直选单式
          dd 直选组合
        dl.submenu
          dt 后四组选
          dd 组选24
          dd 组选12
          dd 组选6
          dd 组选4

      // =======前三==========
      dd.title 前三
        .submenu-group
          dl.submenu
            dt 前三直选
            dd 直选复式
            dd 直选单式
            dd 直选和值
            dd 直选跨度
          dl.submenu
            dt 前三组选
            dd 组三单式
            dd 组三复式
            dd 组六单式
            dd 组六复式
            dd 混合组选
            
          dl.submenu
            dt 前三其他
            dd 和值(不含豹子号)
            dd 包胆((不含豹子号)
            dd 和值尾数
            dd 特殊号

      // =======中三==========
      dd.title 中三
        .submenu-group
          dl.submenu
            dt 中三直选
            dd 直选复式
            dd 直选单式
            dd 直选和值
            dd 直选跨度
          dl.submenu
            dt 中三组选
            dd 组三单式
            dd 组三复式
            dd 组六单式
            dd 组六复式
            dd 混合组选
            
          dl.submenu
            dt 中三其他
            dd 和值
            dd 包胆
            dd 和值尾数
            dd 特殊号

      // =======后三==========
      dd.title 后三
        .submenu-group
          dl.submenu
            dt 后三直选
            dd 直选复式
            dd 直选单式
            dd 直选和值
            dd 直选跨度
          dl.submenu
            dt 后三组选
            dd 组三单式
            dd 组三复式
            dd 组六单式
            dd 组六复式
            dd 混合组选
            
          dl.submenu
            dt 后三其他
            dd 和值
            dd 包胆
            dd 和值尾数
            dd 特殊号
      
      // =======二星==========
      dd.title 二星
        .submenu-group
          dl.submenu
            dt 前二直选
            dd 直选复式
            dd 直选单式
            dd 直选跨度
          dl.submenu
            dt 前二组选
            dd 组选复式
            dd 组选单式
            dd 组选包胆
          dl.submenu
            dt 后二直选
            dd 直选复式
            dd 直选单式
            dd 直选跨度
          dl.submenu
            dt 后二组选
            dd 组选复式
            dd 组选单式
            dd 组选包胆

      // =======二星==========
      dd.title 一星
        .submenu-group
          dl.submenu
            dd 定位胆

      // =======不定位==========
      dd.title 不定位
        .submenu-group
          dl.submenu
            dt 三星
            dd 前三一码
            dd 前三二码
            dd 中三一码
            dd 中三二码
            dd 后三一码
            dd 后三二码
          dl.submenu
            dt 四星
            dd 前四一码
            dd 前四二码
            dd 后四一码
            dd 后四二码
          dl.submenu
            dt 五星
            dd 五星二码
            dd 五星一码



      // =======任选==========
      dd.title 任选
        .submenu-group
          dl.submenu
            dt 任二
            dd 直选复式
            dd 直选单式
            dd 组选复式
            dd 组选单式
          dl.submenu
            dt 任三
            dd 直选复式
            dd 直选单式
            dd 组三复式
            dd 组三单式
            dd 组六复式
            dd 组六单式
            dd 混合组选

           dl.submenu
            dt 任四
            dd 直选复式
            dd 直选单式
            dd 组选24
            dd 组选12
            dd 组选6
            dd 组选4

      // =======趣味==========
      dd.title 趣味
        .submenu-group
          dl.submenu
            dt 大小单双
            dd 前二大小单双
            dd 后二大小单双
          dl.submenu
            dt 猜遗漏
            dd 猜一
            dd 猜二
            dd 猜三
            dd 猜四
            dd 猜五
          
         

</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import '../var.stylus'
  .menu
    height GMH
    margin 0
    line-height GMH
    color #666
    padding 0 .15rem
    .title
      float left
      margin 0
      cursor pointer
      width GMH + .2rem
      height 100%
      oveflow visible
      text-align center
      &:hover 
        color #fff
        background-color #06c
        .submenu-group
          display block
      .submenu-group
        display none
        position absolute
        max-height 4rem
        oveflow-y auto
        color #666
        background-color #fff
        box-shadow 0 0 .2rem .05rem #777
        cursor default
        .submenu
          float left
          padding .15rem
          min-width 1rem
          display inline-block
          dt
            color #999
          dd
            cursor pointer
        
      
</style>



