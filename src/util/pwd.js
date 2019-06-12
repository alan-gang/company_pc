/**
 * @desc 密码强弱评分
 * 
    一、密码长度：
              5 分: 小于等于5 个字符
              10 分: 6 到8 字符
              25 分: 大于等于9 个字符
    二、字母：
              0 分: 没有字母
              10 分: 全都是小（大）写字母
              20 分: 大小写混合字母
    三、数字:
              0 分: 没有数字
              10 分: 1 个数字
              20 分: 大于1 个数字
    四、符号:
              0 分: 没有符号
              10 分: 1 个符号
              25 分: 大于1 个符号
    五、奖励:
              2 分: 字母和数字
              3 分: 字母、数字和符号
              5 分: 大小写字母、数字和符号

  根据密码评分，将密码划分成以下4个等级：
  >= 90: 非常安全
  >= 70: 安全
  >= 50: 一般
  >= 0: 弱
 * 
 * @param {String} pwd 密码
 */
export function checkPwdScore(pwd) {
  pwd = String(pwd)
  if (!pwd) return 0

  let rule1Score = 0
  let rule2Score = 0
  let rule3Score = 0
  let rule4Score = 0
  let rule5Score = 0

  // 规则1 长度
  if (pwd.length >= 9) {
    rule1Score = 25
  } else if (pwd.length >= 6 && pwd.length <= 8) {
    rule1Score = 10
  } else {
    rule1Score = 5
  }

  // 规则2 字母
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) {
    rule2Score = 20
  } else if (/[a-z]/.test(pwd) || /[A-Z]/.test(pwd)) {
    rule2Score = 10
  } else {
    rule2Score = 0
  }
  
  // 规则3 数字
  let numLen = (pwd.match(/\d/g) || []).length
  if (numLen > 1) {
    rule3Score = 20
  } else if (numLen === 1) {
    rule3Score = 10
  } else {
    rule3Score = 0
  }

  // 规则4 符号
  let signLen = (pwd.match(/[~!@#$%^&*()_+]/g) || []).length
  if (signLen > 1) {
    rule4Score = 25
  } else if (signLen === 1) {
    rule4Score = 10
  } else {
    rule4Score = 0
  }

  // 规则5 奖励
  if (/\d/.test(pwd) && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) &&  /[~!@#$%^&*()_+]/.test(pwd)) {
    rule5Score = 5
  } else if (/\d/.test(pwd) && (/[a-z]/.test(pwd) || /[A-Z]/.test(pwd)) &&  /[~!@#$%^&*()_+]/.test(pwd)) {
    rule5Score = 3
  } else if (/\d/.test(pwd) && (/[a-z]/.test(pwd) || /[A-Z]/.test(pwd))) {
    rule5Score = 2
  } else {
    rule5Score = 0
  }

  return (rule1Score + rule2Score + rule3Score + rule4Score + rule5Score)
}

function checkPwdScore (pwd) {
  pwd = String(pwd)
  if (!pwd) return 0

  let len = pwd.length
  let totalScore = 0
  let uppercaseLen = 0
  let lowercaseLen = 0
  let nums = 0
  let signLen = 0
  let lowestCondiCount = 0

  // 加分规则一：密码长度, +(n*4)
  totalScore += len * 4

  // 加分规则二：大写字母, +((len-n)*2)
  uppercaseLen =  (pwd.match(/[A-Z]/g) || []).length
  totalScore += (len - uppercaseLen) * 2

  // 加分规则三：小写字母, +((len-n)*2)
  lowercaseLen = (pwd.match(/[a-z]/g) || []).length
  totalScore += (len - uppercaseLen) * 2

  // 加分规则四：数字, +(n*4)
  nums = (pwd.match(/\d/g) || []).length
  totalScore += nums * 4

  // 加分规则五：符号, +(n*6)
  signLen = (pwd.match(/[~!@#$%^&*()_+]/g) || []).length
  totalScore += signLen * 6

  // 加分规则六：位于中间的数字或符号
  if (len > 2) {
    let midStr = pwd.substring(1, len - 1)
    let numAndSignLen = (midStr.match(/[\d~!@#$%^&*()_+]/g) || []).length
    totalScore += numAndSignLen * 2
  }

  // 最低条件得分, +(n*2)
  // 包含大写字母
  if (uppercaseLen > 0) {
    lowestCondiCount++
  }
  // 包含小写字母
  if (lowercaseLen > 0) {
    lowestCondiCount++
  }
  // 包含数字
  if (nums > 0) {
    lowestCondiCount++
  }
  // 包含符号
  if (signLen > 0) {
    lowestCondiCount++
  }

  // 加分规则七：最低条件要求满足条目1并至少满足条目2-5中的任意三条
  if (len >= 8 && lowestCondiCount >= 3) {
    totalScore += lowestCondiCount * 2
  }

  // 减分规则一: 只有字母,-n
  if (/^[a-zA-Z]+$/gi.test(pwd)) {
    totalScore -= len
  }

  // 减分规则二: 只有数字,-n
  if (/^\d+$/gi.test(pwd)) {
    totalScore -= len
  }

  // 减分规则三: 重复字符数（大小写敏感）
  totalScore -= calcRepeatScore(pwd)

  // 减分规则四: 连续大写字母, -(n*2)
  let upperCaseSeries = pwd.match(/[A-Z]+/g)
  let upperCaseSeriesCount = 0
  if (upperCaseSeries) {
    upperCaseSeries.forEach(function(s) {
      if (s.length > 1) {
        upperCaseSeriesCount += s.length - 1
      }
    })
  }
  totalScore -= upperCaseSeriesCount

  // 减分规则五: 连续小写字母, -(n*2)
  let lowerCaseSeries = pwd.match(/[a-z]+/g)
  let lowerCaseSeriesCount = 0
  if (lowerCaseSeries) {
    lowerCaseSeries.forEach(function(s) {
      if (s.length > 1) {
        lowerCaseSeriesCount += s.length - 1
      }
    })
  }
  totalScore -= lowerCaseSeriesCount

  // 减分规则六: 连续数字, -(n*2)
  let numSeries = pwd.match(/\d+/g)
  let numSeriesCount = 0
  if (numSeries) {
    numSeries.forEach(function(s) {
      if (s.length > 1) {
        numSeriesCount += s.length - 1
      }
    })
  }
  totalScore -= numSeriesCount

  // 减分规则七: 正序或逆序字母, -(n*3)

  // 减分规则八: 正序或逆序数字, -(n*3)

  // 减分规则九: 正序或逆序符号, -(n*3)

  return totalScore
}

function calcRepeatScore (pass) {
  let repChar = 0
  let repCharBonus = 0  //得分
  let len = pass.length
  for(let i = 0; i < len; i++) {
    let exists = false
    for (let j = 0; j < len; j++) {
      if (pass[i] === pass[j] && i !== j) {
        exists = true
        repCharBonus += Math.abs(len / (j - i))
      }
    }
    if (exists) {
      repChar++
      let unqChar = len - repChar
      repCharBonus = (unqChar) ? Math.ceil(repCharBonus / unqChar) : Math.ceil(repCharBonus)
    }
  }
  return repCharBonus
}


/**
 * 获取密码强度级别
 * @param {String} pwd 
 */
export function getPwdSafeLevel (pwd) {
  let score = checkPwdScore(pwd)
  let level = 1
  if (score >= 90) {
    level = 4
  } else if (score >= 70) {
    level = 3
  } else if (score >= 50) {
    level = 2
  } else {
    level = 1
  }
  return level
}