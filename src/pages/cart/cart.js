import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'
import velocity from 'velocity-animate'
import Cart from 'js/cartService.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: '',
  },
  computed: {
    allSelected: {
      get() {
        if(this.lists&&this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if(this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if(this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    //选择状态
    selectLists() {
      if(this.lists&&this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    //编辑状态
    removeLists() {
      if(this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //获取原始数据并初始化
    getList() {
      axios.get(url.cartLists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked =false
          })
        })
        this.lists = lists
      })
    },
    //点击选择单独商品
    selectGood(shop,good) {
      // console.log(good.checked)
      // console.log(shop)
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    //点击选择商店
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    //全选按钮
    selectAll() {
      // console.log(this.allSelected)
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    //切换编辑和完成状态
    edit(shop,shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      // 隐藏其他店铺
      this.lists.forEach((item,i) => {
        if(shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(good) {
      if(good.number === 1) return
      // axios.post(url.cartReduce, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number--
      // })
      Cart.reduce(good.id).then(res => {
        good.number--
      })
    },
    add(good) {
      // axios.post(url.cartAdd, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number++
      // })
      Cart.add(good.id).then(res => {
        good.number++
      })
    },
    remove(shop,shopIndex,good,goodIndex) {
      this.removePopup = true
      this.removeData = {shop,shopIndex,good,goodIndex}
      this.removeMsg = '确认要删除该商品么？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },
    
    removeConfirm() {
      if(this.removeMsg === '确认要删除该商品么？') {
        let {shop,shopIndex,good,goodIndex} = this.removeData
        axios.post(url.cartRemove, {
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if(!shop.goodsList.length) {
            this.lists.splice(shopIndex,1)
            this.removeShop()
          }
          this.removePopup = false

          //解决滑动删除单项后下一个继承样式的问题
          // this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left = '0px'
        })
      }else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then(res => {
          let arr =[]
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id == good.id
            })
            if(index === -1) {
              arr.push(good)
            }
          })
          if(arr.length) {
            this.editingShop.goodsList = arr
          }else {
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }

    },
    // 删除店铺重置状态
    removeShop() {
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    // 拖动删除效果
    start(e, good) {
      good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good, goodIndex) {
      
      let endX = e.changedTouches[0].clientX
      // console.log(endX,good.startX)
      let left = '0'
      if(good.startX - endX > 100){
        left = '-60px'
      }
      if(endX - good.startX > 100){
        left = '0px'
      }
      // console.log(this.$refs[`goods-${shopIndex}-${goodIndex}`])
      velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
        left
      })
    }
  },
  mixins: [mixin]
})