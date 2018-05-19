<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form.form-filters

        label.item 时间范围 
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
        .buttons(style="margin-left: .6rem; margin-top: .1rem")
          .ds-button.primary.large.bold(@click="getData") 搜索
        
      .table-list(style="padding: .15rem .2rem ")
      
        el-table.header-bold.nopadding(:data="data" style="margin: .2rem 0")

          el-table-column(prop="loginId" label="用户名" )

          el-table-column(prop="operateTime" label="时间" )
          
          el-table-column(prop="amount" label="金额" )
  
          el-table-column(prop="accountItemName" label="操作"  )


        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")


</template>

<script>
  import api from '../../http/api'
  import {dateTimeFormat} from '../../util/Date'
  export default {
    name: 'BGTransaction',
    compontents: {
    },
    data () {
      return {
        defaultStEt: ['', ''],
        stEt: ['', ''],
        data: [],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {}
      }
    },
    watch: {
      stEt: {
        deep: true,
        handler () {
          if (!this.stEt[0] && !this.stEt[1]) this.stEt = this.defaultStEt
          if ((window.newDate(this.stEt[0])).getTime() === (window.newDate(this.stEt[1])).getTime()) {
            this.stEt[1] = new Date((window.newDate(this.stEt[1])).getTime() + 3600 * 1000 * 24 - 1000)
          }
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      pageChanged (cp) {
        this.getData(cp, () => {
          this.currentPage = cp
        })
      },
      getData (page, fn) {
        let loading = this.$loading({
          text: 'BG转帐记录加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            projectId: this.id,
            startTime: this.stEt[0] ? dateTimeFormat(this.stEt[0]) : '',
            endTime: this.stEt[1] ? dateTimeFormat(this.stEt[1]) : '',
            pageIndex: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.pageIndex = page
        }
        this.$http.get(api.queryBalanceTransfer, this.preOptions).then(({data: {result}}) => {
          if (result && result.items) {
            typeof fn === 'function' && fn()
            this.data = result.items
            this.total = result.total || this.data.length
          }
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .form
    padding PWX
</style>
