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
      
      .content(v-for="gcontent in gcontents")

        span.step(v-if=" gcontent.title !== '\"\"' ") {{ gcontent.title}}
        .value {{ gcontent.content }}
        
        // p.title {{ gcontent.content }}

        .item(v-for="g in gcontent.subList") 
          span.step.text-black {{ g.title }}
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
    .ds-button-group
      text-align left
      // height auto
    .title
      font-size .12rem
      color #999
    .content
      text-align left
      margin PW 0
      .item
        margin PW
       .step
          font-size .16rem
      .step
        position relative
        top -.02rem
        font-size .18rem
        font-weight bold
      .value
        line-height .22rem
        text-indent PWX
</style>
