let store = {
  state: {
    pages: []
  },
  actions: {
    updateAllPages ({active}) {
      store.state.pages.forEach(x => {
        x.active = active
      })
    },
    updatePage (url, {opened, active, size, star, position, rows, type}, page) {
      console.log(url)
      page = page || store.state.pages.filter(p => p.url === url)[0]
      if (page) {
        page.opened = opened !== undefined ? opened : page.opened
        page.active = active !== undefined ? active : page.active
        page.star = star !== undefined ? star : page.star
        page.size = size !== undefined ? size : page.size
        page.position = position !== undefined ? position : page.position
        page.rows = rows !== undefined ? rows : page.rows
        page.type = type !== undefined ? type : page.type
      }
      return page
    },
    setPages (pages) {
      store.state.pages = pages || store.state.pages
    }
  }
}
export default store
