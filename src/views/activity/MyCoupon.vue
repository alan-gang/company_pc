<template lang="jade">
  .mycoupon-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content
      .table-list(style="padding: .15rem .2rem ")
        el-table.header-bold.nopadding(:data="data" ref="table" stripe v-bind:max-height="MH")
         
          el-table-column(class-name="" prop="getTime" label="领取时间" align="center" )
          el-table-column(class-name="" prop="goodsName" label="优惠券名称" align="center" )
          el-table-column(class-name="" prop="desc" label="优惠金额" align="center" )
            template(scope="scope")
              span {{ scope.row.isUsed ? scope.row.prizeAmount : scope.row.desc }}

          el-table-column(class-name="" prop="activityName" label="所属优惠活动" align="center" )
          el-table-column(class-name="" prop="expireTime" label="有效期至" align="center" )
          el-table-column(class-name="" prop="isUsed" label="状态" align="center" )
            template(scope="scope")
              span(:class=" {'text-grey': scope.row.isUsed, 'text-green': !scope.row.isUsed, } ") {{ stateText[scope.row.isUsed] }}

          el-table-column(label="操作" align="center")
            template(scope="scope")
              span.ds-button.text-button(:class=" {blue: !scope.row.isUsed} " @click=" current = scope.row ") {{ stateActionText[scope.row.isUsed] }}

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > pageSize " v-on:current-change="pageChanged")
      
    Modal.in-mycoupon(v-if=" current " v-bind:Pbtn="Pbtn " v-bind:PboxStyle="PboxStyle" v-bind:Pclose="Pclose")
      .my-content.text-666(slot="my-content" style="text-align: left; font-size: .16rem; line-height: .36rem; user-select: text; position: relative; top: -.36rem")
        p.text-center.text-bold.text-333.ft18 {{ current.goodsName }}
        //- p 使用说明： 使用此优惠券， 需要向 【{{ froms[current.plat].split(':')[0] }}】 充值 {{ current.exAmount }} 以上
        p 优惠金额： {{ current.desc }}
        p 转出帐户： 主帐户
        p 转入帐户： {{ froms[current.plat].split(':')[0] }}
        p 输入金额：
          input.ds-input(v-model="m" style="width: 1.8rem" @keyup.enter="use")
        .text-center(style="position: relative; top: .1rem")
          .ds-button.cancel.a(@click=" Pclose ") 暂不使用
          .ds-button.primary.a(@click="use") 立即使用

</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import api from '../../http/api'
  import page from 'components/page'
  import Modal from 'components/Modal'
  export default {
    mixins: [setTableMaxHeight, page],
    components: {Modal},
    data () {
      return {
        stateText: ['未使用', '已使用'],
        stateActionText: ['立即使用', ''],
        TH: 125,
        Pbtn: [],
        PboxStyle: {
          width: '6rem'
        },
        froms: ['主帐户', '特殊帐户', 'BG帐户:2', '体育帐户:3', 'AG帐户:4', 'PT帐户:5', '', '棋牌帐户:7'],
        m: ''
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      list (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        this.$http.post(api.queryMygoods, Object.assign({
        }, option)).then(({data: {success, myGoods, totalSize}}) => {
          if (success === 1) {
            this.data = myGoods
            this.total = totalSize || this.data.length
            cb()
          }
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      use () {
        if (!Number(this.m)) return this.$message.warning({target: this.$el, message: '请输入转帐金额！'})
        this.$http.get(api.transferToBG, {amount: this.m, platid: this.current.plat, entry: this.current.entry}).then(({data}) => {
          if (data.success === 1) {
            this.$message.warning({target: this.$el, message: data.msg || '优惠券使用成功'})
            this.list()
            this.current = null
            this.__setCall({fn: '__getUserFund', args: undefined})
          }
        })
      },
      Pclose () {
        this.current = null
        return false
      }
    }
  }
</script>

<style lang="stylus">
  .in-mycoupon
    .a
      margin .1rem .1rem 0 0
  
</style>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  // .mycoupon-center

</style>
