<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="all">{{desc.all}} <span class="count">{{ratings && ratings.length}}</span></span>
      <span @click="select(1,$event)" class="positive">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
      <span @click="select(0,$event)" class="negative">{{desc.negative}} <span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="swith">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 1;
  const NEGATIVE = 0;
//  const ALL = 2;
  export default{
    props: {
      ratings: {
        type: Array
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          };
        }
      }
    },
    computed: {
      positives () {
        let newRatings = [];
        if (this.ratings) {
          this.ratings.map((rating) => {
            if (rating.rateType === POSITIVE) {
              newRatings.push(rating);
            }
          });
        }
        return newRatings;
      },
      negatives () {
        let newRatings = [];
        if (this.ratings) {
          this.ratings.map((rating) => {
            if (rating.rateType === NEGATIVE) {
              newRatings.push(rating);
            }
          });
        }
        return newRatings;
      }
    },
    methods: {
      select (type, $event) {

      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      margin: 0 18px
      padding: 18px 0
      border-1px(rgba(7, 17, 27, .1))
      .all, .positive, .negative
        display: inline-block
        line-height: 16px
        margin-right: 8px
        padding: 8px 12px
        border-radius: 2px
        font-size: 12px
        color: rgb(77, 85, 93)
        .count
          font-size: 8px
      .all
        background-color: rgb(0, 160, 220)
        color: #fff
      .positive
        background-color: rgba(0, 160, 220, .2)
      .negative
        background-color: rgba(77, 85, 93, .2)
    .swith
      display: flex
      align-items: center
      height: 24px
      padding: 12px 18px
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      color: rgb(147, 153, 159)
      font-size: 0
      .icon-check_circle
        margin-right: 4px
        font-size: 24px
      .text
        font-size: 12px
</style>
