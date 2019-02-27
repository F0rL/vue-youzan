<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style>
  .swiper-wrapper img {
    height: 100%;
    width: 100%
  }
</style>

<script>
  //swipe对dom节点进行操作
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'swipe',
    props: {
      lists: {
        type: Array,
        required: true,
      },
      name: {},
    },
    methods: {
      init(){
        new Swiper('.swiper-container', {
          autoplay: {
            delay: 2000,
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        })
      }
    },
    mounted(){
      this.init()
    }
  }
</script>

