<template>
  <div class="stop-masker-wrapper">
    <div class="masker-dialog-container">
      <div class="masker-title">
        <img src="~@/assets/stop_masker/title.png"
             alt="">
      </div>
      <div class="recovery-time">
        恢复时间：2020年2月1日（正月初八）00：00：00
      </div>
      <div class="recomment-game">
        <div class="text-decorate-left decorate"></div>
        <div class="text-container">
          <span>信</span>
          <span>游</span>
          <span>推</span>
          <span>荐</span>
          <span>游</span>
          <span>戏</span>
        </div>
        <div class="text-decorate-right decorate"></div>
      </div>
      <div class="game-list-container">
        <div class="list"
             v-for="item in menuList"
             :key="item.id">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [{ class: 'ds-icon-game-hlffc', id: '1-1-4', menuid: '73', title: '欢乐分分彩', volume: false, gameid: 17 },
      { class: 'ds-icon-game-ffctx sign hot', id: '1-1-7', menuid: '96', title: '腾讯分分彩', volume: false, gameid: 29 },
      { class: 'ds-icon-game-ffctx sign hot', id: '1-1-7', menuid: '96', title: '奥地利50秒彩', volume: false, gameid: 29 },
      { class: 'ds-icon-game-ffctx sign hot', id: '1-1-7', menuid: '96', title: '奥地利100秒彩', volume: false, gameid: 29 },
      { class: 'ds-icon-game-wbwfc sign new', id: '1-1-9', menuid: '75', title: '微博5分彩', volume: false, gameid: 150 },
      { url: 'G115', class: 'ds-icon-game-kt115 sign hot', id: '1-3-5', menuid: '14', title: '夺金120秒', gameid: 11 },
      { url: 'PK10', class: 'ds-icon-game-txsc sign new', id: '1-5-11', menuid: '74', title: '腾讯', volume: true, gameid: 151 },
      { class: 'ds-icon-game-xfK3', id: '1-4-5', menuid: '19', title: '幸福快三', volume: true, gameid: 33 }
      ]
    }
  }

}
</script>

<style scoped lang="stylus">
  .stop-masker-wrapper
    width 100%
    height 100%
    position absolute
    left 0
    top 0
    background-color rgba(0,0,0,0.52)
    z-index 10
    .masker-dialog-container
      width 720px
      height 800px
      background-image url('~@/assets/stop_masker/masker_bg.png')
      position absolute
      left 50%
      top 50%
      transform translate(-50%,-50%)
      display flex
      flex-direction column
      align-items center
      .masker-title
        margin-top 39px
      .recovery-time
        width: 542px;
        height: 58px;
        line-height 58px
        text-align center
        margin-top 17px
        background-color: #f2d383;
        border-radius: 29px;
        font-size: 17px;
        font-weight: bold;
        color: #df463d;
      .recomment-game
        display flex
        justify-content space-between
        align-items center
        margin-top 42px
        .text-decorate-left,.text-decorate-right
          width 58px
          height 13px
          background-image url('~@/assets/stop_masker/left.png')
        .text-decorate-right
          background-image url('~@/assets/stop_masker/right.png')
        .text-container
          display flex
          align-items center
          margin 0 22px
          span
            width 48px
            height 48px
            line-height 48px
            background-image url('~@/assets/stop_masker/text_bg.png')
            font-size: 24px;
            font-weight: bold;
            text-align center
            margin 0 5px
            color: #df463d;
      .game-list-container
        width: 542px;
        display: flex;
        margin-top 45px
        align-items: center
        padding: 0px 18px
        padding: 0 180x
        flex-wrap wrap
        justify-content: space-between
        box-sizing: border-box;
        .list
          width: 148px;
          height: 37px;
          line-height 37px
          border-radius: 19px;
          border: solid 2px #f2d383;
          font-size: 17px;
          color: #ffecba;
          text-align center
          margin-bottom 20px
          cursor pointer
          &:last-child
            transform: translateX(-175px);

</style>
