<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count" @click.stop="decreaseCart"><i
        class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart"><i class="inner icon-add_circle"></i></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (e) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('target', e.target);
      },
      decreaseCart () {
        this.food.count--;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 169, 220)
      .inner
        display inline-block
      &.move-enter-active, &.move-leave-active
        transition all .5s
        transform translate3d(0, 0, 0)
        .inner
          transition all .5s
          transform rotate(0deg)
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      line-height 24px
      padding 6px
      vertical-align top
      font-size 10px
      color rgb(147, 153, 159)
</style>
