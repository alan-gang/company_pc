<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      gameType: 'HC6',
      menus: [
        {
          title: '买码',
          groups: [
            {
              items: [
                {id: '1-1-1-HC6', title: '特码', description: '香港六合彩公司当期开出的最后一码为特别号或特码', example: '投注方案：08； 开奖号码最后一位为08，即中特码。'},
                {id: '1-1-2-HC6', title: '正码', description: '香港六合彩公司当期开出之前6个号码叫正码。每一个号码为一投注组合，假如投注号码为开奖号码之 正码，视为中奖，其馀情形视为不中奖。', example: ''},
                {id: '1-1-3-HC6', title: '正码特', description: '正码特是指 正1特、正2特、正3特、正4特、正5特、正6特：其下注的正码特号与现场摇珠开出之正码其开奖顺序及开奖号码相同，视为中奖，如现场摇珠第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。。', example: ''}
              ]
            }
          ]
        },
        {
          title: '连肖',
          groups: [
            {
              items: [
                {id: '2-1-1-HC6', title: '2连肖', description: '香港六合彩公司当期开出的最后一码为特别号或特码', example: '投注方案：08； 开奖号码最后一位为08，即中特码。'},
                {id: '2-1-2-HC6', title: '3连肖', description: '香港六合彩公司当期开出之前6个号码叫正码。每一个号码为一投注组合，假如投注号码为开奖号码之 正码，视为中奖，其馀情形视为不中奖。', example: ''},
                {id: '2-1-3-HC6', title: '4连肖', description: '正码特是指 正1特、正2特、正3特、正4特、正5特、正6特：其下注的正码特号与现场摇珠开出之正码其开奖顺序及开奖号码相同，视为中奖，如现场摇珠第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。。', example: ''}
              ]
            }
          ]
        },
        {
          title: '波色',
          groups: [
            {
              items: [
                {id: '3-1-1-HC6', title: '波色', description: '香港六合彩公司当期开出的最后一码为特别号或特码', example: '投注方案：08； 开奖号码最后一位为08，即中特码。'}
              ]
            }
          ]
        }
      ],
      // 玩法信息
      type: {
        id: '1-1-1-HC6',
        // 玩法名
        title: '',
        // 玩法描述
        description: ''
      },
      getTitle () {
        switch (this.type.id.slice(0, 2)) {
          case '1-':
            return '买码'
        }
      }
    }
  }
}
</script>
