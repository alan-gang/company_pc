webpackJsonp([11,8],{539:function(t,e,s){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=s(22),r=a(i),n=s(2),l=a(n);e.default={props:["show","type","row"],data:function(){return{visible:this.$props.show,userPoint:0,url:"",urlSpeed:{},urls:[],qrs:[],promotionCode:"",data:[],form:{remarks:"",tel:"",qq:"",wechat:""}}},computed:{},mounted:function(){this.Init()},methods:{Init:function(){"edit"===this.$props.type&&this.getRegistLines(),"add"===this.$props.type&&this.showSpreadLinks()},CalculateLine:function(t,e){var s=this,a=document.createElement("img"),i=Date.now();a.setAttribute("src",t),a.onload=function(){s.urlSpeed[e]=Date.now()-i},a.onerror=function(){s.urlSpeed[e]=1e4},this.$el.appendChild(a)},copySuccess:function(){this.$message({type:"success",message:"复制成功"})},copyError:function(){this.$message({message:"复制失败!"})},getRegistLines:function(){var t=this;this.$http.get(l.default.getRegistLines,{entry:this.$props.row.entry}).then(function(e){var s=e.data;1===s.success?(t.userPoint=s.userPoint,t.form.remarks=s.lineRemards,t.form.tel=s.phone,t.form.qq=s.qq,t.form.wechat=s.weChant,t.urls=[s.line],t.url=s.line,s.back.unshift({groupId:0}),s.back.forEach(function(t,e){e?(t.$=1*(1e3*t.value).toFixed(1),t.$s=Math.ceil(1e4*t.backWater)):(t.$=1*(100*s.userPointValue).toFixed(1),t.$s=Math.ceil(10*s.userPoint))}),t.data=s.back):t.$message.error(s.msg)},function(t){})},showSpreadLinks:function(){var t=this;this.$http.get(l.default.showSpreadLinksNew).then(function(e){var s=e.data;1===s.success?(t.userPoint=s.userPoint,t.promotionCode=s.promotionCode,t.urls=s.url,s.url.length&&(t.url=s.url[0]),s.back.unshift({groupId:0}),s.back.forEach(function(t,e){e?(t.$=1*(1e3*(t.backWater-t.value).toFixed(4)).toFixed(1),t.$s=Math.ceil(1e4*t.backWater)):(t.$=1*(s.userPoint-s.autoPoint).toFixed(1),t.$s=Math.ceil(10*s.userPoint))}),t.data=s.back):t.$message.error(s.msg||"自动注册链接获取失败！")},function(e){t.$message.error("自动注册链接获取失败！")})},setKeepPoint:function(){var t=this,e={lineRemards:this.form.remarks,phone:this.form.tel,qq:this.form.qq,weChant:this.form.wechat,linesArr:this.url,keepPoint:this.data[0].$,pointArr:(0,r.default)({myBack:this.data.slice(1).map(function(t){return{groupid:t.groupId,groupname:t.groupName,backwater:(t.$/1e3).toFixed(4)}})})};"edit"===this.$props.type&&(e.entry=this.$props.row.entry),this.$http.post(l.default.setKeepPoint,e).then(function(e){var s=e.data;1===s.success?(t.$message.success(s.msg||"保留返点设置成功！"),t.visible=!1,t.$emit("callback")):t.$message.error(s.msg||"保留返点设置失败！")},function(e){t.$message.error("保留返点设置失败！")})}}}},659:function(t,e,s){e=t.exports=s(6)(),e.push([t.id,".ad .label{width:.75rem;display:inline-block}.ad .tips{margin-left:.2rem}.ad .el-slider__button-wrapper{top:-8px}.ad .slidername{width:2rem;position:relative}.ad .slidername .el-slider__runway.show-input{margin-right:40px;margin-left:40px}.ad .slidername .el-input-number .el-icon-minus,.ad .slidername .el-input-number .el-icon-plus{display:inline-block}.ad .slidername .el-input-number .el-input{display:none}.ad .slidername .el-input-number__decrease,.ad .slidername .el-input-number__increase{border:0 none;position:absolute;top:5px}.ad .slidername .el-slider__input{position:unset}.ad .slidername .el-input-number__decrease{left:0}.ad .slidername .el-input-number__increase{right:0}",""])},660:function(t,e,s){e=t.exports=s(6)(),e.push([t.id,".addEditLink{background:#fff}.addEditLink .el-radio{display:block;margin-left:0;margin-top:1em}.addEditLink .el-radio__input.is-checked .el-radio__inner{border-color:#f17d0b;background:#f17d0b}.addEditLink .linkname{margin-left:.4em;width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.addEditLink .linktip{margin-left:1.6em;cursor:pointer;color:#13ce66}.addEditLink .linktip:hover{color:#f17d0b}.addEditLink .linkms{margin-left:1.6em}.addEditLink .linkms.fast{color:#13ce66}.addEditLink .linkms.slow{color:#ff4949}",""])},661:function(t,e,s){e=t.exports=s(6)(),e.push([t.id,".ad .form[data-v-8b7f8734]{padding:.2rem}.el-input-number[data-v-8b7f8734],.el-select[data-v-8b7f8734]{width:1rem}.el-select[data-v-8b7f8734]{position:relative;top:.01rem}.amount[data-v-8b7f8734]{font-family:Roboto;font-size:.72rem;color:#333}.notice[data-v-8b7f8734]{font-size:.12rem;line-height:.22rem;margin:0 .2rem;padding:.2rem;background-color:#fffde8;border:1px solid #d5d09b;border-radius:.02rem}.notice .content[data-v-8b7f8734]{display:inline-block;margin:0;line-height:.25rem;vertical-align:top}.hlh_40[data-v-8b7f8734]{line-height:.4rem}ul[data-v-8b7f8734]{list-style:none}.c_03[data-v-8b7f8734]{color:#033333}",""])},1068:function(t,e,s){var a=s(659);"string"==typeof a&&(a=[[t.id,a,""]]);s(7)(a,{});a.locals&&(t.exports=a.locals)},1069:function(t,e,s){var a=s(660);"string"==typeof a&&(a=[[t.id,a,""]]);s(7)(a,{});a.locals&&(t.exports=a.locals)},1070:function(t,e,s){var a=s(661);"string"==typeof a&&(a=[[t.id,a,""]]);s(7)(a,{});a.locals&&(t.exports=a.locals)},1433:function(t,e,s){var a,i;s(1070),s(1068),s(1069),a=s(539);var r=s(1581);i=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(i=a=a.default),"function"==typeof i&&(i=i.options),i.render=r.render,i.staticRenderFns=r.staticRenderFns,i._scopeId="data-v-8b7f8734",t.exports=a},1581:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{visible:t.visible,modal:!1,"append-to-body":!0,"close-on-click-modal":!1,center:"center","custom-class":"addEditLink"},on:{"update:visible":function(e){t.visible=e},close:function(e){return t.$emit("callback")}}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s("add"==t.$props.type?"新增":"修改")+"推广链接")]),s("div",{staticClass:"ad"},[s("div",{staticClass:"t_c"},[t.data.length?[s("div",{staticClass:"pd_25"},[s("p",{staticClass:"ft18 pb_25"},[t._v("推广链接设置")]),s("div",{staticClass:"mh_500 mg_0a t_l",staticStyle:{width:"5rem"}},[t._l(t.data,function(e,a){return[s("div",{key:a,staticClass:"mb_20 v_t"},[s("span",{staticClass:"text-danger pd_5"},[t._v("*")]),e.groupId?s("span",{staticClass:"label"},[t._v(t._s(e.groupName)+"返水")]):s("span",{staticClass:"label"},[t._v("彩票返点")]),s("el-select",{staticStyle:{width:"1.7rem"},attrs:{clearable:"clearable"},model:{value:e.$,callback:function(s){t.$set(e,"$",s)},expression:"v.$"}},[s("el-option",{attrs:{label:"0.0",value:0}}),t._l(e.$s,function(t,e){return s("el-option",{attrs:{label:(.1*t).toFixed(1),value:(.1*t).toFixed(1)}})})],2),e.groupId?s("span",[s("span",{staticClass:"text-blue"},[t._v(" ‰")]),s("span",{staticClass:"text-999"},[t._v("（千分符）")])]):s("span",[s("span",{staticClass:"text-blue"},[t._v(" %")]),s("span",{staticClass:"c_03"},[t._v("（百分符）")])]),e.groupId?t._e():s("div",[s("span",{staticClass:"label",staticStyle:{width:"0.92rem"}}),s("el-slider",{staticClass:"slidername",staticStyle:{width:"1.7rem"},attrs:{max:t.userPoint,step:.1,"show-tooltip":!1,disabled:!t.userPoint,"show-input":"show-input"},model:{value:e.$,callback:function(s){t.$set(e,"$",s)},expression:"v.$"}}),s("span",{staticClass:"tips"},[t._v("奖金："+t._s(20*e.$+1800))]),s("span",{staticClass:"tips"},[t._v("返点："+t._s(e.$)+"%")])],1)],1)]})],2)])]:t._e(),s("hr",{staticStyle:{height:"0",border:"0","border-top":"1px solid #d4d4d4",margin:"0 .2rem 0 .2rem"}}),s("div",{staticClass:"pd_25"},[s("p",{staticClass:"ft18 pb_25"},[t._v("选择线路")]),s("div",{staticStyle:{"user-select":"text"}},[s("div",{staticClass:"text-blue t_l mg_0a",staticStyle:{width:"4.6rem"}},["add"==t.$props.type?[s("el-radio-group",{model:{value:t.url,callback:function(e){t.url=e},expression:"url"}},t._l(t.urls,function(e,a){return s("el-radio",{attrs:{label:e}},[s("div",{staticClass:"inlb linkname",attrs:{title:e}},[t._v(t._s(e))])])}),1)]:t._e(),"edit"==t.$props.type?t._l(t.urls,function(e,a){return s("div",{attrs:{label:e}},[s("div",{staticClass:"inlb linkname",attrs:{title:e}},[t._v(t._s(e))])])}):t._e()],2)])]),s("div",{staticClass:"pd_25"},[s("div",{staticClass:"mh_500 mg_0a t_l",staticStyle:{width:"4.6rem"}},[s("div",{staticClass:"mb_20 v_t"},[s("span",{staticClass:"label"},[t._v("链接备注")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.remarks,expression:"form.remarks"}],staticClass:"ds-input large",attrs:{maxlength:"10",placeholder:"（10个字以内）"},domProps:{value:t.form.remarks},on:{input:function(e){e.target.composing||t.$set(t.form,"remarks",e.target.value)}}}),s("span",{staticClass:"tips"},[t._v("例：百度贴吧彩票1900")])]),s("div",{staticClass:"mb_20 v_t"},[s("span",{staticClass:"label"},[t._v("手机号码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tel,expression:"form.tel"}],staticClass:"ds-input large",attrs:{maxlength:"11",placeholder:"选填"},domProps:{value:t.form.tel},on:{keyup:function(e){t.form.tel=t.form.tel.replace(/[^0-9]/gi,"")},input:function(e){e.target.composing||t.$set(t.form,"tel",e.target.value)}}})]),s("div",{staticClass:"mb_20 v_t"},[s("span",{staticClass:"label"},[t._v("QQ号码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.qq,expression:"form.qq"}],staticClass:"ds-input large",attrs:{maxlength:"11",placeholder:"选填"},domProps:{value:t.form.qq},on:{keyup:function(e){t.form.tel=t.form.tel.replace(/[^0-9]/gi,"")},input:function(e){e.target.composing||t.$set(t.form,"qq",e.target.value)}}})]),s("div",{staticClass:"mb_20 v_t"},[s("span",{staticClass:"label"},[t._v("微信号码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.wechat,expression:"form.wechat"}],staticClass:"ds-input large",attrs:{placeholder:"选填"},domProps:{value:t.form.wechat},on:{input:function(e){e.target.composing||t.$set(t.form,"wechat",e.target.value)}}})]),s("div",{staticClass:"mb_20 v_t"},[s("span",[t._v("注：您所填写的联系方式将会展示在本链接对应的注册页面，以方便下级用户在新注册时遇到问题联系您。")])])]),s("div",{staticClass:"buttons",staticStyle:{padding:".1rem 2.03rem"}},[s("div",{staticClass:"ds-button primary large bold w_140 hlh_40",on:{click:t.setKeepPoint}},[t._v("提交")])])])],2)])])},staticRenderFns:[]}}});