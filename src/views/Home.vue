<template lang="jade">
  transition
    section
      .container
        el-row(:gutter="20" v-for=" row in group ")
          el-col.grid-content.bg-purple(:span="6" v-for=" col in row " v-if="col") {{ col.name }}
</template>

<script>
import base from 'components/base'
import util from '../util'

export default {
  mixins: [base],
  // props: ['hasHeader'],
  data () {
    return {
      games: [
        {id: 1, name: '黄金糕', opened: false, active: false, url: 'one'},
        {id: 2, name: '狮子头', opened: false, active: false, url: 'two'},
        {id: 3, name: '螺蛳粉', opened: false, active: false, url: 'three'},
        {id: 4, name: '双皮奶', opened: false, active: false, url: 'four'},
        {id: 5, name: '蚵仔煎', opened: false, active: false, url: 'five'}
      ]
    }
  },
  computed: {
    group () {
      return util.groupArray(this.games, 4)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .container
    max-width 8rem
    min-width 6rem
    margin 0 auto
  .el-row
    .el-col
      font-size .24rem
      min-height 1rem
      line-height 1rem
</style>



