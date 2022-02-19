<template>
    <div class="wrapper">
      this is orderList page
    </div>
    <Docker :currentIndex="2"></Docker>
</template>

<script>
import Docker from '@/components/Docker'
export default {
  name: 'OrderList',

  components: {
    Docker
  },

  setup () {}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .1rem .18rem;
  font-size: 0.16rem;
}
</style>
