<template lang="jade">
  .search-condition-date(v-bind:class="className")
    span.mr10(v-show="showTimeTxt") 时间
    el-button(v-for="(c, i) in searchConditions" v-bind:class="{selected: quickDateIdx === i}" @click="choiceDate(i)") {{c}}
    .ds-button.primary.large.ml15(v-if="showBtnSearch" @click="search" v-html="btnSearchText")
</template>

<script>
export default {
  data () {
    return {
      searchConditions: ['今天', '昨天', '前天', '最近一周'],
      quickDateIdx: -1,
      config: { d0: [0, 0], d1: [1, 1], d2: [2, 2], d3: [7, 0] } // [7, 0]  7为7天前，0为今天
    }
  },
  props: {
    showTimeTxt: {
      type: Boolean,
      default: true
    },
    conditions: {
      type: Array,
      default: []
    },
    className: '',
    showBtnSearch: {
      type: Boolean,
      default: false
    },
    btnSearchText: {
      type: String,
      default: '搜索'
    }
  },
  watch: {
    conditions () {
      if (this.conditions.length > 0) {
        this.searchConditions = this.conditions
      }
    }
  },
  methods: {
    choiceDate (i) {
      this.quickDateIdx = i
      this.$emit('choiced', i, this.config['d' + i])
    },
    search () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="stylus">
  .search-condition-date
    display flex
    align-items center
    .el-button
      min-width 0.8rem
      height 0.3rem
      padding 0
    .el-button:focus,
    .el-button:hover
      border solid 1px #f37e0c
      color #666
    .el-button.selected
      background-image linear-gradient(0deg, #fff3e9 0%, #fffaf6 100%), linear-gradient(#f37e0c, #f37e0c)
      border solid 1px #f37e0c
    .ds-button
      border-radius 0.03rem
</style>
