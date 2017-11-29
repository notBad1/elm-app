<template>
  <div class="shopCart">
    <div class="content" @click="toggleList">
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
    <div class="ball-container">
      <template v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook">1</div>
          </div>
        </transition>
      </template>
    </div>
    <transition name="fold">
      <div class="shopCart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="emptyList">清空</span>
        </div>
        <div class="list-content" ref="foodList">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                ￥<span>{{food.price * food.count}}</span>
              </div>
              <div class="cartControl-wrapper">
                <v-cartControl :food="food"></v-cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from 'components/cartControl/cartControl.vue';
  import BScroll from 'better-scroll';

  export default{
    data () {
      return {
        highlight: false,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true // 折叠
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
          return [];
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
          this.highlight = false;
          return `￥${this.minPrice} 起送`;
        } else if (this.totalPrice < this.minPrice) {
          this.highlight = false;
          return `还差 ￥${this.minPrice - this.totalPrice} 起送`;
        } else {
          this.highlight = true;
          return '去结算';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.foodList, {
                click: true
              });
            } else {
              // 重新计算better-scroll高度
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop (elm) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = elm;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);

            el.style.display = '';

            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;

            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter (el) {
        /* 触发浏览器重绘 */
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;

        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';

          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
        });
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList () {
        this.fold = true;
      },
      emptyList () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      }
    },
    components: {
      'v-cartControl': cartControl
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"
  .shopCart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 46px
    .content
      position: relative
      z-index: 50
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
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-active
          transition: all .4s cubic-bezier(.49, -0.29, .75, .41);
          .inner
            transition: all .4s linear;
        .inner
          width: 16px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 50%
          background-color: rgb(0, 160, 220)
          color: #fff
          font-size: 10px

    .shopCart-list
      position: absolute
      left: 0
      top: 0
      z-index: 40
      width: 100%
      transform: translate3d(0, -100%, 0)
      background-color: #fff
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        display: flex
        height: 40px
        line-height: 40px
        padding: 0 18px
        border-1px(rgba(7, 17, 27, .1))
        background-color: #f3f5f7
        .title
          flex: 1
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        padding-bottom: 20px
        max-height: 217px
        overflow: hidden
        ul
          .food
            display: flex
            align-items: center
            height: 48px
            border-1px(rgba(7, 17, 27, .1))
            .name
              flex: 1
              display: inline-block
              font-size: 14px
              color: rgb(7, 17, 27)
            .price
              margin-left: 18px
              margin-right: 12px
              font-size: 10px
              color: rgb(240, 20, 20)
              span
                font-size: 14px
                font-weight: 700
    .mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 30
      background: rgba(7, 17, 27, .6)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
        opacity: 1
      &.fade-enter, &.fade-leave-to
        opacity: 0

</style>
