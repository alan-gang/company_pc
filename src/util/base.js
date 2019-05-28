// function P (name) {
//   console.log('createP')
//   this.name = name
// }
// P.prototype.hello = function () {
//   console.log(this.name)
// }
// function  M (name) {
//   P.call(this, name)
//   this.child = 'x'
// }

// function inherit (M, P) {
//   function F(){}
//   F.prototype = P.prototype
//   var pro = new F()
//   pro.constructor = M
//   M.prototype = pro
//   // var pro = object(P.prototype)
//   // pro.constructor = M
//   // M.prototype = pro
// }

// function object (o) {
//   function F(){}
//   F.prototype = o
//   return new F()
// }

// inherit(M, P)
// var p = new P('man')
// p.hello()
// var m = new M('father')
// m.hello()

/**
 * 排列
 * @param n
 * @param m
 * @returns {Number}
 */
function permutationChoice(n, m) {
  return factorial(n) / factorial(n - m)
}
/**
 * 组合
 * @param n
 * @param m
 * @returns {Number}
 * combineChoice
 */
function C(n, m) {
  // console.log(n, m, '||||||||||||||||||||||||')
  if (!n || !m || n < m || n < 0 || m < 0) return 0
  else if (n === m) return 1
  else if (m === 1) return n
  else {
    return Math.ceil(permutationChoice(n, m) / factorial(m))
  }
}
/**
 * [factorial description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function factorial(n) {
  // console.log(n)
  if (n === 0) return 1
  return n * factorial(n - 1)
}

//计算一个月有多少天
//month 月  year 年
function getCountDays({ year, month }) {
  //月份: 1-12
  if (month < 0 && month > 13) return 0;
  let myDate = new Date(`${year}-${month}`);
  myDate.setMonth(month);
  myDate.setDate(0);
  return myDate.getDate(); //返回 month 月的天数
}

//获取当前月  上个月  上上个月
//multiple=0 本月  multiple=1 上个月 multiple=2 上上个月
function getLastMonth(multiple) {
  multiple = multiple || 0; //倍数
  let myDate = new Date();
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  if (month - multiple < 0) {
    year = year - 1;
    month = 12 + 1 - (multiple - month);
  } else {
    month = month - multiple;
  }
  return { year: year, month: month };
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
// @params o 重复号的判断加入是否排序后比较相等
let removeDuplicate = (s, i, join, o, l) => {
  let has = false
  return {
    s: s.split(i).filter((n, i, arr) => {
      if (!n.match(new RegExp('\\d{' + (l || 1) + '}', 'g'))) return false
      return i === arr.findIndex(nn => !o ? nn === n : nn.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).sort((a, b) => a - b).join('') === n.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).sort((a, b) => a - b).join('')) || !(has = true)
    }).join(join || ' '), has: has
  }
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
  isPrime,
  getCountDays,
  getLastMonth
}
