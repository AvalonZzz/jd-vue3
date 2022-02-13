<template>
  <div>
    <div class="bearby">
      <h3 class="nearby__title">附近店铺</h3>
      <div v-for="item in nearbyList" :key="item._id">
        <ShopInfo :item="item" :hideBorder="false" @click="handleShopClick(item._id)"/>
      </div>
      <!-- <div class="nearby__item">
        <img
          class="nearby__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt=""
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
          </div>
          <p class="nearby__content__highlight">
            VIP尊享满89元减4元运费券（每月3张）
          </p>
        </div>
      </div>
      <div class="nearby__item">
        <img
          class="nearby__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt=""
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
          </div>
          <p class="nearby__content__highlight">
            VIP尊享满89元减4元运费券（每月3张）
          </p>
        </div>
      </div>
      <div class="nearby__item">
        <img
          class="nearby__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt=""
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
          </div>
          <p class="nearby__content__highlight">
            VIP尊享满89元减4元运费券（每月3张）
          </p>
        </div>
      </div>
      <div class="nearby__item">
        <img
          class="nearby__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt=""
        />
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
          </div>
          <p class="nearby__content__highlight">
            VIP尊享满89元减4元运费券（每月3张）
          </p>
        </div>
      </div>
      <div class="nearby__item">
        <img
          class="nearby__item__img"
          src="http://www.dell-lee.com/imgs/vue3/near.png"
          alt=""
        />
        <div class="nearby__content">
          <div class="nearby__content__title"></div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag"></span>
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">月售1万+</span>
          </div>
          <p class="nearby__content__highlight">
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearByList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearByList }
}

export default {
  name: 'Nearby',

  components: {
    ShopInfo
  },

  setup () {
    const router = useRouter()
    const { nearbyList, getNearByList } = useNearbyListEffect()
    getNearByList()
    const handleShopClick = (id) => {
      router.push(`/shop/${id}`)
    }
    return { nearbyList, getNearByList, handleShopClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.04rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
</style>
