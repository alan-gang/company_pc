
/**
 * 排列
 * @param n
 * @param m
 * @returns {Number}
 */
function permutationChoice (n, m) {
  if (n < m) return 0
  return factorial(n) / factorial(n - m)
}
/**
 * 组合
 * @param n
 * @param m
 * @returns {Number}
 * combineChoice
 */
function C (n, m) {
  return permutationChoice(n, m) / factorial(m)
}

function factorial (n) {
  if (!n) return 1
  return n * factorial(n - 1)
}

// repeat a string s t times
let repeat = (s, t) => {
  if (typeof s.repeat === 'function') return s.repeat(t)
  let r = ''
  while (t > 0) {
    r += s
    t--
  }
  return r
}
// remove duplicate in a string by split by i
let removeDuplicate = (s, i) => {
  return s.split(i).filter((n, i, arr) => {
    return i === arr.findIndex(nn => nn === n)
  }).join(' ')
}

let padStart = (s, l, w) => {
  s += ''
  while (s.length < l) {
    s = w + s
  }
  if (s.length > l) s = s.slice(s.length - l)
  return s
}

module.exports = {
  repeat,
  C,
  removeDuplicate,
  padStart
}
