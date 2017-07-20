// import direction from './direction'
import store from '../store'
// function view(url) {
//   return function(resolve) {
//     require([url], resolve)
//   }
// }
const Ow = r => require.ensure([], () => r(require('../views/ow/Ow')), 'ow')
// const OwHome = r => require.ensure([], () => r(require('../views/ow/Home')), 'ow')
// const OwNews = r => require.ensure([], () => r(require('../views/ow/News')), 'ow')
// const OwFAQ = r => require.ensure([], () => r(require('../views/ow/FAQ')), 'ow')

const Login = r => require.ensure([], () => r(require('../views/Login')), 'login-part')
const C404 = r => require.ensure([], () => r(require('../views/login/404')), 'login-part')
const C500 = r => require.ensure([], () => r(require('../views/login/500')), 'login-part')
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
        path: '/ow',
        component: Ow
        // children: [
        //   {
        //     path: '',
        //     component: OwHome
        //   },
        //   {
        //     path: 'news',
        //     component: OwNews
        //   },
        //   {
        //     path: 'faq',
        //     component: OwFAQ
        //   }
        // ]
      },
      {
        path: '/login',
        // component: require('../views/Login'),
        component: Login,
        children: [
          // { path: '404', component: require('../views/login/404') },
          { path: '404', component: C404 },
          { path: '500', component: C500 },
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
        path: '/download/:url',
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
    console.log('game,me,group,form,activity,help,download'.indexOf(to.path.split('/')[1]) === -1, to.path, '????????')
    // router.app.$Progress.start()
    window.NProgress.start()
    // 如果需要登录，而当前没有登录， 先测试有没有登录
    if (to.meta.login && !store.state.user.login) next({path: '/login'})
    // 如果不要登录， 而当前登录了, 跳到大厅
    else if (to.meta.login === false && store.state.user.login) {
      // router.app.$Progress.fail()
      next(false)
    } else if ('game,me,group,form,activity,help,download'.indexOf(to.path.split('/')[1] || 'xxxxx') === -1 && 'game,me,group,form,activity,help,download'.indexOf(from.path.split('/')[1] || 'xxxxx') !== -1) {
      store.state.pages.forEach(t => store.actions.updatePage('', {size: 'minus'}, t))
      setTimeout(next, 300)
    } else next()
    // next()
    //
  })

  // 匹配后
  router.afterEach(r => {
    window.NProgress.done()
    // router.app.$Progress.finish()
    console.log('after:', r)
  })
  return router
}
// this.$Progress.start()

// this.$Progress.set(num)

// this.$Progress.increase(num)

// this.$Progress.decrease(num)

// this.$Progress.finish()

// this.$Progress.fail()
