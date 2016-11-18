<script>
  import store from '../store'
  
  export default {
    data () {
      return {
        // header: {
        //   location: '',
        //   view: '',
        //   left: '',
        //   right: '',
        //   float: false
        // }
        // pages: store.state.pages
      }
    },
    // route: {
    //   activate ({to, from, next, redirect, abort}) {
    //     if (this.login && !this.login.state) {
    //       redirect('/login/' + encodeURIComponent(to.path))
    //     } else {
    //       next()
    //     }
    //   },
    //   // keep-alive 更新
    //   // data first then ready
    //   // use setTimeout instead of update in ready, it will not call ready() when it was cached
    //   data () {
    //     setTimeout(() => {
    //       this.updateHeader()
    //       this.updateFooter()
    //       this.updateLefter()
    //     }, 0)
    //   }
    // },
    // 2次更新header
    // ready () {
    //   this.updateHeader()
    //   this.updateFooter()
    // },
    methods: {
      // updateHeader (header) {
      //   store.actions.updateHeader(header || this.header)
      // }
      openPage (url) {
        store.actions.updateAllPages({active: false})
        let page = this.updatePage(url, {active: true, opened: true})
        if (page && page.size === 'minus') this.updatePage(url, {size: ''}, page)
        return page
      },
      updatePage (url, options, page) {
        return store.actions.updatePage(url, options, page)
      },
      setPages (pages) {
        store.actions.setPages(pages)
      }
    },
    events: {
    }
  }
</script>