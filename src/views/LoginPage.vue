<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo-container">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
      <div class="form-container">
        <h2>欢迎使用 审小言</h2>
        <p class="subtitle">登录以开始您的AI助手之旅</p>
        
        <div class="input-group">
          <label for="username">用户名</label>
          <div class="input-wrapper">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              id="username"
              v-model="username" 
              type="text" 
              placeholder="请输入用户名"
              @keyup.enter="login"
            />
          </div>
        </div>

        <div class="input-group">
          <label for="password">密码</label>
          <div class="input-wrapper">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input 
              id="password"
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码"
              @keyup.enter="login"
            />
            <button 
              class="toggle-password"
              type="button"
              @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>

        <button class="login-btn" @click="login" :disabled="isLoading">
          <span v-if="!isLoading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <div class="additional-links">
          <a href="#" @click.prevent>忘记密码？</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const users = ref([]);
const router = useRouter();

// 加载用户数据
const loadUsers = async () => {
  try {
    const response = await fetch('/users.json');
    const data = await response.json();
    users.value = data.users;
    console.log('加载的用户数据:', users.value);
  } catch (error) {
    console.error('加载用户数据失败:', error);
  }
};

// 验证用户登录
const login = async () => {
  if (!username.value || !password.value) {
    alert('请输入用户名和密码');
    return;
  }

  try {
    isLoading.value = true;
    
    // 如果用户数据还没加载，重新加载
    if (users.value.length === 0) {
      await loadUsers();
    }

    console.log('当前输入:', { username: username.value, password: password.value });
    console.log('可用用户:', users.value);

    const user = users.value.find(
      u => u.username === username.value && u.password === password.value
    );

    if (user) {
      console.log('登录成功:', user);
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }));
      router.push('/chat');
    } else {
      console.log('未找到匹配的用户');
      alert('用户名或密码错误');
    }
  } catch (error) {
    console.error('登录过程出错:', error);
    alert('登录失败，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-container {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.logo-container {
  padding: 32px;
  text-align: center;
  background: linear-gradient(to right, #667eea, #764ba2);
}

.logo {
  height: 60px;
  width: auto;
}

.form-container {
  padding: 32px 40px;
}

h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
}

.subtitle {
  margin: 8px 0 24px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #a0aec0;
}

input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  font-size: 14px;
  line-height: 20px;
  color: #1a1a1a;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input::placeholder {
  color: #a0aec0;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  padding: 0;
  color: #a0aec0;
  cursor: pointer;
}

.toggle-password:hover {
  color: #4a5568;
}

.login-btn {
  width: 100%;
  padding: 12px;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.additional-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.additional-links a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

.additional-links a:hover {
  color: #764ba2;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}
</style>