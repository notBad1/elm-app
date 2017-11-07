<template>
  <div class="header">
    <!--内容-->
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
          <div class="supports-count" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景图-->
    <div class="h-bg">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!--
           公告弹出浮层———— CSS Sticky footer 布局
          如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送
     -->
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <!--页面底部——关闭按钮-->
      <div class="detail-close">
        <i class="icon-close" @click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
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
    position: relative
    color: #fff
    background: rgba(7, 17, 27, .5)
    overflow: hidden
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
            top: 0
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
              margin-left: 2px
              font-size: 10px

    .bulletin-wrapper
      display: flex
      align-items: center
      height: 28px
      padding: 0 12px
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        flex: 1
        margin: 0 4px
        font-size: 10px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .icon-keyboard_arrow_right
        font-size: 10px
    .h-bg
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: -1
      filter: blur(10px)
    .detail
      position fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7, 17, 27, .8)
      .detail-wrapper
        min-height: 100%
        .detail-main
          margin-top: 64px;
          padding-bottom: 64px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
