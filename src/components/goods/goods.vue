<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    computed: {
      seller () {
        return this.$store.state.Seller.seller;
      },
      goods () {
        return this.$store.state.Goods.goods;
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .goods
    position: absolute
    top: 174px
    bottom: 46px
    display: flex
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
    .foods-wrapper
      flex: 1
</style>
