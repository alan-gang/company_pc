import { padStart } from './base'


// 'hh-mm-ss' seconds
let timeFormat = (time) => {
  if (typeof time !== 'number') {
    return time
  }
  let hour = Math.floor(time / (60 * 60))
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = Math.floor(time % 3600 / 60 ) 
  if (min < 10) {
    min = '0' + min
  }
  let sec = time % 60
  if (sec < 10) {
    sec = '0' + sec
  }
  return hour + ':' + min + ':' + sec
}

// YYYY-MM-DD hh:mm:ss
let dateTimeFormat = (time) => {
  let date = window.newDate(time)
  return date.getFullYear() + '-' + padStart(date.getMonth() + 1, 2, 0) + '-' + padStart(date.getDate(), 2, 0) + ' ' + padStart(date.getHours(), 2, 0) + ':' + padStart(date.getMinutes(), 2, 0) + ':' + padStart(date.getSeconds(), 2, 0)
}
//170202
let dateFormat = (time, six, splitor, space) => {
  let date = window.newDate(time)
  return (six ? (date.getFullYear() + '').slice(2) : date.getFullYear()) + (space ? '' : (splitor || '-')) + padStart(date.getMonth() + 1, 2, 0) + (space ? '' : (splitor || '-')) + padStart(date.getDate(), 2, 0) 
}
module.exports = {
  timeFormat,
  dateTimeFormat,
  dateFormat
}


window.Number.prototype._padStart = window.String.prototype._padStart = function (l, w) {
  let s = this + ''
  w = w + ''

  while (s.length < l) {
    s = w + s
  }
  if (s.length > l) s = s.slice(s.length - l)
  return s
}
window.Date.prototype._bf = function (d) {
  return this._setD(this.getDate() + d)
}
window.Date.prototype._bfM = function (d) {
  return new window.Date(new window.Date(this).setMonth(this.getMonth() + d))
}
window.Date.prototype._setD = function (d) {
  return new window.Date(new window.Date(this).setDate(d))
}
window.Date.prototype._setH = function (h) {
  return new window.Date(this.setHours(h))
}
window.Date.prototype._setM = function (m) {
  return new window.Date(this.setMinutes(m))
}
window.Date.prototype._setS = function (s) {
  return new window.Date(this.setSeconds(s))
}
window.Date.prototype._setHMS = function (hsm) {
  return this._setH(hsm.split(':')[0] || 0)._setM(hsm.split(':')[1] || 0)._setS(hsm.split(':')[2] || 0)
}
window.Date.prototype._toString = function () {
  return this.getFullYear() + '-' + (this.getMonth() + 1)._padStart(2, 0) + '-' + this.getDate()._padStart(2, 0) + ' ' + this.getHours()._padStart(2, 0) + ':' + this.getMinutes()._padStart(2, 0) + ':' + this.getSeconds()._padStart(2, 0)
}
window.Date.prototype._toMonthString = function () {
  return this.getFullYear() + '-' + (this.getMonth() + 1)._padStart(2, 0)
}
window.Date.prototype._toDayString = function () {
  return this.getFullYear() + '-' + (this.getMonth() + 1)._padStart(2, 0) + '-' + this.getDate()._padStart(2, 0)
}
window.Date.prototype._toAllString = function () {
  return this.getFullYear() + (this.getMonth() + 1)._padStart(2, 0) + this.getDate()._padStart(2, 0) + this.getHours()._padStart(2, 0) + this.getMinutes()._padStart(2, 0) + this.getSeconds()._padStart(2, 0)
}
window.Date.prototype._toMonthDayStringCN = function () {
  return (this.getMonth() + 1) + '月' + this.getDate() + '日'
}
let week = ['日', '一', '二', '三', '四', '五', '六']
let prefix = '星期'
window.Date.prototype._toWeek = function () {
  return prefix + week[this.getDay()]
}