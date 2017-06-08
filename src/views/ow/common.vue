
<script>
  import util from '../../util'
  export default {
    data () {
      return {
      }
    },
    mounted () {
      setTimeout(this.adjust, 0)
      util.addEvent('resize', window, this.adjust)
    },
    methods: {
      adjust () {
        if (this.$refs.sh) {
          this.$refs.sc.style.top = util.getOffset(this.$refs.sh).height + 'px'
        }
        if (this.$refs.sf) {
          this.$refs.sc.style.bottom = util.getOffset(this.$refs.sf).height + 'px'
        }
      }
    }
  }
</script>
<style lang="stylus">
  @import './var.stylus'
  .slide-page
    img
      transition all linear 1s
      max-width 80%
      opacity 0
    .slide-header
      padding HH 0 0 0
      transition all linear .3s
      transform translateY(-100%)
      opacity 0
      
    .slide-content
      .scroll-content
        text-align center
        padding PW
        top HH
        .flex-content
          &>h1,&>h2
            transition all linear .5s
            transform translateY(-100%)
            opacity 0
          &>h3,&>h4
            transition all linear .5s
            transform translateX(-100%)
            opacity 0
          &>h5,&>h6
            transition all linear 1s
            transform translateX(100%)
            opacity 0
        // bottom FH
    .slide-header + .slide-content
      padding PW
    .slide-footer
      top auto
      height FH
      text-align center
      color rgba(0, 0, 0, .3)
      padding-top .3rem
      &.white
        color rgba(255, 255, 255, .5)
      
</style>
<style lang="stylus">
  @import './var.stylus'
  .swiper-slide-active > .slide-page > .slide-header
    transform translateY(0)
    opacity 1
  
  .swiper-slide-active > .slide-page > .slide-header
  .swiper-slide-active > .slide-page > .slide-content
    img
      opacity 1
    h1, h2, h3, h4, h5, h6
      transform translateY(0) translateX(0) !important
      opacity 1 !important
      
    
  
      
</style>