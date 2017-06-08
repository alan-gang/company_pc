<template lang="jade">
  .slide-page.scroll-content
    .slide-header(ref="sh").ds-icon-ow-news-bg
        fieldset
          legend 
            h2 NEWS
          h5.light-white 了解畅博资讯 动态讯息全掌握

    .slide-content
      .scroll-content(ref="sc")
        .flex-content
          .list-container
            ul.news-list
              li.news-item(v-for=" n in news ")
                .time
                  h2 {{n.date}}
                  h6 {{n.year }}
                h4 {{n.title}}
                h6 {{n.content}}
            .loading-more 
              .link(:class=" {nomore: nomore} " @click="nomore = !nomore") 

    .slide-footer.scroll-content(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
        br
        | All right reserved


        
</template>

<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      news: [
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'},
        {year: 2016, date: '5-28', title: '恭贺畅博娱乐正式起航！', content: '恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航！娱乐正式起航！恭贺畅博娱乐正式起航恭贺畅博娱乐正式起航'}
      ],
      nomore: false
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './var.stylus'
   .loading-more
    text-align center
    .link
      display inline-block
      cursor pointer
      margin PW
      width 2rem
      text-align center
      height .4rem
      line-height .4rem
      radius(.2rem)
      &:hover
        color #1a9ff3
      border 1px solid #eee
      color #1a9ff3
      &:after
        content '加载更多'
      &.nomore
        border-color rgba(0,0,0,0)
        &:after
          content '没有更多了'
          color #bbb
          
  .slide-page
    .slide-header
      padding 1rem
    fieldset
      border .05rem solid #fff
      radius()
      color #fff
      text-align center
      max-width 4rem
      width 60%
      margin 0 auto
      h5 
        padding-bottom .2rem
    legend
      margin 0 auto
      font-size .58rem
      color #fff
    
    .list-container
      text-align left
      padding 0 PW
      overflow auto
    .news-list
      padding 0
      max-width 10rem
      margin 0 auto
      list-style none
      h2
        font-size .4rem
        font-gradient()
      h4
        font-size .18rem
        margin-bottom .1rem
      h6
        margin 0
        color #999
        font-size .14rem
        
      .time
        position absolute
        left 0
        width 1.5rem
        border-right 1px solid #eee
      .news-item
        position relative
        border-bottom 1px solid #eee
        padding .4rem 0
        padding-left 2rem
        
   
</style>



