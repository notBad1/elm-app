<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right"> ￥{{minPrice}}起送 </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      'deliveryPrice': {
        type: Number
      },
      'minPrice': {
        type: Number
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/icon.css"
  .shopCart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 46px
    .content
      display: flex
      background-color: #141d27
      color: rgba(225, 225, 225, .4)
      .content-left
        flex: 1
        display: flex
        position: relative;
        top: -10px;
        .logo-wrapper
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 58px
          border-radius: 50%
          box-sizing: border-box
          background-color: #141d27
          text-align: center
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            .icon-shopping_cart
              font-size: 24px
              line-height: 46px
              color: #80858A
        .price
          margin: 22px 0 12px 0
          padding-right: 12px
          line-height: 24px;
          border-right: 1px solid rgba(225, 225, 225, .1)
          font-size: 16px
          font-weight: 700
        .desc
          margin: 22px 0 12px 0
          padding-left: 12px
          line-height: 24px;
          font-size: 10px
      .content-right
        flex: 0 0 80px
        width: 80px
        padding: 0 8px
        line-height: 46px
        background-color: #2B333B
        text-align: center
        font-size: 12px
        font-weight: 700
</style>
