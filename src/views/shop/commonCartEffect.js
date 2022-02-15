import { useStore } from 'vuex'
import { toRefs } from '@vue/reactivity'
export const useCommonCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('addItemToCart', { shopId, productId, productInfo, num })
  }
  return { cartList, changeCartItemInfo }
}
