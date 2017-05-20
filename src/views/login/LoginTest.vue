<template lang="jade">
  .login-test
    h2 线路检测
    el-row.routers.font-white(:gutter="30" style="width: 9.0003rem; padding-left: 0; padding-right: 0")
      el-col(:span="8" v-for=" (r, index) in list "  @click.native="goLogin(r)")
        .col-content(v-bind:class="{ fast:  fast === timeList[index], usual: r.usual, current: r === currentServer}")
          span.route-index {{ index + 1 }}
          |  线 
          SignalBar(:value=" timeListValue[index] || 0 ")
          .timer 
            span.time {{ timeList[index] }}
            |  毫秒
    
</template>

<script>
  import SignalBar from 'components/SignalBar'
  import api from '../../http/api'
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
        timeout: 2000
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
          t < v && (index = 0)
        })
        return this.serverList[index]
      },
      currentServer () {
        return this.server ? api.api : window.location.origin
      }
    },
    watch: {
      fastServer () {
        api.api = this.fastServer
      }
    },
    mounted () {
      this.getEnableLines()
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
        this.serverList.forEach((url, i) => {
          // this.testAline(url, i, 'serverTimeList')
          this.testAline(url + '/login/login.do?method=getVerifyImage', i, 'serverTimeList')
        })
      },
      testAline (url, i, timeList) {
        const st = new Date().getTime()
        this.$http.jsonp(url).then((rep) => {
        }, (rep) => {
          // if (rep.status !== 0) {
          //   setTimeout(() => {
          //     this.$set(this[timeList], i, '> 1000')
          //   }, 0)
          // }
        }).finally((rep) => {
          const et = new Date().getTime()
          const v = this.getValue(et - st)
          this.$set(this[timeList], i, et - st)
          this.$set(this[timeList + 'Value'], i, v)
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
      goLogin (r) {
        if (this.server) {
          api.api = r
          this.$message.success('线路切换成功！')
          this.$emit('close')
        } else {
          window.location.href = r + '/#/login/login'
          // this.$router.push('/login/login')
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
