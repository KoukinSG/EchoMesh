<!-- ChatPage.vue - 聊天页面主组件 -->
<template>
  <!-- 聊天应用的主容器 -->
  <div class="chat-container">
    <!-- 左侧边栏区域 -->
    <div class="sidebar">
      <!-- Logo展示区域 -->
      <div class="logo-section">
        <!-- 应用logo图片 -->
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>

      <!-- 引入聊天助手组件 -->
      <ChatAssistant />

      <!-- 引入聊天历史记录组件 -->
      <ChatHistory />
    </div>

    <!-- 右侧聊天主内容区域 -->
    <div class="chat-content">
      <!-- 聊天消息显示区域 -->
      <div class="messages-container">
        <!-- 引入聊天窗口组件 -->
        <ChatWindow />
      </div>

      <!-- 消息输入区域 -->
      <div class="input-container">
        <!-- 输入框包装器 -->
        <div class="input-wrapper">
          <!-- 消息输入文本框 -->
          <textarea
            v-model="messageInput"
            placeholder="输入消息..."
            @keydown.enter.prevent="sendMessage"
          ></textarea>
          <!-- 发送按钮 -->
          <button @click="sendMessage" class="send-button">
            <span>发送</span>
          </button>
        </div>
        <!-- 输入提示文本 -->
        <div class="input-tips">按 Enter 发送消息，Shift + Enter 换行</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入所需的组件和Vue功能
import ChatAssistant from '../components/ChatAssistant.vue';
import ChatHistory from '../components/ChatHistory.vue';
import ChatWindow from '../components/ChatWindow.vue';
import { ref } from 'vue';

export default {
  // 注册子组件
  components: { ChatAssistant, ChatHistory, ChatWindow },
  // 组件逻辑设置
  setup() {
    // 定义消息输入框的响应式引用
    const messageInput = ref('');

    // 发送消息的处理函数
    const sendMessage = () => {
      // 检查消息是否为空
      if (!messageInput.value.trim()) return;
      // TODO: 实现发送消息逻辑
      // 清空输入框
      messageInput.value = '';
    };

    // 返回模板所需的数据和方法
    return {
      messageInput,
      sendMessage
    };
  }
};
</script>

<style scoped>
/* 聊天容器的基本布局 */
.chat-container {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

/* 左侧边栏样式 */
.sidebar {
  width: 260px;
  background-color: #f7f7f8;
  color: #333333;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e5e5;
}

/* Logo区域样式 */
.logo-section {
  padding: 24px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Logo图片样式 */
.logo {
  height: 64px;
  width: auto;
  transition: transform 0.2s ease;
}

/* Logo悬停效果 */
.logo:hover {
  transform: scale(1.05);
}

/* 右侧聊天内容区域样式 */
.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

/* 消息显示区域样式 */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* 输入区域容器样式 */
.input-container {
  padding: 20px;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
}

/* 输入框包装器样式 */
.input-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

/* 文本输入框样式 */
textarea {
  width: 100%;
  height: 52px;
  padding: 12px 45px 12px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  color: #333333;
  font-size: 16px;
  resize: none;
  outline: none;
}

/* 文本输入框焦点状态样式 */
textarea:focus {
  border-color: #10a37f;
}

/* 发送按钮样式 */
.send-button {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 12px;
  background-color: #10a37f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

/* 发送按钮悬停效果 */
.send-button:hover {
  background-color: #0e906f;
}

/* 输入提示文本样式 */
.input-tips {
  text-align: center;
  color: #6e6e80;
  font-size: 12px;
  margin-top: 8px;
}
</style>