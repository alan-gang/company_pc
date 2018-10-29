let SSC = {
  '9-1-1': '1:1',
  /*
    直选复式
  */
  '5-1-1': '377:1',
  /*
    直选单式
  */
  '5-1-2': '377:0',
  /*
    直选组合
  */
  '5-1-3': '380:1',
  /*
    组选120 WXZUS  12 14
  */
  '5-2-1': '543:1',
  /*
    组选60
  */
  '5-2-2': '544:1',
  /*
    组选30
  */
  '5-2-3': '1110:1',
  /*
    组选20
  */
  '5-2-4': '546:1',
  /*
    组选10
  */
  '5-2-5': '547:1',
  /*
    组选5
  */
  '5-2-6': '548:1',
  /*
    五星特殊  一帆风顺  C(n,1)  n选择的号码个数 n>=1
  */
  '5-3-1': '550:1',
  /*
    好事成双  C(n,1)  n选择的号码个数n>=1
  */
  '5-3-2': '551:1',
  /*
    三星报喜  C(n,1)  n选择的号码个数n>=1
  */
  '5-3-3': '552:1',
  /*
    四季发财  C(n,1)  n选择的号码个数n>=1
  */
  '5-3-4': '553:1',
  /*
    直选复式
  */
  '4-1-1': '1121:1',
  /*
    直选单式
  */
  '4-1-2': '1121:0',
  /*
    直选组合
  */
  '4-1-3': '1122:1',
  /*
    组选24
  */
  '4-2-1': '1123:1',
  /*
    组选12
  */
  '4-2-2': '1124:1',
  /*
    组选6
  */
  '4-2-3': '1125:1',
  /*
    组选4
  */
  '4-2-4': '1126:1',
  /*
    直选复式
  */
  '4-3-1': '382:1',
  /*
    直选单式
  */
  '4-3-2': '382:0',
  /*
    直选组合
  */
  '4-3-3': '384:1',
  /*
    组选24
  */
  '4-4-1': '555:1',
  /*
    组选12
  */
  '4-4-2': '556:1',
  /*
    组选6
  */
  '4-4-3': '557:1',
  /*
    组选4
  */
  '4-4-4': '558:1',
  /*
    直选复式
  */
  '+3-1-1': '14:1',
  /*
    直选单式
  */
  '+3-1-2': '14:0',
  /*
    直选和值
  */
  '+3-1-3': '15:1',
  /*
    直选跨度
  */
  '+3-1-4': '578:1',
  /*
    组三复式
  */
  '+3-2-1': '18:1',
  /*
    组三单式
  */
  '+3-2-2': '18:0',
  /*
    组六复式
  */
  '+3-2-3': '19:1',
  /*
    组六单式
  */
  '+3-2-4': '19:0',
  /*
    混合组选
  */
  '+3-2-5': '20:0',
  /*
    组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '+3-3-1': '21:1',
  /*
    组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '+3-3-2': '581:1',
  /*
    和值尾数
  */
  '+3-3-3': '576:1',
  /*
    特殊号
  */
  '+3-3-4': '577:1',
  /*
    直选复式
  */
  '3-1-1': '528:1',
  /*
    直选单式
  */
  '3-1-2': '528:0',
  /*
    直选和值
  */
  '3-1-3': '529:1',
  /*
    直选跨度
  */
  '3-1-4': '579:1',
  /*
    组三复式
  */
  '3-2-1': '530:1',
  /*
    组三单式
  */
  '3-2-2': '530:0',
  /*
    组六复式
  */
  '3-2-3': '531:1',
  /*
    组六单式
  */
  '3-2-4': '531:0',
  /*
    混合组选
  */
  '3-2-5': '532:0',
  /*
    组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '3-3-1': '533:1',
  /*
    组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '3-3-2': '582:1',
  /*
    和值尾数
  */
  '3-3-3': '573:1',
  /*
    特殊号
  */
  '3-3-4': '574:1',
  /*
    直选复式
  */
  '-3-1-1': '16:1',
  /*
    直选单式
  */
  '-3-1-2': '16:0',
  /*
    直选和值
  */
  '-3-1-3': '17:1',
  /*
    直选跨度
  */
  '-3-1-4': '565:1',
  /*
    组三复式
  */
  '-3-2-1': '22:1',
  /*
    组三单式
  */
  '-3-2-2': '22:0',
  /*
    组六复式
  */
  '-3-2-3': '23:1',
  /*
    组六单式
  */
  '-3-2-4': '23:0',
  /*
    混合组选
  */
  '-3-2-5': '24:0',
  /*
    组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '-3-3-1': '25:1',
  /*
    组选包胆(不含豹子号) 只能选择一个号码，每个号码都一样对应54注 54
  */
  '-3-3-2': '580:1',
  /*
    和值尾数
  */
  '-3-3-3': '562:1',
  /*
    特殊号
  */
  '-3-3-4': '564:1',
  /*
    直选复式
  */
  '2-1-1': '28:1',
  /*
    直选单式
  */
  '2-1-2': '28:0',
  /*
    直选跨度
  */
  '2-1-3': '900:1',
  /*
    组选复式
  */
  '2-2-1': '30:1',
  /*
    组选单式
  */
  '2-2-2': '30:0',
  /*
    组选包胆
  */
  '2-2-3': '901:1',
  /*
    直选复式
  */
  '2-3-1': '29:1',
  /*
    直选单式
  */
  '2-3-2': '29:0',
  /*
    直选跨度
  */
  '2-3-3': '895:1',
  /*
    组选复式
  */
  '2-4-1': '31:1',
  /*
    组选单式
  */
  '2-4-2': '31:0',
  /*
    组选包胆
  */
  '2-4-3': '897:1',
  /*
    定位胆
  */
  '1-1-1': '1199:1',
  /*
    前三一码
  */
  '0-1-1': '540:1',
  /*
    前三二码
  */
  '0-1-2': '541:1',
  /*
    中三一码
  */
  '0-1-3': '538:1',
  /*
    中三二码
  */
  '0-1-4': '539:1',
  /*
    后三一码
  */
  '0-1-5': '26:1',
  /*
    后三二码
  */
  '0-1-6': '27:1',
  /*
    前四一码
  */
  '0-2-1': '1127:1',
  /*
    前四二码
  */
  '0-2-2': '1128:1',
  /*
    后四一码
  */
  '0-2-3': '584:1',
  /*
    后四二码
  */
  '0-2-4': '586:1',
  /*
    五星二码
  */
  '0-3-1': '588:1',
  /*
    五星三码
  */
  '0-3-2': '590:1',
  /*
    直选复式
  */
  '-1-1-1': '410:1',
  /*
    直选单式
  */
  '-1-1-2': '410:0',
  /*
    组选复式
  */
  '-1-1-3': '412:1',
  /*
    组选单式
  */
  '-1-1-4': '412:0',
  /*
    直选复式
  */
  '-1-2-1': '417:1',
  /*
    直选单式
  */
  '-1-2-2': '417:0',
  /*
    组三复式
  */
  '-1-2-3': '418:1',
  /*
    组三单式
  */
  '-1-2-4': '418:0',
  /*
    组六复式
  */
  '-1-2-5': '421:1',
  /*
    组六单式
  */
  '-1-2-6': '421:0',
  /*
    混合组选
  */
  '-1-2-7': '907:0',
  /*
    直选复式
  */
  '-1-3-1': '419:1',
  /*
    直选单式
  */
  '-1-3-2': '419:0',
  /*
    组选24
  */
  '-1-3-3': '909:1',
  /*
    组选12
  */
  '-1-3-4': '910:1',
  /*
    组选6 p位置选择的个数，n选择的号码个数 C(psl, 4) * C(nsl[0], 2)
  */
  '-1-3-5': '911:1',
  /*
    组选4 p位置选择的个数，n选择的号码个数，h重复的号码个数
  */
  '-1-3-6': '912:1',
  /*
    前二大小单双
  */
  '-2-1-1': '37:1',
  /*
    后二大小单双
  */
  '-2-1-2': '38:1',
  /*
    猜一
  */
  '-2-2-1': '1129:1',
  /*
    猜二
  */
  '-2-2-2': '1130:1',
  /*
    猜三
  */
  '-2-2-3': '1131:1',
  /*
    猜四
  */
  '-2-2-4': '1132:1',
  /*
    猜五
  */
  '-2-2-5': '1133:1',
  /*
    龙虎
  */
  '-4-1-1': '1200:1',
  /*
    龙虎
  */
  '-5-1-1': '1201:1'
}
// SSL, SSL3D
// 例如：前三SSL +3开头， 后三SSL3D -3开头
let SSL = {
  /*
    直选复式
  */
  '-3-1-1-SSL': '1500:1',
  '+3-1-1-SSL': '1500:1',
  /*
    直选单式
  */
  '-3-1-2-SSL': '1500:0',
  '+3-1-2-SSL': '1500:0',
  /*
    直选和值
  */
  '-3-1-3-SSL': '1501:1',
  '+3-1-3-SSL': '1501:1',
  /*
    组三复式
  */
  '-3-2-1-SSL': '1502:1',
  '+3-2-1-SSL': '1502:1',
  /*
    组三单式
  */
  '-3-2-2-SSL': '1502:0',
  '+3-2-2-SSL': '1502:0',
  /*
    组六复式
  */
  '-3-2-3-SSL': '1503:1',
  '+3-2-3-SSL': '1503:1',
  /*
    组六单式
  */
  '-3-2-4-SSL': '1503:0',
  '+3-2-4-SSL': '1503:0',
  /*
    混合组选
  */
  '-3-2-5-SSL': '1504:0',
  '+3-2-5-SSL': '1504:0',
  /*
    组选和值(不含豹子号) 分别对应各个和值数字，0-26 1:1, 2:2, 3:2, 4:4, 5:5, 6:6, 7:8, 8:10, 9:11, 10:13, 11:14, 12:14, 13:15, 14:15, 15:14, 16:14, 17:13, 18:11, 19:10, 20:8, 21:6, 22:5, 23:4, 24:2, 25:2, 26:1
  */
  '-3-3-1-SSL': '1505:1',
  '+3-3-1-SSL': '1505:1',
  /*
    直选复式
  */
  '2-1-1-SSL-SSL': '1506:1',
  '2-1-1-SSL': '1506:1',
  /*
    直选单式
  */
  '2-1-2-SSL-SSL': '1506:0',
  '2-1-2-SSL': '1506:0',
  /*
    组选复式
  */
  '2-2-1-SSL-SSL': '1507:1',
  '2-2-1-SSL': '1507:1',
  /*
    组选单式
  */
  '2-2-2-SSL-SSL': '1507:0',
  '2-2-2-SSL': '1507:0',
  /*
    直选复式
  */
  '2-3-1-SSL': '1508:1',
  /*
    直选单式
  */
  '2-3-2-SSL': '1508:0',
  /*
    组选复式
  */
  '2-4-1-SSL': '1509:1',
  /*
    组选单式
  */
  '2-4-2-SSL': '1509:0',
  /*
    定位胆
  */
  '1-1-1-SSL-SSL': '1515:1',
  '1-1-1-SSL': '1510:1',
  /*
    前三一码
  */
  '0-1-1-SSL': '1511:1',
  /*
    前三二码
  */
  '0-1-2-SSL': '1512:1',
  /*
    前二大小单双
  */
  '-2-1-1-SSL-SSL': '1513:1',
  '-2-1-1-SSL': '1513:1',
  /*
    后二大小单双
  */
  '-2-1-2-SSL': '1514:1'
}
let G115 = {
   // title: '直选复式'
  '3-1-1-115': '2001:1',
   // title: '直选单式'
  '3-1-2-115': '2001:0',
   // title: '组选复式'
  '3-1-3-115': '2002:1',
   // title: '组选单式'
  '3-1-4-115': '2003:0',
   // title: '组选胆拖'
  '3-1-5-115': '2004:1',
   // title: '直选复式'
  '2-1-1-115': '2005:1',
   // title: '直选单式'
  '2-1-2-115': '2005:0',
   // title: '组选复式'
  '2-1-3-115': '2006:1',
   // title: '组选单式'
  '2-1-4-115': '2006:0',
   // title: '组选胆拖'
  '2-1-5-115': '2007:1',
   // title: '定位胆'
  '1-1-1-115': '2008:1',
   // title: '前三不定位'
  '0-1-1-115': '2009:1',
   // title: '一中一'
  '-1-1-1-115': '2010:1',
   // title: '二中二'
  '-1-1-2-115': '2011:1',
   // title: '三中三'
  '-1-1-3-115': '2012:1',
   // title: '四中四'
  '-1-1-4-115': '2013:1',
   // title: '五中五'
  '-1-1-5-115': '2014:1',
   // title: '六中五'
  '-1-1-6-115': '2015:1',
   // title: '七中五'
  '-1-1-7-115': '2016:1',
   // title: '八中五'
  '-1-1-8-115': '2017:1',
   // title: '一中一'
  '-1-2-1-115': '2018:0',
   // title: '二中二'
  '-1-2-2-115': '2019:0',
   // title: '三中三'
  '-1-2-3-115': '2020:0',
   // title: '四中四'
  '-1-2-4-115': '2021:0',
   // title: '五中五'
  '-1-2-5-115': '2022:0',
   // title: '六中五'
  '-1-2-6-115': '2023:0',
   // title: '七中五'
  '-1-2-7-115': '2024:0',
   // title: '八中五'
  '-1-2-8-115': '2025:0',
   // title: '二中二'
  '-1-3-1-115': '2026:1',
   // title: '三中三'
  '-1-3-2-115': '2027:1',
   // title: '四中四'
  '-1-3-3-115': '2028:1',
   // title: '五中五'
  '-1-3-4-115': '2029:1',
   // title: '六中五'
  '-1-3-5-115': '2030:1',
   // title: '七中五'
  '-1-3-6-115': '2031:1',
   // title: '八中五'
  '-1-3-7-115': '2032:1',
   // title: '定单双'
  '-2-1-1-115': '2033:1',
   // title: '猜中位'
  '-2-1-2-115': '2034:1',
   // title: '龙虎'
  '-3-1-3-115': '2035:1'
}
let KL8 = {
  // <!-- title: '任选一' -->
  '-1-1-1-KL8': '3001:1',
  // <!-- title: '任选二' -->
  '-1-1-2-KL8': '3002:1',
  // <!-- title: '任选三' -->
  '-1-1-3-KL8': '3003:1',
  // <!-- title: '任选四' -->
  '-1-1-4-KL8': '3004:1',
  // <!-- title: '任选五' -->
  '-1-1-5-KL8': '3005:1',
  // <!-- title: '任选六' -->
  '-1-1-6-KL8': '3006:1',
  // <!-- title: '任选七' -->
  '-1-1-7-KL8': '3007:1',
  // <!-- title: '上下盘' -->
  '0-1-1-KL8': '3008:1',
  // <!-- title: '奇偶盘' -->
  '0-1-2-KL8': '3009:1',
  // <!-- title: '和值大小单双' -->
  '0-1-3-KL8': '3010:1',
  // <!-- title: '五行' -->
  '0-1-4-KL8': '3011:1'
}
let PK10 = {
  // title: '猜冠军'
  '-1-1-1-PK10': '4001:1',
  // title: '猜冠亚军'
  '-1-1-2-PK10': '4002:1',
  // title: '猜冠亚军单式'
  '-1-1-8-PK10': '4013:0',
  // title: '猜前三名'
  '-1-1-3-PK10': '4003:1',
  // title: '猜前三名单式'
  '-1-2-2-PK10': '4016:0',
  // title: '猜前四名'
  '-1-1-4-PK10': '4004:1',
  // title: '猜前四名单式'
  '-1-2-3-PK10': '4017:0',
  // title: '猜前五名'
  '-1-1-5-PK10': '4005:1',
  // title: '猜前五名单式'
  '-1-2-4-PK10': '4005:0',
  // title: '龙虎'
  '-1-1-6-PK10': '4011:1',
  // title: '定位胆'
  '-1-1-7-PK10': '4012:1',
  // title: '猜三四名单式'
  '-1-1-9-PK10': '4014:0',
  // title: '猜三四名复式'
  '-1-2-1-PK10': '4015:1'
}
let K3 = {
  // title: '二同复选'
  '2-1-1-K3': '5009:1',
  // title: '二同单选'
  '2-1-2-K3': '5010:1',
  // title: '二不同标准'
  '-2-1-1-K3': '5012:1',
  // title: '二不同胆拖'
  '-2-1-2-K3': '5014:1',
  // title: '三同单选'
  '3-1-1-K3': '5003:1',
  // title: '三同通选'
  '3-1-2-K3': '5002:1',
  // title: '三不同标准'
  '-3-1-1-K3': '5004:1',
  // title: '三不同胆拖'
  '-3-1-2-K3': '5006:1',
  // title: '三连单选'
  '+3-1-1-K3': '5016:1',
  // title: '三连通选'
  '+3-1-2-K3': '5008:1',
  // title: '和值'
  '0-1-1-K3': '5001:1',
  // title: '猜1个号就中奖'
  '0-1-2-K3': '5015:1'

}
let HC6 = {
   // 特码
  '1-1-1-HC6': '7001:1',
  // 正码
  '1-1-2-HC6': '7006:1',
  // 特肖
  '1-1-3-HC6': '7007:1',
  // 2连肖
  '2-1-1-HC6': '7002:1',
  // 3连肖
  '2-1-2-HC6': '7003:1',
  // 4连肖
  '2-1-3-HC6': '7004:1',
  // 一肖
  '2-1-4-HC6': '7008:1',
  // 波色
  '3-1-1-HC6': '7005:1',
  // '正一码'
  '4-1-1-HC6': '7009:1',
  // '正二码'
  '4-1-2-HC6': '7010:1',
  // '正三码'
  '4-1-3-HC6': '7011:1',
  // '正四码'
  '4-1-4-HC6': '7012:1',
  // '正五码'
  '4-1-5-HC6': '7013:1',
  // '正六码'
  '4-1-6-HC6': '7014:1',
  // '特码'
  '4-1-7-HC6': '7015:1',
  // '正特和值'
  '4-1-8-HC6': '7016:1',
  // '尾数'
  '5-1-1-HC6': '7017:1'
}
module.exports = Object.assign(SSC, SSL, G115, KL8, PK10, K3, HC6)
