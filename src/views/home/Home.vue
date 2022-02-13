<template>
    <div class="wrapper">
      <StaticPart></StaticPart>
      <Nearby></Nearby>
    </div>
    <Docker></Docker>
</template>

<script>
import StaticPart from '@/views/home/StaticPart'
import Nearby from '@/views/home/Nearby'
import Docker from '@/views/home/Docker'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
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
