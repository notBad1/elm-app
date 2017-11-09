<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu_wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text"><v-icon v-show="item.type > 0" :size="24" color="w" :type="item.type"></v-icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods_wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
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
  </div>
</template>
<script type="text/ecmascript-6">
  import icon from 'components/icon/icon.vue';
  import BScroll from 'better-scroll';

  export default{
    components: {
      'v-icon': icon
    },
    computed: {
      seller () {
        return this.$store.state.Seller.seller;
      },
      goods () {
        this.$nextTick(() => {
          this._initScroll();
        });
        return this.$store.state.Goods.goods;
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menu_wrapper, {});
        this.foodsScroll = new BScroll(this.$refs.foods_wrapper, {});
      }
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
