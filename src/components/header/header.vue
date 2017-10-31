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
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          <span class="number">{{seller.supports.length}}个 <i class="icon-keyboard_arrow_righ"></i></span>
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
    }
  };
</script>

<style lang="stylus">

  @import "../../common/stylus/base.styl"
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    background: #000
    .content-wrapper
      display: flex
      padding: 24px 12px 18px 24px
      .avatar
        width: 64px
        height: 64px
      .content
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
            background-size : 30px 18px
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
          font-weight: 200
        /*.supports*/

</style>
