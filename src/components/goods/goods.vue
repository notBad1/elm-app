<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu_wrapper">
      <ul>
        <li v-for="(item, i) in goods" class="menu-item" :key="i" :data-i="i" :class="{'current': i === currentIndex }"
            @click="_clickJump(i)">
          <span class="text"><v-icon v-show="item.type > 0" :size="24" color="w" :type="item.type"></v-icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods_wrapper">
      <ul>
        <li v-for="(item, i) in goods" class="food-list food-list-hook" :key="i">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <v-shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-shopCart>
  </div>
</template>
<script type="text/ecmascript-6">
  import icon from 'components/icon/icon.vue';
  import shopCart from 'components/shopCart/shopCart.vue';
  import BScroll from 'better-scroll';

  import Vue from 'vue';
  import axios from 'axios';
  Vue.prototype.$ajax = axios;

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object  // 商家数据
      }
    },
    data () {
      return {
        goods: [], //  商品数据
        listHeight: [], // 右侧区块到顶部高度的数组
        scrollY: 0  // 滚动的高度
      };
    },
    components: {
      'v-icon': icon,
      'v-shopCart': shopCart // 底部购物车
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
//      使用better-scroll 初始化左侧菜单和右侧列表
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menu_wrapper, {
          click: true // 是否派发click事件
        });
        this.foodsScroll = new BScroll(this.$refs.foods_wrapper, {
          probeType: 3 // 监测实时滚动的位置
        });
        // 监测实时滚动的位置
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));// 取整数 取绝对值、正值；
        });
      },
//      计算右侧列表没一区块距离顶部的距离,并把他们组成一个数组
      _calculateHeight () {
        let foodList = this.$refs.foods_wrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
//      点击跳转
      _clickJump (index, event) {
        let height;
        for (let i = 0; i < this.listHeight.length; i++) {
          if (i === index) {
            height = this.listHeight[i];
          }
        }
//        滚动到某个位置
        this.foodsScroll.scrollTo(0, -height);
        this.scrollY = height;
      }
    },
    created: function () {
      axios.get('api/goods')
        .then((res) => {
          if (res.data.errno === ERR_OK) {
            this.goods = res.data.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          }
        });
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    position: absolute
    top: 174px
    bottom: 46px
    display: flex
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 100%
        line-height: 14px
        &.current
          position relative
          margin-top: -1px
          z-index: 120
          background-color: #fff
          font-weight: 700
          .text
            border-no()
        .text
          display: table-cell
          padding 0 12px
          text-align: center
          vertical-align: middle
          font-size: 12px
          font-weight: 200
          border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper
      flex: 1
      .food-list
        color: rgb(147, 153, 159)
        .title
          height: 26px
          line-height 26px
          padding-left: 14px
          border-left: 2px solid #d9dde1
          background-color: #f3f5f7
          font-size: 12px
      .food-item
        display flex
        margin: 0 18px
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-no()
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin-top: 2px
            margin-bottom: 8px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .description, .extra
            line-height: 10px
            font-size: 10px
          .extra
            margin: 8px 0
            .count
              margin-right: 12px
          .price
            line-height: 24px
            .now
              font-size: 14px
              color: rgb(240, 20, 20)
              font-weight: 700
            .old
              font-size: 10px
              color: rgb(147, 153, 159)
              font-weight: 400
              text-decoration: line-through
</style>
