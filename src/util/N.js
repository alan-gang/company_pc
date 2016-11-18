import { C } from './base'
let empty = value => value.match(/^[\s\t\r]*$/)
let N = (value, N) => empty(value) ? 0 : value.split(' ').filter(n => n.length === N).length
let P = (nsl) => {
  let n = 1
  nsl.forEach(nl => {
    n *= nl
  })
  return n
}
export default {
  /*
  所有参数集：{
    // 号码集
    ns,
    // 号码集长度集
    nsl,
    // 位置集
    ps,
    // 位置集长度
    psl
    // 输入值
    value
    // 重号数
    r
  }
   */
  /*
  五星直选复式
  N1*N2*N3*N4*N5
   */
  '5-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  五星直选单式
  N
   */
  '5-1-2' ({value}) {
    return N(value, 5)
  },

  /*
  五星直选组合
  5*N1*N2*N3*N4*N5
   */
  '5-1-3' ({nsl}) {
    return 5 * this['5-1-1']({nsl})
  },

  /*
  五星组选120
  C(n,5)
   */
  '5-2-1' ({nsl}) {
    return C(nsl[0], 5)
  },

  /*
  五星组选60
  C(m,1)*C(n,3)-C(h,1)*C(n-1,2)
  m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数 m>=1,n>=3
   */
  '5-2-2' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 3) - C(r, 1) * C(nsl[1] - 1, 2)
  },

  /*
  五星组选30
  C(m,2)*C(n,1)-C(h,2)*C(2,1)-C(h,1)*C(m-h,1)
  m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数m>=2, n>=1
   */
  '5-2-3' ({nsl, r}) {
    return C(nsl[0], 2) * C(nsl[1], 1) - C(r, 2) * C(2, 1) - C(r, 1) * C(nsl[0] - r, 1)
  },

  /*
  五星组选20
  C(m,1)*C(n,2)-C(h,1)*C(n-1,1)
  m三重号选择的个数，n单号选择的个数，h三重号和单号重复号码的个数m>=1,n>=2
   */
  '5-2-4' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 2) - C(r, 1) * C(nsl[1] - 1, 1)
  },

  /*
  五星组选10
  C(m,1)*C(n,1)-C(h,1)
  m三重号选择的个数，n二重号选择的个数，h三重号和二重号重复号码的个数m>=1,n>=1
   */
  '5-2-5' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - C(r, 1)
  },

  /*
  五星组选5
  C(m,1)*C(n,1)-C(h,1)
  m四重号选择的个数，n单号选择的个数，h四重号和单号重复号码的个数m>=1,n>=1
   */
  '5-2-6' ({nsl, r}) {
    return this['5-2-5']({nsl, r})
  },

  /*
  五星特殊  一帆风顺  C(n,1)  n选择的号码个数 n>=1
  好事成双  C(n,1)  n选择的号码个数n>=1
  三星报喜  C(n,1)  n选择的号码个数n>=1
  四季发财  C(n,1)  n选择的号码个数n>=1
   */
  '5-3-1' ({nsl}) {
    return C(nsl[0], 1)
  },
  '5-3-2' ({nsl}) {
    return this['5-3-1']({nsl})
  },
  '5-3-3' ({nsl}) {
    return this['5-3-1']({nsl})
  },
  '5-3-4' ({nsl}) {
    return this['5-3-1']({nsl})
  },

  /*
  四星  前四直选  直选复式  N1*N2*N3*N4 N1千，N2百，N3十，N4个
   */
  '4-1-1' ({nsl}) {
    return P(nsl)
  },

  /*
  四星 直选单式  N N=输入的号码个数
   */
  '4-1-2' ({value}) {
    return N(value, 4)
  },

  /*
  四星 直选组合  (N1*N2*N3*N4)*4 N1千，N2百，N3十，N4个n>=1
  */
  '4-1-3' ({nsl}) {
    return 4 * this['4-1-1']({nsl})
  },
  /*
  四星
  前四组选  组选24  C(n,4)  n选择的号码个数 n>=4
  */
  '4-2-1' ({nsl}) {
    return C(nsl[0], 4)
  },

  /*
  四星
  前四组选 组选12  C(m,1)*C(n,2)-C(h,1)*C(n-1,1) m二重号选择的个数，n单号选择的个数，h二重号和单号重复号码的个数 m>=1,n>=2
  */
  '4-2-2' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 2) - C(r, 1) * C(nsl[1] - 1, 1)
  },

  /*
  四星
  前四组选
  组选6   C(n,2)  n>=2
  */
  '4-2-3' ({nsl}) {
    return C(nsl[0], 2)
  },

   /*
  四星
  前四组选
  组选4   C(m,1)*C(n,1)-C(h,1)  m三重号选择的个数，n单号选择的个数，h三重号和单号重复号码的个数m>=1,n>=1
  */
  '4-2-4' ({nsl, r}) {
    return C(nsl[0], 1) * C(nsl[1], 1) - C(r, 1)
  }
}
