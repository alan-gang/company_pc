webpackJsonp([3,4],{396:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=a(5),s=n(o),r=a(4),i=a(2),l=n(i),c=a(3),u=n(c),m=a(147);e.default={mixins:[s.default],components:{ProfitLossDetail:function(t){return!function(){var e=[a(55)];t.apply(null,e)}.call(this)},Stock:function(t){return!function(){var e=[a(109)];t.apply(null,e)}.call(this)},TStock:function(t){return!function(){var e=[a(163)];t.apply(null,e)}.call(this)}},data:function(){return{TH:270,numberWithCommas:r.numberWithCommas,me:u.default.state.user,clearableOnTime:!1,stEt:[(new Date)._toDayString(),(new Date)._toDayString()],data:[],pageSize:20,total:0,currentPage:1,preOptions:{},BL:[{title:"自己"},{}],name:"",I:0,cdata:[],ctotal:0,ccurrentPage:1,cpreOptions:{},ot:"0",orderBy:"betAmount",ascOrDesc:1,totalJson:{},showDetail:"",firstHalfval:"",secondHalfval:""}},computed:{Daily:function(){return new Date(this.stEt[1]).getTime()-new Date(this.stEt[0]).getTime()>864e5}},watch:{stEt:function(){this.profitList()},I:function(){0===this.I&&setTimeout(this.profitList)},ot:function(){this.profitList()}},mounted:function(){this.profitList(),this.firstHalfval=this.firstHalf().month,this.secondHalfval=this.secondHalf().month},methods:{UserSearch:function(t,e){var a=[],n=m.get("SearchUserNameList")||{};n[this.me.account]||(n[this.me.account]=[]),n[this.me.account].forEach(function(t){a.push({value:t,label:t})});var o=t?a.filter(this.createFilter(t)):a;e(o)},createFilter:function(t){return function(e){return 0===e.value.indexOf(t.toLowerCase())}},ClickToday:function(){this.stEt=[(new Date)._toDayString(),(new Date)._toDayString()]},ClickYesterday:function(){this.stEt=[(new Date)._bf(-1)._toDayString(),(new Date)._bf(-1)._toDayString()]},ClickBeforeYesterday:function(){this.stEt=[(new Date)._bf(-2)._toDayString(),(new Date)._bf(-2)._toDayString()]},ClickFirstHalf:function(){this.stEt=this.firstHalf().time},ClickSecondHalf:function(){this.stEt=this.secondHalf().time},firstHalf:function(){var t=(new Date).getDate(),e=(new Date)._bfM(1)._setD(0).getDate(),a=(new Date)._bfM(0)._setD(0).getDate(),n={month:"",time:[]};return t>parseInt(e/2)?(n.month=(new Date)._setD(1)._bfM(0).getMonth()+"月下半月",n.time.push((new Date)._setD(1)._bfM(-1)._setD(parseInt(a/2)+1)._toDayString()),n.time.push((new Date)._setD(1)._bfM(0)._setD(0)._toDayString())):(n.month=(new Date)._setD(1)._bfM(0).getMonth()+"月上半月",n.time.push((new Date)._setD(1)._bfM(-1)._toDayString()),n.time.push((new Date)._setD(1)._bfM(-1)._setD(parseInt(a/2))._toDayString())),n},secondHalf:function(){var t=(new Date).getDate(),e=(new Date)._bfM(1)._setD(0).getDate(),a=(new Date)._bfM(0)._setD(0).getDate(),n={month:"",time:[]};return t>parseInt(e/2)?(n.month=(new Date)._setD(1)._bfM(1).getMonth()+"月上半月",n.time.push((new Date)._setD(1)._bfM(0)._toDayString()),n.time.push((new Date)._setD(1)._bfM(0)._setD(parseInt(e/2))._toDayString())):(n.month=(new Date)._setD(1)._bfM(0).getMonth()+"月下半月",n.time.push((new Date)._bfM(-1)._setD(parseInt(a/2)+1)._toDayString()),n.time.push((new Date)._setD(1)._bfM(0)._setD(0)._toDayString())),n},ClickSort:function(t){this.ascOrDesc=2===this.ascOrDesc?1:2,this.orderBy=t,this.profitList()},sortChange:function(t){var e=(t.column,t.prop),a=t.order;this.ascOrDesc="ascending"===a?2:1,this.orderBy=e,this.profitList()},sm:function(t,e){return t-e},__setProfitLossI:function(t){this.I=t},getSummaries:function(t){var e=this,a=t.columns,n=[];return a.forEach(function(t,a){return 0===a?void(n[a]="总计"):void(n[a]=(0,r.numberWithCommas)(e.totalJson[t.property]))}),n},pageChanged:function(t){var e=this;this.profitList(t,function(){e.currentPage=t})},cpageChanged:function(t){var e=this;this.profitDetail(t,function(){e.ccurrentPage=t})},cellClick:function(t,e,a,n){"userName"===e.property&&t.hasSub&&(this.name=t.userName,this.profitList(void 0,void 0,t.userId))},link:function(t,e){this.name=0===e?"":t.userName||"",this.profitList(void 0,void 0,t.userId)},profitList:function(t,e,a){var n=this;this.totalJson={};var o=this.$loading({text:"加载中...",target:this.$refs.table.$el},1e4,"加载超时...");e?this.preOptions.page=t:this.preOptions={beginDate:this.stEt[0],endDate:this.stEt[1],userId:a||this.BL[this.BL.length-2].userId,username:this.name,page:1,pageSize:this.pageSize,listAll:this.ot,orderBy:this.orderBy||"",ascOrDesc:this.ascOrDesc||""},this.$http.myget(l.default.profitList,this.preOptions).then(function(t){var a=t.data;if(1===a.success){var s=m.get("SearchUserNameList")||{};s[n.me.account]||(s[n.me.account]=[]),a.items.length&&n.name&&n.name.replace(/(^\s*)|(\s*)$/g,"")!==n.me.account&&s[n.me.account].indexOf(n.name)===-1&&s[n.me.account].push(n.name),m.set("SearchUserNameList",s),a.items.filter(function(t){return"团队合计："===t.userName})[0]&&(n.totalJson=a.items.pop()),n.data=a.items,n.BL=a.userBreads.concat([{}]),n.total=a.totalSize||n.data.length,"function"==typeof e&&e(),!e&&(n.currentPage=1),setTimeout(function(){o.text="加载成功!"},100)}else o.text="加载失败!"},function(t){}).finally(function(){setTimeout(function(){o.close()},100)})},profitDetail:function(t,e,a){var n=this;this.cdata=[];var o=this.$loading({text:"加载中...",target:this.$refs.itable.$el},1e4,"加载超时...");e?this.cpreOptions.page=t:this.cpreOptions={userId:a,page:1,pageSize:this.pageSize,beginDate:this.stEt[0],endDate:this.stEt[1]},this.$http.myget(l.default.profitDetail,this.cpreOptions).then(function(t){var a=t.data;1===a.success?(n.cdata=a.items,n.ctotal=a.totalSize||n.data.length,"function"==typeof e&&e(),!e&&(n.currentPage=1),setTimeout(function(){o.text="加载成功!"},100)):o.text="加载失败!"},function(t){}).finally(function(){setTimeout(function(){o.close()},100)})},tableRowClassName:function(t,e){if(t.lst)return"lst-row lst-row-greybg"}}}},550:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,".my-el{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.my-el .el-button{min-width:.8rem;height:.3rem;padding:0}.my-el .el-button:focus,.my-el .el-button:hover{border:1px solid #f37e0c;color:#666}.my-el .el-button.selected{background-image:linear-gradient(0deg,#fff3e9,#fffaf6),linear-gradient(#f37e0c,#f37e0c);border:1px solid #f37e0c}",""])},551:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,".stock-list .form[data-v-3904970a]{padding:.2rem}.item[data-v-3904970a]{display:inline-block;margin:0 .15rem .1rem 0}.el-input-number[data-v-3904970a],.el-select[data-v-3904970a]{width:1rem}",""])},552:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,'.tool-bar[data-v-3904970a]{height:.4rem;line-height:.4rem;background-color:#d8d8d8;font-size:.12rem;border-top-right-radius:.05rem;border-top-left-radius:.05rem;overflow:hidden;background-position:.2rem}.title[data-v-3904970a]{color:#333;font-weight:700;padding-left:.2rem}.el-button-group[data-v-3904970a]{float:right;height:100%}.el-button-group .el-button[data-v-3904970a]{font-size:.12rem;color:#9897b2;border:none;height:100%;width:.4rem;padding:0;background-color:transparent}.el-button-group .el-button[data-v-3904970a]:hover{background-color:#ececec}.el-button-group .el-button[data-v-3904970a]:active{background-color:#e2e2e2}.el-button-group .el-button[data-v-3904970a]:first-child{font-size:.16rem}.el-button-group .el-button.close[data-v-3904970a]:hover{background-color:#f34;color:#fff}.el-button-group .el-button.close[data-v-3904970a]:active{color:#fff;background-color:#d40c1d}.modal[data-v-3904970a]{position:absolute;top:.4rem;bottom:0;left:0;right:0;text-align:center;z-index:9999}.modal .mask[data-v-3904970a]{position:absolute;left:0;top:0;width:100%;height:100%;opacity:.5;background:#000;z-index:9998}.modal .box-wrapper[data-v-3904970a]{position:absolute;top:0;bottom:0;left:0;right:0;text-align:center;z-index:9999}.modal .box-wrapper[data-v-3904970a]:after{content:"";height:100%;width:0;vertical-align:middle;display:inline-block}.modal .box[data-v-3904970a]{position:relative;text-align:left;display:inline-block;vertical-align:middle;background-color:#ededed;font-size:.12rem;width:9rem;border-radius:.02rem}.modal .content[data-v-3904970a]{margin:0 .2rem}.modal .content .el-row[data-v-3904970a]{margin:.15rem 0;word-wrap:break-word}.modal .content .textarea-label[data-v-3904970a]{position:relative;margin:.3rem .3rem .3rem 0}.modal .content .textarea-label .label[data-v-3904970a]{position:absolute;left:0;top:.05rem}.modal .content .textarea-label .el-textarea[data-v-3904970a]{display:inline-bock;vertical-align:top;padding-left:.6rem}.modal .content .textarea-label .el-textarea .textarea[data-v-3904970a]{font-size:.12rem}',""])},811:function(t,e,a){var n=a(550);"string"==typeof n&&(n=[[t.id,n,""]]);a(13)(n,{});n.locals&&(t.exports=n.locals)},812:function(t,e,a){var n=a(551);"string"==typeof n&&(n=[[t.id,n,""]]);a(13)(n,{});n.locals&&(t.exports=n.locals)},813:function(t,e,a){var n=a(552);"string"==typeof n&&(n=[[t.id,n,""]]);a(13)(n,{});n.locals&&(t.exports=n.locals)},1108:function(t,e,a){var n,o;a(812),a(813),a(811),n=a(396);var s=a(1214);o=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(o=n=n.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,o._scopeId="data-v-3904970a",t.exports=n},1214:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"group-page"},[t._t("cover"),t._v(" "),t._t("movebar"),t._v(" "),t._t("resize-x"),t._v(" "),t._t("resize-y"),t._v(" "),t._t("toolbar"),t._v(" "),a("div",{staticClass:"stock-list scroll-content"},[a("div",{staticClass:"form form-filters"},[a("label",{staticClass:"item my-el"},[a("el-button",{attrs:{size:"small"},on:{click:t.ClickToday}},[t._v("今天")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.ClickYesterday}},[t._v("昨天")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.ClickBeforeYesterday}},[t._v("前天")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.ClickFirstHalf}},[t._v(t._s(t.firstHalfval))]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.ClickSecondHalf}},[t._v(t._s(t.secondHalfval))])],1),t._v(" "),a("label",{staticClass:"item my-el"},[t._v("\n        排序\n        "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.ClickSort("betAmount")}}},[t._v("\n          投注\n          "),"betAmount"==t.orderBy&&2==t.ascOrDesc?[t._v("↑")]:t._e(),t._v(" "),"betAmount"==t.orderBy&&1==t.ascOrDesc?[t._v("↓")]:t._e()],2),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.ClickSort("settleAmount")}}},[t._v("\n          总盈亏\n          "),"settleAmount"==t.orderBy&&2==t.ascOrDesc?[t._v("↑")]:t._e(),t._v(" "),"settleAmount"==t.orderBy&&1==t.ascOrDesc?[t._v("↓")]:t._e()],2),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.ClickSort("gameSettleAmount")}}},[t._v("\n          游戏盈亏\n          "),"gameSettleAmount"==t.orderBy&&2==t.ascOrDesc?[t._v("↑")]:t._e(),t._v(" "),"gameSettleAmount"==t.orderBy&&1==t.ascOrDesc?[t._v("↓")]:t._e()],2)],1),t._v(" "),a("label",{staticClass:"item"},[t._v("\n        显示\n        "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ot,callback:function(e){t.ot=e},expression:"ot"}},[a("el-option",{attrs:{label:"投注的",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:"1"}})],1)],1),t._v(" "),a("label",{staticClass:"item"},[t._v("\n        团队\n        "),a("el-autocomplete",{staticStyle:{width:"1.1rem"},attrs:{"fetch-suggestions":t.UserSearch,placeholder:"请输入用户名"},on:{select:t.profitList},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),a("div",{staticClass:"ds-button primary large bold",on:{click:function(e){t.profitList()}}},[t._v("搜索")])]),t._v(" "),a("div",[a("div",{staticClass:"table-list",staticStyle:{padding:".15rem .2rem"}},[a("p",{staticStyle:{margin:"0 0 .15rem 0"}},[a("el-breadcrumb",{attrs:{separator:">"}},t._l(t.BL,function(e,n){return a("el-breadcrumb-item",{key:e.userId,nativeOn:{click:function(a){t.link(e,n)}}},[t._v(t._s(0===n?"自己":e.userName))])}),1)],1),t._v(" "),a("el-table",{ref:"table",staticClass:"header-bold nopadding",staticStyle:{margin:"0"},attrs:{data:t.data,stripe:"stripe","show-summary":"show-summary","summary-method":t.getSummaries,"row-class-name":t.tableRowClassName,"max-height":t.MH},on:{"cell-click":t.cellClick,"sort-change":t.sortChange}},[a("el-table-column",{attrs:{"class-name":"pl2",prop:"userName",label:"用户名"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("\n                "+t._s(e.row.userName)+"\n                "),t.me.account==e.row.userName?[t._v("(我)")]:t._e()],2)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"gameUserCount",label:(t.Daily?"日均":"")+"游戏人数",sortable:"custom",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"betAmount",label:"投注",sortable:"custom",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.betAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"prizeAmount",label:"派奖",sortable:"custom",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.prizeAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"gameSettleAmount",label:"游戏盈亏",sortable:"custom",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pointAmount",label:"返点",sortable:"custom",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"activityAmount",label:"活动",sortable:"custom",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.activityAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"salaryAmount",label:"日工资",sortable:"custom",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.salaryAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"settleAmount",label:"总盈亏",sortable:"custom",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{directives:[{name:"show",rawName:"v-show",value:t.Daily,expression:"Daily"}],staticClass:"ds-button text-button blue",staticStyle:{padding:"0 .05rem"},on:{click:function(a){a.stopPropagation(),(t.showDetail=!0)&&t.profitDetail(void 0,void 0,e.row.userId)}}},[t._v("明细")])]}}])})],1),t._v(" "),t.total>t.pageSize?a("el-pagination",{attrs:{total:t.total,"page-size":t.pageSize,layout:"prev, pager, next, total","page-sizes":[5,10,15,20],"current-page":t.currentPage,small:"small"},on:{"current-change":t.pageChanged}}):t._e()],1)]),t._v(" "),1===t.I?a("Stock"):t._e(),t._v(" "),2===t.I?a("TStock"):t._e()],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}],staticClass:"modal"},[a("div",{staticClass:"mask"}),t._v(" "),a("div",{staticClass:"box-wrapper"},[a("div",{ref:"box",staticClass:"box",staticStyle:{width:"10rem","max-height":"9rem",height:"6.2rem"}},[a("div",{staticClass:"tool-bar"},[a("span",{staticClass:"title"},[t._v("明细")]),t._v(" "),a("el-button-group",[a("el-button",{staticClass:"close",attrs:{icon:"close"},on:{click:function(e){t.showDetail=""}}})],1)],1),t._v(" "),a("div",{staticClass:"table-list",staticStyle:{padding:".15rem .2rem"}},[a("el-table",{ref:"itable",staticClass:"header-bold nopadding",staticStyle:{margin:".2rem 0 0 0"},attrs:{data:t.cdata,stripe:"stripe","summary-method":t.getSummaries,"max-height":"500","row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{"class-name":"pl2",prop:"userName",label:"用户名"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"pointer text-blue",class:{"text-danger":e.row.userName===t.me.account}},[t._v(t._s(e.row.userName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"date",label:"日期",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"betAmount",label:"投注总额"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.betAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"pointAmount",label:"返点总额"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"prizeAmount",label:"派奖总额"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.prizeAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"vrBetAmount",label:"VR投注"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"vrPointAmount",label:"VR返点"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"vrPrizeAmount",label:"VR派奖"}}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"activityAmount",label:"彩票活动"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.activityAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"right",prop:"salaryAmount",label:"工资"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.numberWithCommas(e.row.salaryAmount)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"right","class-name":" pr2 ",prop:"settleAmount",label:"总盈亏","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:{"text-green":e.row.settleAmount&&e.row.settleAmount._o0(),"text-danger":e.row.settleAmount&&e.row.settleAmount._l0()}},[t._v(t._s(e.row.settleAmount&&e.row.settleAmount._nwc()))])]}}])})],1),t._v(" "),t.ctotal>t.pageSize?a("el-pagination",{attrs:{total:t.ctotal,"page-size":t.pageSize,layout:"prev, pager, next, total","page-sizes":[5,10,15,20],"current-page":t.ccurrentPage,small:"small"},on:{"current-change":t.cpageChanged}}):t._e()],1)])])])],2)},staticRenderFns:[]}}});