<template>
  <div class="container">
    <h2>登录</h2>
    <input v-model="username" type="text" placeholder="用户名">
    <input v-model="password" type="password" placeholder="密码">
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  if (username.value === 'sjb' && password.value === '123456') {
    router.push('/chat');
  } else {
    alert('用户名或密码错误');
  }
};
</script>

<style scoped>
.container {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}
input, button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
</style>