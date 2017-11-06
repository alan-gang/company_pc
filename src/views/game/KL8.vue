<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      gameType: 'KL8',
      menus: [
        // {id: '-1-1-1-KL8', title: '任选一', description: '从01-80中任选1个以上号码。', example: ''},
        // {id: '-1-1-2-KL8', title: '任选二', description: '从01-80中任选2至8个号码。', example: ''},
        // {id: '-1-1-3-KL8', title: '任选三', description: '从01-80中任选3至8个号码。', example: ''},
        // {id: '-1-1-4-KL8', title: '任选四', description: '从01-80中任选4至8个号码。', example: ''},
        // {id: '-1-1-5-KL8', title: '任选五', description: '从01-80中任选5至8个号码。', example: ''},
        // {id: '-1-1-6-KL8', title: '任选六', description: '从01-80中任选6至8个号码。', example: ''},
        // {id: '-1-1-7-KL8', title: '任选七', description: '从01-80中任选7或8个号码。', example: ''}
        {
          title: '任选',
          groups: [
            {
              // title: ''
              items: [
                {id: '-1-1-1-KL8', title: '任选一', description: '从01-80中任选1个以上号码。', example: ''},
                {id: '-1-1-2-KL8', title: '任选二', description: '从01-80中任选2至8个号码。', example: ''},
                {id: '-1-1-3-KL8', title: '任选三', description: '从01-80中任选3至8个号码。', example: ''},
                {id: '-1-1-4-KL8', title: '任选四', description: '从01-80中任选4至8个号码。', example: ''},
                {id: '-1-1-5-KL8', title: '任选五', description: '从01-80中任选5至8个号码。', example: ''}
                // {id: '-1-1-6-KL8', title: '任选六', description: '从01-80中任选6至8个号码。', example: ''},
                // {id: '-1-1-7-KL8', title: '任选七', description: '从01-80中任选7或8个号码。', example: ''}
              ]
            }
          ]
        },
        {
          title: '趣味',
          groups: [
            {
              // title: ''
              items: [
                {id: '0-1-1-KL8', title: '上下盘', description: '选择20个开奖号码中包含“上盘(01-40)”与“下盘(41-80)”号码个数多少关系。', example: ''},
                {id: '0-1-2-KL8', title: '奇偶盘', description: '选择20个开奖号码中包含“奇·偶”号码个数多少关系。', example: ''},
                {id: '0-1-3-KL8', title: '和值大小单双', description: '选择20个开奖号码总和值的“大小单双”属性组合。', example: ''},
                {id: '0-1-4-KL8', title: '五行', description: '', example: ''}
              ]
            }
          ]
        }
      ],
      // 玩法信息
      type: {
        id: '-1-1-1-KL8',
        // 玩法名
        title: '',
        // 玩法描述
        description: ''
      },
      lucknumbers: [[50, 50, 50, 50, 50], [50, 50, 50, 50, 50], [50, 50, 50, 50, 50], [50, 50, 50, 50, 50]],
      getTitle () {
        switch (this.type.id.slice(0, 2)) {
          case '-1':
            return '任选'
          case '0-':
            return '趣味'
        }
      }
    }
  }
}
</script>
