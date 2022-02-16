<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all"><span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe652;' :  '&#xe619;'" @click="setCartItemsChecked(shopId)"></span>全选</div>
        <div class="product__header__clear"><span @click="cleanCartProducts(shopId)">清空购物车</span></div>
      </div>
      <template v-for="(item) in productList" :key="item._id">
        <div class="product__item" v-if="item.count">
          <div class="product__item__checked iconfont" v-html="item.check ? '&#xe652;' : '&#xe619;'" @click="changeCartItemCheck(shopId, item._id)"></div>
          <img class="product__item__img" :src="item.imgUrl" alt="">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="()=>{changeCartItemInfo(shopId, item._id, item, -1)}">-</span>
            {{item.count || 0}}
            <span class="product__number__plus" @click="()=>{changeCartItemInfo(shopId, item._id, item, 1)}">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon" @click="handleCartShowChange">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/near.png" alt="">
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">总计：<span class="check__info__price">&yen; {{calculations.price}}</span></div>
      <div class="check__btn" >
        <router-link :to="{path: `/OrderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects.js'
const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  const { changeCartItemInfo, productList } = useCommonCartEffect(shopId)
  return { calculations, productList, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemsChecked }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { calculations, productList, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemsChecked } = useCartEffect(shopId)
    return { calculations, productList, shopId, changeCartItemInfo, changeCartItemCheck, cleanCartProducts, setCartItemsChecked, showCart, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, .5);
}
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bg-color;
}
.product{
  overflow-y: scroll;
  flex: 1;
  background: $bg-color;
  &__header{
    display: flex;
    line-height: .52rem;
    font-size: 0.14rem;
    border-bottom: 1px solid $content-bgColor;
    &__all{
      width: .64rem;
      margin-left: 0.16rem;
    }
    &__icon{
      display: inline-block;
      margin-right: 0.05rem;
      vertical-align: middle;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__clear{
      flex: 1;
      margin-right: 0.16em;
      text-align: right;
      color: $content-fontcolor;
    }
  }
  &__item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: 1px solid $content-bgColor;
    &__checked{
      margin-right: 0.2rem;
      line-height: .5rem;
      font-size: 0.2em;
      color: $btn-bgColor;
    }
    &__img{
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail{
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
      margin: .06rem 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__yen{
      font-size: 0.12rem;
    }
    &__origin{
      margin-left: 0.06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number{
      position: absolute;
      right: 0;
      bottom: .26rem;
      font-size: 0.14rem;
      &__minus, &__plus{
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        text-align: center;
        line-height: .16rem;
        font-size: 0.2rem;
        border-radius: 50%;
      }
      &__minus{
        margin-right: .05rem;
        border: 1px solid $medium-fontColor;
        color: $medium-fontColor;
      }
      &__plus{
        margin-left: .05rem;
        background: $btn-bgColor;
        color: $bg-color;
      }
    }
  }
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
      left: .46rem;
      top: .04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      padding: 0 .04rem;
      line-height: .2rem;
      text-align: center;
      font-size: 0.12rem;
      color: $bg-color;
      background: $highlight-fontColor;
      border-radius: .1rem;
      transform: scale(.5);
      transform-origin: left center;
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
    background: #4fb0f9;
    a{
      color: $bg-color;
      text-decoration: none;
    }
  }
}
</style>
