<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__bgcor"></div>
      <div class="top__header">
        <div class="iconfont top__header__back">&#xe679;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">zzz(先生)</span>
          <span class="top__receiver__info__name">19951677889</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe679;</div>
      </div>
    </div>
    <div class="products">
      <div class="products__title">{{shopName}}</div>
      <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id">
          <img class="products__item__img" :src="item.imgUrl" alt="">
          <div class="products__item__detail">
            <h4 class="products__item__title">{{item.name}}</h4>
            <p class="products__item__price">
              <span class="products__item__single"><span class="products__item__yen">&yen; </span>{{item.price}} x {{item.count}}</span>
              <span class="products__item__total"><span class="products__item__origin">&yen; {{item.price * item.count}}</span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects.js'
export default {
  name: 'OrderConfirmation',

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
.wrapper{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}
.top{
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__header{
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
    &__back{
      position: absolute;
      left: .18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: #fff;
    border-radius: .04rem;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      line-height: .22rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__info{
      padding: .06rem 0 0 .16rem;
      font-size: 0.12rem;
      color: #666;
      &__name{
        display: inline-block;
        margin-right: 0.06rem;
        line-height: .18rem;
      }
    }
    &__icon{
      position: absolute;
      right: .16rem;
      top: .5rem;
      font-size: 0.16rem;
      color: #666;
      transform: rotate(180deg);
    }
  }
}
.products{
  margin: .16rem .18rem .55rem .18rem;
  font-size: 0.16rem;
  background: #fff;
  &__title{
    padding: .16rem .16rem 0 .16rem;
    line-height: .22rem;
    font-size: 0.16rem;
    color: #333;
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
      color: #333;
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
