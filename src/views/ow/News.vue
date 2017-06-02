<template lang="jade">
  .ow-news.scroll-content

    .ow-icon-news-bg
      fieldset
        legend NEWS
        h4 了解畅博资讯 动态讯息全掌握
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

    h6(style="margin: .1rem 0") Copyright © 2017 Changbo Entertainment Inc 
    h6(style="margin: .1rem 0") All right reserved
        
</template>

<script>
import AllRights from 'components/AllRights'
export default {
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
    AllRights
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../owvar.stylus'
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
          
  .ow-news
    display inline-block
    color #666
    .ow-icon-news-bg
      padding 1rem
    fieldset
      border .05rem solid #fff
      radius()
      color #fff
      text-align center
      max-width 4rem
      width 60%
      margin 0 auto
      h4 
        font-size .24rem
        opacity .8
        padding-bottom .2rem
    legend
      margin 0 auto
      font-size .58rem
      color #fff
    
    .list-container
      text-align left
      max-height 70%
      padding 0 PW
      overflow auto
      @media (max-width: IPADW)
        max-height 65%
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



