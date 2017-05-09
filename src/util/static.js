const BANKS = [
  {apiName: 'zfb', class: 'alipay', text: '支付宝'},
  {apiName: 'weixin', class: 'wepay', text: '微信'},
  {apiName: 'bob', class: 'bjyh', text: '北京银行'},
  {apiName: 'gdb', class: 'gfyh', text: '广发银行'},
  // {apiName: -1, class: 'hxyh', text: '华夏银行'},
  {apiName: 'bcm', class: 'jtyh', text: '交通银行'},
  // {apiName: -1, class: 'payh', text: '平安银行'},
  {apiName: 'spdb', class: 'pfyh', text: '浦发银行'},
  {apiName: 'bos', class: 'shhyh', text: '上海银行'},
  {apiName: 'sdb', class: 'shzhfzhyh', text: '深圳发展银行'},
  {apiName: 'cib', class: 'xyyh', text: '兴业银行'},
  // {apiName: -1, class: 'zggdyh', text: '中国光大银行'},
  {apiName: 'icbc', class: 'zggsh', text: '中国工商银行'},
  {apiName: 'ccb', class: 'zgjshyh', text: '中国建设银行'},
  {apiName: 'smyh', class: 'zgmshyh', text: '中国民生银行'},
  {apiName: 'abc', class: 'zgnyyh', text: '中国农业银行'},
  {apiName: 'boc', class: 'zgyh', text: '中国银行'},
  {apiName: 'psbc', class: 'zgyzhchxyh', text: '中国邮政储蓄银行'},
  {apiName: 'cmb', class: 'zhshyh', text: '招商银行'},
  {apiName: 'beascnsh', class: 'dy', text: '东亚银行'},
  {apiName: 'brcb', class: 'bjnshyh', text: '北京农商银行'},
  {apiName: 'srcb', class: 'shhnshyh', text: '上海农商银行'},
  {apiName: 'ecitic', class: 'zhxyh', text: '中信银行'}
]

const PROVINCES = [
  {
    id: 1,
    text: '江西省',
    citys: [
      {id: '1-1', text: '南昌'}
    ]
  }
]
module.exports = {
  BANKS,
  PROVINCES
}