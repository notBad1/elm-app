<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/ratings">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/ratings">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue';

  export default {
    components: {
      'v-header': Header
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
