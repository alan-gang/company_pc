<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.function-help

      img(src="/static/pic/bz_bg.jpg" style="width: 100%")
      .ds-button-group
        .ds-button.text-button(:class="{ selected: index === i }" @click=" index = i " v-for=" (g, i) in games ") {{ g.tagname }}
      
      .content(v-for="gcontent in gcontents" v-if=" gcontent.title === '\"\"' ")

        // span.step.text-black(v-if=" gcontent.title !== '\"\"' ") {{ gcontent.title}}
        // .value.text-999(v-if=" gcontent.title !== '\"\"' ") {{ gcontent.content }}


        .item(v-for="(g,i) in gcontent.subList" ) 
          span.step.text-black {{ g.title }}
          .value {{ g.content }}
      
      .content( v-if=" gcontents[0] && gcontents[0].title !== '\"\"' ")

        .item(v-for="gcontent in gcontents" ) 
          span.step.text-black {{ gcontent.title }}
          .value {{ gcontent.content }}

    
</template>

<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        games: [{}],
        index: 0,
        content: []
      }
    },
    computed: {
      gid () {
        return this.games[this.index].id
      },
      gcontents () {
        return (this.content.filter(c => c.key === this.gid)[0] || {value: [{}]}).value
      }
    },
    mounted () {
      this.getHelpTag()
    },
    methods: {
      getHelpInfo () {
        this.$http.get(api.getHelpInfo, {subject: 'comment'}).then(({data}) => {
          if (data.success === 1) {
            this.content = data.content
          } else this.$message.warning({target: this.$el, message: '功能帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '功能帮助信息获取失败！'})
        })
      },
      getHelpTag () {
        this.$http.get(api.getHelpTag, {subject: 'comment'}).then(({data}) => {
          if (data.success === 1) {
            this.games = data.tagList
            this.getHelpInfo()
          } else this.$message.warning({target: this.$el, message: '功能帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '功能帮助信息获取失败！'})
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .function-help
    top TH
    text-align center
    padding PWX
    min-width 9rem
    .ds-button-group
      position absolute
      top 1.2rem
      right 1rem
      color #fff
      font-size .36rem
      line-height .2rem
      @media screen and (max-width: 1600px)
        top .5rem
        font-size .24rem

      text-align left
      // height auto
    .title
      font-size .12rem
      color #999
    .content
      text-align left
      margin PW 0
      .item
        padding PW
        &:nth-child(odd)
          background-color #fff
        &:nth-child(even)
          background-color rgba(255, 255, 255, .5)
       .step
          font-size .16rem
      .step
        position relative
        top -.02rem
        font-size .18rem
        font-weight bold
      .value
        line-height .22rem
        text-indent .3rem
</style>
