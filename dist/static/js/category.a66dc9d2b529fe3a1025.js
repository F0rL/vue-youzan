webpackJsonp([4],{0:function(t,e,a){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",rank:"/category/rank",subList:"/category/subList",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressAdd:"/address/add",addressRemove:"/address/remove",addressLists:"/address/list",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in n)n.hasOwnProperty(s)&&(n[s]="https://easy-mock.com/mock/5bea1e7f12ea3f1cbb0fd9f6"+n[s]);e.a=n},110:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(9),s=(a.n(n),a(79)),o=(a.n(s),a(1)),r=a(3),i=a.n(r),c=a(0),d=a(17),u=a.n(d),f=a(6);new o.default({el:"#app",data:{topLists:null,topIndex:0,subData:0,rankData:0},created:function(){this.getTopList(),this.getSubList(0)},methods:{getTopList:function(){var t=this;i.a.get(c.a.topList).then(function(e){t.topLists=e.data.lists}).catch(function(t){console.log("something error")})},getSubList:function(t,e){var a=this;console.log(t,e),this.topIndex=t,0===t?this.getRank():i.a.get(c.a.subList,{id:e}).then(function(t){a.subData=t.data.data})},getRank:function(){var t=this;i.a.get(c.a.rank).then(function(e){t.rankData=e.data.data})},toSearch:function(t){location.href="search.html?keyword="+t.name+"&id="+t.id}},components:{Foot:u.a},mixins:[f.a]})},17:function(t,e,a){function n(t){a(40)}var s=a(8)(a(26),a(42),n,null,null);t.exports=s.exports},26:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(14),s=a.n(n),o=s.a.parse(location.search.substr(1)),r=o.index,i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}];e.default={data:function(){return{navConfig:i,curIndex:parseInt(r)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}}},40:function(t,e){},42:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{class:{active:n==t.curIndex},on:{click:function(a){t.changeNav(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]}},6:function(t,e,a){"use strict";var n={filters:{priceSwitch:function(t){return t.toFixed(2)}}};e.a=n},79:function(t,e){},9:function(t,e){}},[110]);
//# sourceMappingURL=category.a66dc9d2b529fe3a1025.js.map