<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe679;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe67d;</span>
        <input class="search__content__input" placeholder="请输入商品名称"/>
      </div>
    </div>
    <ShopInfo :hideBorder="true" :item="item" v-show="item.imgUrl"/>
    <Content />
    <Cart />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from '@vue/reactivity'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'
import Content from './Content'
import Cart from './Cart.vue'

// 获取当前商户信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 返回按钮功能封装
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',

  components: {
    ShopInfo,
    Content,
    Cart
  },

  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  padding: 0 .18rem;
  .search{
    display: flex;
    margin: .14rem 0 .04rem;
    line-height: .32rem;
    &__back{
      width: 0.3rem;
      font-size: 0.24rem;
      color: #b6b6b6;
    }
    &__content{
      display: flex;
      flex: 1;
      background: $search-bgColor;
      border-radius: .16rem;
      &__icon{
        width: 0.44rem;
        height: 0.32rem;
        text-align: center;
        color: $search-fontColor;
      }
      &__input{
        display: block;
        width: 100%;
        height: 0.32rem;
        padding-right: 0.2rem;
        font-size: 0.14rem;
        border: none;
        outline: none;
        background: none;
        &::placeholder{
          color: #333;
        }
      }
    }
  }
}
</style>
