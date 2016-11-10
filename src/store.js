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
    updatePage (url, {opened, active, size, star, position}, page) {
      console.log(url, position)
      page = page || store.state.pages.filter(p => p.url === url)[0]
      if (page) {
        page.opened = opened !== undefined ? opened : page.opened
        page.active = active !== undefined ? active : page.active
        page.star = star !== undefined ? star : page.star
        page.size = size !== undefined ? size : page.size
        page.position = position !== undefined ? position : page.position
      }
      return page
    },
    setPages (pages) {
      store.state.pages = pages || store.state.pages
    }
  }
}
export default store
