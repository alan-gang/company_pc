// import direction from './direction'
import store from '../store'
// function view(url) {
//   return function(resolve) {
//     require([url], resolve)
//   }
// }
const Login = r => require.ensure([], () => r(require('../views/Login')), 'login-part')
const C404 = r => require.ensure([], () => r(require('../views/login/404')), 'login-part')
const Forbidden = r => require.ensure([], () => r(require('../views/login/Forbidden')), 'login-part')
const Register = r => require.ensure([], () => r(require('../views/login/Register')), 'login-part')
const LoginTest = r => require.ensure([], () => r(require('../views/login/LoginTest')), 'login-part')
const LoginNow = r => require.ensure([], () => r(require('../views/login/Login')), 'login-part')
const Try = r => require.ensure([], () => r(require('../views/login/Try')), 'login-part')
const Forget = r => require.ensure([], () => r(require('../views/login/Forget')), 'login-part')

const Pages = r => require.ensure([], () => r(require('../views/Pages')), 'pages-part')

export default function (VueRoter) {
  let router = new VueRoter({
    // mode: 'history',
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
        // component: require('../views/Login'),
        component: Login,
        children: [
          // { path: '404', component: require('../views/login/404') },
          { path: '404', component: C404 },
          { path: 'forbidden', component: Forbidden },
          // { path: 'forbidden', component: require('../views/login/Forbidden') },
          { path: 'register', component: Register },
          // { path: 'register', component: require('../views/login/Register') },
          { path: '', component: LoginTest },
          // { path: '', component: require('../views/login/LoginTest') },
          { path: 'login',
            meta: {
              login: false
            },
            // component: require('../views/login/Login')
            component: LoginNow
          },
          { path: 'try',
            meta: {
              login: false
            },
            component: Try },
          { path: 'forget', component: Forget }
        ]
      },
      {
        path: '/game/:url',
        meta: {
          login: true
        },
        component: Pages
      },
      {
        path: '/group/:url',
        meta: {
          login: true
        },
        component: Pages
      },
      {
        path: '/me/:url',
        meta: {
          login: true
        },
        component: Pages
      },
      {
        path: '/form/:url',
        meta: {
          login: true
        },
        component: Pages
      },
      {
        path: '/help/:url',
        meta: {
          login: true
        },
        component: Pages
      },
      {
        path: '/activity/:url',
        meta: {
          login: true
        },
        component: Pages
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
    // 如果需要登录，而当前没有登录， 先测试有没有登录
    if (to.meta.login && !store.state.user.login) next({path: '/login'})
    // 如果不要登录， 而当前登录了, 跳到大厅
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
