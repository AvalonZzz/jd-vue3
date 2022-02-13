<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入手机号" v-model="username">
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" placeholder="确认密码" v-model="confirmPassword">
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, confirmPassword } = toRefs(data)
  return { username, password, confirmPassword, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',

  components: {
    Toast
  },

  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, confirmPassword, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()

    return { handleRegister, handleLoginClick, username, password, confirmPassword, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper{
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  font-size: 0.16rem;
  transform: translateY(-50%);
  &__img{
    display: block;
    margin: 0 auto .4rem;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input{
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    box-sizing: border-box;
    &__content{
      width: 100%;
      // height: 100%;
      // margin: 0;
      line-height: .48rem;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, .7);
      background: none;
      border: none;
      outline: none;
      &::placeholder{
        color: rgba(0, 0, 0, .5)
      }
    }
  }
  &__register-button{
    margin: 0.32rem .4rem 0.16rem .4rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    color: $bg-color;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
  }
  &__register-link{
    text-align: center;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, .5);
  }
}
</style>
