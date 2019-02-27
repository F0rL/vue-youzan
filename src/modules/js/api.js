let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topList: '/category/topList',
  rank: '/category/rank',
  subList: '/category/subList',
  searchList: '/search/list',
  details: '/goods/details',
  deal: '/goods/deal',
  cartAdd: '/cart/add',
  cartLists: '/cart/list',
  cartReduce: '/cart/reduce',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressLists: '/address/list',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault',
}
// 开发环境和真是环境切换
// let host = ''
// 备用接口
// const host = 'http://rap2api.taobao.org/app/mock/7058'
// 个人接口
const host = 'https://easy-mock.com/mock/5bea1e7f12ea3f1cbb0fd9f6'
for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key];
  }
}

export default url