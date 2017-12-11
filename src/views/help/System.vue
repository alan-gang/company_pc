<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.function-help

      // 新
      // .content.scroll-content(style="width: 4rem;")
      //   .item(v-for="(g, index) in notices") 
      //     .step.text-666( v-bind:class="{'text-black': openIndex === index}" @click="openIndex === index ?  (openIndex = -1) : (openIndex = index)") 
      //       span {{ g.subject }}
      //       .time.text-666( v-bind:class="{'text-black': openIndex === index}") {{ g.sendTime }}
      //     // pre.value(v-show=" openIndex === index ") {{ g.content }}

      // .detial.scroll-content(style="left: 4rem" v-if="cg")
      //   .step.text-666
      //     span {{ cg.subject }}
      //     .time.text-666 {{ cg.sendTime }}
      //   pre.value {{ cg.content }}
      
      .content
        .item(v-for="(g, index) in notices") 
          .step.text-666( v-bind:class="{'text-black': openIndex === index}" @click="openIndex === index ?  (openIndex = -1) : (openIndex = index)") 
            span {{ g.subject }}
            .time.text-666( v-bind:class="{'text-black': openIndex === index}") {{ g.sendTime }}
           pre.value(v-show=" openIndex === index ") {{ g.content }}
         
         el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

        p.class(v-if=" notices.length === 0 ") 暂无任何公告!
    
</template>

<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        notices: [],
        openIndex: 0,
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {}
      }
    },
    computed: {
      cg () {
        return this.notices[this.openIndex]
      }
    },
    mounted () {
      this.sysNotices()
    },
    methods: {
      pageChanged (cp) {
        this.sysNotices(cp, () => {
          this.currentPage = cp
        })
      },
      // 11、系统公告   ALL
      sysNotices (page, fn) {
        let loading = this.$loading({
          text: '公告加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.get(api.sysNotices, this.preOptions).then(({data}) => {
          // success
          if (data.success) {
            this.notices = data.sysNotices || []
            // this.notices = [{subject: '快投30秒 (1711201201) 期199000'}]
            typeof fn === 'function' && fn()
            this.total = data.totalSize || this.notices.length
          }
        }, (rep) => {
          // error
        }).finally((rep) => {
          loading.close()
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
    .item:hover .text-666
      color #000
    .ds-button-group
      text-align left
      // height auto
    .time
      text-align right
      font-size .12rem
    .title
      font-size .14rem
      color #999
    .content
      text-align left
      
      .item
            
        margin PW 0
        padding-bottom .2rem
      .step
        position relative
        top -.02rem
        font-size .18rem
        font-weight bold
        cursor pointer
        &.text-black span
          // font-family Roboto
          // font-size 0.72rem
          // font-gradient()
          background linear-gradient(90deg, #ff3350, #1a9ff3)
          -webkit-background-clip text
          -webkit-text-fill-color transparent
      .value
        margin-top 0
        line-height .22rem
</style>
<style lang="stylus">
  .night .function-help .item:hover .text-666
    color #fff
</style> 