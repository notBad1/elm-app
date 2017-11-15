<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';

  import Vue from 'vue';
  import axios from 'axios';
  Vue.prototype.$ajax = axios;

  const ERR_OK = 0;

  export default {
    created () {
      axios.get('api/seller')
        .then((res) => {
          if (res.data.errno === ERR_OK) {
            this.$store.state.Seller.seller = res.data.data;
          }
        });
      axios.get('api/ratings')
        .then((res) => {
          if (res.data.errno === ERR_OK) {
            this.$store.state.Ratings.ratings = res.data.data;
          }
        });
    },
    components: {
      'v-header': header
    },
    computed: {
      seller () {
        return this.$store.state.Seller.seller;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, .1))
      background-color: #fff
      .tab-item
        flex: 1
        text-align: center
        a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.router-link-active
            color: rgb(240, 20, 20)
</style>
