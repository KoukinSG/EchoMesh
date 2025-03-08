<template>
  <div class="chat-history">
    <h3>聊天记录</h3>
    <ul>
      <li
          v-for="chat in chatHistory"
          :key="chat.id"
          @click="selectChat(chat)"
          :class="{ active: chat.id === selectedChatId }"
      >
        <span class="chat-title">{{ chat.title }}</span>
        <span class="chat-date">{{ formatDate(chat.timestamp) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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
  width: 250px;
  background: #fff;
  border-right: 1px solid #ddd;
  padding: 10px;
  height: 100%;
  overflow-y: auto;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background: #f0f0f0;
}

.active {
  background: #007bff;
  color: white;
}

.chat-title {
  font-weight: bold;
}

.chat-date {
  font-size: 12px;
  color: gray;
}
</style>