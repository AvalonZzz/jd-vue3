<template>
  <div class="order">
    <div class="order__price">实付金额 ￥{{calculations.price}}</div>
    <div class="order__btn" @click="showConfirm = true">提交订单</div>
  </div>
  <div class="mask" v-if="showConfirm" @click="showConfirm = false">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last" @click="handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '@/effects/cartEffects.js'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast'

const useMakeOrderEffect = (productList, shopName, shopId, showToast) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: +product._id, num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        products,
        isCanceled
      })
      if (result?.errno === 0) {
        router.push({ name: 'OrderList' })
        store.commit('clearCartData', shopId)
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'Order',

  components: {
    Toast
  },

  setup () {
    const route = useRoute()
    const showConfirm = ref(false)
    const shopId = +route.params.id
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { showToast } = useToastEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(productList, shopName, shopId, showToast)
    return { calculations, handleConfirmOrder, showConfirm }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.order{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: .49rem;
  background: $bg-color;
  &__price{
    flex: 1;
    text-indent: .24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn{
    width: 0.98rem;
    text-align: center;
    font-size: 0.14rem;
    color: $bg-color;
    background-color: #4fb0f9;
  }
}
.mask{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  &__content{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3rem;
    height: 1.456rem;
    text-align: center;
    background: #fff;
    border-radius: .04rem;
    transform: translate(-50%, -50%);
    &__title{
      margin-top: 0.24rem 0 0 0;
      line-height: .26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &__desc{
      margin-top: 0.08em 0 0 0;
      font-size: .14rem;
      color: #666;
    }
    &__btns{
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn{
      flex: 1;
      width: 0.8rem;
      line-height: .32rem;
      font-size: 0.14rem;
      border: .01rem solid #4fb0f9;
      border-radius: .16rem;
      &--first{
        margin-right: 0.12rem;
        color: #4fb0f9;
        border: .01rem solid #4fb0f9;
      }
      &--last{
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
