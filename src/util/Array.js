export default (arr, len) => {
  let a = arr.map((e, i) => {
    return i % len === 0 ? arr.slice(i, i + len) : null
  }).filter(e => e)

  if (a[0]) {
    a[ a.length - 1 ].length = len
  }
  return a
}

