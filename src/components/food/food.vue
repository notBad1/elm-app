<template>
  <div class="food" v-show="showFlag">

  </div>
</template>

<script>
  export default{
    props: {
      food: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus">
  .food
    position: fixed
    top: 0
    bottom: 48px
    left: 0
    z-index: 20
    width: 100%
    background-color: #fff;
</style>
