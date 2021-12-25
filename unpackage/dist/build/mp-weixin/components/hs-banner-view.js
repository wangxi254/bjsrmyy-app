(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/hs-banner-view"],{"0547":function(n,t,e){"use strict";e.r(t);var r=e("2bcb"),a=e("5022");for(var c in a)"default"!==c&&function(n){e.d(t,n,(function(){return a[n]}))}(c);e("a6c1");var i,u=e("f0c5"),o=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"74453926",null,!1,r["a"],i);t["default"]=o.exports},"2bcb":function(n,t,e){"use strict";var r;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return r}));var a=function(){var n=this,t=n.$createElement;n._self._c},c=[]},5022:function(n,t,e){"use strict";e.r(t);var r=e("ff7d"),a=e.n(r);for(var c in r)"default"!==c&&function(n){e.d(t,n,(function(){return r[n]}))}(c);t["default"]=a.a},a6c1:function(n,t,e){"use strict";var r=e("d35c2"),a=e.n(r);a.a},d35c2:function(n,t,e){},ff7d:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={image:"image"},a={props:{banners:{type:Array,default:[]},props:{type:Object},banner:{type:Object,default:{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500}}},methods:{bannerClick:function(n){console.log("bannerClick:item==>",JSON.stringify(n)),this.$emit("bannerClick",n)}},watch:{props:function(n){this.props=Object.assign({},r,n)}}};t.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/hs-banner-view-create-component',
    {
        'components/hs-banner-view-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0547"))
        })
    },
    [['components/hs-banner-view-create-component']]
]);
