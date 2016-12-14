let prevIndex = 0
let store = {
  state: {
    hasHeader: false,
    hasFooter: false,
    user: {
      login: false,
      name: '游客'
    },
    pages: []
  },
  actions: {
    /*
    *toggle header footer
     */
    setHeader (hasHeader) {
      hasHeader !== undefined && (store.state.hasHeader = hasHeader)
    },
    setFooter (hasFooter) {
      hasFooter !== undefined && (store.state.hasFooter = hasFooter)
    },
    /*
     *for login
     */
    setUser ({login, name}) {
      login !== undefined && (store.state.user.login = login)
      name !== undefined && (store.state.user.name = name)
    },
    /*
     *for pages
     */
    updateAllPages ({active}) {
      store.state.pages.forEach(p => {
        if (p.opened === true && p.active === true) p.prev = ++prevIndex
        p.active = active
      })
    },
    updatePage (id, {opened, active, size, star, position}, page) {
      // console.log('updatePage:', id, 'opened:', opened, 'active:', active, 'size:', size, 'star:', star, 'position:', position)
      page = page || store.state.pages.filter(p => p.id === id)[0]
      if (page) {
        opened !== undefined && (page.opened = opened)
        active !== undefined && (page.active = active)
        star !== undefined && (page.star = star)
        size !== undefined && (page.size = size)
        position !== undefined && (page.position = position)
      }
      return page
    },
    setPages (pages) {
      store.state.pages = pages || store.state.pages
    }
    // getPages ({opened, prev}) {
    //   return store.state.pages.filter(p => {
    //     return opened !== undefined ? (p.opened === opened) : prev !== undefined ? p.prev : true
    //   })
    // }
  }
}
export default store
