(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["yx/hsTest/index"],{"0da3":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:[{title:"近3天是否发热（体温＞ 37.3℃。)",val:""},{title:"入院前14天内有病例报告社区的旅行史或居住史。或与 来自上述地区人员接触。入院前14天内曾接触过来自有病例报告社区的发热或有呼吸道症状的患者",val:""},{title:"入院前14天内曾接触过来自有病例报告社区的发热或有呼吸道症状的患者。",val:""},{title:"入院前14天内与新型冠状病毒感染的患者或无症状感 染者有接触史。",val:""},{title:"近3天是否发热（体温＞ 37.3℃。)",val:""},{title:"近3天是否发热（体温＞ 37.3℃。)",val:""}],keyArr:["answerOne","answerTwo","answerThree","answerFour","answerFive","answerSix"],userId:t.getStorageSync("userId")}},methods:{radioChange:function(t){var e=t.currentTarget.id,a=t.target.value;this.list[e]["val"]=a},submit:function(){var e=this;t.showLoading({text:"加载中..."});var a={userId:this.userId};this.keyArr.map((function(t,n){a[t]=e.list[n]["val"]})),this.$request({path:"/nucleicQuestion",method:"post",query:a}).then((function(e){t.hideLoading(),200==e.data.code&&t.navigateTo({url:"./pay?row="+JSON.stringify(e.data.data)})}))}}};e.default=a}).call(this,a("543d")["default"])},"223d":function(t,e,a){"use strict";a.r(e);var n=a("2bab"),r=a("f87b");for(var u in r)"default"!==u&&function(t){a.d(e,t,(function(){return r[t]}))}(u);a("aa23");var i,o=a("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"4dce0cea",null,!1,n["a"],i);e["default"]=c.exports},"2bab":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"591f":function(t,e,a){},"72f9":function(t,e,a){"use strict";(function(t){a("08a8");n(a("66fd"));var e=n(a("223d"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=a,t(e.default)}).call(this,a("543d")["createPage"])},aa23:function(t,e,a){"use strict";var n=a("591f"),r=a.n(n);r.a},f87b:function(t,e,a){"use strict";a.r(e);var n=a("0da3"),r=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=r.a}},[["72f9","common/runtime","common/vendor"]]]);