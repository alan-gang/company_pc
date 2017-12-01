var digitUppercase = function (n) {
    var fraction = ['角', '分']
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ]
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ]
    var head = n < 0 ? '欠' : ''
    n = Math.abs(n)
    var s = ''
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = ''
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整')
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let getAnimalOfNumber = (n) => {
    let nn = ['无', '无', '无']
    n = parseInt(n)
    if (typeof n !== 'number') return nn
    if ([10, 22, 34, 46].indexOf(n) !== -1) nn = ['鼠', '水']
    if ([9, 21, 33, 45].indexOf(n) !== -1) nn = ['牛', '土']
    if ([8, 20, 32, 44].indexOf(n) !== -1) nn = ['虎', '木']
    if ([7, 19, 31, 43].indexOf(n) !== -1) nn = ['兔', '木']
    if ([6, 18, 30, 42].indexOf(n) !== -1) nn = ['龙', '土']
    if ([5, 17, 29, 41].indexOf(n) !== -1) nn = ['蛇', '火']
    if ([4, 16, 28, 40].indexOf(n) !== -1) nn = ['马', '火']
    if ([3, 15, 27, 39].indexOf(n) !== -1) nn = ['羊', '土']
    if ([2, 14, 26, 38].indexOf(n) !== -1) nn = ['猴', '金']
    if ([1, 13, 25, 37, 49].indexOf(n) !== -1) nn = ['鸡', '金']
    if ([12, 24, 36, 48].indexOf(n) !== -1) nn = ['狗', '土']
    if ([11, 23, 35, 47].indexOf(n) !== -1) nn = ['猪', '水']
    if ((n % 2) === 0) nn.push('双')
    else nn.push('单')
    return nn
}

let getNumberOfAnimal = (s) => {
    let a = []
    let index = -1
    if (typeof n !== 'string' && (index = '鼠牛虎兔龙蛇马羊猴鸡狗猪金木水火土'.indexOf(s)) === -1 ) return a
    if (index === 0 ) a = [10, 22, 34, 46]
    if (index === 1 ) a = [9, 21, 33, 45]
    if (index === 2 ) a = [8, 20, 32, 44]
    if (index === 3 ) a = [7, 19, 31, 43]
    if (index === 4 ) a = [6, 18, 30, 42]
    if (index === 5 ) a = [5, 17, 29, 41]
    if (index === 6 ) a = [4, 16, 28, 40]
    if (index === 7 ) a = [3, 15, 27, 39]
    if (index === 8 ) a = [2, 14, 26, 38]
    if (index === 9 ) a = [1, 13, 25, 37, 49]
    if (index === 10 ) a = [12, 24, 36, 48]
    if (index === 11 ) a = [11, 23, 35, 47]
    if (index === 12 ) a = [2, 14, 26, 38, 1, 13, 25, 37, 49]
    if (index === 13 ) a = [8, 20, 32, 44, 7, 19, 31, 43]
    if (index === 14 ) a = [10, 22, 34, 46, 11, 23, 35, 47]
    if (index === 15 ) a = [5, 17, 29, 41, 4, 16, 28, 40]
    if (index === 16 ) a = [9, 21, 33, 45, 6, 18, 30, 42, 3, 15, 27, 39, 12, 24, 36, 48]
    return a.sort()
}
module.exports = {
  digitUppercase,
  numberWithCommas,
  getAnimalOfNumber,
  getNumberOfAnimal
}
