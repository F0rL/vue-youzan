import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data: {
    searchList: null,
    keyword,
    isShow: false,
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      this.loading = true
      axios.post(url.searchList, {id, keyword}).then(res => {
          this.searchList = res.data.lists
      })
    },
    move() {
      this.isShow = scrollY > 160 ? true : false
    },
    toTop() {
      Velocity(document.body, 'scroll', {duration: 1000})
    }
  },
  mixins: [mixin]
})
