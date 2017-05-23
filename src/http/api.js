// let api = 'http://192.168.169.44:9901/cagamesclient'
// online
let api = 'http://119.9.117.58:9901/cagamesclient/'
// steven
// let api = 'http://192.168.169.119:8080/cagamesclient/'
// johson
// let api = 'http://192.168.169.161:8080/cagamesclient/'
// let api = 'http://192.168.169.111:8080/cagamesclient/'
let Login = {
  // 约定
  // 成功默认返回：{"success":true}
  // 失败默认返回：{"success":false}
  // 每个请求都会包含以上结构体。

  // 1、ios注册session  IOS
  // iosRegist: api + 'login/login.do?method=iosRegist',

  // 2、获取验证码 返回base64数据  ALL
  getVerifyImage: '/login/login.do?method=getVerifyImage',
  // getCode: '/sys/permission.do?method=tokenRegist',

  // 3、问候语
  getGreetingMsg: '/login/login.do?method=getGreetingMsg',
  // {"greetingMsg":"xxxx"}

  // 4、用户登录
  validate: '/login/login.do?method=validate',
  // {"username":"xxx","userid":"xxxx"}

  // 匿名登录
  tryLogin: '/login/login.do?method=tryLogin',

  // 登出
  logout: '/login/login.do?method=logout',

  // 5、查询菜单、桌面、收藏夹 PC接口
  getUserPrefence: '/home/userMenus.do?method=getUserPrefence',
  // {"menuList":"[]","deskList":"[]","favoriteList":"[]"}

  // 6、用户资金信息  ALL
  getUserFund: '/home/userInfo.do?method=getUserFund',
  // {"userId":"","channelBalance":"","availableBalance":"","holdBalance":"","freeAvaiable":"","freeBalance":"","freeHold":"","rewardPoint":"","isLocked":""}

  // 7、获取用户菜单 ios和andriod
  getUserMenus: '/home/userMenus.do?method=getUserMenus&userId=1',
  // {"menuList":"[]"}

  // 8、添加桌面或收藏夹  PC
  // addPrefence: '/home/userMenus.do?method=addPrefence&menuId=1&userId=1&isDesk=1&sort=1',
  addPrefence: '/home/userMenus.do?method=addPrefence',

  // 9、删除桌面或收藏夹   PC
  delPrefence: '/home/userMenus.do?method=delPrefence',

  // 10、中奖公告   ALL
  rewardNotices: '/home/notices.do?method=rewardNotices',
  // {"rewardNotices":"[]"}

  // 11、系统公告   ALL
  sysNotices: '/home/notices.do?method=sysNotices',
  // {"sysNotices":"[]"}

  // 12、校验验证码   ALL
  checkVerifyCode: '/login/login.do?method=checkVerifyCode',

  // 12、修改密码页面，校验用户名   ALL
  checkUserName: '/login/forgetPwd.do?method=checkUserName',

  // 13、修改密码页面，获取手机号码  ALL
  getMobile: '/login/forgetPwd.do?method=getMobile',
  // {"mobile":""}

  // 14、修改密码页面，获取邮箱地址  ALL
  getEmail: '/login/forgetPwd.do?method=getEmail',
  // {"email":""}

  // 15、修改密码页面，获取安全问答  ALL
  safeQuestion: '/login/forgetPwd.do?method=safeQuestion',
  // {"question1":"","question2":""}

  // 16、修改密码页面，发送手机短信  ALL
  sendSms: '/login/forgetPwd.do?method=sendSms',

  // 17、修改密码页面，发送邮件  ALL
  sendMail: '/login/forgetPwd.do?method=sendMail',

  // 18、校验短信验证码
  checkSmsVerifyCode: '/login/forgetPwd.do?method=checkSmsVerifyCode',

  // 19、邮件验证码
  checkMailVerifyCode: '/login/forgetPwd.do?method=checkMailVerifyCode',

  // 19、修改密码页面，校验安全问答  ALL
  safeAnswer: '/login/forgetPwd.do?method=safeAnswer',

  // 20、修改密码页面，充值密码    ALL
  resetPwd: '/login/forgetPwd.do?method=resetPwd',
  // 获取所有线路域名
  // http://192.168.169.41:9901/cagamesclient/login/lineTest.do?method=getEnableLines
  getEnableLines: '/login/lineTest.do?method=getEnableLines',
  // 测试线路
  // http://192.168.169.41:9901/cagamesclient/login/lineTest.do?method=lineTest
  lineTest: '/login/lineTest.do?method=lineTest'
}

let Game = {
  // 获得奖期的开奖时间
  getTraceIssueList: '/issue.do?method=traceIssueList',
  // 3.当前奖期信息
  getIssue: '/issue.do?method=current',
  // Steven, [21.04.17 19:25]
  // method=recentlyCode pageNum size gameid
  recentlyCode: '/issue.do?method=recentlyCode',
  // http://192.168.169.44:9901/cagamesclient/issue.do?method=current&gameid=1

  // 4.返点信息
  getUserpoint: '/userpoint.do?method=myPoint',
  // http://192.168.169.44:9901/cagamesclient/userpoint.do?method=myPoint&gameid=1

  // 5.投注接口
  booking: '/booking.do?method=add',
  // http://192.168.169.44:9901/cagamesclient/booking.do?method=add
  // {
  //   gameid : 1,//游戏代码
  //   issue : ""161201001"",//起始期号
  //   totalnums: 123 ,//总注数
  //   totalmoney ： 12233.00        ,//总投注金额
  //   type: ""1/2"",//类型：1-投注；2-追号
  //   isusefree：0,//是否使用优惠券，0-否，1-是
  //   items:[ //投注方案数组
  //                   {
  //                     methodid:111, //玩法编号
  //                     type: 1,
  //                     pos :  “w,q,b,s,g”//任选位置信息 ,万千百十个,以逗号“,”连接;
  //                     codes:""1,2,3|1,2,5"", //投注内容,不同位的用竖线“|”连接，相同位选多个号码用“,”连接.
  //                     count:1 ,//注数
  //                     times:1 ,//倍数
  //                     money:200.000,//金额
  //                     mode:""1"",//1-元，2-角，3-分，4-厘
  //                     userpoint:""0.06"" //用户选择的返点
  //                   }
  //   ],
  //   trace:{//追号信息
  //        task_type: ""1"",//追号类型，1-同步，2-翻倍，3-利润率
  //        task_stop:""0,1"",//是否追中即停，0-否，1-是
  //        task_begin: ""20161226001"",//起始期号
  //        task_double_times: 2,//翻倍追号倍数,
  //        task_min_rate : 30 ,//最低收益率
  //        task_money : 233 , //追号总金额
  //       items : [//追号每期的信息
  //             {
  //                “issue:""161201001"",//期号
  //                 times : 3//倍数
  //             },{
  //                issue:""161201002"",
  //                 times : 3
  //             }
  //          ]
  //   }
  // }
  // 1.  最近投注记录
  getOrderList: '/project.do?method=list',
  // 2.  最近追号记录
  getFollowList: '/task.do?method=list'
}

let Me = {
  // 显示账号信息
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=acctSecureInfo
  acctSecureInfo: '/person/accountSecur.do?method=acctSecureInfo',

  // 修改登录密码
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=changLoginPwd&password=123456&newPwd=000000
  changLoginPwd: '/person/accountSecur.do?method=changLoginPwd',
  // 修改资金密码
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=changSecurePwd&password=123456&newPwd=000000
  changSecurePwd: '/person/accountSecur.do?method=changSecurePwd',
  // 修改昵称
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=changNickName&nickName=zhangsan
  changNickName: '/person/accountSecur.do?method=changNickName',
  // 设置问候
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setGreetMsg&greetMsg=have u lunch
  setGreetMsg: '/person/accountSecur.do?method=setGreetMsg',
  // 发送手机短信
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=sendSms&mobile=18952000000
  person_sendSms: '/person/accountSecur.do?method=sendSms',
  // 发送邮件
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=sendMail&email=1@qq.com
  person_sendMail: '/person/accountSecur.do?method=sendMail',
  // 验证短信验证
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=checkSmsVerifyCode&verifyCode=4511
  person_checkSmsVerifyCode: '/person/accountSecur.do?method=checkSmsVerifyCode',
  // 验证邮件验证
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=checkMailVerifyCode&verifyCode=2664
  person_checkMailVerifyCode: '/person/accountSecur.do?method=checkMailVerifyCode',
  // 绑定手机
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=bindMobil&mobile=18952000000&type=0
  bindMobil: '/person/accountSecur.do?method=bindMobil',
  // 绑定邮箱
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=bindEmail&email=a1@qq.com&type=0
  bindEmail: '/person/accountSecur.do?method=bindEmail',
  // 获取所有安全问答
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=safeQuestionList
  safeQuestionList: '/person/accountSecur.do?method=safeQuestionList',
  // 设置安全问答
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setSafeQuestion&question1=abc&question2=def&answer1=ghi&answer2=jkl
  setSafeQuestion: '/person/accountSecur.do?method=setSafeQuestion',
  // 设置安全验证方式
  // http://192.168.169.44:9901/cagamesclient/person/accountSecur.do?method=setsecurityCheck&checkType=1&verifyCode=2444
  setsecurityCheck: '/person/accountSecur.do?method=setsecurityCheck',
  // 获取银行列表
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=getBankList
  getBankList: '/person/bankcard.do?method=getBankList',
  // 我的银行
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=getUserBankCards
  getUserBankCards: '/person/bankcard.do?method=getUserBankCards',
  // 绑定银行
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=bindBankCard&provinceId=11&cityId=535&branch=新街口&realName=张三&cardNo=62123456789012345&aliasName=abc&bankId=1
  bindBankCard: '/person/bankcard.do?method=bindBankCard',
  // 解绑银行
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=unbindBankCard&cardId=2
  unbindBankCard: '/person/bankcard.do?method=unbindBankCard',
  // 锁定银行
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=lockBankCard
  lockBankCard: '/person/bankcard.do?method=lockBankCard',
  // 奖金详情 显示自己各彩种奖金和返点详细情况，彩种标签内（玩法组 奖级 奖金 返点
  // http://192.168.169.44:9901/cagamesclient/person/lotteryPrize.do?method=getLotteryPrinzeInfo
  getLotteryPrinzeInfo: '/person/lotteryPrize.do?method=getLotteryPrinzeInfo',
  // 充值请求
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=doRecharge
  doRecharge: '/person/recharge.do?method=doRecharge',
  // 充值记录查询
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=qryRecharge&startDate=20161120124327&&endDate=20161126124327&status=1
  qryRecharge: '/person/recharge.do?method=qryRecharge',
  // 校验资金密码
  // http://192.168.169.44:9901/cagamesclient/person/withDraw.do?method=checkSecurityPwd&password=000000
  checkSecurityPwd: '/person/withDraw.do?method=checkSecurityPwd',
  // 展示提款请求
  // http://192.168.169.44:9901/cagamesclient/person/withDraw.do?method=showWithDraw&bankId=1&amount=123&userBankId=1
  showWithDraw: '/person/withDraw.do?method=showWithDraw',
  // 发起提款请求
  // http://192.168.169.44:9901/cagamesclient/person/withDraw.do?method=doWithDraw&bankId=1&amount=123&userBankId=2
  doWithDraw: '/person/withDraw.do?method=doWithDraw',
  // 查询提款请求
  // http://192.168.169.44:9901/cagamesclient/person/withDraw.do?method=queryWithdraw&startDate=20161220124327&endDate=20161227124327&status=1
  queryWithdraw: '/person/withDraw.do?method=queryWithdraw',
  // 省份、城市
  // http://192.168.169.161:8080/cagamesclient/person/bankcard.do?method=getProvices
  getProvices: '/person/bankcard.do?method=getProvices',

  // 校验解绑
  // http://192.168.169.44:9901/cagamesclient/person/bankcard.do?method=unbindCheck
  unbindBankCardCheck: '/person/bankcard.do?method=unbindCheck',
  // 获取各银行限制提款额度
  // http://192.168.169.161:8080/cagamesclient/person/bankcard.do?method=getWithdrawByApi&rootName=icbc
  getWithdrawByApi: '/person/bankcard.do?method=getWithdrawByApi',
  // 进入充值页
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=showRecharge
  // showRecharge: '/person/recharge.do?method=showRecharge',
  // 第三方充值saveType=1*************
  // 获取银行列表
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=getBankList
  TopUpGetBankList: '/person/recharge.do?method=getBankList',
  // &userId=1&userName=jock&platId=101
  // 校验充值金额范围
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=saveAmountRange&bankCode=icbc
  saveAmountRange: '/person/recharge.do?method=saveAmountRange',
  // &userId=1&userName=jock&platId=101&bankCode=icbc
  // 提交充值请求道第三方
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=commit&bankCode=icbc&amount=0.01
  commit: '/person/recharge.do?method=commit',
  // &userId=1&userName=jock&platId=101&bankCode=icbc&amount=100
  // 在线充值saveType=0*************
  // 获取银行列表
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=getBankList&saveType=1
  // getBankList: '/person/recharge.do?method=getBankList',

  // 校验充值金额范围
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=saveAmountRange&bankCode=icbc&saveType=1
  // saveAmountRange: '/person/recharge.do?method=saveAmountRange',

  // 提交充值请求道第三方
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=commit&bankCode=icbc&amount=0.01&saveType=1
  // commit: '/person/recharge.do?method=commit',

  // 系统支持充值方式
  // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=getEnableSaveType
  getEnableSaveType: '/person/recharge.do?method=getEnableSaveType'
}

let Group = {
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=createQr
  // 二维码
  createQr: '/team/createAccount.do?method=createQr',
  // 查询子用户
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=getUserList&userName=dd&minPoint=0&maxPoint=8&maxBalance=100000&minBalance=0&startRegistTime=20161101000000&endRegistTime=20161231000000
  getUserList: '/team/useList.do?method=getUserList',
  // 代充
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=recharge&destId=5&amount=100.5
  recharge: '/team/useList.do?method=recharge',
  // 进入调点页面，需要展示的信息
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=showAdjustInfo&destUserId=5
  showAdjustInfo: '/team/useList.do?method=showAdjustInfo',
  // 调点用量升点
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=adjustPoint&destUserId=5&adjustType=0&increaseType=0&point=0.1
  adjustPoint: '/team/useList.do?method=adjustPoint',
  // 用配额点
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=adjustPoint&destUserId=5&adjustType=0&increaseType=1&point=0.1
  // adjustPoint: '/team/useList.do?method=adjustPoint',
  // 降点
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=adjustPoint&destUserId=5&adjustType=1&point=0.1
  // adjustPoint: '/team/useList.do?method=adjustPoint',
  // 进入分配分配开户额
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=showUserAddCount&destUserId=5
  showUserAddCount: '/team/useList.do?method=showUserAddCount',
  // 分配开户额
  // http://192.168.169.44:9901/cagamesclient/team/useList.do?method=distriUserAddCount&destUserId=5&levelVip=1&levelOne=1&levelTwo=1&levelThree1
  distriAddCount: '/team/useList.do?method=distriAddCount',
  // 进入手动开户页面
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=showRegistUser
  showRegistUser: '/team/createAccount.do?method=showRegistUser',
  // 手动注册
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=registUser&userName=abcdefg&password=123qwe&nickName=test1234&keepPoint=0.2
  registUser: '/team/createAccount.do?method=registUser',
  // 进入推广链接页面，生成推广链接地址
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=showSpreadLinks
  showSpreadLinks: '/team/createAccount.do?method=showSpreadLinks',
  // 设置保留返点
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=setKeepPoint&keepPoint=0.1
  setKeepPoint: '/team/createAccount.do?method=setKeepPoint',
  // 自动注册
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=autoRegist&tag=7F593EF2F9B3537291FF912CAA7C49A5&userName=test123&nickName=test123&verifyCode=4953
  autoRegist: '/team/createAccount.do?method=autoRegist',
  // 获取契约分红的最大分红上线
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=getMaxBonusRate
  getMaxBonusRate: '/team/contractBonus.do?method=getMaxBonusRate',
  // 创建一个契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=createContract
  createContract: '/team/contractBonus.do?method=createContract',
  // 修改契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=updateContract
  updateContract: '/team/contractBonus.do?method=updateContract',
  // 删除契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=removeContract&contractId=10
  removeContract: '/team/contractBonus.do?method=removeContract',
  // 接受、拒绝契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=checkContract&contractId=11&status=1
  checkContract: '/team/contractBonus.do?method=checkContract',
  // 查询我的契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=queryMyContract&startDate=20170101200000&endDate=20170115200000&stat=1
  queryMyContract: '/team/contractBonus.do?method=queryMyContract',
  // 查询我的奖金
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=myBonus&startDate=20170101200000&endDate=20170115200000
  myBonus: '/team/contractBonus.do?method=myBonus',
  // http://192.168.169.44:9901/cagamesclient/team/topBonus.do?method=topBonus&startDate=20170310&endDate=20170316&issue=20170315
  topBonus: '/team/topBonus.do?method=topBonus',
  // http://192.168.169.44:9901/cagamesclient/team/topBonus.do?method=topBonuDetail&issue=20170315
  topBonuDetail: '/team/topBonus.do?method=topBonuDetail',
  // http://192.168.169.44:9901/cagamesclient/team/topBonus.do?method=topContract&contractId=1
  topContract: '/team/topBonus.do?method=topContract',
  // 查询我和下级签订的契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=mySubContract&startDate=20170101200000&endDate=20170115200000
  mySubContract: '/team/contractBonus.do?method=mySubContract',
  // 上级确认奖金
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=paraentCheckBonus&bonusId=1&sendType=1
  paraentCheckBonus: '/team/contractBonus.do?method=paraentCheckBonus',
  // 下级确认完成奖金发放
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=subCheckBonus&bonusId=1
  subCheckBonus: '/team/contractBonus.do?method=subCheckBonus',
  // 按ID查询契约
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=qryContractById&contractId=12
  qryContractById: '/team/contractBonus.do?method=qryContractById',
  // 按ID查询奖金
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=qryBonusById&bonusId=1
  qryBonusById: '/team/contractBonus.do?method=qryBonusById',
  // 查询下级奖金
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=mySubBouns&issue=20170301&sendType=1
  mySubBouns: '/team/contractBonus.do?method=mySubBouns',
  // 查询期号
  // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=getBonusIssue
  getBonusIssue: '/team/contractBonus.do?method=getBonusIssue',
  // 团队数据统计（pc端团队数据统计接口）
  // http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamTodayData&startDay=170226
  getTeamTodayData: '//team/teamStatistic.do?method=getTeamTodayData',
  // 7.团队盈亏图表（投注+返点+中奖+结算+中奖率） http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamProfit&startDay=170226&endDay=170303
  getTeamProfit: '/team/teamStatistic.do?method=getTeamProfit',
  // 10.团队总销量（投注+返奖数据）  http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamSale&startDay=170226&endDay=170303
  getTeamSale: '/team/teamStatistic.do?method=getTeamSale',
  // 12 团队用户图表（用户数图表：总用户数，活跃用户数，投注用户数）  http://192.168.169.44:9901/cagamesclient/team/teamStatistic.do?method=getTeamUserChart&startDay=170226&endDay=170303
  teamStatistic: '/team/teamStatistic.do?method=getTeamUserChart',
  // 陌生人信息
  // http://192.168.169.44:9901/cagamesclient/team/createAccount.do?method=chatStrange&tag=xxxxx
  getStrangerInfo: '/team/createAccount.do?method=chatStrange'
}

let Form = {
  // 投注列表
  // http://192.168.169.44:9901/cagamesclient/report/buyReport.do?method=list&beginDate=20170101000000&endDate=20170303000000&stat=1&isFree=1&userName=test&scope=1&lotteryId=1&methodId=16&issue=170104071&modes=1
  Orderlist: '/report/buyReport.do?method=list',
  // 根据投注号Id查询投注详情
  // http://192.168.169.44:9901/cagamesclient/report/buyReport.do?method=list&projectId=2290
  OrderDetail: '/report/buyReport.do?method=detail',
  // 撤单
  // http://192.168.169.44:9901/cagamesclient/booking.do?method=cancel&id=1304
  cancel: '//booking.do?method=cancel',
  // 帐变查询
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=list
  list: '/report/OrderReport.do?method=list',
  // 盈亏报表列表
  // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=list&startDay=20170101&endDay=20170301
  profitList: '/report/profit.do?method=list',
  // 盈亏详情列表（按用户和时间范围查询）
  // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=detail&destUserId=2&startDay=20170101&endDay=20170301
  profitDetail: '/report/profit.do?method=detail',
  // 今日报表
  // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=todayReport&startDay=20170101&endDay=20170301
  todayReport: '/report/profit.do?method=todayReport',
  // 追号列表
  // http://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=list&beginDate=20170201000000&endDate=20170303000000&isFree=0&userName=test&scope=0&lotteryId=1&methodId=14&issue=170216085&modes=1&projectId=120
  followList: '/report/taskBuy.do?method=list',
  // 根据追号号查看追号详情
  // ttp://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=detail&projectId=120
  followDetail: '/report/taskBuy.do?method=detail',
  // 在追号详情页面，取消追号（没有）
  // http://192.168.169.44:9901/cagamesclient/booking.do?method=cancelTask&id=1304
  followCancel: '/booking.do?method=cancelTask',
  // 获取帐变类型列表
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=getOrderType
  getOrderType: '/report/OrderReport.do?method=getOrderType',
  // 获取彩种列表
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=getLotterys
  getLotterys: '/report/OrderReport.do?method=getLotterys',
  // 获取玩法
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=getMethods&lotteryId=1
  getMethods: '/report/OrderReport.do?method=getMethods',
  // 获取期号
  // http://192.168.169.44:9901/cagamesclient/issue.do?method=getRecentIssueList&lotteryId=1&issCount=10
  getRecentIssueList: '/issue.do?method=getRecentIssueList'
}

let Help = {
  // 获取帮助信息
  // http://192.168.169.44:9901/cagamesclient/help.do?method=getHelpInfo&subject=comment "subject取值范围{""comment"",""faq"",""game""}
  // comment:功能介绍
  // faq:常见问题
  // game:玩法介绍
  getHelpInfo: '/help.do?method=getHelpContent',
  // http://192.168.169.161:8080/cagamesclient/help.do?method=getHelpTag&subject=comment
  getHelpTag: '/help.do?method=getHelpTag'
}

let Activity = {
  // 活动首页展示页
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=getAllActivityList
  getAllActivityList: '/activity.do?method=getAllActivityList',
  // 根据活动id查询活动详情
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=getActivityDetail&entry=1
  getActivityDetail: '/activity.do?method=getActivityDetail',
  // 注册
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doRegist&entry=1
  doRegist: '/activity.do?method=doRegist',
  // 完善资料
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doProfile
  doProfile: '/activity.do?method=doProfile',
  // 每日签到
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doCheckIn
  doCheckIn: '/activity.do?method=doCheckIn',
  // 连续签到奖励
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=getCheckInReward
  getCheckInReward: '/activity.do?method=getCheckInReward',
  // 首充
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doFirstSave
  doFirstSave: '/activity.do?method=doFirstSave',
  // 首提
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doFirstWithdraw
  doFirstWithdraw: '/activity.do?method=doFirstWithdraw',
  // 充值活动
  // http://192.168.169.44:9901/cagamesclient/activity.do?method=doSave
  doSave: '/activity.do?method=doSave',
  // 礼品中心
  getAllEnablePrize: '/activity.do?method=getAllEnablePrize',
  // http://192.168.169.161:8080/cagamesclient/activity.do?method=getAllEnablePrize
  // 已领取的礼品
  myGetPrize: '/activity.do?method=myGetPrize',
  // http://192.168.169.161:8080/cagamesclient/activity.do?method=myGetPrize
  // 今日签到
  // http://192.168.169.161:8080/cagamesclient/activity.do?method=getCheckToday
  getCheckToday: '/activity.do?method=getCheckToday'
}

let API = Object.assign(Login, Game, Me, Group, Form, Help, Activity)
Object.keys(API).forEach((key) => {
  // if (key.startsWith('http')) return
  const value = API[key]
  Object.defineProperty(API, key, {
    get: function () {
      return this.api + this['_' + key]
      // (this._api || '') + this['_' + key]
    },
    set: function (v) {
      this['_' + key] = v
    }
  })
  API[key] = value
})
API.api = api
module.exports = API
