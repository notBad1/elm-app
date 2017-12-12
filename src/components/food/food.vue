<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            <div class='cartControl-wrapper'>
              <div class="btn" v-show="!food.count" @click="addCart">加入购物车</div>
              <v-cartControl ref="cartControl" v-show="food.count" :food="food" @target="drop"></v-cartControl>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <div class="content">
          <h1 class="title">商品介绍</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-ratingselect :ratings="food.ratings" :desc="desc" :selectType="selectType"
                          @showType="needShow"></v-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="selectType === rating.rateType || selectType === 2" class="rating-list"
                  v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar">
                </div>
                <div class="time">
                  <span>{{timeData(rating.rateTime)}}</span>
                </div>
                <div class="text">
                  <i
                    :class="{ 'icon-thumb_down' : rating.rateType === 0 , 'icon-thumb_up': rating.rateType === 1 }"></i>
                  {{rating.text}}
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from 'components/cartControl/cartControl.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import BScroll from 'better-scroll';
  import Vue from 'vue';

  export default{
    data () {
      return {
        showFlag: false,
        selectType: 2,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = 2;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        });
      },
      hide () {
        this.showFlag = false;
      },
      timeData (time) {
        let myDate = new Date(time);
        let y = myDate.getFullYear();
        let M = myDate.getMonth();
        let d = myDate.getDate();
        let h = myDate.getHours();
        let m = myDate.getMinutes();
        M = M < 10 ? '0' + M : M;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return y + '-' + M + '-' + d + ' ' + h + ':' + m;
      },
//      子组件触发
      needShow (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      addCart (e) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      drop (target) {
        this.$emit('foodTarget', target);
      }
    },
    components: {
      'v-cartControl': cartControl,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"

  .food
    position: fixed
    top: 0
    bottom: 46px
    left: 0
    z-index: 20
    width: 100%
    background-color: #fff
    &.move-enter-active, &.move-leave-active
      transition: all .4s
      transform: translate3d(0, 0, 0);
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0);
    .food-content
      .img-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position absolute
          left: 10px
          top: 15px
          padding: 8px
          border-radius: 50%
          background-color: rgba(0, 0, 0, .5)
          .icon-arrow_lift
            color: #fff

      .content
        padding: 18px
        border-1px(rgba(7, 17, 27, .1))
        .title
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          line-height: 24px
          font-size: 16px
          font-weight: 700
          color: rgb(240, 20, 20)
          .old
            line-height: 24px
            font-size: 10px
            font-weight: 400
            color: rgb(147, 153, 159)
            text-decoration: line-through
          .cartControl-wrapper
            position: absolute
            right: 18px
            bottom: 18px
            .btn
              line-height: 12px
              padding: 6px 12px
              border-radius: 12px
              background: rgb(0, 160, 220)
              color: #fff
              font-size: 10px
        .text
          padding: 0 8px
          line-height: 24px
          font-size: 12px
          font-weight: 200
          color: rgb(77, 85, 93)
      .rating
        .title
          padding: 18px 18px 0 18px
          line-height: 14px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .rating-wrapper
          ul
            .rating-list
              padding 16px 0;
              margin 0 18px
              border-1px(rgba(7, 17, 27, .1))
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
              overflow: hidden
              .user
                float: right
                .name
                  vertical-align: top
                img
                  vertical-align: top
                  width: 12px;
                  height: 12px
                  margin-left: 6px
                  border-radius: 50%
              .text
                margin-top: 6px
                line-height: 16px
                font-size: 12px
                color: rgb(7, 17, 27)
                i
                  line-height: 24px
                  margin-right: 4px
                  font-size: 12px
                  &.icon-thumb_up
                    color: rgb(0, 160, 220)
                  &.icon-thumb_down
                    color: rgb(147, 153, 159)
          .no-rating
            padding: 16px 0
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
