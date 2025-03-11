<template>
  <div class="chat-container">
    <!-- 侧边栏容器 -->
    <div class="sidebar-container">
      <!-- ChatAssistant 区域 -->
      <div class="sidebar-assistant">
        <!-- 在 ChatAssistant 上方添加 Logo -->
        <div class="sidebar-logo-section">
          <img src="/logo.png" alt="Logo1" class="logo1" />
        </div>
        <ChatAssistant />
      </div>

      <!-- ChatHistory 区域 -->
      <div class="sidebar-history">
        <ChatHistory />
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 聊天窗口 -->
      <ChatWindow />
    </div>
  </div>
</template>

<script>
import ChatAssistant from '../components/ChatAssistant.vue';
import ChatHistory from '../components/ChatHistory.vue';
import ChatWindow from '../components/ChatWindow.vue';

export default {
  components: { ChatAssistant, ChatHistory, ChatWindow },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}

/* 侧边栏容器 */
.sidebar-container {
  display: flex;
  width: 40%; /* ChatAssistant 和 ChatHistory 各占 20%，总共 40% */
}

/* ChatAssistant 区域 */
.sidebar-assistant {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  width: 50%; /* 占父容器的一半 */
  align-items: center; /* 水平居中 */
  background-color: #f0f0f0; /* 背景色 */
  padding: 10px; /* 内边距 */
}

/* 侧边栏 Logo */
.sidebar-logo-section {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 5px; /* 调整 Logo 和 ChatAssistant 之间的间距 */
  margin-top: 5px;
}
.logo1 {
  width: 100px; /* 根据需要调整logo大小 */
  height: 100px;
  margin-right: 10px;
}
/* ChatHistory 区域 */
.sidebar-history {
  display: flex;
  width: 50%; /* 占父容器的一半 */
  background-color: #f0f0f0; /* 背景色 */
  padding: 10px; /* 内边距 */
}

/* 主内容区域 */
.main-content {
  flex: 1; /* 剩余60%的宽度 */
  display: flex;
  flex-direction: column;
  padding: 10px; /* 内边距 */
}
</style>