// 三方游戏
import api from '../http/api'
import store from '../store'

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
        this.getThirdGames(val)
      },
      immediate: true
    }
  },
  methods: {
    getThirdGames(index) {
      let activeNav = this.navList[index]
      if (!activeNav.children) {
        this.$http.myget(api.getThirdGames, {platId: activeNav.platId, gameGroupId: this.gameGroupId, pageSize: this.pageSize})
        .then(({data}) => {
          if (data.success === 1) {
            this.navList[index].children = data.list
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
    },
    getBalanceById (platId, name) {
      this.$http.get(api.getBalanceByPID, {platId}).then(({data: {bal, success}}) => {
        if (success) {
          let b = {}
          b[name] = Number(bal)
          store.actions.setUser(b)
        }
      })
    }
  }
}
