// import direction from './direction'
import store from '../store'
export default function (VueRoter) {
  let router = new VueRoter({
    mode: 'history',
    routes: [
      {
        path: '/',
        meta: {
          login: true
        },
        component: require('../views/Home')
      },
      {
        path: '/login',
        component: require('../views/Login'),
        children: [
          { path: '',
            meta: {
              login: false
            },
            component: require('../views/login/Login')
          },
          { path: 'try',
            meta: {
              login: false
            },
            component: require('../views/login/Try') },
          { path: 'forget', component: require('../views/login/Forget') }
        ]
      },
      {
        path: '/games/:url',
        meta: {
          login: true
        },
        component: require('../views/Pages')
      },
      {
        path: '*',
        redirect: '/'
      }
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  // 匹配前
  router.beforeEach((to, from, next) => {
    if (to.meta.login && !store.state.user.login) next({path: 'login'})
    else if (to.meta.login === false && store.state.user.login) {
      next(false)
    } else next()
  })

  // 匹配后
  router.afterEach(router => {
    console.log('after:', router)
  })
  return router
}
