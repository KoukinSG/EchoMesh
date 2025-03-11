<template>
  <div class="chat-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <!-- 在 ChatAssistant 上方添加 Logo -->
      <div class="sidebar-logo">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
      <ChatAssistant />
      <ChatHistory />
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- Logo和文字 -->
      <div class="logo-section" v-if="showLogo">
        <img src="/favicon.png" alt="Logo" class="logo" />
        <p class="slogan">我是审小言，很高兴见到你！</p>
      </div>

      <!-- 聊天窗口 -->
      <ChatWindow @user-input="handleUserInput" />
    </div>
  </div>
</template>

<script>
import ChatAssistant from '../components/ChatAssistant.vue';
import ChatHistory from '../components/ChatHistory.vue';
import ChatWindow from '../components/ChatWindow.vue';

export default {
  components: { ChatAssistant, ChatHistory, ChatWindow },
  data() {
    return {
      showLogo: true, // 控制 Logo 和文字的显示状态
    };
  },
  methods: {
    // 监听用户输入事件
    handleUserInput() {
      this.showLogo = false; // 用户开始提问时隐藏 Logo 和文字
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  display: flex;
  width: 40%; /* ChatAssistant和ChatHistory各占20%，总共40% */
  align-items: flex-start; 
}

.sidebar > * {
  flex: 1; /* 使ChatAssistant和ChatHistory各占一半 */
}
/* 侧边栏 Logo */
.sidebar-logo {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-bottom: 20px; /* 调整 Logo 和 ChatAssistant 之间的间距 */
}
.main-content {
  flex: 1; /* 剩余60%的宽度 */
  display: flex;
  flex-direction: column;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0;
}

.logo {
  width: 50px; /* 根据需要调整logo大小 */
  height: 50px;
  margin-right: 10px;
}

.slogan {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}
</style>