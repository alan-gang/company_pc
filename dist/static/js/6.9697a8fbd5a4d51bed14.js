webpackJsonp([6,3],{475:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a(22),r=s(i),n=a(2),l=s(n);e.default={props:["show","type","row"],data:function(){return{visible:this.$props.show,userPoint:0,url:"",urlSpeed:{},urls:[],qrs:[],promotionCode:"",data:[],form:{remarks:"",tel:"",qq:"",wechat:""}}},computed:{},mounted:function(){this.Init()},methods:{Init:function(){"edit"===this.$props.type&&this.getRegistLines(),"add"===this.$props.type&&this.showSpreadLinks()},CalculateLine:function(t,e){var a=this,s=document.createElement("img"),i=Date.now();s.setAttribute("src",t),s.onload=function(){a.urlSpeed[e]=Date.now()-i},s.onerror=function(){a.urlSpeed[e]=1e4},this.$el.appendChild(s)},copySuccess:function(){this.$message({type:"success",message:"复制成功"})},copyError:function(){this.$message({message:"复制失败!"})},getRegistLines:function(){var t=this;this.$http.get(l.default.getRegistLines,{entry:this.$props.row.entry}).then(function(e){var a=e.data;1===a.success?(t.userPoint=a.userPoint,t.form.remarks=a.lineRemards,t.form.tel=a.phone,t.form.qq=a.qq,t.form.wechat=a.weChant,t.urls=[a.line],t.url=a.line,a.back.unshift({groupId:0}),a.back.forEach(function(t,e){e?(t.$=1*(1e3*t.value).toFixed(1),t.$s=Math.ceil(1e4*t.backWater)):(t.$=1*(100*a.userPointValue).toFixed(1),t.$s=Math.ceil(10*a.userPoint))}),t.data=a.back):t.$message.error(a.msg)},function(t){})},showSpreadLinks:function(){var t=this;this.$http.get(l.default.showSpreadLinksNew).then(function(e){var a=e.data;1===a.success?(t.userPoint=a.userPoint,t.promotionCode=a.promotionCode,t.urls=a.url,a.url.length&&(t.url=a.url[0]),a.back.unshift({groupId:0}),a.back.forEach(function(t,e){e?(t.$=1*(1e3*(t.backWater-t.value).toFixed(4)).toFixed(1),t.$s=Math.ceil(1e4*t.backWater)):(t.$=1*(a.userPoint-a.autoPoint).toFixed(1),t.$s=Math.ceil(10*a.userPoint))}),t.data=a.back):t.$message.error(a.msg||"自动注册链接获取失败！")},function(e){t.$message.error("自动注册链接获取失败！")})},setKeepPoint:function(){var t=this,e={lineRemards:this.form.remarks,phone:this.form.tel,qq:this.form.qq,weChant:this.form.wechat,linesArr:this.url,keepPoint:this.data[0].$,pointArr:(0,r.default)({myBack:this.data.slice(1).map(function(t){return{groupid:t.groupId,groupname:t.groupName,backwater:(t.$/1e3).toFixed(4)}})})};"edit"===this.$props.type&&(e.entry=this.$props.row.entry),this.$http.post(l.default.setKeepPoint,e).then(function(e){var a=e.data;1===a.success?(t.$message.success(a.msg||"保留返点设置成功！"),t.visible=!1,t.$emit("callback")):t.$message.error(a.msg||"保留返点设置失败！")},function(e){t.$message.error("保留返点设置失败！")})}}}},572:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,".ad .label{width:.75rem;display:inline-block}.ad .tips{margin-left:.2rem}.ad .el-slider__button-wrapper{top:-8px}.ad .slidername{width:2rem;position:relative}.ad .slidername .el-slider__runway.show-input{margin-right:40px;margin-left:40px}.ad .slidername .el-input-number .el-icon-minus,.ad .slidername .el-input-number .el-icon-plus{display:inline-block}.ad .slidername .el-input-number .el-input{display:none}.ad .slidername .el-input-number__decrease,.ad .slidername .el-input-number__increase{border:0 none;position:absolute;top:5px}.ad .slidername .el-slider__input{position:unset}.ad .slidername .el-input-number__decrease{left:0}.ad .slidername .el-input-number__increase{right:0}",""])},573:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,".addEditLink{background:#fff}.addEditLink .el-radio{display:block;margin-left:0;margin-top:1em}.addEditLink .el-radio__input.is-checked .el-radio__inner{border-color:#f17d0b;background:#f17d0b}.addEditLink .linkname{margin-left:.4em;width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.addEditLink .linktip{margin-left:1.6em;cursor:pointer;color:#13ce66}.addEditLink .linktip:hover{color:#f17d0b}.addEditLink .linkms{margin-left:1.6em}.addEditLink .linkms.fast{color:#13ce66}.addEditLink .linkms.slow{color:#ff4949}",""])},574:function(t,e,a){e=t.exports=a(12)(),e.push([t.id,".ad .form[data-v-7b327a52]{padding:.2rem}.el-input-number[data-v-7b327a52],.el-select[data-v-7b327a52]{width:1rem}.el-select[data-v-7b327a52]{position:relative;top:.01rem}.amount[data-v-7b327a52]{font-family:Roboto;font-size:.72rem;color:#333}.notice[data-v-7b327a52]{font-size:.12rem;line-height:.22rem;margin:0 .2rem;padding:.2rem;background-color:#fffde8;border:1px solid #d5d09b;border-radius:.02rem}.notice .content[data-v-7b327a52]{display:inline-block;margin:0;line-height:.25rem;vertical-align:top}.hlh_40[data-v-7b327a52]{line-height:.4rem}ul[data-v-7b327a52]{list-style:none}.c_03[data-v-7b327a52]{color:#033333}",""])},968:function(t,e,a){var s=a(572);"string"==typeof s&&(s=[[t.id,s,""]]);a(14)(s,{});s.locals&&(t.exports=s.locals)},969:function(t,e,a){var s=a(573);"string"==typeof s&&(s=[[t.id,s,""]]);a(14)(s,{});s.locals&&(t.exports=s.locals)},970:function(t,e,a){var s=a(574);"string"==typeof s&&(s=[[t.id,s,""]]);a(14)(s,{});s.locals&&(t.exports=s.locals)},1209:function(t,e,a){var s,i;a(970),a(968),a(969),s=a(475);var r=a(1347);i=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(i=s=s.default),"function"==typeof i&&(i=i.options),i.render=r.render,i.staticRenderFns=r.staticRenderFns,i._scopeId="data-v-7b327a52",t.exports=s},1347:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.visible,modal:!1,"append-to-body":!0,"close-on-click-modal":!1,center:"center","custom-class":"addEditLink"},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("callback")}}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s("add"==t.$props.type?"新增":"修改")+"推广链接")]),a("div",{staticClass:"ad"},[a("div",{staticClass:"t_c"},[t.data.length?[a("div",{staticClass:"pd_25"},[a("p",{staticClass:"ft18 pb_25"},[t._v("推广链接设置")]),a("div",{staticClass:"mh_500 mg_0a t_l",staticStyle:{width:"5rem"}},[t._l(t.data,function(e,s){return[a("div",{key:s,staticClass:"mb_20 v_t"},[a("span",{staticClass:"text-danger pd_5"},[t._v("*")]),e.groupId?a("span",{staticClass:"label"},[t._v(t._s(e.groupName)+"返水")]):a("span",{staticClass:"label"},[t._v("彩票返点")]),a("el-select",{staticStyle:{width:"1.7rem"},attrs:{clearable:"clearable"},model:{value:e.$,callback:function(a){t.$set(e,"$",a)},expression:"v.$"}},[a("el-option",{attrs:{label:"0.0",value:0}}),t._l(e.$s,function(t,e){return a("el-option",{attrs:{label:(.1*t).toFixed(1),value:(.1*t).toFixed(1)}})})],2),e.groupId?a("span",[a("span",{staticClass:"text-blue"},[t._v(" ‰")]),a("span",{staticClass:"text-999"},[t._v("（千分符）")])]):a("span",[a("span",{staticClass:"text-blue"},[t._v(" %")]),a("span",{staticClass:"c_03"},[t._v("（百分符）")])]),e.groupId?t._e():a("div",[a("span",{staticClass:"label",staticStyle:{width:"0.92rem"}}),a("el-slider",{staticClass:"slidername",staticStyle:{width:"1.7rem"},attrs:{max:t.userPoint,step:.1,"show-tooltip":!1,disabled:!t.userPoint,"show-input":"show-input"},model:{value:e.$,callback:function(a){t.$set(e,"$",a)},expression:"v.$"}}),a("span",{staticClass:"tips"},[t._v("奖金："+t._s(20*e.$+1800))]),a("span",{staticClass:"tips"},[t._v("返点："+t._s(e.$)+"%")])],1)],1)]})],2)])]:t._e(),a("hr",{staticStyle:{height:"0",border:"0","border-top":"1px solid #d4d4d4",margin:"0 .2rem 0 .2rem"}}),a("div",{staticClass:"pd_25"},[a("p",{staticClass:"ft18 pb_25"},[t._v("选择线路")]),a("div",{staticStyle:{"user-select":"text"}},[a("div",{staticClass:"text-blue t_l mg_0a",staticStyle:{width:"4.6rem"}},["add"==t.$props.type?[a("el-radio-group",{model:{value:t.url,callback:function(e){t.url=e},expression:"url"}},t._l(t.urls,function(e,s){return a("el-radio",{attrs:{label:e}},[a("div",{staticClass:"inlb linkname",attrs:{title:e}},[t._v(t._s(e))])])}))]:t._e(),"edit"==t.$props.type?t._l(t.urls,function(e,s){return a("div",{attrs:{label:e}},[a("div",{staticClass:"inlb linkname",attrs:{title:e}},[t._v(t._s(e))])])}):t._e()],2)])]),a("div",{staticClass:"pd_25"},[a("div",{staticClass:"mh_500 mg_0a t_l",staticStyle:{width:"4.6rem"}},[a("div",{staticClass:"mb_20 v_t"},[a("span",{staticClass:"label"},[t._v("链接备注")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.remarks,expression:"form.remarks"}],staticClass:"ds-input large",attrs:{maxlength:"10",placeholder:"（10个字以内）"},domProps:{value:t.form.remarks},on:{input:function(e){e.target.composing||t.$set(t.form,"remarks",e.target.value)}}}),a("span",{staticClass:"tips"},[t._v("例：百度贴吧彩票1900")])]),a("div",{staticClass:"mb_20 v_t"},[a("span",{staticClass:"label"},[t._v("手机号码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tel,expression:"form.tel"}],staticClass:"ds-input large",attrs:{maxlength:"11",placeholder:"选填"},domProps:{value:t.form.tel},on:{keyup:function(e){t.form.tel=t.form.tel.replace(/[^0-9]/gi,"")},input:function(e){e.target.composing||t.$set(t.form,"tel",e.target.value)}}})]),a("div",{staticClass:"mb_20 v_t"},[a("span",{staticClass:"label"},[t._v("QQ号码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.qq,expression:"form.qq"}],staticClass:"ds-input large",attrs:{maxlength:"11",placeholder:"选填"},domProps:{value:t.form.qq},on:{keyup:function(e){t.form.tel=t.form.tel.replace(/[^0-9]/gi,"")},input:function(e){e.target.composing||t.$set(t.form,"qq",e.target.value)}}})]),a("div",{staticClass:"mb_20 v_t"},[a("span",{staticClass:"label"},[t._v("微信号码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.wechat,expression:"form.wechat"}],staticClass:"ds-input large",attrs:{placeholder:"选填"},domProps:{value:t.form.wechat},on:{input:function(e){e.target.composing||t.$set(t.form,"wechat",e.target.value)}}})]),a("div",{staticClass:"mb_20 v_t"},[a("span",[t._v("注：您所填写的联系方式将会展示在本链接对应的注册页面，以方便下级用户在新注册时遇到问题联系您。")])])]),a("div",{staticClass:"buttons",staticStyle:{padding:".1rem 2.03rem"}},[a("div",{staticClass:"ds-button primary large bold w_140 hlh_40",on:{click:t.setKeepPoint}},[t._v("提交")])])])],2)])])},staticRenderFns:[]}}});