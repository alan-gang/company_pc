<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form.form-filters

        span.mr10 时间
        el-button(v-for="(c, i) in searchConditions" v-bind:class="{selected: curConditionIdx === i}" @click="curConditionIdx = i") {{c}}

        //- label.item 时间范围  
        //-   el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
        //- | &nbsp;&nbsp;
        
        el-popover(placement="bottom" width="450" trigger="hover" class="account-popover")
          acc-ls(v-bind:useHistory="useHistory" v-bind:froms="froms")
          label.item.ml15(slot="reference") 转出帐户 
            el-select(clearable v-model="f" style="width: 1.2rem" placeholder="无")
              el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-if="n")
        
        | &nbsp;&nbsp;
        
        el-popover(placement="bottom" width="450" trigger="hover")
          acc-ls(v-bind:useHistory="useHistory" v-bind:froms="froms")
          label.item(slot="reference") 转入帐户  
            el-select(clearable v-model="t" style="width: 1.2rem" placeholder="无")
              el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-if="n")
        
        | &nbsp;&nbsp;


        label.item 状态  
          el-select(clearable v-model="s" style="width: .8rem" placeholder="无")
            el-option(v-for="(n, i) in S" v-bind:label="n" v-bind:value="i" v-if="n")

        .ds-button.primary.large.bold(@click="getData" style="margin-left: .15rem;") 搜索
        //- .buttons(style="margin-left: .6rem; margin-top: .1rem")
        
      .table-list(style="padding: .15rem .2rem " stripe)
      
        el-table.header-bold.nopadding(:data="data"  style=""   ref="table" stripe v-bind:max-height=" MH ")

          el-table-column(class-name="pl2" prop="from" label="从...转出" )

          el-table-column(prop="to" label="转入到" )

          el-table-column(prop="time" label="时间" )
          
          el-table-column(prop="amount" label="金额" )

          el-table-column(prop="state" label="状态" )
            template(scope="scope")
              span(:class=" SC[scope.row.stateIndex] ") {{ S[scope.row.stateIndex] }}
  


        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import api from '../../http/api'
  import {dateTimeFormat} from '../../util/Date'
  export default {
    name: 'BGTransaction',
    components: {
      'acc-ls': {
        props: ['useHistory', 'froms'],
        template: `<section>
          <section v-show="useHistory.length > 0">
            <p>最近使用账户</p>
            <ul></ul>
          </section>
          <section>
            <p>所有账户</p>
            <ul>
              <li v-for="(c, i) in froms"> <el-button  v-bind:class="{selected: curConditionIdx === i}" @click="curConditionIdx = i"> {{c}}</el-button>
            </ul>
          </section>
        </section>`,
        methods: {}
      }
    },
    mixins: [setTableMaxHeight],
    data () {
      return {
        stEt: [(new Date().getTime() - 1000 * 3600 * 24 * 7), new Date()],
        // defaultStEt: [new Date(new Date().getTime() - 3600 * 1000 * 24), new Date(new Date().getTime())],
        // stEt: [new Date((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + ' 00:00:00'), new Date((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + ' 23:59:59')],
        // defaultStEt: ['', ''],
        // stEt: ['', ''],
        data: [],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        // froms: ['主帐户', '特殊帐户', 'BG帐户', 'IBC帐户', '棋牌帐户:7', 'PT帐户:5', '沙巴帐户:9', '乐游帐户:15', 'U赢帐户:17', 'KG帐户:18', '微游帐户:25'],
        froms: ['主帐户', '特殊帐户', 'BG帐户:2', 'IBC帐户:3', '棋牌帐户:7', 'PT帐户:5', 'AG帐户:4', '沙巴帐户:9', '乐游帐户:15', 'U赢帐户:17', 'KG帐户:18', '微游帐户:25', '平博帐户:19', 'LG帐户:21'],
        f: '',
        t: '',
        S: ['失败', '成功', '处理中'],
        SC: ['text-danger', 'text-green', 'text-blue'],
        s: '',
        searchConditions: ['今天', '昨天', '前天', '最近一周'],
        curConditionIdx: -1,
        useHistory: []
      }
    },
    watch: {
      // stEt: {
      //   deep: true,
      //   handler () {
      //     if (!this.stEt[0] && !this.stEt[1]) this.stEt = this.defaultStEt
      //     if ((window.newDate(this.stEt[0])).getTime() === (window.newDate(this.stEt[1])).getTime()) {
      //       this.stEt[1] = new Date((window.newDate(this.stEt[1])).getTime() + 3600 * 1000 * 24)
      //     }
      //   }
      // }
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
          text: '转帐记录加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            from: (this.froms[this.f] || '').split(':')[1] || this.f,
            to: (this.froms[this.t] || '').split(':')[1] || this.t,
            state: this.s,
            bgTm: this.stEt[0] ? dateTimeFormat(this.stEt[0]) : '',
            endTm: this.stEt[1] ? dateTimeFormat(this.stEt[1]) : '',
            pageIndex: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.pageIndex = page
        }
        this.$http.get(api.queryBalanceTransfer, this.preOptions).then(({data}) => {
          if (data && data.recordList) {
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            this.data = data.recordList
            this.total = data.totalSize || this.data.length
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
    .item
      display inline-block
      // margin-top .1rem
      vertical-align top

  .form-filters
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
