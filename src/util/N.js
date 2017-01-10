import { C } from './base'

// 空值判断
let empty = value => value.match(/^[\s\t\r]*$/)

/*
value: 输入值
N: 一注的长度
r: 最大相同数字的长度
l: 一个号码的长度 如12345有5个号码, 010203有3个号码, 号码长度为2
 */
let N = (value, N, r, l, max, min) => empty(value) ? 0 : value.split(' ').filter(n => n.length === N).filter(n => {
  return (typeof r !== 'number') || r === Object.values(n.match(new RegExp('\\d{' + (l || 1) + '}', 'g')).reduce((p, na) => {
    if (p[na] !== undefined) p[na] += 1
    else p[na] = 1
    if ((max !== undefined && parseInt(na) > max) || (min !== undefined && parseInt(na) < min)) p[na] = r + 1
    return p
  }, {})).sort((a, b) => b - a)[0]
}).length

// 数组内各长度相乘
let P = (nsl) => {
  let n = 1
  nsl.forEach(nl => {
    n *= nl
  })
  return n
}
// 数组内各长度相加
let A = (nsl) => {
  let n = 0
  nsl.forEach(nl => {
    n += nl
  })
  return n
}

let SSC = {
  /*
  所有参数集：{
    // 号码集
    ns,
    // 号码集长度集
    nsl, [4, 4]
    // 位置集
    ps,
    // 位置集长度
    psl
    // 输入值
    value
    // 重号数量 [4,5,6]
    r 3
  }
   */
  /* ===========================================================================时时彩============================================================================================== */

  /* *************************************五星*********************************** */
  /* ..............五星直选............... */
  /*
  直选复式
  N1*N2*N3*N4*N5
   */
  '5-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  直选单式
  N
   */
  '5-1-2' ({value}) {
    return N(value, 5)
  },

  /*
  直选组合
  5*N1*N2*N3*N4*N5
   */
  '5-1-3' ({nsl}) {
    return 5 * this['5-1-1']({nsl})
  },

  /* ..............五星组选............... */
  /*
  组选120 WXZUS  12 14
  C(n,5)
   */
  '5-2-1' ({nsl}) {
    return C(nsl[0], 5)
  },

  /*
  组选60
  C(m,1)*C(n,3)-C(h,1)*C(n-1,2)
  m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数 m>=1,n>=3
   */
  '5-2-2' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 3) - C(r, 1) * C(nsl[1] - 1, 2)
  },

  /*
  组选30
  C(m,2)*C(n,1)-C(h,2)*C(2,1)-C(h,1)*C(m-h,1)
  m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数m>=2, n>=1
   */
  '5-2-3' ({nsl, r}) {
    return C(nsl[0], 2) * C(nsl[1], 1) - C(r, 2) * C(2, 1) - C(r, 1) * C(nsl[0] - r, 1)
  },

  /*
  组选20
  C(m,1)*C(n,2)-C(h,1)*C(n-1,1)
  m三重号选择的个数，n单号选择的个数，h三重号和单号重复号码的个数m>=1,n>=2
   */
  '5-2-4' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 2) - C(r, 1) * C(nsl[1] - 1, 1)
  },

  /*
  组选10
  C(m,1)*C(n,1)-C(h,1)
  m三重号选择的个数，n二重号选择的个数，h三重号和二重号重复号码的个数m>=1,n>=1
   */
  '5-2-5' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - C(r, 1)
  },

  /*
  组选5
  C(m,1)*C(n,1)-C(h,1)
  m四重号选择的个数，n单号选择的个数，h四重号和单号重复号码的个数m>=1,n>=1
   */
  '5-2-6' ({nsl, r}) {
    return this['5-2-5']({nsl, r})
  },

  /* ..............五星特殊............... */

  /*
  五星特殊  一帆风顺  C(n,1)  n选择的号码个数 n>=1
  好事成双  C(n,1)  n选择的号码个数n>=1
  三星报喜  C(n,1)  n选择的号码个数n>=1
  四季发财  C(n,1)  n选择的号码个数n>=1
   */
  '5-3-1' ({nsl}) {
    return C(nsl[0], 1)
  },
  /*
  好事成双  C(n,1)  n选择的号码个数n>=1
   */
  '5-3-2' ({nsl}) {
    return this['5-3-1']({nsl})
  },
   /*
  三星报喜  C(n,1)  n选择的号码个数n>=1
   */
  '5-3-3' ({nsl}) {
    return this['5-3-1']({nsl})
  },
  /*
  四季发财  C(n,1)  n选择的号码个数n>=1
   */
  '5-3-4' ({nsl}) {
    return this['5-3-1']({nsl})
  },

  /* *************************************四星*********************************** */
  /* ..............前四直选............... */
  /*
  直选复式
  N1*N2*N3*N4 N1千，N2百，N3十，N4个
   */
  '4-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  直选单式
  N N=输入的号码个数
   */
  '4-1-2' ({value}) {
    return N(value, 4)
  },

  /*
  直选组合
  (N1*N2*N3*N4)*4 N1千，N2百，N3十，N4个n>=1
  */
  '4-1-3' ({nsl}) {
    return 4 * this['4-1-1']({nsl})
  },

  /* ..............前四组选............... */
  /*
  组选24
  C(n,4)  n选择的号码个数 n>=4
  */
  '4-2-1' ({nsl}) {
    return C(nsl[0], 4)
  },

  /*
  组选12
  C(m,1)*C(n,2)-C(h,1)*C(n-1,1) m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数 m>=1,n>=2
  */
  '4-2-2' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 2) - C(r, 1) * C(nsl[1] - 1, 1)
  },

  /*
  组选6
  C(n,2)  n>=2
  */
  '4-2-3' ({nsl}) {
    return C(nsl[0], 2)
  },

   /*
  组选4
  C(m,1)*C(n,1)-C(h,1)  m三重号选择的个数，n单号选择的个数，h三重号和单号重复号码的个数m>=1,n>=1
  */
  '4-2-4' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - C(r, 1)
  },

  /* ..............后四直选............... */
  /*
  直选复式
  同前四 同前四
  */
  '4-3-1' ({nsl}) {
    return this['4-1-1']({nsl})
  },

  /*
  直选单式
  同前四 同前四
  */
  '4-3-2' ({value}) {
    return this['4-1-2']({value})
  },

  /*
  直选组合
  同前四 同前四
  */
  '4-3-3' ({nsl}) {
    return this['4-1-3']({nsl})
  },

  /* ..............后四组选............... */
  /*
  组选24
  同前四 同前四
  */
  '4-4-1' ({nsl}) {
    return this['4-2-1']({nsl})
  },

  /*
  组选12
  同前四 同前四
  */
  '4-4-2' ({nsl, r}) {
    return this['4-2-2']({nsl, r})
  },

  /*
  组选6
  同前四 同前四
  */
  '4-4-3' ({nsl}) {
    return this['4-2-3']({nsl})
  },

  /*
  组选4
  同前四 同前四
  */
  '4-4-4' ({nsl, r}) {
    return this['4-2-4']({nsl, r})
  },

  /* *************************************前三*********************************** */
  /* ..............前三直选............... */
  /*
  直选复式
  N1 * N2 * N3
  */
  '+3-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  直选单式
  N
  */
  '+3-1-2' ({value}) {
    return N(value, 3)
  },

  /*
  直选和值
  分别对应各个和值数字，0-27 0:1, 1:3, 2:6, 3:10, 4:15, 5:21, 6:28, 7:36, 8:45, 9:55, 10:63, 11:69, 12:73, 13:75, 14:75, 15:73, 16:69, 17:63, 18:55, 19:45, 20:36, 21:28, 22:21, 23:15, 24:10, 25:6, 26:3, 27:1
  */
  '+3-1-3' ({ns}) {
    let NS = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
    return ns[0].reduce((p, n) => {
      return (p += NS[n])
    }, 0)
  },

  /*
  直选跨度
  分别对应各个跨度数值0-9 0:10, 1:54, 2:96, 3:126, 4:144, 5:150, 6:144, 7:126, 8:96, 9:54
  */
  '+3-1-4' ({ns}) {
    let NS = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
    return ns[0].reduce((p, n) => {
      return (p += NS[n])
    }, 0)
  },

  /* ..............前三组选............... */
  /*
  组三复式
  N=选择号码个数 n>=2 C(n, 2) * 2
  */
  '+3-2-1' ({nsl}) {
    return C(nsl[0], 2) * 2
  },

  /*
  组三单式
  N=输入的号码个数 N
  */
  '+3-2-2' ({value}) {
    return N(value, 3, 2)
  },

  /*
  组六复式
  N=选择号码个数 n>=3 C(n, 3)
  */
  '+3-2-3' ({nsl}) {
    return C(nsl[0], 3)
  },

  /*
  组六单式
  N=输入的号码个数 N
  */
  '+3-2-4' ({value}) {
    return N(value, 3, 1)
  },

  /*
  混合组选
  N=输入的号码个数 N
  */
  '+3-2-5' ({value}) {
    return N(value, 3)
  },

  /* ..............前三其他............... */
  /*
  组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '+3-3-1' ({ns}) {
    let NS = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
    return ns[0].reduce((p, n) => {
      return (p += NS[n - 1])
    }, 0)
  },

  /*
  组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '+3-3-2' ({nsl}) {
    return 54 * nsl[0]
  },

  /*
  和值尾数
  C(n, 1)
  */
  '+3-3-3' ({nsl}) {
    return C(nsl[0], 1)
  },
  /*
  特殊号
  C(n, 1)
  */
  '+3-3-4' ({nsl}) {
    return C(nsl[0], 1)
  },

  /* *************************************中三*********************************** */
  /* ..............中三直选............... */
  /*
  直选复式
  N1 * N2 * N3
  */
  '3-1-1' ({nsl}) {
    return this['+3-1-1']({nsl})
  },

  /*
  直选单式
  N
  */
  '3-1-2' ({value}) {
    return this['+3-1-2']({value})
  },

  /*
  直选和值
  分别对应各个和值数字，0-27 0:1, 1:3, 2:6, 3:10, 4:15, 5:21, 6:28, 7:36, 8:45, 9:55, 10:63, 11:69, 12:73, 13:75, 14:75, 15:73, 16:69, 17:63, 18:55, 19:45, 20:36, 21:28, 22:21, 23:15, 24:10, 25:6, 26:3, 27:1
  */
  '3-1-3' ({ns}) {
    return this['+3-1-3']({ns})
  },

  /*
  直选跨度
  分别对应各个跨度数值0-9 0:10, 1:54, 2:96, 3:126, 4:144, 5:150, 6:144, 7:126, 8:96, 9:54
  */
  '3-1-4' ({ns}) {
    return this['+3-1-4']({ns})
  },

  /* ..............中三组选............... */
  /*
  组三复式
  N=选择号码个数 n>=2 C(n, 2) * 2
  */
  '3-2-1' ({nsl}) {
    return this['+3-2-1']({nsl})
  },

  /*
  组三单式
  N=输入的号码个数 N
  */
  '3-2-2' ({value}) {
    return this['+3-2-2']({value})
  },

  /*
  组六复式
  N=选择号码个数 n>=3 C(n, 3)
  */
  '3-2-3' ({nsl}) {
    return this['+3-2-3']({nsl})
  },

  /*
  组六单式
  N=输入的号码个数 N
  */
  '3-2-4' ({value}) {
    return this['+3-2-4']({value})
  },

  /*
  混合组选
  N=输入的号码个数 N
  */
  '3-2-5' ({value}) {
    return this['+3-2-5']({value})
  },

  /* ..............中三其他............... */
  /*
  组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '3-3-1' ({ns}) {
    return this['+3-3-1']({ns})
  },

  /*
  组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '3-3-2' ({nsl}) {
    return this['+3-3-2']({nsl})
  },

  /*
  和值尾数
  C(n, 1)
  */
  '3-3-3' ({nsl}) {
    return this['+3-3-3']({nsl})
  },
  /*
  特殊号
  C(n, 1)
  */
  '3-3-4' ({nsl}) {
    return this['+3-3-4']({nsl})
  },

  /* *************************************后三*********************************** */
  /* ..............后三直选............... */
  /*
  直选复式
  N1 * N2 * N3
  */
  '-3-1-1' ({nsl}) {
    return this['+3-1-1']({nsl})
  },

  /*
  直选单式
  N
  */
  '-3-1-2' ({value}) {
    return this['+3-1-2']({value})
  },

  /*
  直选和值
  分别对应各个和值数字，0-27 0:1, 1:3, 2:6, 3:10, 4:15, 5:21, 6:28, 7:36, 8:45, 9:55, 10:63, 11:69, 12:73, 13:75, 14:75, 15:73, 16:69, 17:63, 18:55, 19:45, 20:36, 21:28, 22:21, 23:15, 24:10, 25:6, 26:3, 27:1
  */
  '-3-1-3' ({ns}) {
    return this['+3-1-3']({ns})
  },

  /*
  直选跨度
  分别对应各个跨度数值0-9 0:10, 1:54, 2:96, 3:126, 4:144, 5:150, 6:144, 7:126, 8:96, 9:54
  */
  '-3-1-4' ({ns}) {
    return this['+3-1-4']({ns})
  },

  /* ..............后三组选............... */
  /*
  组三复式
  N=选择号码个数 n>=2 C(n, 2) * 2
  */
  '-3-2-1' ({nsl}) {
    return this['+3-2-1']({nsl})
  },

  /*
  组三单式
  N=输入的号码个数 N
  */
  '-3-2-2' ({value}) {
    return this['+3-2-2']({value})
  },

  /*
  组六复式
  N=选择号码个数 n>=3 C(n, 3)
  */
  '-3-2-3' ({nsl}) {
    return this['+3-2-3']({nsl})
  },

  /*
  组六单式
  N=输入的号码个数 N
  */
  '-3-2-4' ({value}) {
    return this['+3-2-4']({value})
  },

  /*
  混合组选
  N=输入的号码个数 N
  */
  '-3-2-5' ({value}) {
    return this['+3-2-5']({value})
  },

  /* ..............后三其他............... */
  /*
  组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '-3-3-1' ({ns}) {
    return this['+3-3-1']({ns})
  },

  /*
  组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '-3-3-2' ({nsl}) {
    return this['+3-3-2']({nsl})
  },

  /*
  和值尾数
  C(n, 1)
  */
  '-3-3-3' ({nsl}) {
    return this['+3-3-3']({nsl})
  },
  /*
  特殊号
  C(n, 1)
  */
  '-3-3-4' ({nsl}) {
    return this['+3-3-4']({nsl})
  },

  /* *************************************二星*********************************** */
  /* ..............前二直选............... */
  /*
  直选复式
  N1万位，N2千位 N1 * N2
  */
  '2-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  直选单式
  输入注数
  N
  */
  '2-1-2' ({value}) {
    return N(value, 2)
  },

  /*
  直选跨度
  对应跨度值0-9
  0:10, 1:18, 2:16, 3:14, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2
  */
  '2-1-3' ({ns}) {
    let NS = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2]
    return ns[0].reduce((p, n) => {
      return (p += NS[n])
    }, 0)
  },

  /* ..............前二组选............... */
  /*
  组选复式
  n>=2
  C(n, 2)
  */
  '2-2-1' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  组选单式
  N
  */
  '2-2-2' ({value}) {
    return N(value, 2)
  },

  /*
  组选包胆
  只能选择一个号码，每个号码都一样对应9注
  9
  */
  '2-2-3' ({nsl}) {
    return 9 * nsl[0]
  },

  /* ..............后二直选............... */
  /*
  直选复式
  同前二
  */
  '2-3-1' ({nsl}) {
    return P(nsl)
  },

  /*
  直选单式
  同前二
  N
  */
  '2-3-2' ({value}) {
    return N(value, 2)
  },

  /*
  直选跨度
  同前二
  */
  '2-3-3' ({ns}) {
    let NS = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2]
    return ns[0].reduce((p, n) => {
      return (p += NS[n])
    }, 0)
  },

  /* ..............后二组选............... */
  /*
  组选复式
  同前二
  */
  '2-4-1' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  组选单式
  同前二
  */
  '2-4-2' ({value}) {
    return N(value, 2)
  },

  /*
  组选包胆
  同前二
  */
  '2-4-3' ({nsl}) {
    return 9 * nsl[0]
  },

  /* *************************************一星*********************************** */
  /* ..............定位胆............... */
  /*
  定位胆
  C(n1, 1)+C(n2, 1)+C(n3, 1)+C(n4, 1)+C(n5, 1)
  */
  '1-1-1' ({nsl}) {
    return C(nsl[1 - 1], 1) + C(nsl[2 - 1], 1) + C(nsl[3 - 1], 1) + C(nsl[4 - 1], 1) + C(nsl[5 - 1], 1)
  },

  /* *************************************不定位*********************************** */
  /* ..............三星............... */
  /*
  前三一码
  C(n, 1)
  */
  '0-1-1' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  前三二码
  n>=2
  C(n, 2)
  */
  '0-1-2' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  中三一码
  C(n, 1)
  */
  '0-1-3' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  中三二码
  n>=2
  C(n, 2)
  */
  '0-1-4' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  后三一码
  C(n, 1)
  */
  '0-1-5' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  后三二码
  n>=2
  C(n, 2)
  */
  '0-1-6' ({nsl}) {
    return C(nsl[0], 2)
  },

  /* ..............四星............... */
  /*
  前四一码
  C(n, 1)
  */
  '0-2-1' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  前四二码
  n>=2
  C(n, 2)
  */
  '0-2-2' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  后四一码
  C(n, 1)
  */
  '0-2-3' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  后四二码
  n>=2
  C(n, 2)
  */
  '0-2-4' ({nsl}) {
    return C(nsl, 2)
  },

  /* ..............五星............... */
  /*
  五星二码
  n>=2
  C(n, 2)
  */
  '0-3-1' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  五星三码
  n>=3
  C(n, 3)
  */
  '0-3-2' ({nsl}) {
    return C(nsl[0], 3)
  },

  /* *************************************任选*********************************** */
  /* ..............任二............... */
  /*
  直选复式
  N1万，N2千，N3百，N4十，N5个 n>=1
  "N1 * N2 + N1 * N3 + N1 * N4 + N1 * N5 + N2 * N3 + N2 * N4 + N2 * N5 + N3 * N4 + N3 * N5 + N4 * N5h或者
  C(选择有号码的位置, 2), 再对这些位置上的号码个数相乘"
  */
  '-1-1-1' ({nsl}) {
    let N1 = nsl[0]
    let N2 = nsl[1]
    let N3 = nsl[2]
    let N4 = nsl[3]
    let N5 = nsl[4]
    return N1 * N2 + N1 * N3 + N1 * N4 + N1 * N5 + N2 * N3 + N2 * N4 + N2 * N5 + N3 * N4 + N3 * N5 + N4 * N5
  },

  /*
  直选单式
  N录入的号码个数，p位置选择的个数 C(p, 2) * N
  */
  '-1-1-2' ({value, psl}) {
    return C(psl, 2) * N(value, 2)
  },

  /*
  组选复式
  p位置选择的个数，n选择的号码个数 C(p, 2) * C(n, 2)
  */
  '-1-1-3' ({nsl, psl}) {
    return C(psl, 2) * C(nsl[0], 2)
  },

  /*
  组选单式
  N录入的号码个数，p位置选择的个数 C(p, 2) * N
  */
  '-1-1-4' ({psl, value}) {
    return C(psl, 2) * N(value, 2)
  },

  /* ..............任三............... */
  /*
  直选复式
  N1万，N2千，N3百，N4十，N5个 n>=1
  "N1 * N2 * N3+N1 * N2 * N4+N1 * N2 * N5+N1 * N3 * N4+N1 * N3 * N5+N1 * N4 * N5+N2 * N3 * N4, +N2 * N3 * N5+N2 * N4 * N5+N3 * N4 * N5或者
  C(选择有号码的位置, 3), 再对这些位置上的号码个数相乘"
  */
  '-1-2-1' ({nsl}) {
    let N1 = nsl[0]
    let N2 = nsl[1]
    let N3 = nsl[2]
    let N4 = nsl[3]
    let N5 = nsl[4]
    return N1 * N2 * N3 + N1 * N2 * N4 + N1 * N2 * N5 + N1 * N3 * N4 + N1 * N3 * N5 + N1 * N4 * N5 + N2 * N3 * N4 + N2 * N3 * N5 + N2 * N4 * N5 + N3 * N4 * N5
  },

  /*
  直选单式
  N录入的号码个数，p位置选择的个数 C(p, 3) * N
  */
  '-1-2-2' ({psl, value}) {
    return C(psl, 3) * N(value, 3)
  },

  /*
  组三复式
  p位置选择的个数，n选择的号码个数 "C(p, 3) * C(n, 2)错误
  C(p, 3) * C(n, 2) * 2"
  */
  '-1-2-3' ({nsl, psl}) {
    return 2 * C(psl, 3) * C(nsl[0], 2)
  },

  /*
  组三单式
  N录入的号码个数，p位置选择的个数 C(p, 3) * N
  */
  '-1-2-4' ({psl, value}) {
    return C(psl, 3) * N(value, 3)
  },

  /*
  组六复式
  p位置选择的个数，n选择的号码个数 C(p, 3) * C(n, 3)
  */
  '-1-2-5' ({nsl, psl}) {
    return C(psl, 3) * C(nsl[0], 3)
  },
  /*
  组六单式
  N录入的号码个数，p位置选择的个数 C(p, 3) * N
  */
  '-1-2-6' ({psl, value}) {
    return C(psl, 3) * N(value, 3)
  },
  /*
  混合组选
  N录入的号码个数，p位置选择的个数 C(p, 3) * N
  */
  '-1-2-7' ({psl, value}) {
    return C(psl, 3) * N(value, 3)
  },

  /* ..............任四............... */
  /*
  直选复式
  N1万，N2千，N3百，N4十，N5个 n>=1
  "N1 * N2 * N3 * N4+N1 * N2 * N3 * N5+N1 * N2 * N4 * N5+N1 * N3 * N4 * N5+N2 * N3 * N4 * N5或者
  C(选择有号码的位置, 4), 再对这些位置上的号码个数相乘"
  */
  '-1-3-1' ({nsl}) {
    let N1 = nsl[0]
    let N2 = nsl[1]
    let N3 = nsl[2]
    let N4 = nsl[3]
    let N5 = nsl[4]
    return N1 * N2 * N3 * N4 + N1 * N2 * N3 * N5 + N1 * N2 * N4 * N5 + N1 * N3 * N4 * N5 + N2 * N3 * N4 * N5
  },

  /*
  直选单式
  N录入的号码个数，p位置选择的个数 C(p, 4) * N
  */
  '-1-3-2' ({psl, value}) {
    return C(psl, 4) * N(value, 4)
  },

  /*
  组选24
  p位置选择的个数，n选择的号码个数 C(psl, 4) * C(n, 4)
  */
  '-1-3-3' ({nsl, psl}) {
    return C(psl, 4) * C(nsl[0], 4)
  },

  /*
  组选12
  p位置选择的个数，m选择的二重号号码个数，n选择的单号号码个数，h重复的号码个数
  C(psl, 4) * (C(m, 1) * C(nsl[0], 2) - C(h, 1) * C(nsl[0]-1, 1))
  */
  '-1-3-4' ({nsl, psl, r}) {
    return C(psl, 4) * (C(nsl[0], 1) * C(nsl[1], 2) - C(r, 1) * C(nsl[1] - 1, 1))
  },

  /*
  组选6 p位置选择的个数，n选择的号码个数 C(psl, 4) * C(nsl[0], 2)
  */
  '-1-3-5' ({nsl, psl}) {
    return C(psl, 4) * C(nsl[0], 2)
  },

  /*
  组选4 p位置选择的个数，n选择的号码个数，h重复的号码个数
  C(psl, 4) * (C(m, 1) * C(nsl[0], 1) - C(h, 1))
  */
  '-1-3-6' ({nsl, psl, r}) {
    return C(psl, 4) * (C(nsl[0], 1) * C(nsl[1], 1) - C(r, 1))
  },

  /* *************************************趣味*********************************** */
  /* ..............大小单双............... */
  /*
  前二大小单双
  N1 * N2
  */
  '-2-1-1' ({nsl}) {
    return P(nsl)
  },
  /*
  后二大小单双
  N1 * N2
  */
  '-2-1-2' ({nsl}) {
    return P(nsl)
  },

  /* ..............猜遗漏............... */
  /*
  猜一
  n>=1
  C(n, 1)
  */
  '-2-2-1' ({nsl}) {
    return C(nsl[0], 1)
  },

  /*
  猜二
  n>=2
  C(nsl[0], 2)
  */
  '-2-2-2' ({nsl}) {
    return C(nsl[0], 2)
  },

  /*
  猜三
  n>=3
  C(nsl[0], 3)
  */
  '-2-2-3' ({nsl}) {
    return C(nsl[0], 3)
  },

  /*
  猜四
  n>=4
  C(nsl[0], 4)
  */
  '-2-2-4' ({nsl}) {
    return C(nsl[0], 4)
  },

  /*
  猜五
  n>=5
  C(nsl[0], 5)
  */
  '-2-2-5' ({nsl}) {
    return C(nsl[0], 5)
  }
}
let G115 = {
  /*
  所有参数集：{
    // 号码集
    ns,
    // 号码集长度集
    nsl, [4, 4]
    // 位置集
    ps,
    // 位置集长度
    psl
    // 输入值
    value
    // 重号数量 [4,5,6]
    r 3
  }
   */
  /* ===========================================================================115============================================================================================== */

  /* *************************************三星*********************************** */
  /* ..............前三............... */
  /*
   *直选复式
   **/
  '3-1-1-115' ({ns}) {
    let n = 0
    ns[0] = ns[0] || []
    ns[1] = ns[1] || []
    ns[2] = ns[2] || []
    ns[0].forEach((f) => {
      ns[1].forEach((s) => {
        ns[2].forEach((t) => {
          if (f !== s && f !== t && s !== t) n++
        })
      })
    })
    return n
  },
  /*
   *直选单式  N
   **/
  '3-1-2-115' ({value}) {
    return N(value, 6, 1, 2, 11, 1)
  },
  /*
   *组选复式  C(n,3)
   **/
  '3-1-3-115' ({nsl}) {
    return C(nsl[0], 3)
  },
  /*
   *组选单式  N
   **/
  '3-1-4-115' ({value}) {
    return N(value, 6, 1, 2, 11, 1)
  },
  /*
   *组选胆拖  C(n,(3-m))
   **/
  '3-1-5-115' ({nsl}) {
    return C(nsl[1], (3 - nsl[0]))
  },

   // '直选复式',
  '2-1-1-115' ({nsl, r}) {
    return nsl[0] * nsl[1] - r
  },
   // '直选单式',
  '2-1-2-115' ({value}) {
    return N(value, 4, 1, 2, 11, 1)
  },
   // '组选复式',
  '2-1-3-115' ({nsl}) {
    return C(nsl[0], 2)
  },
   // '组选单式',
  '2-1-4-115' ({value}) {
    return N(value, 4, 1, 2, 11, 1)
  },
   // '组选胆拖',
  '2-1-5-115' ({value}) {
    return N(value, 4, 1, 2, 11, 1)
  },
   // '定位胆',
  '1-1-1-115' ({nsl}) {
    return A(nsl)
  },
   // '前三不定位'
  '0-1-1-115' ({nsl}) {
    return A(nsl)
  },
   // '一中一',
  '-1-1-1-115' ({nsl}) {
    return C(nsl[0], 1)
  },
   // '二中二',
  '-1-1-2-115' ({nsl}) {
    return C(nsl[0], 2)
  },
   // '三中三',
  '-1-1-3-115' ({nsl}) {
    return C(nsl[0], 3)
  },
   // '四中四',
  '-1-1-4-115' ({nsl}) {
    return C(nsl[0], 4)
  },
   // '五中五',
  '-1-1-5-115' ({nsl}) {
    return C(nsl[0], 5)
  },
   // '六中五',
  '-1-1-6-115' ({nsl}) {
    return C(nsl[0], 6)
  },
   // '七中五',
  '-1-1-7-115' ({nsl}) {
    return C(nsl[0], 7)
  },
   // '八中五',
  '-1-1-8-115' ({nsl}) {
    return C(nsl[0], 8)
  },
   // '一中一',
  '-1-2-1-115' ({value}) {
    return N(value, 2, 1, 2, 11, 1)
  },
   // '二中二',
  '-1-2-2-115' ({value}) {
    return N(value, 4, 1, 2, 11, 1)
  },
   // '三中三',
  '-1-2-3-115' ({value}) {
    return N(value, 6, 1, 2, 11, 1)
  },
   // '四中四',
  '-1-2-4-115' ({value}) {
    return N(value, 8, 1, 2, 11, 1)
  },
   // '五中五',
  '-1-2-5-115' ({value}) {
    return N(value, 10, 1, 2, 11, 1)
  },
   // '六中五',
  '-1-2-6-115' ({value}) {
    return N(value, 12, 1, 2, 11, 1)
  },
   // '七中五',
  '-1-2-7-115' ({value}) {
    return N(value, 14, 1, 2, 11, 1)
  },
   // '八中五',
  '-1-2-8-115' ({value}) {
    return N(value, 16, 1, 2, 11, 1)
  },
   // '二中二',
  '-1-3-1-115' ({nsl}) {
    return C(nsl[1], 1)
  },
   // '三中三',
  '-1-3-2-115' ({nsl}) {
    return C(nsl[1], (3 - nsl[0]))
  },
   // '四中四',
  '-1-3-3-115' ({nsl}) {
    return C(nsl[1] - (4 - nsl[0]))
  },
   // '五中五',
  '-1-3-4-115' ({nsl}) {
    return C(nsl[1] - (5 - nsl[0]))
  },
   // '六中五',
  '-1-3-5-115' ({nsl}) {
    return C(nsl[1] - (6 - nsl[0]))
  },
   // '七中五',
  '-1-3-6-115' ({nsl}) {
    return C(nsl[1] - (7 - nsl[0]))
  },
   // '八中五',
  '-1-3-7-115' ({nsl}) {
    return C(nsl[1] - (8 - nsl[0]))
  },
   // '定单双',
  '-2-1-1-115' ({nsl}) {
    return C(nsl[0], 1)
  },
   // '猜中位',
  '-2-1-2-115' ({nsl}) {
    return C(nsl[0], 1)
  }
}
let KL8 = {
  // title: '任选一'
  '-1-1-1-KL8' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '任选二'
  '-1-1-2-KL8' ({nsl}) {
    return C(nsl[0], 2)
  },
  // title: '任选三'
  '-1-1-3-KL8' ({nsl}) {
    return C(nsl[0], 3)
  },
  // title: '任选四'
  '-1-1-4-KL8' ({nsl}) {
    return C(nsl[0], 4)
  },
  // title: '任选五'
  '-1-1-5-KL8' ({nsl}) {
    return C(nsl[0], 5)
  },
  // title: '任选六'
  '-1-1-6-KL8' ({nsl}) {
    return C(nsl[0], 6)
  },
  // title: '任选七'
  '-1-1-7-KL8' ({nsl}) {
    return C(nsl[0], 7)
  },
  // title: '上下盘'
  '0-1-1-KL8' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '奇偶盘'
  '0-1-2-KL8' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '和值大小单双'
  '0-1-3-KL8' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '五行'
  '0-1-4-KL8' ({nsl}) {
    return C(nsl[0], 1)
  }
}
let PK10 = {
  // title: '猜冠军
  '-1-1-1-PK10' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '猜冠亚军
  '-1-1-2-PK10' ({nsl, r}) {
    return nsl[0] * nsl[2] - r
  },
  // title: '猜前三名
  '-1-1-3-PK10' ({ns}) {
    let n = 0
    ns[0].forEach(n0 => {
      ns[1].forEach(n1 => {
        ns[2].forEach(n2 => {
          if (n0 !== n1 && n1 !== n2 && n2 !== n0) n++
        })
      })
    })
    return n
  },
  // title: '猜前四名
  '-1-1-4-PK10' ({ns}) {
    let n = 0
    ns[0].forEach(n0 => {
      ns[1].forEach(n1 => {
        ns[2].forEach(n2 => {
          ns[3].forEach(n3 => {
            if (n0 !== n1 && n1 !== n2 && n2 !== n3 && n0 !== n2 && n0 !== n3 && n1 !== n3) n++
          })
        })
      })
    })
    return n
  },
  // title: '猜前五名
  '-1-1-5-PK10' ({ns}) {
    let n = 0
    ns[0].forEach(n0 => {
      ns[1].forEach(n1 => {
        ns[2].forEach(n2 => {
          ns[3].forEach(n3 => {
            ns[4].forEach(n4 => {
              if (n0 !== n1 && n1 !== n2 && n2 !== n3 && n3 !== n4 && n0 !== n2 && n0 !== n3 && n0 !== n4 && n1 !== n3 && n1 !== n4 && n2 !== n4) n++
            })
          })
        })
      })
    })
    return n
  },
  // title: '龙虎
  '-1-1-6-PK10' ({nsl}) {
    return C(nsl[0], 1)
  }
}
let K3 = {
  // title: '二同复选'
  '2-1-1-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '二同单选'
  '2-1-2-K3' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - r
  },
  // title: '二不同标准'
  '-2-1-1-K3' ({nsl}) {
    return C(nsl[0], 2)
  },
  // title: '二不同胆拖'
  '-2-1-2-K3' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - r
  },
  // title: '三同单选'
  '3-1-1-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三同通选'
  '3-1-2-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三不同标准'
  '-3-1-1-K3' ({nsl}) {
    return C(nsl[0], 3)
  },
  // title: '三不同胆拖'
  '-3-1-2-K3' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 3) - C(r, 1) * C(nsl[1] - 1, 2)
  },
  // title: '三连单选'
  '+3-1-1-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '三连通选'
  '+3-1-2-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '和值'
  '0-1-1-K3' ({nsl}) {
    return C(nsl[0], 1)
  },
  // title: '猜1个号就中奖'
  '0-1-2-K3' ({nsl}) {
    return C(nsl[0], 1)
  }
}
module.exports = Object.assign(SSC, G115, KL8, PK10, K3)
