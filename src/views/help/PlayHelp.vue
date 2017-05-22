<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.play-help
      .ds-button-group
        .ds-button.text-button(:class="{ selected: index === i }" @click=" index = i " v-for=" (g, i) in games ") {{ g.tagname }}
      // .content(v-html=" games[index].content ")
      .content(v-if=" gcontent ")
        p.title {{ gcontent.content }}

        el-row.row-title.text-black
          el-col(style="width: 10%") 玩法组
          el-col(style="width: 15%; padding-left: .2rem") 玩法
          el-col( style="width: 75%; padding-left: .2rem") 玩法说明

        el-row.row-content(v-for="g in groups")
          el-col(style="width: 10%; margin: .15rem 0")  {{ g.title }}
          el-col(style="width: 90%")
            el-row(v-for=" m in g.subList " style="margin: .15rem 0")
              el-col(style="width: 16.66%; padding-left: .2rem") {{ m.title }}
              el-col( style="width: 83.33%; padding-left: .2rem") {{ m.content }}

        

    
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
      },
      groups () {
        return (this.gcontent.subList || []).filter(g => g.level === 2)
      }
    },
    mounted () {
      this.getHelpTag()
    },
    methods: {
      getHelpInfo () {
        this.$http.get(api.getHelpInfo, {subject: 'game'}).then(({data}) => {
          if (data.success === 1) {
            // this.games = data.items.filter(g => g.level === 0)
            this.content = data.content
          } else this.$message.warning({target: this.$el, message: '玩法帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '玩法帮助信息获取失败！'})
        })
      },
      getHelpTag () {
        this.$http.get(api.getHelpTag, {subject: 'game'}).then(({data}) => {
          if (data.success === 1) {
            this.games = data.tagList
            this.getHelpInfo()
          } else this.$message.warning({target: this.$el, message: '玩法帮助信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '玩法帮助信息获取失败！'})
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .play-help
    top TH
    text-align center
    padding PWX 0
    .content
      margin 0 PWX PWX PWX
      text-align left
      font-size .12rem
      .title
        margin PWX 0
        color #999
      .row-title
        font-weight bold
      .row-content
        border-bottom 1px solid #d4d4d4
        &:last-child
          border-bottom none
      
        
</style>
