webpackJsonp([5],{0:function(e,t,i){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",rank:"/category/rank",subList:"/category/subList",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",addressAdd:"/address/add",addressRemove:"/address/remove",addressLists:"/address/list",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var o in n)n.hasOwnProperty(o)&&(n[o]="https://easy-mock.com/mock/5bea1e7f12ea3f1cbb0fd9f6"+n[o]);t.a=n},108:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(71),o=(i.n(n),i(72)),s=(i.n(o),i(70)),r=(i.n(s),i(1)),c=i(6),d=i(3),a=i.n(d),h=i(0),u=i(24),f=i.n(u),l=i(68);new r.default({el:".container",data:{lists:null,total:0,editingShop:null,editingShopIndex:-1,removePopup:!1,removeData:null,removeMsg:""},computed:{allSelected:{get:function(){return!(!this.lists||!this.lists.length)&&this.lists.every(function(e){return e.checked})},set:function(e){this.lists.forEach(function(t){t.checked=e,t.goodsList.forEach(function(t){t.checked=e})})}},allRemoveSelected:{get:function(){return!!this.editingShop&&this.editingShop.removeChecked},set:function(e){this.editingShop&&(this.editingShop.removeChecked=e,this.editingShop.goodsList.forEach(function(t){t.removeChecked=e}))}},selectLists:function(){if(this.lists&&this.lists.length){var e=[],t=0;return this.lists.forEach(function(i){i.goodsList.forEach(function(i){i.checked&&(e.push(i),t+=i.price*i.number)})}),this.total=t,e}return[]},removeLists:function(){if(this.editingShop){var e=[];return this.editingShop.goodsList.forEach(function(t){t.removeChecked&&e.push(t)}),e}return[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;a.a.get(h.a.cartLists).then(function(t){var i=t.data.cartList;i.forEach(function(e){e.checked=!0,e.removeChecked=!1,e.editing=!1,e.editingMsg="编辑",e.goodsList.forEach(function(e){e.checked=!0,e.removeChecked=!1})}),e.lists=i})},selectGood:function(e,t){var i=this.editingShop?"removeChecked":"checked";t[i]=!t[i],e[i]=e.goodsList.every(function(e){return e[i]})},selectShop:function(e){var t=this.editingShop?"removeChecked":"checked";e[t]=!e[t],e.goodsList.forEach(function(i){i[t]=e[t]})},selectAll:function(){var e=this.editingShop?"allRemoveSelected":"allSelected";this[e]=!this[e]},edit:function(e,t){e.editing=!e.editing,e.editingMsg=e.editing?"完成":"编辑",this.lists.forEach(function(i,n){t!==n&&(i.editing=!1,i.editingMsg=e.editing?"":"编辑")}),this.editingShop=e.editing?e:null,this.editingShopIndex=e.editing?t:-1},reduce:function(e){1!==e.number&&l.a.reduce(e.id).then(function(t){e.number--})},add:function(e){l.a.add(e.id).then(function(t){e.number++})},remove:function(e,t,i,n){this.removePopup=!0,this.removeData={shop:e,shopIndex:t,good:i,goodIndex:n},this.removeMsg="确认要删除该商品么？"},removeList:function(){this.removePopup=!0,this.removeMsg="确定将所选 "+this.removeLists.length+" 个商品删除？"},removeConfirm:function(){var e=this;if("确认要删除该商品么？"===this.removeMsg){var t=this.removeData,i=t.shop,n=t.shopIndex,o=t.good,s=t.goodIndex;a.a.post(h.a.cartRemove,{id:o.id}).then(function(t){i.goodsList.splice(s,1),i.goodsList.length||(e.lists.splice(n,1),e.removeShop()),e.removePopup=!1})}else{var r=[];this.removeLists.forEach(function(e){r.push(e.id)}),a.a.post(h.a.cartMremove,{ids:r}).then(function(t){var i=[];e.editingShop.goodsList.forEach(function(t){-1===e.removeLists.findIndex(function(e){return e.id==t.id})&&i.push(t)}),i.length?e.editingShop.goodsList=i:(e.lists.splice(e.editingShopIndex,1),e.removeShop()),e.removePopup=!1})}},removeShop:function(){this.editingShop=null,this.editingShopIndex=-1,this.lists.forEach(function(e){e.editing=!1,e.editingMsg="编辑"})},start:function(e,t){t.startX=e.changedTouches[0].clientX},end:function(e,t,i,n){var o=e.changedTouches[0].clientX,s="0";i.startX-o>100&&(s="-60px"),o-i.startX>100&&(s="0px"),f()(this.$refs["goods-"+t+"-"+n],{left:s})}},mixins:[c.a]})},28:function(e,t,i){"use strict";function n(e,t){return new s.a(function(i,n){(t?c.a.post(e,t):c.a.get(e,t)).then(function(e){var t=e.data.status;200===t&&i(e),300===t&&(location.href="login.html",i(e)),n(e)}).catch(function(e){n(res)})})}var o=i(47),s=i.n(o),r=i(3),c=i.n(r);t.a=n},6:function(e,t,i){"use strict";var n={filters:{priceSwitch:function(e){return e.toFixed(2)}}};t.a=n},68:function(e,t,i){"use strict";var n=i(48),o=i.n(n),s=i(49),r=i.n(s),c=i(28),d=i(0),a=function(){function e(){o()(this,e)}return r()(e,null,[{key:"add",value:function(e){return i.i(c.a)(d.a.cartAdd,{id:e,number:1})}},{key:"reduce",value:function(e){return i.i(c.a)(d.a.cartReduce,{id:e,number:1})}}]),e}();t.a=a},70:function(e,t){},71:function(e,t){},72:function(e,t){}},[108]);
//# sourceMappingURL=cart.7cee415b8f104565e598.js.map