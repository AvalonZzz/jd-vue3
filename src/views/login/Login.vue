<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入用户名" v-model="username">
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from '@vue/reactivity'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { handleLogin, username, password }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',

  components: {
    Toast
  },

  setup () {
    const { showToast, show, toastMessage } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return { handleLogin, handleRegisterClick, show, toastMessage, username, password }
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
  &__login-button{
    margin: 0.32rem .4rem 0.16rem .4rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    color: $bg-color;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
  }
  &__login-link{
    text-align: center;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, .5);
  }
}
</style>
