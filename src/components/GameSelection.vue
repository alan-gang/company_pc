<template lang="jade">
  .game-selection
    h5.description {{ type.description}}
    el-row(v-if="show")
      el-col(:offset="4" v-bind:span="10")
        el-checkbox(v-for="p in positions" v-model="p.selected") {{ p.title }}
      el-col.notice(:span="10")
        | 温馨提示：你选择了 
        span.count {{ count }}
        |  个位置， 系统自动根据位置组合成
        span.comb {{ comb }}
        |  个方案

    GameNumberRow(v-for="row in rows" v-bind:row="row" v-on:numbers-change="numbersChange")

    el-input(v-model="value" v-if="rows.length === 0" type="textarea" autofocus  v-bind:autosize="{ minRows: 4, maxRows: 6 }" placeholder="每一个号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开")

</template>

<script>
  import GameNumberRow from './GameNumberRow'
  import { N } from '../util/index'
  export default {
    props: ['type'],
    data () {
      return {
        // 所有玩法号码工作区
        allRows: [
          /***
          ** 五星[直选复式,五星组合] | 四星[前四[直选复式,四星组合]] | 前三[直选复式] | 前二[直选复式] | 一星[定位胆] | 任选[任*[直选复式]]
          ***/
          {ids: '5-1-1, 5-1-3, 4-1-1, 4-1-3, +3-1-1, 2-1-1, 1-1-1, -1-1-1, -1-2-1, -1-3-1', title: '万位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[直选复式,五星组合] | 四星[后四[直选复式,四星组合]] | 前三[直选复式] | 中三[直选复式] | 前二[直选复式] | 一星[定位胆] | 任选[任*[直选复式]]
          ***/
          {ids: '5-1-1, 5-1-3, 4-1-1, 4-1-3, 4-3-1, 4-3-3, +3-1-1, 3-1-1, 2-1-1, 1-1-1, -1-1-1, -1-2-1, -1-3-1', title: '千位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[直选复式,五星组合] | 四星[后四[直选复式,四星组合]] | 前三[直选复式] | 中三[直选复式] | 后三[直选复式] | 一星[定位胆] | 任选[任*[直选复式]]
          ***/
          {ids: '5-1-1, 5-1-3, 4-1-1, 4-1-3, 4-3-1, 4-3-3, +3-1-1, 3-1-1, -3-1-1, 1-1-1, -1-1-1, -1-2-1, -1-3-1', title: '百位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[直选复式,五星组合] | 四星[后四[直选复式,四星组合]] | 中三[直选复式] | 后三[直选复式] | 后二[直选复式] | 一星[定位胆] | 任选[任*[直选复式]]
          ***/
          {ids: '5-1-1, 5-1-3, 4-1-1, 4-1-3, 4-3-1, 4-3-3, 3-1-1, -3-1-1, 2-3-1, 1-1-1, -1-1-1, -1-2-1, -1-3-1', title: '十位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[直选复式,五星组合] | 四星[后四[直选复式,四星组合]] | 后三[直选复式] | 后二[直选复式] | 一星[定位胆] | 任选[任*[直选复式]]
          ***/
          {ids: '5-1-1, 5-1-3, 4-3-1, 4-3-3, -3-1-1, 2-3-1, 1-1-1, -1-1-1, -1-2-1, -1-3-1', title: '个位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[组选120]
          ***/
          {ids: '5-2-1', title: '组选120', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[组选120,组选5]
          ***/
          {ids: '5-2-6', title: '四重号', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[组选60,组选20,组选10] | 四星[组选4] | 任四[组选4]
          ***/
          {ids: '5-2-4, 5-2-5, 4-2-4, 4-4-4, -1-3-6', title: '三重号', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[组选60,组选30,组选10] | 四星[组选12, 组选6] | 任四[组选12,组选6]
          ***/
          {ids: '5-2-2, 5-2-3, 5-2-5, 4-2-2, 4-4-2, 4-2-3, 4-4-3, -1-3-4, -1-3-5', title: '二重号', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[组选60,组选30,组选20,组选5] | 四星[组选12,组选4] | 任四[组选12] | 任四[组选4]
          ***/
          {ids: '5-2-2, 5-2-3, 5-2-4, 5-2-6, 4-2-2, 4-4-2, 4-2-4, 4-4-4, -1-3-4, -1-3-6', title: '单号', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[一帆风顺]
          ***/
          {ids: '5-3-1', title: '一帆风顺', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[好事成双]
          ***/
          {ids: '5-3-2', title: '好事成双', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[三星报喜]
          ***/
          {ids: '5-3-3', title: '三星报喜', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 五星[四季发财]
          ***/
          {ids: '5-3-4', title: '四季发财', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 四星[组选24] | 任四[组选24]
          ***/
          {ids: '4-2-1, 4-4-1, -1-3-3', title: '组选24', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 前三[直选和值] | 中三[直选和值] | 后三[直选和值]
          ***/
          {ids: '+3-1-3, 3-1-3, -3-1-3', title: '直选和值', min: 0, max: 27},
          /***
          ** 前三[直选跨度] | 中三[直选跨度] | 后三[直选跨度] | 前二[直选跨度] | 后二[直选跨度]
          ***/
          {ids: '+3-1-4, 3-1-4, -3-1-4, 2-1-3, 2-3-3', title: '跨度', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 前三[组三复式] | 中三[组三复式] | 后三[组三复式] | 任三[组三复式]
          ***/
          {ids: '+3-2-1, 3-2-1, -3-2-1, -1-2-3', title: '组三', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
           /***
          ** 前三[组六复式] | 中三[组六复式] | 后三[组六复式] | 任三[组六复式]
          ***/
          {ids: '+3-2-3, 3-2-3, -3-2-3, -1-2-5', title: '组六', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 前三[直选和值] | 中三[直选和值] | 后三[直选和值]
          ***/
          {ids: '+3-3-1, 3-3-1, -3-3-1', title: '和值', min: 0, max: 26},
          /***
          ** 前三[包胆] | 中三[包胆] | 后三[包胆] | 前二[包胆] | 后二[包胆]
          ***/
          {ids: '+3-3-2, 3-3-2, -3-3-2, 2-2-3, 2-4-3', title: '包胆', min: 0, max: 9},
          /***
          ** 前三[和值尾数] | 中三[和值尾数] | 后三[和值尾数]
          ***/
          {ids: '+3-3-3, 3-3-3, -3-3-3', title: '和值尾数', min: 0, max: 9},
          /***
          ** 前三[特殊号] | 中三[特殊号] | 后三[特殊号]          ***/
          {ids: '+3-3-4, 3-3-4, -3-3-4', title: '特殊号', values: [{selected: false, title: '豹子', value: '1'}, {selected: false, title: '顺子', value: '2'}, {selected: false, title: '对子', value: '3'}]},
          /***
          ** 前二[组选复式] | 后二[组选复式] | 任二[组选复式] | 任三[组选复式]
          ***/
          {ids: '2-2-1, 2-4-1, -1-1-3', title: '组选', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 不定位
          ***/
          {ids: '0-1-1, 0-1-2, 0-1-3, 0-1-4, 0-1-5, 0-1-6, 0-2-1, 0-2-2, 0-2-3, 0-2-4, 0-3-1, 0-3-2', title: '不定位', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          /***
          ** 趣味[前二大小单双]
          ***/
          {ids: '-2-1-1', title: '万位', values: [{selected: false, title: '大', value: '1'}, {selected: false, title: '小', value: '2'}, {selected: false, title: '单', value: '3'}, {selected: false, title: '双', value: '4'}], buttons: ['清']},
          /***
          ** 趣味[前二大小单双]
          ***/
          {ids: '-2-1-1', title: '千位', values: [{selected: false, title: '大', value: '1'}, {selected: false, title: '小', value: '2'}, {selected: false, title: '单', value: '3'}, {selected: false, title: '双', value: '4'}], buttons: ['清']},
           /***
          ** 趣味[后二大小单双]
          ***/
          {ids: '-2-1-2', title: '十位', values: [{selected: false, title: '大', value: '1'}, {selected: false, title: '小', value: '2'}, {selected: false, title: '单', value: '3'}, {selected: false, title: '双', value: '4'}], buttons: ['清']},
          /***
          ** 趣味[后二大小单双]
          ***/
          {ids: '-2-1-2', title: '个位', values: [{selected: false, title: '大', value: '1'}, {selected: false, title: '小', value: '2'}, {selected: false, title: '单', value: '3'}, {selected: false, title: '双', value: '4'}], buttons: ['清']},
          /***
          ** 趣味[猜遗漏]
          ***/
          {ids: '-2-2-1', title: '猜一', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-2-2-2', title: '猜二', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-2-2-3', title: '猜三', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-2-2-4', title: '猜四', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-2-2-5', title: '猜五', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']}
        ],
        // 输入的号码
        value: '',
        // 位置选择
        positions: [
          {
            title: '万位',
            value: 5,
            selected: false
          },
          {
            title: '千位',
            value: 4,
            selected: false
          },
          {
            title: '百位',
            value: 3,
            selected: false
          },
          {
            title: '十位',
            value: 2,
            selected: false
          },
          {
            title: '个位',
            value: 1,
            selected: false
          }
        ],
        // 要显示pos的玩法集
        ids: '-1-1-2, -1-1-3, -1-1-4, -1-2-2, -1-2-3, -1-2-4, -1-2-5, -1-2-6, -1-2-7, -1-3-2,  -1-3-5, -1-3-6',
        // 号码集
        ns: []
      }
    },
    computed: {
      // 根据玩法确定要显示的号码工作区
      rows () {
        return this.allRows.filter(row => row.ids.match(
          new RegExp('[^+-]*' + (this.type.id.match(/^[+-]/) ? ('\\' + this.type.id) : this.type.id), 'g')
        ))
      },
      // 显示位置选择
      show () {
        return this.ids.match(new RegExp('[^+-]*' + (this.type.id.match(/^[+-]/) ? ('\\' + this.type.id) : this.type.id), 'g'))
      },
      // 位置集合
      ps () {
        return this.positions.filter(p => p.selected).map(p => {
          return (p = p.value)
        })
      },
      // 位置长度
      psl () {
        return this.positions.filter(p => p.selected).length
      },
      // 号码集的长度集
      nsl () {
        return this.ns.map(n => {
          return (n = n.length)
        })
      },
      // 重复号码长度
      r () {
        return this.ns.join(',').split(',').filter(n => n !== '').reduce((p, n) => {
          if (p[n] !== undefined) p.repeat += 1
          else p[n] = n
          return p
        }, {repeat: 0}).repeat
      },
      // 注数
      n () {
        return N[this.type.id] ? N[this.type.id]({
          ns: this.ns,
          nsl: this.nsl,
          ps: this.ps,
          psl: this.psl,
          value: this.value,
          r: this.r
        }) : 0
      }
    },
    watch: {
      n () {
        this.$emit('n-change', this.n)
      },
      value () {
        this.value = this.value.replace(/[^0-9,;\s]+/g, '').replace(/[,;\s]+/g, ' ')
      }
    },
    methods: {
      // 选择号码发生变化
      numbersChange () {
        this.ns = this.rows.map(r => {
          return (r = r.ns || [])
        })
      }
    },
    components: {
      GameNumberRow
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .description
    color #666
    font-weight normal
    padding PW
    margin 0
  .el-textarea
    padding 0 PW
  .el-col
    min-height GCH
    line-height GCH
    &.notice
      line-height .2rem
      padding PW
      
  
</style>
<style>
  .el-textarea textarea {
    resize: none;
  }
</style>