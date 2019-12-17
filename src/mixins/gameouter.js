// 三方游戏
import api from '../http/api'
export default {
  data() {
    return {
      navIndex: 0,
      pageSize: 10
    }
  },
  computed: {
    activeNav() {
      return this.navList[this.navIndex]
    }
  },
  watch: {
    navIndex: {
      handler(val) {
        this.getThirdGames()
      },
      immediate: true
    }
  },
  methods: {
    getThirdGames() {
      if (!this.activeNav.children) {
        let idx = this.navIndex
        this.$http.get(api.getThirdGames, {platId: this.activeNav.platId, gameGroupId: this.gameGroupId, pageSize: this.pageSize})
        .then(({data}) => {
          if (data.success === 1) {
            this.navList[idx].children = data.list
          }
        })
      }
    },
    goGame(game) {
      this.$http.get(api.gameUrl, {platid: game.platId, gameid: game.gameId})
      .then(({data}) => {
        if (data.success === 1) {
          let gameUrl = window.location.origin + '/static/sanfang/index.html?platId=' + game.platId + '&gameUrl='
          gameUrl += encodeURIComponent(data.url)
          window.open(gameUrl)
        }
      })
    }
  }
}
