<template>
  <span class="icon" :class="[iconSize, classMap[type]+'-'+ color + '-'+ size]"></span>
</template>
<script>
  export default{
    data () {
      return {
        classMap: []
      };
    },
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      },
      color: {
        type: String
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    computed: {
      iconSize () {
        return 'icon-' + this.size;
      }
    }
  };
</script>
<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
    &.icon-24
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px
    &.icon-32
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px
    &.decrease-c-24
      bg-image("decrease_1")
    &.discount-c-24
      bg-image("discount_1")
    &.guarantee-c-24
      bg-image("guarantee_1")
    &.invoice-c-24
      bg-image("invoice_1")
    &.special-c-24
      bg-image("special_1")
    &.decrease-c-32
      bg-image("decrease_2")
    &.discount-c-32
      bg-image("discount_2")
    &.guarantee-c-32
      bg-image("guarantee_2")
    &.invoice-c-32
      bg-image("invoice_2")
    &.special-c-32
      bg-image("special_2")
    &.decrease-w-24
      bg-image("decrease_3")
    &.discount-w-24
      bg-image("discount_3")
    &.guarantee-w-24
      bg-image("guarantee_3")
    &.invoice-w-24
      bg-image("invoice_3")
    &.special-w-24
      bg-image("special_3")
    &.decrease-w-32
      bg-image("decrease_4")
    &.discount-w-32
      bg-image("discount_4")
    &.guarantee-w-32
      bg-image("guarantee_4")
    &.invoice-w-32
      bg-image("invoice_4")
    &.special-w-32
      bg-image("special_4")
</style>
