分红契约弹窗提醒
<template lang="jade">
  .modal.dialog-deed(v-if="show_deed")
    .mask
    //-
    .description(v-if="show_description")
      h3 签订分红契约邀请
      .but-info(@click="show_listinfo=!0,show_description=!1" title="点击查看契约详情") 查看契约详情
      .but-close(@click="show_deed=!1" title="点击关闭弹窗提醒") 
      //-
    transition(name="el-zoom-in-top")
      .listinfo(v-show="show_listinfo")
        h3 分红详情
        .but-close(@click="show_deed=!1" title="点击关闭弹窗提醒") 
        //-
        template(v-for="v in list")
          .tit
            el-row
              el-col(:span="8")
                span(v-if="v.ctype==0") 彩票分红
                span(v-if="v.ctype==1") 三方游戏分红
                b(v-if="v.stat==0" v-bind:class="'stat'+v.stat") 待确认
                b(v-if="v.stat==1" v-bind:class="'stat'+v.stat") 已签订
                b(v-if="v.stat==2" v-bind:class="'stat'+v.stat") 作废
                b(v-if="v.stat==3" v-bind:class="'stat'+v.stat") 拒绝
              el-col(:span="16" style="text-align: right;")
                .but-no(@click="push_checkContract(v ,0)" v-if="v.stat==0" title="点击拒绝签订") 拒绝签订
                .but-yes(@click="push_checkContract(v ,1)" v-if="v.stat==0" title="点击同意签订") 同意签订
          .tablelist
            el-row(v-for="(r,r_inx) in v.rule")
              el-col(:span="4")
                .circle {{r_inx+1}}
              el-col(:span="4")
                div 亏损{{r.sales}}万
              el-col(:span="8")
                div 有效人数{{r.actuser}}人
              el-col(:span="8")
                div 分红比例{{r.bounsrate}}%
</template>

<script>
import api from "@/http/api";
export default {
  data() {
    return {
      list: [],
      show_deed: !1, //分红契约弹窗提醒
      show_listinfo: !1, //契约详情
      show_description: !0 //签订分红契约邀请
    };
  },
  methods: {
    //接收/拒绝契约 状态
    push_checkContract(row, state) {
      let txtmap = ["拒绝", "接收"];
      this.$http
        .get(api.checkContract, {
          contractId: row.id,
          status: state //1接收  0拒绝
        })
        .then(
          ({ data }) => {
            // success
            if (data.success === 1) {
              this.$message.success(data.msg || `契约${txtmap[state]}成功!`);
              this.get_qryContractStat();
            } else this.$message.error(data.msg || `契约${txtmap[state]}失败!`);
          },
          rep => {
            // error
            this.$message.error(`契约${txtmap[state]}失败!`);
          }
        );
    },
    //-登录契约提醒
    get_qryContractStat() {
      this.$http.get(api.qryContractStat).then(({ data }) => {
        if (data.success === 1) {
          this.list = data.data;
          this.show_deed = data.notice === "1"; //是否提示 1提示 0不提示
        }
      });
    }
  },
  mounted() {
    this.get_qryContractStat();
  }
};
</script>
<style lang="less">
.dialog-deed {
  .but-yes,
  .but-no {
    cursor: pointer;
    width: 137px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    &:hover {
      opacity: 0.9;
    }
  }
  .but-no {
    background-color: #28aba0;
  }
  .but-yes {
    margin-left: 15px;
    background-color: #e9af00;
  }
  .but-info {
    cursor: pointer;
    width: 247px;
    height: 51px;
    line-height: 51px;
    background: url(../assets/dialog-deed/tc_bg_an.png) no-repeat 0 0;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
    margin: 46px auto 0 auto;
    &:hover {
      opacity: 0.9;
    }
  }
  .tablelist {
    width: 100%;
    height: 154px;
    background-color: #e97c00;
    border: solid 1px #cccccc;
    margin: 15px 0;
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
    }
    .el-row {
      margin: 13px 0;
      color: #fff;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      line-height: 32px;
    }
    // [class*="el-col"] {
    // }
    .circle {
      width: 32px;
      height: 32px;
      background-color: #f6d355;
      border: solid 1px #ffaa33;
      border-radius: 50%;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #333333;
      display: inline-block;
    }
  }
  .listinfo {
    position: relative;
    box-sizing: border-box;
    z-index: 9999;
    margin: 26vh auto 0 auto;
    width: 510px;
    // height: 529px;
    background: #ffffff;
    border-radius: 2px;
    padding: 20px;
    overflow-y: auto;
    max-height: 500px;
    .tit {
      //   height: 18px;
      text-align: left;
      padding-left: 7px;
      position: relative;
      &::before {
        content: "";
        display: block;
        width: 4px;
        height: 100%;
        background-color: #f17d0b;
        position: absolute;
        left: 0;
        top: 0;
      }
      span {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: 1px;
        color: #333333;
        margin-left: 10px;
      }
      b {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: 1px;
        margin-left: 10px;
      }
      b.stat1,
      b.stat2,
      b.stat3 {
        color: #ff0000;
      }
      b.stat0 {
        color: #0600ff;
      }
    }
    h3 {
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22px;
      letter-spacing: 1px;
      color: #333333;
      display: inline-block;
      margin-bottom: 10px;
    }
    .but-close {
      cursor: pointer;
      width: 19px;
      height: 19px;
      background: url(../assets/dialog-deed/fhqytc_icon_Shut.png) no-repeat 0 0;
      position: absolute;
      top: 20px;
      right: 20px;
      transition: all 0.3s ease;
      &:hover {
        transform: rotate(90deg);
      }
    }
  }
  .description {
    position: relative;
    box-sizing: border-box;
    z-index: 9999;
    margin: 30vh auto 0 auto;
    width: 326px;
    height: ceil(335px+60px);
    background: url(../assets/dialog-deed/tc_bg.png) no-repeat 0 0;
    h3 {
      display: inline-block;
      margin-top: 178px;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1.8em;
      letter-spacing: 1px;
      color: #ff0000;
    }
    .but-close {
      cursor: pointer;
      width: 36px;
      height: 36px;
      background: url(../assets/dialog-deed/tc_gb.png) no-repeat 0 0;
      position: absolute;
      bottom: 0;
      left: 45%;
      transition: all 0.3s ease;
      &:hover {
        transform: rotate(90deg);
      }
    }
  }
}
</style>