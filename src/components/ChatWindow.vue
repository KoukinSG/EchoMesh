<template>
  <div class="chat-container">
    <div ref="messagesContainer" class="chat-messages">
      <div v-for="message in messages"
           :key="message.id"
           :class="['message-wrapper', message.role]">
        <div class="message">
          <div v-if="message.role === 'assistant'" class="avatar">
            <img alt="assistant" src="/assistant-avatar.png">
          </div>
          <div :class="{ 'user-message': message.role === 'user' }" class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-footer">
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              <div v-if="message.role === 'assistant'" class="message-actions">
                <button class="action-btn">
                  <svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                       stroke-width="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect height="4" rx="1" ry="1" width="8" x="8" y="2"></rect>
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
import {ref, onMounted, watch} from 'vue';
import {sendMessageToAssistant} from '../api.js';

export default {
  props: {
    assistantId: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const messages = ref([
      {
        id: 1,
        role: 'assistant',
        content: '你好！我是你的AI助手，有什么我可以帮你的吗？',
        timestamp: new Date()
      }
    ]);
    const messagesContainer = ref(null);

    // 滚动到底部
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        setTimeout(() => {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }, 100);
      }
    };

    // 添加用户消息
    const addMessage = (message) => {
      messages.value.push({
        id: Date.now(),
        role: 'user',
        content: message,
        timestamp: new Date()
      });
      scrollToBottom();
    };

    // 处理助手回复
    const handleAssistantResponse = async (message) => {
      try {
        const response = await sendMessageToAssistant(props.assistantId, message);
        messages.value.push(response);
        scrollToBottom();
      } catch (error) {
        messages.value.push({
          id: Date.now(),
          role: 'assistant',
          content: '抱歉，我遇到了一些问题，请稍后再试。',
          timestamp: new Date()
        });
        scrollToBottom();
      }
    };

    // 监听助手ID变化，清空消息历史
    watch(() => props.assistantId, () => {
      messages.value = [{
        id: Date.now(),
        role: 'assistant',
        content: '你好！我是你的AI助手，有什么我可以帮你的吗？',
        timestamp: new Date()
      }];
      scrollToBottom();
    });

    onMounted(() => {
      scrollToBottom();
    });

    return {
      messages,
      messagesContainer,
      addMessage,
      handleAssistantResponse,
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
.chat-container {
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 20px;
}

.message-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.message-wrapper.assistant {
  background-color: transparent;
}

.message-wrapper.user {
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
}

.message {
  max-width: 768px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  gap: 20px;
  width: 100%;
}

.message-wrapper.user .message {
  justify-content: flex-end;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
  max-width: calc(100% - 56px);
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 12px;
}

.message-content.user-message {
  flex: 0 1 auto;
  max-width: 80%;
  background-color: #e3f2fd;
  margin-left: auto;
  border-radius: 12px;
}

.message-text {
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #1f2937;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.message-time {
  font-size: 12px;
  color: #9ca3af;
}

.message-actions {
  display: flex;
  gap: 8px;
}

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

.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #6b7280;
}

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

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
