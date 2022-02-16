import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const { cartList } = store.state
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('addItemToCart', { shopId, productId, productInfo, num })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || []
    return shopName
  })
  return { cartList, changeCartItemInfo, productList, shopName }
}
