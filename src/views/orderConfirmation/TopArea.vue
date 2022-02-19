<template>
  <div>
    <div class="top">
      <div class="top__bgcor"></div>
      <div class="top__header">
        <div class="iconfont top__header__back" @click="handleBackClick">&#xe679;</div>
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
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',

  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
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
    color: $bg-color;
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
    background-color: $bg-color;
    border-radius: .04rem;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      line-height: .22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__info{
      padding: .06rem 0 0 .16rem;
      font-size: 0.12rem;
      color: $medium-fontColor;
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
      color: $medium-fontColor;
      transform: rotate(180deg);
    }
  }
}
</style>
