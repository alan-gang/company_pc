<template lang="jade">
  .game-selection

    GameNumberRow(v-for="(row, i) in rows" v-bind:row="row"  v-bind:gameid="gameid" v-on:numbers-change="numbersChange" v-bind:titleSpan="titleSpan" v-on:select = "select")

    el-row(v-if="rows.length === 0")
      el-col(:span="20")
        el-input(v-model="V" type="textarea" autofocus  v-bind:autosize="{ minRows: 5, maxRows: 10 }" placeholder="每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开")
      el-col.btn-groups(:span="4")
        .ds-button.outline.isworking(@click="removeRepeat") 删除重复号
        br
        .ds-button.outline(v-bind:class="{disabled: !upload}") {{ upload ? '导入文件' : '浏览器不支持' }}
          input(ref="file" type="file" @change="selectFiles" multiple v-if="upload")
        br
        .ds-button.outline(@click=" __clearValue ") 清空
    el-row.pos(v-if="show")
      el-col(v-bind:span="13")
        label.ds-checkbox-label(v-for="p in positions" @click="p.selected = !p.selected" v-bind:class="{active: p.selected}") 
          span.ds-checkbox 
          | {{ p.title }}
      el-col.notice(:span="11")
        | 温馨提示：你选择了 
        span.count {{ psl }}
        |  个位置， 系统自动根据位置组合成 
        span.comb {{ comb }}
        |  个方案
</template>

<script>
  import GameNumberRow from './GameNumberRow'
  import N from '../util/N'
  import { C, removeDuplicate } from '../util/base'
  export default {
    props: ['type', 'gameid'],
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
          {ids: '+3-3-1, 3-3-1, -3-3-1', title: '和值', min: 1, max: 26},
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
          {ids: '-2-2-5', title: '猜五', min: 0, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},

          // =========================================================115========================================================
          /***
          **
          ***/
          {ids: '1-1-1-115, 3-1-1-115, 3-2-1-115, 2-1-1-115', title: '第一位', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '1-1-1-115, 3-1-1-115, 3-2-1-115, 2-1-1-115', title: '第二位', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '1-1-1-115, 3-1-1-115, 3-2-1-115', title: '第三位', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '3-1-3-115, 2-1-3-115', title: '组选', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '3-1-5-115:2, 2-1-5-115:1, -1-3-1-115:1, -1-3-2-115:2, -1-3-3-115:3, -1-3-4-115:4, -1-3-5-115:5, -1-3-6-115:6, -1-3-7-115:7', title: '胆码', min: 1, max: 11, l: 2},
          {ids: '3-1-5-115, 2-1-5-115, -1-3-1-115, -1-3-2-115, -1-3-3-115, -1-3-4-115, -1-3-5-115, -1-3-6-115, -1-3-7-115', title: '拖码', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '0-1-1-115', title: '前三位', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-1-115', title: '选1中1', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-2-115', title: '选2中2', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-3-115', title: '选3中3', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-4-115', title: '选4中4', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-5-115', title: '选5中5', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-6-115', title: '选6中5', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-7-115', title: '选7中5', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-8-115', title: '选8中5', min: 1, max: 11, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-2-1-1-115', title: '定单双', class: 'default square', values: [{selected: false, title: '5单0双', value: '1'}, {selected: false, title: '4单1双', value: '2'}, {selected: false, title: '3单2双', value: '3'}, {selected: false, title: '2单3双', value: '4'}, {selected: false, title: '1单4双', value: '5'}, {selected: false, title: '0单5双', value: '6'}]},
          {ids: '-2-1-2-115', title: '猜中位', min: 3, max: 9, buttons: ['全', '大', '小', '奇', '偶', '清']},

          // =========================================================PK10========================================================
          /***
          **
          ***/
          {ids: '-1-1-1-PK10, -1-1-2-PK10, -1-1-3-PK10, -1-1-4-PK10, -1-1-5-PK10', class: 'ds-icon-PK10', title: '冠军', min: 1, max: 10, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-2-PK10, -1-1-3-PK10, -1-1-4-PK10, -1-1-5-PK10', class: 'ds-icon-PK10', title: '亚军', min: 1, max: 10, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-3-PK10, -1-1-4-PK10, -1-1-5-PK10', class: 'ds-icon-PK10', title: '季军', min: 1, max: 10, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-4-PK10, -1-1-5-PK10', class: 'ds-icon-PK10', title: '第四名', min: 1, max: 10, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-5-PK10', class: 'ds-icon-PK10', title: '第五名', min: 1, max: 10, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '-1-1-6-PK10:1', class: 'ds-icon-PK10', title: '龙虎', values: [{selected: false, title: '龙', value: '1'}, {selected: false, title: '虎', value: '2'}]},

          // =========================================================KL8========================================================
          /***
          **
          ***/
          {ids: '-1-1-1-KL8, -1-1-2-KL8:8, -1-1-3-KL8:8, -1-1-4-KL8:8, -1-1-5-KL8:8, -1-1-6-KL8:8, -1-1-7-KL8:8', min: 1, max: 80, l: 2, buttons: ['全:1', '大:1', '小:1', '奇:1', '偶:1', '质:1', '合:1', '清'], btnClass: 'block'},
          {ids: '0-1-1-KL8', class: 'default square', title: '上下盘', values: [{selected: false, title: '上盘', value: '1'}, {selected: false, title: '下盘', value: '2'}]},
          {ids: '0-1-2-KL8', class: 'default square', title: '奇偶盘', values: [{selected: false, title: '奇盘', value: '1'}, {selected: false, title: '偶盘', value: '2'}]},
          {ids: '0-1-3-KL8', class: 'default square', title: '大小单双', values: [{selected: false, title: '大', value: '1'}, {selected: false, title: '小', value: '2'}, {selected: false, title: '单', value: '3'}, {selected: false, title: '双', value: '4'}]},
          {ids: '0-1-4-KL8', class: 'default square', title: '五行', values: [{selected: false, title: '金', value: '1'}, {selected: false, title: '木', value: '2'}, {selected: false, title: '水', value: '3'}, {selected: false, title: '火', value: '4'}, {selected: false, title: '土', value: '5'}]},

          // =========================================================KL8========================================================
          /***
          **
          ***/
          {ids: '0-1-1-K3', title: '和值号', min: 3, max: 18, l: 2, buttons: ['全', '大', '小', '奇', '偶', '清']},
          {ids: '2-1-1-K3, 2-1-2-K3', class: 'dice double-width', title: '同号', values: [{selected: false, title: [1, 1], value: 1}, {selected: false, title: [2, 2], value: 2}, {selected: false, title: [3, 3], value: 3}, {selected: false, title: [4, 4], value: 4}, {selected: false, title: [5, 5], value: 5}, {selected: false, title: [6, 6], value: 6}]},
          {ids: '2-1-2-K3', class: 'dice', title: '不同号', values: [{selected: false, title: [1], value: 1}, {selected: false, title: [2], value: 2}, {selected: false, title: [3], value: 3}, {selected: false, title: [4], value: 4}, {selected: false, title: [5], value: 5}, {selected: false, title: [6], value: 6}]},
          {ids: '-2-1-1-K3, -3-1-1-K3', class: 'dice', title: '标准', values: [{selected: false, title: [1], value: 1}, {selected: false, title: [2], value: 2}, {selected: false, title: [3], value: 3}, {selected: false, title: [4], value: 4}, {selected: false, title: [5], value: 5}, {selected: false, title: [6], value: 6}]},
          {ids: '-2-1-2-K3:1, -3-1-2-K3:2', class: 'dice', title: '胆码', values: [{selected: false, title: [1], value: 1}, {selected: false, title: [2], value: 2}, {selected: false, title: [3], value: 3}, {selected: false, title: [4], value: 4}, {selected: false, title: [5], value: 5}, {selected: false, title: [6], value: 6}]},
          {ids: '-2-1-2-K3, -3-1-2-K3', class: 'dice', title: '拖码', values: [{selected: false, title: [1], value: 1}, {selected: false, title: [2], value: 2}, {selected: false, title: [3], value: 3}, {selected: false, title: [4], value: 4}, {selected: false, title: [5], value: 5}, {selected: false, title: [6], value: 6}]},
          {ids: '3-1-1-K3', class: 'dice double-width', title: '三同号', values: [{selected: false, title: [1, 1, 1], value: 1}, {selected: false, title: [2, 2, 2], value: 2}, {selected: false, title: [3, 3, 3], value: 3}, {selected: false, title: [4, 4, 4], value: 4}, {selected: false, title: [5, 5, 5], value: 5}, {selected: false, title: [6, 6, 6], value: 6}]},
          {ids: '3-1-2-K3', class: 'dice', title: '通选', values: [{selected: false, title: ['全'], value: '1,1,1|2,2,2|3,3,3|4,4,4|5,5,5|6,6,6'}]},
          {ids: '+3-1-2-K3', class: 'dice', title: '通选', values: [{selected: false, title: ['全'], value: '1,2,3|2,3,4|3,4,5|4,5,6'}]},
          {ids: '+3-1-1-K3', class: 'dice double-width', title: '三连号', join: '|', values: [{selected: false, title: [1, 2, 3], value: '1,2,3'}, {selected: false, title: [2, 3, 4], value: '2,3,4'}, {selected: false, title: [3, 4, 5], value: '3,4,5'}, {selected: false, title: [4, 5, 6], value: '4,5,6'}]},
          {ids: '0-1-2-K3:1', class: 'dice', title: '1个号中奖', values: [{selected: false, title: [1], value: 1}, {selected: false, title: [2], value: 2}, {selected: false, title: [3], value: 3}, {selected: false, title: [4], value: 4}, {selected: false, title: [5], value: 5}, {selected: false, title: [6], value: 6}]}

        ],
        V: '',
        // 输入的号码
        // value: '',
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
            selected: true
          },
          {
            title: '百位',
            value: 3,
            selected: true
          },
          {
            title: '十位',
            value: 2,
            selected: true
          },
          {
            title: '个位',
            value: 1,
            selected: true
          }
        ],
        // 要显示pos的玩法集
        allChecks: [
          // 最少2个位置
          {ids: '-1-1-2, -1-1-3, -1-1-4', min: 2},
          // 最少3个位置
          {ids: '-1-2-2, -1-2-3, -1-2-4, -1-2-5, -1-2-6, -1-2-7', min: 3},
          // 最少4个位置
          {ids: '-1-3-2, -1-3-3, -1-3-4, -1-3-5, -1-3-6', min: 4}
        ],
        ids: '-1-1-2, -1-1-3, -1-1-4, -1-2-2, -1-2-3, -1-2-4, -1-2-5, -1-2-6, -1-2-7, -1-3-2, -1-3-3, -1-3-4, -1-3-5, -1-3-6',
        // 号码集
        ns: [],
        // 导入文件
        upload: true,
        titleSpan: 0,
        legalValue: ''
      }
    },
    computed: {
      callId () {
        return this.gameid + '|' + this.type.id
      },
      // 根据玩法确定是与其它行不能重复
      nr () {
        return ['3-1-5-115', '2-1-5-115', '-1-3-1-115', '-1-3-2-115', '-1-3-3-115', '-1-3-4-115', '-1-3-5-115', '-1-3-6-115', '-1-3-7-115', '-2-1-2-K3', '-3-1-2-K3', '2-1-2-K3'].indexOf(this.type.id) !== -1
      },
      // 根据玩法确定要显示的号码工作区
      rows () {
        return this.allRows.filter(row => {
          let matchid = ((' ' + row.ids + ',').match(
            new RegExp(this.type.id.match(/^[+-]/) ? ('\\' + this.type.id + '(:\\d)*,') : '[^+-]' + this.type.id + '(:\\d)*,', 'g')
          ) || [])[0]
          if (matchid) {
            this.$set(row, 'id', matchid)
          }
          return matchid
        })
      },
      // 显示位置选择
      show () {
        return this.ids.match(new RegExp('[^+-]*' + (this.type.id.match(/^[+-]/) ? ('\\' + this.type.id) : this.type.id), 'g'))
      },
      // 位置集合
      ps () {
        return this.show ? this.positions.filter(p => p.selected).map(p => {
          return (p = p.value)
        }) : this.nsl.map((l, i) => {
          return l > 0 && (l = 5 - i)
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
        // for return a legal string
        let x = N[this.type.id] ? N[this.type.id]({
          ns: this.ns,
          nsl: this.nsl,
          ps: this.ps,
          psl: this.psl,
          value: this.value.replace(/[^0-9,;\s]+/g, '').replace(/[,;\s]+/g, ' '),
          r: this.r
        }) : 0
        // 1、  所有单式，输入一个正确投注后在输入一个不正确投注，报投注失败
        typeof x === 'object' && typeof x[1] === 'object' && this.$emit('set-nsns', x[1].join('|'))
        return typeof x === 'object' ? x[0] : x
        // return N[this.type.id] ? N[this.type.id]({
        //   ns: this.ns,
        //   nsl: this.nsl,
        //   ps: this.ps,
        //   psl: this.psl,
        //   value: this.value,
        //   r: this.r
        // }) : 0
      },
      // 位置组合
      comb () {
        let min = this.allChecks.filter(check => check.ids.match(
          new RegExp('[^+-]*' + (this.type.id.match(/^[+-]/) ? ('\\' + this.type.id) : this.type.id), 'g')
        ))[0]
        return min ? C(this.positions.filter(p => p.selected).length, min.min) : 0
      },
      // 当输入型时， 注数的分隔符
      // has ,; ? ,; : ' '
      // separator () {
      //   return this.V.match(/[,;]/g) ? /[,;]+/g : /[\s]+/g
      // },
      value () {
        // C2
        // 如果是115
        if (this.type.id.indexOf('-115') !== -1) {
          return this.V.replace(/ +/g, '').replace(/[,;\s]+/g, ' ')
        } else {
          return this.V.replace(/[,;\s]+/g, ' ')
        }
      }
    },
    watch: {
      n () {
        this.$emit('n-change', this.n)
      },
      // 传递value值到父
      // value () {
      //   this.value = this.value.replace(/[^0-9,;\s]+/g, '').replace(/[,;\s]+/g, ' ')
      //   this.removeRepeat()
      //   // this.$emit('set-nsns', this.value ? this.value.trim().replace(/\s{1,}/g, '|') : '')
      // },
      // C2
      V () {
        setTimeout(() => {
          this.V = this.V.replace(/[^0-9,;\s]+/g, '').replace(/([,;]){2,}/g, '$1')
        })
      },
      value () {
        this.removeRepeat()
      },
      rows () {
        this.titleSpan = this.rows.reduce((p, r) => {
          if (r.title) p = Math.max(p, r.title.length - Math.ceil((r.title.match(/\d/g) || []).length / 2))
          return p
        }, 0)
      },
      ns () {
        // fixed 当只有有join的时候才需要forEach *****
        this.ns.forEach((ns, i) => {
          // fixed 当只有有join的时候才这样做
          if (this.rows[i].join) this.ns[i] = ns.join(this.rows[i].join || ',')
        })
        // fixed 当只有有join的时候才需要forEach *****
        this.$emit('set-nsns', this.ns.join('|'))
      },
      ps () {
        this.$emit('set-ps', this.ps)
      }
    },
    mounted () {
      if (!(window.File && window.FileReader && window.FileList && window.Blob)) this.upload = false
      this.$emit('set-ps', this.ps)
    },
    methods: {
      __clearValue () {
        this.V = ''
        this.$el.querySelector('textarea') && (this.$el.querySelector('textarea').value = '')
      },
      // 选择号码发生变化
      numbersChange () {
        this.ns = this.rows.map(r => {
          return (r = r.ns || [])
        })
      },
      // on number row selecting
      select ({args}) {
        if (this.nr) {
          this.__setCall({
            fn: '__unselectSelectedNumber',
            args: args
          })
        }
      },
      selectFiles (evt) {
        let allowedFiles = 'text/plain'
        let files = evt.target.files
        Array.from(files).forEach(f => {
          if (f.type.indexOf(allowedFiles) !== -1) {
            let reader = new window.FileReader()
            // reader.onerror = this.error
            // reader.onprogress = this.progress
            // reader.onabort = this.abort
            // reader.onloadstart = this.loadstart
            reader.onload = this.load
            reader.readAsText(f, 'utf-8')
          }
        })
        this.$refs.file.value = ''
      },
      load (evt) {
        // console.log(evt.target.result)
        this.V += this.V ? ',' + evt.target.result : evt.target.result
        // .replace(/\s+/g, ' ')
      },
      // __removeRepeat () {
      //   if (this.removeRepeat()) {
      //     this.$modal.warn({
      //       content: '系统已经自动去除重复号！',
      //       btn: ['确定']
      //     })
      //   }
      //   this.__setCall({fn: '__order'})
      // },
      removeRepeat () {
        let R = null
        if (this.type.id.indexOf('-115') !== -1) {
          R = removeDuplicate(this.V.replace(/ +/g, ''), /[,;\s]+/, ',')
        } else {
          R = removeDuplicate(this.V, /[,;\s]+/)
        }
        if (R.has) this.V = R.s
        return R.has
      }
    },
    components: {
      GameNumberRow
    }
  }
</script>
<style lang="stylus">
  .el-textarea 
    box-sizing border-box
    textarea
      resize none
      // min-height 1.06rem
</style>
<style lang="stylus" scoped>
  @import '../var.stylus'
  .game-selection
    padding PW 0
    .pos
      padding-left .3rem
  .el-textarea
    padding 0 .1rem 0 PWX
    
  .el-col
    min-height GCH
    line-height GCH
    &.btn-groups
      line-height 0
      .ds-button
        margin-bottom .085rem
        position relative
        &:last-child
          margin-bottom 0
        input
          position absolute
          top 0 
          left 0 
          right 0 
          bottom 0
          opacity 0
          width 100%
          
    &.notice
      font-size .12rem
      color #999
      line-height .2rem
      padding PW PWX
  .count
  .comb
    color DANGER
  
</style>
