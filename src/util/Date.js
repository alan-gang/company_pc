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
  if (typeof time !== 'number') {
    return time
  }
  let date = new Date(time)
  return date.getFullYear() + '-' + padStart(date.getMonth() + 1, 2, 0) + '-' + padStart(date.getDate(), 2, 0) + ' ' + padStart(date.getHours(), 2, 0) + ':' + padStart(date.getMinutes(), 2, 0) + ':' + padStart(date.getSeconds(), 2, 0)
}
//170202
let dateFormat = (time, six, splitor) => {
  if (typeof time !== 'number') {
    return time
  }
  let date = new Date(time)
  return (six ? (date.getFullYear() + '').slice(2) : date.getFullYear()) + (splitor || '-') + padStart(date.getMonth() + 1, 2, 0) + (splitor || '-') + padStart(date.getDate(), 2, 0) 
}
module.exports = {
  timeFormat,
  dateTimeFormat,
  dateFormat
}

