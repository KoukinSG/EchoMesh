<!-- ChatWindow.vue - 聊天窗口组件 -->
<template>
  <!-- 聊天窗口最外层容器 -->
  <div class="chat-container">
    <!-- 消息列表容器，使用ref绑定DOM引用用于滚动控制 -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- 遍历渲染消息列表，每条消息根据role添加对应的样式类 -->
      <div v-for="message in messages"
           :key="message.id"
           :class="['message-wrapper', message.role]">
        <!-- 单条消息的容器 -->
        <div class="message">
          <!-- 助手消息才显示头像 -->
          <div class="avatar" v-if="message.role === 'assistant'">
            <img src="/assistant-avatar.png" alt="assistant">
          </div>
          <!-- 消息内容区域，用户消息添加特殊样式 -->
          <div class="message-content" :class="{ 'user-message': message.role === 'user' }">
            <!-- 消息文本内容 -->
            <div class="message-text">{{ message.content }}</div>
            <!-- 消息底部信息栏 -->
            <div class="message-footer">
              <!-- 消息发送时间 -->
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              <!-- 助手消息的操作按钮区域 -->
              <div class="message-actions" v-if="message.role === 'assistant'">
                <!-- 复制按钮 -->
                <button class="action-btn">
                  <!-- 复制图标SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入Vue的组合式API函数
import { ref, onMounted, watch } from 'vue';
// 导入API通信函数
import { sendMessageToAssistant } from '../api.js';

export default {
  // 定义组件接收的props
  props: {
    // 助手ID，必填的数字类型参数
    assistantId: {
      type: Number,
      required: true
    }
  },

  // 组件的设置函数
  setup(props) {
    // 定义消息列表的响应式引用，初始化欢迎消息
    const messages = ref([
      {
        id: 1,
        role: 'assistant',
        content: '你好！我是你的AI助手，有什么我可以帮你的吗？',
        timestamp: new Date()
      }
    ]);
    // 消息容器的DOM引用
    const messagesContainer = ref(null);

    // 滚动到容器底部的函数
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        // 使用setTimeout确保DOM更新后再滚动
        setTimeout(() => {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }, 100);
      }
    };

    // 添加新消息到列表的函数
    const addMessage = (message) => {
      messages.value.push({
        id: Date.now(),
        role: 'user',
        content: message,
        timestamp: new Date()
      });
      scrollToBottom();
    };

    // 处理助手回复的异步函数
    const handleAssistantResponse = async (message) => {
      try {
        // 发送消息到服务器并等待回复
        const response = await sendMessageToAssistant(props.assistantId, message);
        messages.value.push(response);
        scrollToBottom();
      } catch (error) {
        // 错误处理：显示错误消息
        messages.value.push({
          id: Date.now(),
          role: 'assistant',
          content: '抱歉，我遇到了一些问题，请稍后再试。',
          timestamp: new Date()
        });
        scrollToBottom();
      }
    };

    // 监听助手ID变化，重置消息列表
    watch(() => props.assistantId, () => {
      messages.value = [{
        id: Date.now(),
        role: 'assistant',
        content: '你好！我是你的AI助手，有什么我可以帮你的吗？',
        timestamp: new Date()
      }];
      scrollToBottom();
    });

    // 组件挂载后滚动到底部
    onMounted(() => {
      scrollToBottom();
    });

    // 返回模板需要的数据和方法
    return {
      messages,
      messagesContainer,
      addMessage,
      handleAssistantResponse,
      // 格式化时间的函数
      formatTime: (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    };
  }
};
</script>

<style scoped>
/* 聊天容器的基本布局样式 */
.chat-container {
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 消息列表区域样式 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 20px;
}

/* 消息包装器的基本样式 */
.message-wrapper {
  position: relative;
  margin-bottom: 20px;
}

/* 助手消息包装器样式 */
.message-wrapper.assistant {
  background-color: transparent;
}

/* 用户消息包装器样式 */
.message-wrapper.user {
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
}

/* 单条消息的内容布局 */
.message {
  max-width: 768px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  gap: 20px;
  width: 100%;
}

/* 用户消息的特殊布局 */
.message-wrapper.user .message {
  justify-content: flex-end;
}

/* 头像容器样式 */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
}

/* 头像图片样式 */
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 消息内容区域基本样式 */
.message-content {
  flex: 1;
  max-width: calc(100% - 56px);
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 12px;
}

/* 用户消息内容特殊样式 */
.message-content.user-message {
  flex: 0 1 auto;
  max-width: 80%;
  background-color: #e3f2fd;
  margin-left: auto;
  border-radius: 12px;
}

/* 消息文本样式 */
.message-text {
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #1f2937;
}

/* 消息底部布局 */
.message-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

/* 消息时间样式 */
.message-time {
  font-size: 12px;
  color: #9ca3af;
}

/* 消息操作按钮容器 */
.message-actions {
  display: flex;
  gap: 8px;
}

/* 操作按钮基本样式 */
.action-btn {
  padding: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

/* 操作按钮悬停效果 */
.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #6b7280;
}

/* 消息出现动画关键帧 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 自定义滚动条宽度 */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

/* 滚动条轨道样式 */
.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

/* 滚动条滑块样式 */
.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

/* 滚动条滑块悬停效果 */
.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>