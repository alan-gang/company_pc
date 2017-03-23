const BANKS = [
  {apiName: 'ciz', class: 'alipay', text: '支付宝'},
  {apiName: 'ciz', class: 'wepay', text: '微信'},
  {apiName: -1, class: 'bjyh', text: '北京银行'},
  {apiName: -1, class: 'gfyh', text: '广发银行'},
  {apiName: -1, class: 'hxyh', text: '华夏银行'},
  {apiName: 'ioc', class: 'jtyh', text: '交通银行'},
  {apiName: -1, class: 'payh', text: '平安银行'},
  {apiName: -1, class: 'pfyh', text: '浦发银行'},
  {apiName: -1, class: 'shhyh', text: '上海银行'},
  {apiName: -1, class: 'shzhfzhyh', text: '深圳发展银行'},
  {apiName: -1, class: 'xyyh', text: '兴业银行'},
  {apiName: -1, class: 'zggdyh', text: '中国光大银行'},
  {apiName: -1, class: 'zggsh', text: '中国工商银行'},
  {apiName: 'cmbc', class: 'zgjshyh', text: '中国建设银行'},
  {apiName: 'smyh', class: 'zgmshyh', text: '中国民生银行'},
  {apiName: 'abc', class: 'zgnyyh', text: '中国农业银行'},
  {apiName: 'icbc', class: 'zgyh', text: '中国银行'},
  {apiName: -1, class: 'zgyzhchxyh', text: '中国邮政储蓄银行'},
  {apiName: 'cmb', class: 'zhshyh', text: '招商银行'},
  {apiName: 'ciz', class: 'zhxyh', text: '中信银行'}
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
