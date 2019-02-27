import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

let app = new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    //如果将rankData、subData设置为null，会导致null有报错
    subData: 0,
    rankData: 0,
  },
  created() {
    this.getTopList(),
    this.getSubList(0)
  },
  methods: {
    getTopList() {
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
      }).catch(res => {
        console.log("something error")
      })
    },
    getSubList(index, id) {
      console.log(index,id)
      this.topIndex = index
      if(index === 0) {
        this.getRank()
      }else {
        axios.get(url.subList, {id}).then(res => {
          this.subData = res.data.data
        })
      }
    },
    getRank() {
      axios.get(url.rank).then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  components: {
    Foot
  },
  // filters: {
  //   priceSwitch(price) {
  //     return price.toFixed(2)
  //   }
  // }
  mixins: [mixin]
})