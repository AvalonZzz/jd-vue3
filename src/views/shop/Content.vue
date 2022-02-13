<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item': true, 'category__item--active': category.tab === currentTab}" v-for="(category) in categories" :key="category" @click="handleTabClick(category.tab)">{{category.name}}</div>
    </div>
    <div class="product">
      <div class="product__item" v-for="(item) in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus">-</span>
          {{cartList?.[shopId]?.[item._id]?.count || 0}}
          <span class="product__number__plus" @click="()=>{addItemToCart(shopId, item._id, item)}">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { get } from '@/utils/request'
import { watchEffect } from '@vue/runtime-core'
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和tab切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })
  const getContentData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => {
    getContentData()
  })
  const { list } = toRefs(content)
  return { list }
}

const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const addItemToCart = (shopId, productId, productInfo) => {
    store.commit('addItemToCart', { shopId, productId, productInfo })
  }
  return { cartList, addItemToCart }
}

export default {
  name: 'Content',

  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, addItemToCart } = useCartEffect()
    return { categories, list, currentTab, handleTabClick, cartList, shopId, addItemToCart }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
  .category{
    overflow-y: scroll;
    width: 0.76rem;
    height: 100%;
    background: $search-bgColor;
    &__item{
      line-height: .4rem;
      text-align: center;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &--active{
        background: $bg-color;
      }
    }
  }
  .product{
    overflow-y: scroll;
    flex: 1;
    &__item{
      position: relative;
      display: flex;
      padding: .12rem 0;
      margin: 0 .16rem;
      border-bottom: 1px solid #f1f1f1;
      &__img{
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      &__detail{
        overflow: hidden;
      }
      &__title{
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: #333;
        @include ellipsis;
      }
      &__sales{
        margin: .06rem 0;
        line-height: .16rem;
        font-size: .12rem;
        color: #333;
      }
      &__price{
        margin: 0;
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
        bottom: .12rem;
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
}
</style>
