<template>
  <!-- 登录页面的最外层容器 -->
  <div class="login-page">
    <!-- 登录表单的容器 -->
    <div class="login-container">
      <!-- Logo区域容器 -->
      <div class="logo-container">
        <!-- 网站Logo图片 -->
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
      <!-- 表单区域容器 -->
      <div class="form-container">
        <!-- 欢迎标题 -->
        <h2>欢迎使用 审小言</h2>
        <!-- 副标题 -->
        <p class="subtitle">登录以开始您的AI助手之旅</p>

        <!-- 用户名输入组 -->
        <div class="input-group">
          <!-- 用户名标签 -->
          <label for="username">用户名</label>
          <!-- 用户名输入框包装器 -->
          <div class="input-wrapper">
            <!-- 用户名图标 SVG -->
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <!-- 用户名输入框，支持回车登录 -->
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              @keyup.enter="login"
            />
          </div>
        </div>

        <!-- 密码输入组 -->
        <div class="input-group">
          <!-- 密码标签 -->
          <label for="password">密码</label>
          <!-- 密码输入框包装器 -->
          <div class="input-wrapper">
            <!-- 密码图标 SVG -->
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <!-- 密码输入框，支持回车登录 -->
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              @keyup.enter="login"
            />
            <!-- 切换密码显示/隐藏的按钮 -->
            <button
              class="toggle-password"
              type="button"
              @click="showPassword = !showPassword"
            >
              <!-- 密码隐藏时显示的眼睛图标 -->
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <!-- 密码显示时的划线眼睛图标 -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- 登录按钮 -->
        <button class="login-btn" @click="login" :disabled="isLoading">
          <!-- 根据加载状态显示不同内容 -->
          <span v-if="!isLoading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <!-- 额外链接区域 -->
        <div class="additional-links">
          <!-- 忘记密码链接 -->
          <a href="#" @click.prevent>忘记密码？</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入所需的Vue组件和路由
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 定义响应式变量
const username = ref('');           // 用户名输入值
const password = ref('');           // 密码输入值
const showPassword = ref(false);    // 控制密码显示/隐藏
const isLoading = ref(false);       // 控制加载状态
const users = ref([]);             // 存储用户数据
const router = useRouter();        // 路由实例

// 加载用户数据的异步函数
const loadUsers = async () => {
  try {
    // 从JSON文件获取用户数据
    const response = await fetch('/users.json');
    const data = await response.json();
    users.value = data.users;
    console.log('加载的用户数据:', users.value);
  } catch (error) {
    console.error('加载用户数据失败:', error);
  }
};

// 处理用户登录的异步函数
const login = async () => {
  // 验证输入是否为空
  if (!username.value || !password.value) {
    alert('请输入用户名和密码');
    return;
  }

  try {
    // 设置加载状态
    isLoading.value = true;

    // 确保用户数据已加载
    if (users.value.length === 0) {
      await loadUsers();
    }

    // 打印调试信息
    console.log('当前输入:', { username: username.value, password: password.value });
    console.log('可用用户:', users.value);

    // 查找匹配的用户
    const user = users.value.find(
      u => u.username === username.value && u.password === password.value
    );

    // 处理登录结果
    if (user) {
      console.log('登录成功:', user);
      // 存储用户信息到本地
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }));
      // 跳转到聊天页面
      router.push('/chat');
    } else {
      console.log('未找到匹配的用户');
      alert('用户名或密码错误');
    }
  } catch (error) {
    console.error('登录过程出错:', error);
    alert('登录失败，请稍后重试');
  } finally {
    // 重置加载状态
    isLoading.value = false;
  }
};

// 组件挂载时加载用户数据
onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
/* 登录页面容器样式 */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
}

/* 登录表单容器样式 */
.login-container {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* Logo容器样式 */
.logo-container {
  padding: 32px;
  text-align: center;
  background: linear-gradient(to right, #b22222, #fa8072);
}

/* Logo图片样式 */
.logo {
  height: 60px;
  width: auto;
}

/* 表单容器样式 */
.form-container {
  padding: 32px 40px;
}

/* 标题样式 */
h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
}

/* 副标题样式 */
.subtitle {
  margin: 8px 0 24px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* 输入组样式 */
.input-group {
  margin-bottom: 20px;
}

/* 输入标签样式 */
label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

/* 输入框包装器样式 */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* 输入框图标样式 */
.input-icon {
  position: absolute;
  left: 12px;
  color: #a0aec0;
}

/* 输入框样式 */
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

/* 输入框焦点样式 */
input:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 输入框占位符样式 */
input::placeholder {
  color: #a0aec0;
}

/* 密码显示切换按钮样式 */
.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  padding: 0;
  color: #a0aec0;
  cursor: pointer;
}

/* 密码显示切换按钮悬停样式 */
.toggle-password:hover {
  color: #4a5568;
}

/* 登录按钮样式 */
.login-btn {
  width: 100%;
  padding: 12px;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: linear-gradient(to right, #b22222, #fa8072);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

/* 登录按钮悬停样式 */
.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 登录按钮禁用样式 */
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 额外链接容器样式 */
.additional-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

/* 额外链接样式 */
.additional-links a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s;
}

/* 额外链接悬停样式 */
.additional-links a:hover {
  color: #764ba2;
}

/* 加载动画关键帧 */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 加载动画样式 */
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