<template>
  <div :class="['login-page', { 'logged-in': isLoggedIn }]">
    <img src="/logobig.png" alt="Logo" class="logo" />
    <div class="login-container">
      <h2>审小言AI系统登录</h2>
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const isLoggedIn = ref(false); // 用于跟踪登录状态
const router = useRouter();

const login = () => {
  if (username.value === 'sjb' && password.value === '123456') {
    isLoggedIn.value = true; // 登录成功后更新状态
    router.push('/chat');
  } else {
    alert('用户名或密码错误');
  }
};
</script>

<style scoped>
/* 登录页面背景 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 确保背景覆盖整个页面 */
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* 渐变色背景 */
  transition: background 0.5s ease; /* 背景变化时的过渡效果 */
  position: relative; /* 为 Logo 定位提供参考 */
}

/* 登录成功后移除背景 */
.login-page.logged-in {
  background: none; /* 登录后移除背景 */
}

/* Logo 样式 */
.logo {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离顶部 20px */
  left: 10px; /* 距离左侧 20px */
  width: 200px; /* 设置 Logo 宽度 */
  height: auto; /* 高度自适应 */
}

/* 登录容器样式 */
.login-container {
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 标题样式 */
h2 {
  font-family: 'Arial', sans-serif; /* 设置字体 */
  font-size: 24px; /* 设置字体大小 */
  color: #333; /* 设置字体颜色 */
  margin-bottom: 20px; /* 设置下边距 */
}

/* 输入框样式 */
input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* 按钮样式 */
button {
  width: 90%;
  padding: 10px;
  margin: 20px 0;
  background: #3636b6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #6651debf; /* 鼠标悬停时按钮颜色变化 */
}
</style>