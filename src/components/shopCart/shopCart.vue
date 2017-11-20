<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'logo-highlight': totalCount}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalCount" class="num">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'highlight': highlight}"> {{payDesc}} </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        highlight: false
      };
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {  // 选中商品的数组
        type: Array,
        default () {
          return [
            {
              price: 2,
              count: 1
            },
            {
              price: 12,
              count: 2
            },
            {
              price: 12,
              count: 2
            }
          ];
        }
      }
    },
    computed: {
      totalPrice () { // 选中商品的总价格
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () { // 选中商品的总数
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {  // 比较选中商品总价格和起送价格
        if (this.totalPrice === 0) {
          return `￥${this.minPrice} 起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差 ￥${this.minPrice - this.totalPrice} 起送`;
        } else {
          this.highlight = true;
          return '去结算';
        }
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
          position: relative
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
            &.logo-highlight
              background-color: rgb(0, 160, 220)
              .icon-shopping_cart
                color: #fff
            .icon-shopping_cart
              font-size: 24px
              line-height: 46px
              color: #80858A
          .num
            position: absolute
            top: 0
            left: 32px
            width: 24px
            line-height: 16px
            background-color: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
            border-radius: 12px
            font-size: 9px
            font-weight: 700
            color: #fff
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
        flex: 0 0 100px
        width: 100px
        .pay
          height: 46px
          line-height: 46px
          text-align: center
          background-color: #2B333B
          font-size: 12px
          font-weight: 700
          &.highlight
            background-color: #00b43c
            color: #fff
</style>
