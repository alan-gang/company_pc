import { dateTimeFormat } from './util/Date'
let prevIndex = 0
let store = {
  state: {

    hasHeader: false,
    hasFooter: false,
    user: {
      login: false,
      // Home & Me
      name: '游客',
      account: '',
      type: '',
      money: '',
      amoney: '',
      // 特殊金额
      smoney: '',
      free: '',
      // safeCenter
      email: '',
      phone: '',
      greeting: '',
      pwd: '',
      cashPwd: '',
      safe: '',
      safeCheck: '',
      cbsafe: false,
      safeScore: '',
      location: '',
      lastLoginTime: '',
      // 1. 招商总代 2： 直属总代 3.一般总代 4： 普通代理 5： 试玩用户
      role: '',
      isTry: '',
      guide: false,
      model: 'day',
      mode: 'fashion',
      shareCycle: 0,
      collects: [],
      minOrderPop: true,
      isVip: false,
      canTopUp: true,
      canWithDraw: true,
      platform: 'cb',
      skin: 9
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
    setUser (user) {
      // block8/3 console.log('user: ', user)
      // login !== undefined && (store.state.user.login = login)
      // name !== undefined && (store.state.user.name = name)
      user = user || {
        login: false,
        // Home & Me
        name: '游客',
        account: '',
        type: '',
        money: '',
        amoney: '',
        // 特殊金额
        smoney: '',
        free: '',
        // safeCenter
        email: '',
        phone: '',
        greeting: '',
        pwd: '',
        cashPwd: '',
        safe: '',
        safeCheck: '',
        cbsafe: false,
        safeScore: '',
        location: '',
        lastLoginTime: '',
        // 1. 招商总代 2： 直属总代 3.一般总代 4： 普通代理 5： 试玩用户
        role: '',
        isTry: '',
        guide: false,
        // model: 'day',
        // mode: 'fashion',
        shareCycle: 0,
        collects: [],
        minOrderPop: true,
        isVip: false,
        canTopUp: true,
        canWithDraw: true,
        platform: 'cb'
        // skin: 0
      }
      Object.assign(store.state.user, user)
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
    updatePage (id, {opened, active, size, star, position, desk}, page) {
      page = page || store.state.pages.filter(p => p.id === id || p.menuid === id)[0]
      // console.log('page:', JSON.stringify(page), 'updatePage:', id, 'opened:', opened, 'active:', active, 'size:', size, 'star:', star, 'position:', position)
      if (page && page.size === 'minus' && active) size = page.defaultSize
      if (page) {
        opened !== undefined && (page.opened = opened)
        active !== undefined && (page.active = active)
        star !== undefined && (page.star = star)
        desk !== undefined && (page.desk = desk)
        size !== undefined && (page.size = size)
        position !== undefined && (page.position = position)
      }
      return page
    },
    setPages (pages) {
      store.state.pages = pages || store.state.pages
    }
  }
}
Object.defineProperty(store.state.user, 'type', {
  get: function () {
    return this._type === 0 ? '普通' : this._type === 1 ? 'VIP' : this._type === -1 ? '黑名单' : '限制型'
  },
  set: function (v) {
    this._type = v
  }
})
Object.defineProperty(store.state.user, 'lastLoginTime', {
  get: function () {
    return dateTimeFormat(this._lastLoginTime)
  },
  set: function (v) {
    this._lastLoginTime = v
  }
})
Object.defineProperty(store.state.user, 'phone', {
  get: function () {
    return this._phone ? '86 ' + this._phone.slice(0, 3) + '*****' + this._phone.slice(-3) : ''
  },
  set: function (v) {
    this._phone = v
  }
})
Object.defineProperty(store.state.user, 'email', {
  get: function () {
    return this._email ? this._email.slice(0, 1) + '*****' + this._email.match(/@.*$/)[0] : ''
  },
  set: function (v) {
    this._email = v
  }
})
Object.defineProperty(store.state.user, 'css', {
  get: function () {
    return this.platform + ' ' + this.mode + ' ' + this.model + ' ' + (this.isVip ? 'vip' : '') + ' skin-' + (this.skin === 9 ? 'new-year' : this.skin)
  },
  set: function (v) {
    this._css = v
  }
})
export default store
