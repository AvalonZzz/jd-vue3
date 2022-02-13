<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/near.png" alt="">
        <div class="check__icon__tag">1</div>
      </div>
      <div class="check__info">总计：<span class="check__info__price">&yen;123</span></div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.check{
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: .01rem solid $content-bgColor;
  box-sizing: border-box;
  &__icon{
    position: relative;
    width: 0.84rem;
    &__img{
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: .12rem auto;
    }
    &__tag{
      position: absolute;
      right: .2rem;
      top: .04rem;
      width: 0.2rem;
      height: 0.2rem;
      line-height: .2rem;
      text-align: center;
      font-size: 0.12rem;
      color: $bg-color;
      background: $highlight-fontColor;
      border-radius: 50%;
      transform: scale(.5);
    }
  }
  &__info{
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price{
      line-height: .49rem;
      font-size: 0.18rem;
      color: $highlight-fontColor;
    }
  }
  &__btn{
    width: 0.98rem;
    text-align: center;
    font-size: 0.14rem;
    color: $bg-color;
    background: #4fb0f9;
  }
}
</style>
