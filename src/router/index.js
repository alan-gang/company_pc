// import direction from './direction'
export default function (VueRoter) {
  let router = new VueRoter({
    mode: 'history',
    routes: [
      {path: '/', component: require('../views/Home')},
      {path: '/login', component: require('../views/Login')},
      {path: '/games/:url', component: require('../views/Pages')},
      {path: '*', redirect: '/'}
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
  return router
}
