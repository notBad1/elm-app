<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="remark-item">
            <h2 class="title">起送价</h2>
            <div class="content"><span class="stress">{{seller.minPrice}}</span>元</div>
          </li>
          <li class="remark-item">
            <h2 class="title">商家配送</h2>
            <div class="content"><span class="stress">{{seller.deliveryPrice}}</span>元</div>
          </li>
          <li class="remark-item">
            <h2 class="title">平均配送时间</h2>
            <div class="content"><span class="stress">{{seller.deliveryTime}}</span>分钟</div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{active: favorite}"></i>
          <p class="text">{{favoriteText}}</p>
        </div>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">{{seller.bulletin}}</div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="item in seller.supports" class="support-item">
            <v-icon :size="32" color="w" :type="item.type"></v-icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家信息</h1>
        <ul class="info">
          <li class="info-item" v-for="info in seller.infos">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import icon from 'components/icon/icon.vue';
  import BScroll from 'better-scroll';

  import Vue from 'vue';
  import axios from 'axios';
  Vue.prototype.$ajax = axios;

  const ERR_OK = 0;

  export default{
    data () {
      return {
        seller: [],
        favorite: false
      };
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-icon': icon
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavorite () {
        if (this.favorite) {
          this.favorite = false;
        } else {
          this.favorite = true;
        }
      }
    },
    created () {
      axios.get('api/seller')
        .then((res) => {
          if (res.data.errno === ERR_OK) {
            this.seller = res.data.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.seller, {
                click: true
              });
            });
            // 商家图片横向滚动
            if (this.seller.pics) {
              let picWidth = 120;
              let margin = 6;
              let width = (picWidth + margin) * this.seller.pics.length - margin;
              this.$refs.picList.style.width = width + 'px';
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            }
          }
        });
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"

  .seller
    position: fixed
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        position: relative
        padding 18px 0
        margin: 0 18px
        .title
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc
          display: flex
          padding-bottom: 18px
          margin-top: 8px
          border-1px(rgba(7, 17, 27, .1))
          .text
            margin-left: 8px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
        .remark
          margin-top: 18px
          display: flex
          .remark-item
            flex: 1
            border-right: 1px solid rgba(7, 17, 27, .1)
            text-align: center
            &:last-child
              border-right: 0
            .title
              line-height: 10px
              margin-bottom: 4px
              font-size: 10px
              color: rgb(147, 153, 159)
            .content
              line-height: 24px
              font-size: 10px
              color: rgb(7, 17, 27)
              font-weight: 200
              .stress
                font-size: 24px

        .favorite
          position: absolute
          top: 18px
          right: 0
          text-align: center
          i
            line-height: 24px
            font-size: 24px
            color: rgb(147, 153, 159)
            &.active
              color: rgb(240, 20, 20)
          .text
            line-height: 10px
            margin-top: 4px
            font-size: 10px
            color: rgb(77, 85, 93)
      .pics
        padding-top: 18px
        margin: 0 18px
        .title
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .content-wrapper
          margin-top: 8px
          padding-bottom: 16px
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
          font-weight: 200
          border-1px(rgba(7, 17, 27, .1))
        .supports
          .support-item
            padding: 16px 12px
            border-1px(rgba(7, 17, 27, .1))
            &:last-child
              border-no()
            .text
              line-height: 16px
              font-size: 12px
              font-weight: 200
              color: rgb(7, 17, 27)
        .pic-wrapper
          padding: 12px 0 18px 0
          width: 100%
          overflow: hidden
          .pic-list
            font-size: 0
            .pic-item
              display inline-block
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &:last-child
                margin-right: 0
        .info
          margin-top: 12px
          .info-item
            padding 16px 12px
            border-top: 1px solid rgba(7, 17, 27, .1)
            line-height: 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
</style>
