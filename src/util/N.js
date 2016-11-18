import { C } from './base'
let empty = value => value.match(/^[\s\t\r]*$/)
let N = (value, N) => empty(value) ? 0 : value.split(' ').filter(n => n.length === N).length
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
  }
   */
  /*
  五星直选复式
  N1*N2*N3*N4*N5
   */
  '5-1-1' ({nsl}) {
    let n = 1
    nsl.forEach(nl => {
      n *= nl
    })
    return n
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
   */
  '5-2-2' ({nsl}) {
    return 0
  }
}
