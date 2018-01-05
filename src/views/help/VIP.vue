<template lang="jade">
  .help-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")

    .scroll-content.vip-introduction
      pre
        p.text-bold.text-black.text-center 畅博娱乐VIP制度
        br

        | 高额存提通道√      专属VIP客服√      稳定游戏专线√      专属定制活动√      问题优先处理√  

        br
        br
        br
        p.text-bold.text-black 畅博VIP至尊特权
        br
        | 特权待遇  VIP1          VIP2           VIP3           VIP4         VIP5
        | 专属客服   √            √             √             √           √
        | 游戏专线   √            √             √             √           √
        | 优先特权   √            √             √             √           √
        br
        br
        br
        p.text-bold.text-black 充提特权（优先处理，充值次数不限，提款次数最多5次）
        br 
        p VIP1      充值单笔最低
            span.text-bold 100元
            |,单笔最高
            span.text-bold 10万元
            |; 提款单笔最低
            span.text-bold 100元
            |, 单笔最高
            span.text-bold 8万元
        p VIP2      充值单笔最低
            span.text-bold 100元
            |,单笔最高
            span.text-bold 20万元
            |; 提款单笔最低
            span.text-bold 100元
            |, 单笔最高
            span.text-bold 15万元
        p VIP3      充值单笔最低
            span.text-bold 100元
            |,单笔最高
            span.text-bold 30万元
            |; 提款单笔最低
            span.text-bold 100元
            |, 单笔最高
            span.text-bold 15万元
        p VIP4      充值单笔最低
            span.text-bold 100元
            |,单笔最高
            span.text-bold 40万元
            |; 提款单笔最低
            span.text-bold 100元
            |, 单笔最高
            span.text-bold 15万元
        p VIP5      充值单笔最低
            span.text-bold 100元
            |,单笔最高
            span.text-bold 40万元
            |; 提款单笔最低
            span.text-bold 100元
            |, 单笔最高
            span.text-bold 15万元    

        // p VIP1      充值单笔最低100元,单笔最高20万元; 提款单笔最低100元, 单笔最高10万元
        // p VIP1      充值单笔最低100元,单笔最高30万元; 提款单笔最低100元, 单笔最高15万元
        // p VIP1      充值单笔最低100元,单笔最高40万元; 提款单笔最低100元, 单笔最高15万元
        // p VIP1      充值单笔最低100元,单笔最高50万元; 提款单笔最低100元, 单笔最高15万元
        br
        br        
  
   

      
        p.text-bold.text-black 畅博VIP晋升途径一
        br
        | VIP等级     提出VIP申请前7日内             提出VIP申请前15日内            提出VIP申请前30日内 
        p VIP1      完成
            span.text-bold 10万
            | 存款及
            span.text-bold 20万
            | 投注额      完成
            span.text-bold 15万
            | 存款及
            span.text-bold 30万
            |投注额       完成
            span.text-bold 20万
            | 存款及
            span.text-bold 50万
            | 投注额
        p VIP2      完成
            span.text-bold 15万
            | 存款及
            span.text-bold 30万
            | 投注额      完成
            span.text-bold 25万
            | 存款及
            span.text-bold 50万
            |投注额       完成
            span.text-bold 30万
            | 存款及
            span.text-bold 75万
            | 投注额
        p VIP3      完成
            span.text-bold 20万
            | 存款及
            span.text-bold 40万
            | 投注额      完成
            span.text-bold 35万
            | 存款及
            span.text-bold 70万
            |投注额       完成
            span.text-bold 40万
            | 存款及
            span.text-bold 100万
            | 投注额
        p VIP4      完成
            span.text-bold 25万
            | 存款及
            span.text-bold 50万
            | 投注额      完成
            span.text-bold 45万
            | 存款及
            span.text-bold 90万
            |投注额       完成
            span.text-bold 50万
            | 存款及
            span.text-bold 125万
            | 投注额
        p VIP5      完成
            span.text-bold 30万
            | 存款及
            span.text-bold 60万
            | 投注额      完成
            span.text-bold 55万
            | 存款及
            span.text-bold 110万
            |投注额      完成
            span.text-bold 60万
            | 存款及
            span.text-bold 150万
            | 投注额
        br
        br

        p.text-bold.text-black 畅博VIP晋升途径二
        br
        | 由VIP会员或直属及以上直接推荐，推荐人与被推荐人不能共用同一账户、同一IP以及同一姓名银行卡信息。
        br
        br
        br

        p.text-bold.text-black 保级条件
        br 
        p VIP1      一个月内完成
            span.text-bold 40
            | 万投注额
        p VIP2      一个月内完成
            span.text-bold 60
            | 万投注额
        p VIP3      一个月内完成
            span.text-bold 80
            | 万投注额
        p VIP4      一个月内完成
            span.text-bold 100
            | 万投注额
        p VIP5      一个月内完成
            span.text-bold 120
            | 万投注额
        br
        br
        p.text-grey
          | 注：所有VIP会员的保级考核从成为VIP所在月份的下一个月开始进行统计；每个月前两个工作日内完成VIP资格更新。
          | 例：玩家在11月10日申请VIP并成功晋升，则11月10日 至 11月31日期间均可享受VIP特权；12月1日至12月31日开始针对该会员进行VIP保级考核；1月1日至1月2日完成所有VIP资格更新。
        br
        br
        p.text-bold 常见问题：
        br
        | (1. 是否存在“直属及以上级别推荐”？
        br
        | 答： 是的，直属及以上推荐的名单可直接为VIP1。 
        br
        br
        | (2. 通过推荐方式晋级的账户是可否越级成为高等级VIP？比如 直属及以上或平台VIP推荐的账户直接晋级成为VIP5?
        | 答：通过“推荐方式”成为VIP的账户，首次晋级仅可成为VIP1。（但VIP1首次通过考核且达到VIP5标准，可申请越级，即VIP1可升级成为VIP5）
        br
        br
        | (3. 如达到晋级标准，平台是否会直接升级该账户？
        | 答： 对达到晋级标准的VIP账户，平台会以系统消息的形式通知至各位，玩家如有意愿进行升级可联系平台客服进行申请，方后平台将会予以升级。
        br
        br
        | (4. 怎样的情况下，会予以降级或者取消VIP资格？
        | 答：连续3个月未达到对应保级标准的VIP账户，平台将对应进行降级或取消VIP资格。
        br
        br 
        | (5. 每月审核，是以个人充值量和投注量为标准，还是以团队充值量和投注量为审核标准?
        | 答：对于VIP账户，平台统一以个人的充值量和投注量为标准进行相关审核。




    
</template>


<style lang="stylus" scoped>
  @import '../../var.stylus'
  .help-page
      min-width 8rem
  .vip-introduction
    top TH
    padding PWX
    font-size .16rem
  
</style>
