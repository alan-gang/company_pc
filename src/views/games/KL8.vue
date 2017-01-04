<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
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
                {id: '-1-1-5-KL8', title: '任选五', description: '从01-80中任选5至8个号码。', example: ''},
                {id: '-1-1-6-KL8', title: '任选六', description: '从01-80中任选6至8个号码。', example: ''},
                {id: '-1-1-7-KL8', title: '任选七', description: '从01-80中任选7或8个号码。', example: ''}
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
      lucknumbers: [[5, 8, 5, 6, 8], [5, 8, 5, 6, 8], [5, 8, 5, 6, 8], [5, 8, 5, 6, 8]],
      getTitle () {
        switch (this.type.id.slice(0, 2)) {
          case '-1':
            return '任选'
        }
      }
    }
  }
}
</script>
