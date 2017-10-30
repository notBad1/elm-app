<template>
  <div id="app">
    <Header></Header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue';
  export default {
    components: {
      Header: Header
    }
  };
</script>

<style lang="stylus">
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      align-items: center
      .tab-item
        flex: 1
        text-align: center
</style>
