webpackJsonp([1,2],{478:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"outer-egame",props:[],data:function(){return{prebg:"",bgStyle:{backgroundImage:"url(/static/skins/01.jpg)"},title:"",href:"",key:"",tabs:["BG电子游戏","PT游戏","LG游戏"],fns:["2:203:iframe:/egame/1","5:203:iframe:/egame/2",""],hrefs:["","","/lg_egame/index.html"]}},computed:{tabIndex:function(){return this.$route.params.tabIndex}},watch:{tabIndex:function(){this.init()}},created:function(){this.init()},mounted:function(){},beforeDestroy:function(){this.clearIframe()},methods:{init:function(){if(this.tabIndex){this.key=this.tabIndex;var t=this.fns[this.tabIndex-1],e=this.hrefs[this.tabIndex-1];e?this.__setIframeSrc(e):t&&this.__setCall({fn:"__openThirdPart",args:{id:1,fn:t}})}},__setIframeSrcKey:function(t){},__setIframeSrc:function(t){t.startsWith("?un=")&&(t="/pt_egame/index.html"+t),this.href=t},load:function(){var t=this;this.$refs.iframe.contentWindow.document&&setTimeout(function(){t.__setIframeWH(),t.listenIframe()},300)},listenIframe:function(){var t=this;!this.t&&(this.t=setInterval(function(){t.__setIframeWH()},1e3))},clearIframe:function(){clearInterval(this.t),this.t=0,this.href=""},__setIframeWH:function(){this.$refs.iframe.style.height=this.$refs.iframe.contentWindow.document.body.clientHeight+"px"}}}},479:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"outer-egaming",props:[],data:function(){return{bgStyle:{backgroundImage:"url(/static/skins/egaming.png)"},ifsrc:"",waitmsg:"请耐心等待，精彩内容正在加载中",t:0,s:1,tt:0,show:!1}},watch:{},created:function(){this.__setCall({fn:"__openThirdPart",args:{id:1,fn:"17:301:iframe:/egaming"}})},mounted:function(){var t=this;this.t=setInterval(function(){t.s++,7===t.s&&(t.s=1)},500)},beforeDestroy:function(){clearTimeout(this.tt),this.tt=0},methods:{load:function(){var t=this;setTimeout(function(){t.show=!0,clearInterval(t.t),t.t=0},3e3)},__setIframeSrc:function(t){t||(this.waitmsg="服务器异常",this.tt=setTimeout(function(){window.history.back()},2e3)),this.ifsrc=t}}}},480:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"outer-sports",props:[],data:function(){return{bgStyle:{backgroundImage:"url(/static/skins/sports.jpg)"},ifsrc:"",waitmsg:"请耐心等待，精彩内容正在加载中",t:0,s:1,tt:0,show:!1}},watch:{},created:function(){this.__setCall({fn:"__openThirdPart",args:{id:1,fn:"3:301:iframe:/sports"}})},mounted:function(){var t=this;this.t=setInterval(function(){t.s++,7===t.s&&(t.s=1)},500)},beforeDestroy:function(){clearTimeout(this.tt),this.tt=0},methods:{load:function(){var t=this;setTimeout(function(){t.show=!0,clearInterval(t.t),t.t=0},3e3)},__setIframeSrc:function(t){t||(this.waitmsg="服务器异常",this.tt=setTimeout(function(){window.history.back()},2e3)),this.ifsrc=t}}}},560:function(t,e,r){e=t.exports=r(16)(),e.push([t.id,".outer-sports~.el-carousel.ad,.outer-sports~.our-game{display:none}.outer-sports{position:relative!important;background-repeat:no-repeat;background-size:cover;background-position:50%;padding-top:.2rem;padding-bottom:.2rem}.outer-sports .cw{width:1260px;margin:0 auto;min-height:8rem}.outer-sports iframe{background-color:#fff;width:100%;min-height:8rem;margin-right:.2rem;border:none}.outer-sports iframe.plat-2{width:1280px;min-height:1100px}.outer-sports iframe.plat-5{width:1280px;min-height:850px}",""])},562:function(t,e,r){e=t.exports=r(16)(),e.push([t.id,".outer-egaming~.el-carousel.ad,.outer-egaming~.our-game{display:none}.outer-egaming{position:relative!important;background-repeat:no-repeat;background-size:cover;background-position:50%;padding-top:.2rem;padding-bottom:.2rem}.outer-egaming .cw{width:1260px;margin:0 auto;min-height:8rem;text-align:center;background-color:rgba(0,0,0,.5)}.outer-egaming iframe{background-color:#fff;width:1034px;min-height:963px;margin-right:.2rem;border:none}.outer-egaming iframe.plat-2{width:1280px;min-height:1100px}.outer-egaming iframe.plat-5{width:1280px;min-height:850px}",""])},568:function(t,e,r){e=t.exports=r(16)(),e.push([t.id,".outer-egame~.el-carousel.ad,.outer-egame~.our-game{display:none}.outer-egame{position:relative!important;background-repeat:no-repeat;background-size:100%;background-color:#fff;padding-top:2rem;padding-bottom:.2rem}.outer-egame .cw{width:1260px;margin:0 auto}.outer-egame .tab{width:1.8rem;height:.6rem;line-height:.6rem;display:inline-block;background-color:#fff;margin:.1rem 0;text-align:center;cursor:pointer}.outer-egame .tab:hover{color:#f17d0b}.outer-egame .tab.active{color:#fff;background-color:#f17d0b}.outer-egame iframe{background-color:#fff;width:100%;min-height:8rem;margin-right:.2rem;border:none}.outer-egame iframe.plat-1{width:1280px;min-height:1100px}.outer-egame iframe.plat-2{width:1280px;min-height:850px}.outer-egame iframe.plat-3{width:1280px;min-height:400px}",""])},801:function(t,e,r){var i=r(560);"string"==typeof i&&(i=[[t.id,i,""]]);r(17)(i,{});i.locals&&(t.exports=i.locals)},817:function(t,e,r){var i=r(562);"string"==typeof i&&(i=[[t.id,i,""]]);r(17)(i,{});i.locals&&(t.exports=i.locals)},928:function(t,e,r){var i=r(568);"string"==typeof i&&(i=[[t.id,i,""]]);r(17)(i,{});i.locals&&(t.exports=i.locals)},1199:function(t,e,r){var i,n;r(928),i=r(478);var o=r(1309);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=o.render,n.staticRenderFns=o.staticRenderFns,t.exports=i},1200:function(t,e,r){var i,n;r(817),i=r(479);var o=r(1248);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=o.render,n.staticRenderFns=o.staticRenderFns,t.exports=i},1201:function(t,e,r){var i,n;r(801),i=r(480);var o=r(1235);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=o.render,n.staticRenderFns=o.staticRenderFns,t.exports=i},1235:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"outer-sports",style:t.bgStyle},[r("div",{staticClass:"cw"},[t.ifsrc?r("iframe",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],attrs:{src:t.ifsrc},on:{load:t.load}}):t._e(),t.show?t._e():r("p",{staticStyle:{color:"#fff","font-size":"16px"}},[t._v(t._s(t.waitmsg)),t._l(Array(t.s),function(e){return r("span",[t._v(".")])})],2)])])},staticRenderFns:[]}},1248:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"outer-egaming",style:t.bgStyle},[r("div",{staticClass:"cw"},[t.ifsrc?r("iframe",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],attrs:{src:t.ifsrc},on:{load:t.load}}):t._e(),t.show?t._e():r("p",{staticStyle:{color:"#fff","font-size":"16px","text-align":"left",padding:"15px"}},[t._v(t._s(t.waitmsg)),t._l(Array(t.s),function(e){return r("span",[t._v(".")])})],2)])])},staticRenderFns:[]}},1309:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"outer-egame",style:t.bgStyle},[r("div",{staticClass:"cw"},t._l(t.tabs,function(e,i){return r("div",{staticClass:"bg-egame tab",class:{active:t.$route.params.tabIndex==i+1},on:{click:function(e){t.$router.push("/egame/"+(i+1))}}},[t._v(t._s(e))])}),0),t.href?r("div",{staticClass:"cw"},[r("iframe",{ref:"iframe",class:"plat-"+t.key,attrs:{src:t.href},on:{load:t.load}})]):t._e()])},staticRenderFns:[]}}});