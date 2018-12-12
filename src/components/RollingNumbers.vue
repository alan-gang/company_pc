<template lang="jade">
  .rolling-numbers(:class=" gameType ")
    
    .number(v-if=" gameType !== 'K3' " v-for=" (n, i) in numbers " v-bind:class=" {hl: setPosColor(i)} ") 
     
      .the-number-box(v-bind:style=" {transform: 'translateY(' + (-n / (numbers.length > 10 ? 0.81 : 0.5))  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease '} ")
        .the-number(v-for=" (xx, nn ) in Array(numbers.length > 10 ? 81 : 50) " ) {{ nn === parseInt(n) ? displayNumbers[i] : nn }}



    .dice-box.inlb(v-if=" gameType === 'K3' " v-for=" (n, i) in numbers.slice(0, 3) ")
      Dice.dead(v-for=" (xx, nn ) in Array(6) " v-bind:value=" nn + 1 " v-bind:style=" {transform: 'translateY(' + (-100 * (n - 1))  + '%)' , transition: 'transform ' + (1 + (1 * i)) + 's ease' } ")


</template>

<script>
import Dice from './Dice'
import { getAnimalOfNumber, getColorOfNumber } from '../util/Number'
export default {
  props: {
    numbers: Array,
    gameType: String,
    hl: String
  },
  data () {
    return {
      type: 1,
      getColorOfNumber: getColorOfNumber
    }
  },
  computed: {
    displayNumbers () {
      return this.numbers.map(n => {
        if (typeof n === 'object' && n[0] !== undefined) {
          return n.map(nn => {
            return getAnimalOfNumber(nn)[this.type - 2] || nn
          })
        } else {
          return getAnimalOfNumber(n)[this.type - 2] || n
        }
      })
    }
  },
  watch: {
  },
  methods: {
    fresh () {
      this.__setCall({fn: '__recentlyCode'})
    },
    setPosColor (i) {
      switch (this.hl) {
        case 'q2':
          if (i < 2) return 'hl'
          break
        case 'q3':
          if (i < 3) return 'hl'
          break
        case 'z3':
          if (i < 4 && i > 0) return 'hl'
          break
        case 'h2':
          if (i > 2) return 'hl'
          break
        case 'h3':
          if (i > 1) return 'hl'
          break
      }
    }
  },
  components: {
    Dice
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  W1 = .5rem
  F1 = .27rem
  
  W2 = .35rem
  F2 = .2rem
  
  W3 = .25rem
  F3 = .16rem
  
  W4 = .52rem

  .rolling-numbers
    padding 0 .1rem
    .number
      width W1
      height W1
      line-height W1
      font-size F1
      position relative
      display inline-block
      margin 0 .04rem
      text-align center
      color #000
      font-weight bold
      background-image linear-gradient(0deg, #dadde2 0%, #ffffff 100%);
      border 1px solid #ccc
      overflow hidden
      radius(50%)
      
      &.hl
        background-image linear-gradient(#f17d0b, #f17d0b), linear-gradient(0deg, #f3f3f3 0%, #ffffff 100%)
        color #fff
        border none
  
  .rolling-numbers.PK10
    .number
      width W3
      height W3
      line-height W3
      font-size F3
  
  .rolling-numbers.HC6
    .number
      width W2
      height W2
      line-height W2
      font-size F2
  
  .rolling-numbers.KL8
    max-width 3.5rem
    .number
      width W3
      height W3
      line-height W3
      font-size F3

  .rolling-numbers.K3
    
    .dice-box
      position relative
      width W4
      height W4
      overflow hidden
      margin 0 .04rem
      vertical-align middle
      
    .dice
      position relative
      box-shadow none
    
      
        
</style>
