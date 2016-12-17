let api = 'http://app.game.com:8080/cagamesclient/'
export default {
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
  checkUserName: api + 'login/forgetPwd.do?method=checkUserName&userName=1&verifyCode=xxx',

  // 13、修改密码页面，获取手机号码  ALL
  getMobile: api + 'login/forgetPwd.do?method=getMobile&userId=1  ',
  // {"mobile":""}

  // 14、修改密码页面，获取邮箱地址  ALL
  getEmail: api + 'login/forgetPwd.do?method=getEmail&userId=1',
  // {"email":""}

  // 15、修改密码页面，获取安全问答  ALL
  safeQuestion: api + 'login/forgetPwd.do?method=safeQuestion&userId=1',
  // {"question1":"","question2":""}

  // 16、修改密码页面，发送手机短信  ALL
  sendSms: api + 'login/forgetPwd.do?method=sendSms&userId=1&mobile=18952000',

  // 17、修改密码页面，发送邮件  ALL
  sendMail: api + 'login/forgetPwd.do?method=sendMail&userId=1&email=cc@gmail.com',

  // 18、校验短信验证码
  checkSmsVerifyCode: api + 'login/forgetPwd.do?method=checkSmsVerifyCode&userId=1&verifyCode=7994',

  // 19、邮件验证码
  checkMailVerifyCode: api + 'login/forgetPwd.do?method=checkMailVerifyCode&userId=1&verifyCode=5543',

  // 19、修改密码页面，校验安全问答  ALL
  safeAnswer: api + 'login/forgetPwd.do?method=safeAnswer&userId=1&answer1=xxxx&answer2=xxxx',

  // 20、修改密码页面，充值密码    ALL
  resetPwd: api + 'login/forgetPwd.do?method=resetPwd&userId=1&newPwd=1111&reNewPwd=1111'
}
