<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemsClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script>
  const LENGH = 5; // 一共几个星
  const CLS_ON = 'on';   // 星星的class 全的
  const CLS_HALF = 'half';// 星星的class 半个
  const CLS_OFF = 'off';// 星星的class 空的
  export default{
    props: { // 需要父组件传入的值
      size: {// 大小
        type: Number
      },
      score: {// 分数
        type: Number
      }
    },
    computed: { // 计算属性
      starType () { //  星星的大小
        return 'star-' + this.size;
      },
      itemsClasses () { // 星星个数， 星星是全的、一半、空的
        let result = [];  // 函数返回结果 数组
        let score = Math.floor(this.score * 2) / 2; //  向下取 0.5倍数
        let integer = Math.floor(score); // 向下取整数，获取有多少个全星

        for (let i = 0; i < integer; i++) { // 遍历全星数，来想数组添加全星
          result.push(CLS_ON);
        }
        if (score % 1 !== 0) {  // 判断分数是不是有小数，如果有小说，就像数组添加半星
          result.push(CLS_HALF);
        }
        while (result.length < LENGH) { // 循环 如果全星和半星的个数小于星星的最大个数，就向数组添加空星
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image("star48_on")
        &.half
          bg-image("star48_half")
        &.off
          bg-image("star48_off")
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 16px
        background-size: 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image("star36_on")
        &.half
          bg-image("star36_half")
        &.off
          bg-image("star36_off")
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image("star24_on")
        &.half
          bg-image("star24_half")
        &.off
          bg-image("star24_off")


</style>
