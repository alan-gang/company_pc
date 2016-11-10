// groupArray
import groupArray from './Array'
import { timeFormat } from './Date'

let getOffset = (e, depth) => {
  if (depth === 'undefined') depth = Infinity
  let top = e.offsetTop
  let left = e.offsetLeft
  let width = e.offsetWidth
  let height = e.offsetHeight
  while ((e = e.offsetParent) && depth > 0) {
    top += e.offsetTop
    left += e.offsetLeft
    depth--
  }
  return {top, left, width, height}
}

let addEvent = (evnt, elem, func) => {
  if (elem.addEventListener) elem.addEventListener(evnt, func, false)
  else if (elem.attachEvent) { // IE DOM
    elem.attachEvent('on' + evnt, func)
  } else {
    elem[evnt] = func
  }
}
export default {
  groupArray,
  getOffset,
  addEvent,
  timeFormat
}
