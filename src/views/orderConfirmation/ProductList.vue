<template>
  <div>
    <div class="products">
      <div class="products__title">{{shopName}}</div>
      <div class="products__list">
        <template v-for="item in productList" :key="item._id">
          <div class="products__item" v-if="item.count > 0">
            <img class="products__item__img" :src="item.imgUrl" alt="">
            <div class="products__item__detail">
              <h4 class="products__item__title">{{item.name}}</h4>
              <p class="products__item__price">
                <span class="products__item__single"><span class="products__item__yen">&yen; </span>{{item.price}} x {{item.count}}</span>
                <span class="products__item__total"><span class="products__item__origin">&yen; {{(item.price * item.count).toFixed(2)}}</span></span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects.js'
export default {
  name: 'ProductList',

  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.products{
  margin: .16rem .18rem .55rem .18rem;
  font-size: 0.16rem;
  background: $bg-color;
  &__title{
    padding: .16rem .16rem 0 .16rem;
    line-height: .22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &_list{
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.4rem;
  }
  &__item{
    position: relative;
    display: flex;
    padding: .16rem;
    &__img{
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail{
      flex: 1;
      overflow: hidden;
    }
    &__title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price{
      display: flex;
      margin-top: 0.06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__total{
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen{
      font-size: 0.12rem;
    }
  }
}
</style>
