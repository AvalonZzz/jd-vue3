<template>
  <div>
    <div class="docker">
      <div :class="['docker__item', {'docker__item--active': index===active}]" v-for="(item, index) in dockerList" :key="index">
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon"></div>
          <div class="docker__title">{{item.text}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',

  setup () {
    const dockerList = [
      {
        icon: '&#xe8b9;',
        text: '首页',
        to: { name: 'Home' }
      },
      {
        icon: '&#xe61a;',
        text: '购物车',
        to: { name: 'CartList' }
      },
      {
        icon: '&#xe645;',
        text: '订单',
        to: { name: 'Home' }
      },
      {
        icon: '&#xe600;',
        text: '我的',
        to: { name: 'Home' }
      }
    ]
    const active = 0
    return { dockerList, active }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.docker {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  padding: 0 0.18rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
  background: $bg-color;
  box-sizing: border-box;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem auto 0.02rem;
    }
    .docker__title {
      line-height: 0.14rem;
      font-size: 0.2rem;
      transform: scale(0.5);
      transform-origin: center top;
    }
    a{
      text-decoration: none;
      color: $content-fontcolor;
    }
    &--active {
      color: #1fa4fc;
    }
  }
}
</style>
