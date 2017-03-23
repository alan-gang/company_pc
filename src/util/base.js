
/**
 * 排列
 * @param n
 * @param m
 * @returns {Number}
 */
function permutationChoice (n, m) {
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
  // console.log(n, m, '||||||||||||||||||||||||')
  if (!n || !m || n < m || n < 0 || m < 0) return 0
  else if (n === m) return 1
  else if (m === 1) return n
  else return parseInt(permutationChoice(n, m) / factorial(m))
}

function factorial (n) {
  if (n === 0) return 1
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

let isPrime = n => {
  if (n <= 3) { return n > 1 }
  if (n % 2 === 0 || n % 3 === 0) { return false }
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) { return false }
  }
  return true
}

module.exports = {
  repeat,
  C,
  removeDuplicate,
  padStart,
  isPrime
}
