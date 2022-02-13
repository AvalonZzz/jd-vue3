<template>
  <div>
    <div class="position">
      <span class="iconfont position__icon">&#xe601;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe628;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe67d;</span>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt=""
      />
    </div>
    <div class="icons">
      <div class="icons__item" v-for="(icon, index) in iconsList" :key="index">
        <img
          class="icons__item__img"
          :src="`http://www.dell-lee.com/imgs/vue3/${icon.imgName}.png`"
        />
        <p class="icons__item__desc">{{icon.desc}}</p>
      </div>
      <!-- <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/菜市场.png"
        />
        <p class="icons__item__desc">菜市场</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/水果店.png"
        />
        <p class="icons__item__desc">水果店</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/鲜花.png"
        />
        <p class="icons__item__desc">鲜花绿植</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/医药健康.png"
        />
        <p class="icons__item__desc">医药健康</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/家居.png"
        />
        <p class="icons__item__desc">家居时尚</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/蛋糕.png"
        />
        <p class="icons__item__desc">烘焙蛋糕</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/签到.png"
        />
        <p class="icons__item__desc">签到</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/大牌免运.png"
        />
        <p class="icons__item__desc">大牌免运</p>
      </div>
      <div class="icons__item">
        <img
          class="icons__item__img"
          src="http://www.dell-lee.com/imgs/vue3/红包.png"
        />
        <p class="icons__item__desc">红包套餐</p>
      </div> -->
    </div>
    <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: 'StaticPart',

  setup () {
    const iconsList = [
      {
        imgName: '超市',
        desc: '超市便利'
      },
      {
        imgName: '菜市场',
        desc: '菜市场'
      },
      {
        imgName: '水果店',
        desc: '水果店'
      },
      {
        imgName: '鲜花',
        desc: '鲜花绿植'
      },
      {
        imgName: '医药健康',
        desc: '医药健康'
      },
      {
        imgName: '家居',
        desc: '家居时尚'
      },
      {
        imgName: '蛋糕',
        desc: '烘焙蛋糕'
      },
      {
        imgName: '签到',
        desc: '签到'
      },
      {
        imgName: '大牌免运',
        desc: '大牌免运'
      },
      {
        imgName: '红包',
        desc: '红包套餐'
      }
    ]
    return {
      iconsList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
  .position{
    position: relative;
    @include ellipsis;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    color: $content-fontcolor;
    &__icon{
      position: relative;
      top: 0.01rem;
      font-size: 0.2rem;
    }
    &__notice{
      position: absolute;
      top: 0.17rem;
      right: 0;
      font-size: 0.2rem;
    }
  }
  .search{
    margin-bottom: 0.12rem;
    line-height: .32rem;
    background: $search-bgColor;
    font-size: 0.14rem;
    color: $search-fontColor;
    border-radius: 0.16rem;
    .iconfont{
      display: inline-block;
      padding: 0 .08rem 0 .16rem;
      font-size: 0.2rem;
    }
    &__text{
      display: inline-block;
    }
  }
  .banner{
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img{
      width: 100%;
    }
  }
  .icons{
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;
    font-size: 0.12rem;
    &__item{
      width: 20%;
      &__img{
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
      }
      &__desc{
        margin: .06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
  .gap{
    height: 0.1rem;
    margin: 0 -.18rem;
    background: $content-bgColor;
  }
</style>
