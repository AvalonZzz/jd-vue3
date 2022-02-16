import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  let cartList = localStorage.cartList
  if (cartList) {
    cartList = JSON.parse(cartList)
  } else {
    cartList = {}
  }
  return cartList
}

export default createStore({
  state: {
    cartList: getLocalCartList()
    // {
    //   第一层级是商铺的id
    //   shopId: {
    //     shopName: '',
    //     // 第二层是商品id
    //     // 第二层内容时商品内容以及购物数量
    //     productList: {
    //       productId: {
    //         _id: 1,
    //         name: '番茄250g/份',
    //         imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //         sales: 10,
    //         price: 33.6,
    //         oldPrice: 39.6,
    //         count: 2
    //       }
    //     }
    //   }
    // }
  },
  mutations: {
    addItemToCart (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        // product.check = 0
      }
      product.count += num
      if (product.count > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },

    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      state.cartList[shopId] = {}
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
