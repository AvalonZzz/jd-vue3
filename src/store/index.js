import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层级是商铺的id
      // shopId: {
      //   shopName: '',
      //   // 第二层是商品id
      //   // 第二层内容时商品内容以及购物数量
      //   productList: {
      //     productId: {
      //       _id: 1,
      //       name: '番茄250g/份',
      //       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //       sales: 10,
      //       price: 33.6,
      //       oldPrice: 39.6,
      //       count: 2
      //     }
      //   }
      // }
    }
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
    },

    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    },

    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },

    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
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
    }
  },
  actions: {
  },
  modules: {
  }
})
