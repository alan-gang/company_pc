// 'hh-mm-ss' seconds
let timeFormat = (time) => {
  if (typeof time !== 'number') {
    return time
  }
  let hour = Math.floor(time / (60 * 60))
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = Math.floor(time / 60)
  if (min < 10) {
    min = '0' + min
  }
  let sec = time % 60
  if (sec < 10) {
    sec = '0' + sec
  }
  return hour + ':' + min + ':' + sec
}
module.exports = {
  timeFormat
}

