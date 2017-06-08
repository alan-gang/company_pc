<template lang="jade">
  .login-test
    h2 线路检测
    el-row.routers.font-white(:gutter="30" style="width: 9.0003rem; padding-left: 0; padding-right: 0")
      el-col(:span="8" v-for=" (r, index) in list "  @click.native="goLogin(r)")
        .col-content(v-bind:class="{ fast:  fast === timeList[index], usual: r.usual, current: r === currentServer}")
          p {{ r }}
          span.route-index {{ index + 1 }}
          |  线 
          SignalBar(:value=" timeListValue[index] || 0 ")
          .timer 
            span.time {{ timeList[index] }}
            |  毫秒
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      // el-col(:span="8" v-for=" (r, index) in serverList "  @click.native="switchCS(r)" v-if="!server")
      //   .col-content(v-bind:class="{ fast:  fastServer === r, usual: r.usual, current: r === cs}")
      //     p {{ r }}
      //     span.route-index {{ index + 1 }}
      //     |  线 
      //     SignalBar(:value=" serverTimeListValue[index] || 0 ")
      //     .timer 
      //       span.time {{ serverTimeList[index] }}
      //       |  毫秒
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
</template>

<script>
  import SignalBar from 'components/SignalBar'
  import api from '../../http/api'
  import store from '../../store'
  // import Url from '../../util/Url'
  // import cookie from 'js-cookie'
  export default {
    // if show server
    props: ['server'],
    components: {
      SignalBar
    },
    data () {
      return {
        frontList: [],
        frontTimeList: [],
        frontTimeListValue: [],
        serverList: [],
        serverTimeList: [],
        serverTimeListValue: [],
        timeout: 2000,
        auto: 0,
        currentServer: ''
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        // cs: ''
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      }
    },
    computed: {
      list () {
        return this.server ? this.serverList : this.frontList
      },
      timeList () {
        return this.server ? this.serverTimeList : this.frontTimeList
      },
      timeListValue () {
        return this.server ? this.serverTimeListValue : this.frontTimeListValue
      },
      fast () {
        let v = 10000
        this.timeList.forEach(t => {
          t < v && (v = t)
        })
        return v
      },
      fastServer () {
        let v = 10000
        let index = 0
        this.serverTimeList.forEach((t, i) => {
          if (t && t < v) {
            v = t
            index = i
          }
        })
        return this.serverList[index]
      }
      // currentServer () {
      //   return this.server ? api.api : window.location.origin
      // }
    },
    watch: {
      fastServer () {
        if (!this.server) api.api = this.fastServer
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        // this.cs = this.fastServer
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      }
    },
    mounted () {
      this.auto = this.$route.query.auto
      this.getEnableLines()
      this.currentServer = this.server ? api.api : window.location.origin
      // cookie.set('mySession', 'xxsffe-fe-s-f-esf-se-fe-s-f', {domain: ''})
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      // this.cs = api.api
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    },
    methods: {
      getEnableLines () {
        this.$http.get(api.getEnableLines).then(({data}) => {
          if (data.success === 1) {
            this.frontList = data.frontList
            this.serverList = data.serverList
            this.test()
          } else this.$message.warning({target: this.$el, message: '线路信息获取失败！'})
        }, (rep) => {
          this.$message.warning({target: this.$el, message: '线路信息获取失败！'})
        })
      },
      test () {
        // this.frontList = ['http://www.baidu.com']
        !this.server && this.frontList.forEach((url, i) => {
          this.testAline(url, i, 'frontTimeList')
        })
        // let SESSION = cookie.get('SESSION', {domain: Url.extractHostname(api.api)})
        // console.log(Url.extractHostname(api.api), SESSION)
        this.serverList.forEach((url, i) => {
          // this.testAline(url, i, 'serverTimeList')
          this.testAline(url + '/login/login.do?method=getVerifyImage', i, 'serverTimeList')
          // this.server == change server router
          // if (this.server) {
          //   cookie.set('SESSION', SESSION, {domain: Url.extractHostname(url)})
          // }
        })
      },
      testAline (url, i, timeList) {
        const st = new Date().getTime()
        this.$http.jsonp(url).then((rep) => {
        }, (rep) => {
          console.log('success testing', rep)
          const et = new Date().getTime()
          const v = this.getValue(et - st)
          this.$set(this[timeList], i, et - st)
          this.$set(this[timeList + 'Value'], i, v)
          if (rep.status !== 0) {
            this.$set(this[timeList], i, '> 10000')
            this.$set(this[timeList + 'Value'], i, 0)
          }
        }).finally((rep) => {
          // console.log('final', rep)
          if (this.auto && timeList === 'serverTimeList' && i === this.serverList.length - 1) {
            setTimeout(() => {
              this.$router.push('/login/login')
            }, 0)
          }
        })
      },
      getValue (t) {
        if (t < 100) return 10
        else if (t < 200) return 9
        else if (t < 300) return 8
        else if (t < 400) return 7
        else if (t < 500) return 6
        else if (t < 600) return 5
        else if (t < 700) return 4
        else if (t < 800) return 3
        else if (t < 900) return 2
        else return 1
      },
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      // switchCS (r) {
      //   api.api = r
      //   this.cs = api.api
      //   this.$message.success('线路切换成功！')
      // },
      // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      goLogin (r) {
        if (this.server) {
          api.preApi = api.api
          api.api = r
          this.currentServer = api.api
          this.$message.success('线路切换成功，您将需要重新去登录')
          this.$emit('close')
          this.__setCall({
            fn: '__logoutChat',
            args: {
              stay: true,
              fn () {
                api.api = r
              }
            }
          })
          store.actions.setUser()
          this.$router.push('/login/login')
          // this.$router.push({
          //   path: '/login/login'
          //   // query: {
          //   //   un_: this.account,
          //   //   pwd: '123qwe'
          //   // }
          // })
        } else {
          if (r !== this.currentServer) window.location.href = r + '/#/login?auto=1'
          else this.$router.push('/login/login')
        }
      }
    }
  }
</script>

<style lang="stylus">

  .login-test + .download
    display none
    
</style>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  W = 2.7rem
  H = 1.8rem
  .route-index
  .time
    font-family Roboto
    font-size 0.72rem
    vertical-align sub
    text-shadow()
  .time
    font-size .3rem
  .login-test
    text-align center
    color #fff
    &.no-title
      h2 
        display none
    h2
      font-size .18rem
      font-weight normal

      
  .routers
    padding .5rem 1rem
    text-align center
    display inline-block
    .col-content
      position relative
      height H
      padding 0 PWX
      margin-bottom .3rem
      radius()
      text-align left
      overflow hidden
      background-color rgba(255, 255, 255, .2)
      box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .2)
      cursor pointer
      &:hover
        background-color rgba(255, 255, 255, .4)
      &:active
        background-color rgba(255, 255, 255, .6)
      &:after
        background-color GOLD
        position absolute
        right 0
        top 0
        width 2rem
        text-align center
        padding .05rem 0
        font-shadow()
        transform rotateZ(42deg) translateY(-160%)  translateX(30%) 
      &.fast:after
        content '最快'
        bg-gradient(180deg, #ff7200, #ff5e00)
      &.usual:after
        content '常用'
        bg-gradient(180deg, #1ab8f3, #1a9ff3)
      &.current:after
        content '当前'
        bg-gradient(180deg, #1ab8f3, #1a9ff3)
        
        
      
      .timer
        text-align right
      

</style>
