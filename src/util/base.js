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

module.exports = {
  repeat,
  C,
  removeDuplicate
}
