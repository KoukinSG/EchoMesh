<template>
  <div class="chat-history">
    <h3>聊天记录</h3>
    <ul>
      <li
          v-for="chat in chatHistory"
          :key="chat.id"
          :class="{ active: chat.id === selectedChatId }"
          @click="selectChat(chat)"
      >
        <span class="chat-title">{{ chat.title }}</span>
        <span class="chat-date">{{ formatDate(chat.timestamp) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits} from 'vue';

// 定义 Props 和 Emits
const props = defineProps({
  chatHistory: Array, // 聊天记录列表
  selectedChatId: Number, // 当前选中的聊天 ID
});
const emit = defineEmits(['selectChat']);

// 选择聊天记录
const selectChat = (chat) => {
  emit('selectChat', chat.id);
};

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
</script>

<style scoped>
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

h3 {
  font-size: 14px;
  color: #6e6e80;
  padding: 8px 12px;
  margin-bottom: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 12px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 12px;
}

li:hover {
  background: #f0f0f0;
}

.active {
  background: #e5e5e5;
}

.chat-title {
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-date {
  font-size: 12px;
  color: #6e6e80;
}
</style>