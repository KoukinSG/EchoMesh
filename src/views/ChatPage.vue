<template>
  <div class="chat-container">
    <!-- 左侧边栏 -->
    <div class="sidebar">
      <!-- Logo区域 -->
      <div class="logo-section">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
      
      <!-- 助手列表 -->
      <ChatAssistant />
      
      <!-- 历史记录 -->
      <ChatHistory />
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-content">
      <!-- 聊天消息区域 -->
      <div class="messages-container">
        <ChatWindow />
      </div>
      
      <!-- 输入框区域 -->
      <div class="input-container">
        <div class="input-wrapper">
          <textarea 
            v-model="messageInput" 
            placeholder="输入消息..." 
            @keydown.enter.prevent="sendMessage"
          ></textarea>
          <button @click="sendMessage" class="send-button">
            <span>发送</span>
          </button>
        </div>
        <div class="input-tips">按 Enter 发送消息，Shift + Enter 换行</div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatAssistant from '../components/ChatAssistant.vue';
import ChatHistory from '../components/ChatHistory.vue';
import ChatWindow from '../components/ChatWindow.vue';
import { ref } from 'vue';

export default {
  components: { ChatAssistant, ChatHistory, ChatWindow },
  setup() {
    const messageInput = ref('');

    const sendMessage = () => {
      if (!messageInput.value.trim()) return;
      // TODO: 实现发送消息逻辑
      messageInput.value = '';
    };

    return {
      messageInput,
      sendMessage
    };
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.sidebar {
  width: 260px;
  background-color: #f7f7f8;
  color: #333333;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e5e5;
}

.logo-section {
  padding: 24px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 64px;
  width: auto;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.input-container {
  padding: 20px;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
}

.input-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

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

textarea:focus {
  border-color: #10a37f;
}

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

.send-button:hover {
  background-color: #0e906f;
}

.input-tips {
  text-align: center;
  color: #6e6e80;
  font-size: 12px;
  margin-top: 8px;
}
</style>