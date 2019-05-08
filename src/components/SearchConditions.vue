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
      quickDateIdx: -1
    }
  },
  props: {
    showTimeTxt: {
      type: Boolean,
      default: true
    },
    searchConditions: {
      type: Array,
      default () {
        return ['今天', '昨天', '前天', '最近一周']
      }
    },
    className: '',
    showBtnSearch: {
      type: Boolean,
      default: false
    },
    btnSearchText: {
      type: String,
      default: '搜索'
    },
    dateMappingConfig: {
      type: Object,
      default () {
        return { d0: [0, 0], d1: [1, 1], d2: [2, 2], d3: [7, 0] } // [7, 0]  7为7天前，0为今天
      }
    }
  },
  watch: {
  },
  methods: {
    choiceDate (i) {
      this.quickDateIdx = i
      this.$emit('choiced', i, this.toDate())
    },
    search () {
      this.$emit('search')
    },
    toDate () {
      let curDate = new Date()
      curDate.setDate(curDate.getDate() - this.dateMappingConfig['d' + this.quickDateIdx][0])
      let days = curDate.getDate()
      let month = curDate.getMonth() + 1
      days = String(days).padStart(2, '0')
      month = String(month).padStart(2, '0')
      let startDate = `${curDate.getFullYear()}${month}${days}000000`

      curDate = new Date()
      curDate.setDate(curDate.getDate() - this.dateMappingConfig['d' + this.quickDateIdx][1])
      let edays = curDate.getDate()
      let emonth = curDate.getMonth() + 1
      edays = String(edays).padStart(2, '0')
      emonth = String(emonth).padStart(2, '0')
      let endDate = `${curDate.getFullYear()}${emonth}${edays}235959`
      return { startDate, endDate }
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

  .search-bar
    background-color #fff

</style>
