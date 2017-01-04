let api = 'http://192.168.169.44:9901/cagamesclient/'
// steven
// let api = 'http://192.168.169.119:8080/cagamesclient/'
let Login = {
  // 约定
  // 成功默认返回：{"success":true}
  // 失败默认返回：{"success":false}
  // 每个请求都会包含以上结构体。

  // 1、ios注册session  IOS
  // iosRegist: api + 'login/login.do?method=iosRegist',

  // 2、获取验证码 返回base64数据  ALL
  getVerifyImage: api + 'login/login.do?method=getVerifyImage',
  // getCode: api + 'sys/permission.do?method=tokenRegist',

  // 3、问候语
  getGreetingMsg: api + 'login/login.do?method=getGreetingMsg',
  // {"greetingMsg":"xxxx"}

  // 4、用户登录
  validate: api + 'login/login.do?method=validate',
  // {"username":"xxx","userid":"xxxx"}

  // 5、查询菜单、桌面、收藏夹 PC接口
  getUserPrefence: api + 'home/userMenus.do?method=getUserPrefence',
  // {"menuList":"[]","deskList":"[]","favoriteList":"[]"}

  // 6、用户资金信息  ALL
  getUserFund: api + 'home/userInfo.do?method=getUserFund',
  // {"userId":"","channelBalance":"","availableBalance":"","holdBalance":"","freeAvaiable":"","freeBalance":"","freeHold":"","rewardPoint":"","isLocked":""}

  // 7、获取用户菜单 ios和andriod
  getUserMenus: api + 'home/userMenus.do?method=getUserMenus&userId=1',
  // {"menuList":"[]"}

  // 8、添加桌面或收藏夹  PC
  addPrefence: api + 'home/userMenus.do?method=addPrefence&menuId=1&userId=1&isDesk=1&sort=1',

  // 9、删除桌面或收藏夹   PC
  delPrefence: api + 'home/userMenus.do?method=delPrefence&userId=1&menuId=1&isDesk=0',

  // 10、中奖公告   ALL
  rewardNotices: api + 'home/notices.do?method=rewardNotices',
  // {"rewardNotices":"[]"}

  // 11、系统公告   ALL
  sysNotices: api + 'home/notices.do?method=sysNotices ',
  // {"sysNotices":"[]"}

  // 12、校验验证码   ALL
  checkVerifyCode: api + 'login/login.do?method=checkVerifyCode',

  // 12、修改密码页面，校验用户名   ALL
  checkUserName: api + 'login/forgetPwd.do?method=checkUserName',

  // 13、修改密码页面，获取手机号码  ALL
  getMobile: api + 'login/forgetPwd.do?method=getMobile',
  // {"mobile":""}

  // 14、修改密码页面，获取邮箱地址  ALL
  getEmail: api + 'login/forgetPwd.do?method=getEmail',
  // {"email":""}

  // 15、修改密码页面，获取安全问答  ALL
  safeQuestion: api + 'login/forgetPwd.do?method=safeQuestion',
  // {"question1":"","question2":""}

  // 16、修改密码页面，发送手机短信  ALL
  sendSms: api + 'login/forgetPwd.do?method=sendSms',

  // 17、修改密码页面，发送邮件  ALL
  sendMail: api + 'login/forgetPwd.do?method=sendMail',

  // 18、校验短信验证码
  checkSmsVerifyCode: api + 'login/forgetPwd.do?method=checkSmsVerifyCode&userId=1&verifyCode=7994',

  // 19、邮件验证码
  checkMailVerifyCode: api + 'login/forgetPwd.do?method=checkMailVerifyCode&userId=1&verifyCode=5543',

  // 19、修改密码页面，校验安全问答  ALL
  safeAnswer: api + 'login/forgetPwd.do?method=safeAnswer&userId=1&answer1=xxxx&answer2=xxxx',

  // 20、修改密码页面，充值密码    ALL
  resetPwd: api + 'login/forgetPwd.do?method=resetPwd&userId=1&newPwd=1111&reNewPwd=1111'
}

let Game = {
  // 获得奖期的开奖时间
  getTraceIssueList: api + 'issue.do?method=traceIssueList',
  // 3.当前奖期信息
  getIssue: api + 'issue.do?method=current',
  // http://192.168.169.44:9901/cagamesclient/issue.do?method=current&gameid=1

  // 4.返点信息
  getUserpoint: api + 'userpoint.do?method=myPoint',
  // http://192.168.169.44:9901/cagamesclient/userpoint.do?method=myPoint&gameid=1

  // 5.投注接口
  booking: api + 'booking.do?method=add',
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
  //                      codes:""1,2,3|1,2,5"", //投注内容,不同位的用竖线“|”连接，相同位选多个号码用“,”连接.
  //                     count:1 ,//注数
  //                     times:1 ,//倍数
  //                       money:200.000,//金额
  //                      mode:""1"",//1-元，2-角，3-分，4-厘
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
  getOrderList: api + 'project.do?method=list',
  // 2.  最近追号记录
  getFollowList: api + 'task.do?method=list'
}
module.exports = Object.assign(Login, Game)
