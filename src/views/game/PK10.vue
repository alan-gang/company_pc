<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      gameType: 'PK10',
      menus: [
        {
          title: 'PK10',
          groups: [
            {
              // title: '北京PK10',
              items: [
                {id: '-1-1-1-PK10', title: '猜冠军', description: '从01-10中共10个号码中选择1个号码，每注由1个号码组成，只要当期冠军号码为所选号码，即为中奖。', example: ''},
                {id: '-1-1-2-PK10', title: '猜冠亚军', description: ' 从01-10共10个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的10个号码中的前2个号码相同，且顺序一致，即为中奖。', example: ''},
                {id: '-1-1-3-PK10', title: '猜前三名', description: ' "从01-10共10个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的10个号码中的前3个号码相同，且顺序一致，即为中奖。', example: ''},
                {id: '-1-1-4-PK10', title: '猜前四名', description: ' "从01-10共10个号码中选择4个不重复的号码组成一注，所选号码与当期顺序摇出的10个号码中的前4个号码相同，且顺序一致，即为中奖。', example: ''},
                // {id: '-1-1-5-PK10', title: '猜前五名', description: ' 从01-10共10个号码中选择5个不重复的号码组成一注，所选号码与当期顺序摇出的10个号码中的前5个号码相同，且顺序一致，即为中奖。', example: ''},
                {id: '-1-1-6-PK10', title: '龙虎', description: '第一名和最后一名比较，第一名大是龙，最后一名大是虎', example: ''}
              ]
            }
          ]
        }
      ],
      // 玩法信息
      type: {
        id: '-1-1-1-PK10',
        // 玩法名
        title: '',
        // 玩法描述
        description: ''
      },
      getTitle () {
        switch (this.type.id.slice(0, 2)) {
          case '-1':
            return 'PK10'
        }
      }
    }
  }
}
</script>
