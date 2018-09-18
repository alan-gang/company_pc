// 数组
import groupArray from './Array'
// 日期
import { timeFormat } from './Date'
// dom
import { getOffset, addEvent, removeEvent } from './Dom'
// 基础
import { repeat } from './base'
import { numberWithCommas } from './Number'
// 注数算法
import N from './N'
import M from './M'

module.exports = {
  groupArray,
  getOffset,
  addEvent,
  removeEvent,
  timeFormat,
  repeat,
  N,
  M
}


window.Number.prototype._o0 = window.String.prototype._o0 = function () {
  return parseFloat((this + '').replace(/,/g, '')) > 0
}
window.Number.prototype._l0 = window.String.prototype._l0 = function () {
  return parseFloat((this + '').replace(/,/g, '')) < 0
}
window.Number.prototype._nwc = window.String.prototype._nwc = function () {
  return numberWithCommas(this)
}
