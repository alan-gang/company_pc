<script>
import common from './common'
export default {
  mixins: [common],
  data () {
    return {
      id: 3,
      to: '/checkin',
      src: window.platform === 'ds' ? '/static/activity/nds/activity1.jpg' : '/static/activity/activity3.jpg',
      bg: '#34648c',
      myClass: 'content-shadow'
    }
  }
}
</script>
