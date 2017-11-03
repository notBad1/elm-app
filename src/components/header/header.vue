<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          <div class="supports-count">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl"
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"

  .header
    color: #fff
    background: #999
    .content-wrapper
      display: flex
      padding: 24px 12px 18px 24px
      .avatar
        width: 64px
        height: 64px
      .content
        flex: 1
        padding: 2px 0
        margin-left: 16px
        .title
          margin-bottom: 8px;
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            line-height: 18px
            font-size: 16px
            font-weight: 900
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          position relative
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            margin-left: 4px
            line-height: 12px
            vertical-align: top
            font-size: 10px
            font-weight: 200
          .supports-count
            position: absolute
            top: -5px
            right: 0
            padding: 0 8px
            display: flex
            justify-content: center
            align-items: center
            height: 24px
            border-radius: 14px
            background-color: rgba(0, 0, 0, .2)
            .count
              font-size: 10px
            .icon-keyboard_arrow_right
              font-size: 10px

</style>
