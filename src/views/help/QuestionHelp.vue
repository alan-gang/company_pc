<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.function-help
      .ds-button-group
        .ds-button.text-button(:class="{ selected: index === i }" @click=" index = i " v-for=" (g, i) in games ") {{ g.tagname }}
      
      .content(v-if=" gcontent ")
        p.title {{ gcontent.content }}

        .item(v-for="g in gcontent.subList") 
          span.step {{ g.title }}
          .value {{ g.content }}
         

    
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
      gcontent () {
        return (this.content.filter(c => c.key === this.gid)[0] || {value: [{}]}).value[0]
      }
    },
    mounted () {
      this.getHelpTag()
    },
    methods: {
      getHelpInfo () {
        this.$http.get(api.getHelpInfo, {subject: 'faq'}).then(({data}) => {
          if (data.success === 1) {
            this.content = data.content
          } else this.$message.warning({target: this.$el, message: '常见问题帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '常见问题帮助信息获取失败！'})
        })
      },
      getHelpTag () {
        this.$http.get(api.getHelpTag, {subject: 'faq'}).then(({data}) => {
          if (data.success === 1) {
            this.games = data.tagList
            this.getHelpInfo()
          } else this.$message.warning({target: this.$el, message: '常见问题帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '常见问题帮助信息获取失败！'})
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
    .ds-button-group
      text-align left
      // height auto
    .title
      font-size .12rem
      color #999
    .content
      text-align left
      .item
        margin PW 0
      .step
        position relative
        top -.02rem
        font-size .18rem
        color #333
        font-weight bold
      .value
        line-height .22rem
</style>