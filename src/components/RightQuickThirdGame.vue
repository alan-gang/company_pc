<template lang="jade">
  .right-quick-third-game
    ul
      li.game-item(v-for="(item, i) in navs" v-bind:class="[item.class, {checked: i === checkedIndex}]" @click="active(i, item.type)") 
</template>

<script>
export default {
  name: 'RightQuickThirdGame',
  data () {
    return {
      navs: [
        {name: '棋牌', title: '棋牌', class: 'item-chess', type: 'chess'}
      ],
      checkedIndex: -1
    }
  },
  methods: {
    active (i, type, data) {
      this.checkedIndex = i
      this.$emit('click', type, data)
    }
  }
}
</script>

<style lang="stylus">
.right-quick-third-game
  position fixed
  right 0.1rem
  bottom 2rem
  z-index 102
  .game-item
    width 0.7rem
    height 0.7rem
  .item-chess
    background url('../assets/outer/chess/icon_notactive.png') no-repeat center
    background-size 0.43rem 0.62rem
    &.checked
      background url('../assets/outer/chess/icon_activated.png') no-repeat center

</style>
