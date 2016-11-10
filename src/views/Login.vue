<template lang="jade">
  section this is login
</template>

<script>
import base from 'components/base'
export default {
  mixins: [base],
  // props: ['hasHeader'],
  data () {
    return {
    }
  },
  computed: {
    // appsList () {
    //   return util.groupArray(this.apps, 4)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.scroll-content{
  .row{

    .col{
      position: relative;
      text-align: center;
      height: 75px;
      button{
        border-radius: 8px;
        &:before{
          color: #333;
          font-size: 50px;
        }
        &:hover:before{
          color: #000;
        }
      }
      span{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 18px;
        color: #000;
        font-family: serif;
      }
    }

  }
  
}

</style>



