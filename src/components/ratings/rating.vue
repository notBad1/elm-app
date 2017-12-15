<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect :ratings="ratings" :desc="desc" :selectType="selectType" @showType="needShow"></v-ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="rating.rateType === selectType || selectType === 2" class="rating-item"
              v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="36" :score="rating.score"></v-star>
                <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <i :class="{'icon-thumb_down': rating.rateType === 0,'icon-thumb_up': rating.rateType === 1}"></i>
                <span class="recommend-item" v-show="rating.recommend && rating.recommend.length"
                      v-for="recommend in rating.recommend">{{recommend}}</span>
              </div>
              <div class="time">{{timeData(rating.rateTime)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import BScroll from 'better-scroll';

  import Vue from 'vue';
  import axios from 'axios';
  Vue.prototype.$ajax = axios;

  const ERR_OK = 0;

  export default{
    data () {
      return {
        ratings: [],
        selectType: 2,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
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
      }
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    created () {
      axios.get('api/ratings')
        .then((res) => {
          if (res.data.errno === ERR_OK) {
            this.ratings = res.data.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        });
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: fixed
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex: 0 0 137px
          border-right: 1px solid rgba(7, 7, 27, .1)
          text-align: center
          .score
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .title
            margin: 6px 0 8px 0
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .rank
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-right
          flex: 1
          padding: 0 24px
          .score-wrapper
            display: flex
            align-items: top
            height: 18px
            margin-bottom: 8px
            .title
              margin-right: 12px
              font-size: 12px
              color: rgb(7, 17, 27)
            .score
              margin-left: 12px
              font-size: 12px
              color: rgb(255, 153, 0)
        .delivery-wrapper
          line-height: 18px
          .title
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            font-size: 12px
            color: rgb(147, 153, 159)
      .rating-wrapper
        ul
          .rating-item
            display: flex
            padding: 18px 0
            margin: 0 18px
            border-1px(rgba(7, 17, 27,.1))
            .avatar
              width: 28px
              height: 28px
              margin-right: 12px
              img
                width: 100%
                height: 100%
                border-radius: 50%

            .content
              position: relative
              flex: 1
              color: rgb(7, 17, 27)
              .name
                line-height: 12px
                font-size: 10px
              .star-wrapper
                display: flex
                align-items: center
                margin: 4px 0 6px 0
                .delivery
                  margin-left: 6px
                  font-size: 10px
                  font-weight: 200
                  color: rgb(147, 153, 159)
              .text
                line-height: 18px
                margin-bottom : 8px
                font-size: 12px
              .recommend
                line-height: 16px;
                color: rgb(147, 153, 159)
                i
                  line-height: 16px
                  font-size: 12px
                  &.icon-thumb_up
                    color: rgb(0, 160, 220)
                .recommend-item
                  margin-left: 8px
                  padding: 0 6px
                  border: 1px solid rgba(7, 17, 27, .1)
                  border-radius: 2px
                  background-color: #fff
                  font-size: 9px

              .time
                position: absolute
                top: 0
                right: 0
                line-height: 12px
                font-size: 10px
                font-weight: 200
                color: rgb(147, 153, 159)
</style>
