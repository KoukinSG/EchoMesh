<!-- 模板部分 -->
<template>
  <!-- 聊天历史记录容器 -->
  <div class="chat-history">
    <!-- 聊天历史标题 -->
    <h3>聊天记录</h3>
    <!-- 聊天记录列表 -->
    <ul>
      <!-- 使用v-for循环渲染每条聊天记录 -->
      <li
          v-for="chat in chatHistory" <!-- 遍历chatHistory数组 -->
          :key="chat.id" <!-- 使用chat.id作为唯一键值 -->
          @click="selectChat(chat)" <!-- 点击时触发selectChat方法 -->
          :class="{ active: chat.id === selectedChatId }" <!-- 根据选中状态动态添加active类 -->
      >
        <!-- 显示聊天标题 -->
        <span class="chat-title">{{ chat.title }}</span>
        <!-- 显示格式化后的聊天时间 -->
        <span class="chat-date">{{ formatDate(chat.timestamp) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 从Vue中导入需要的组合式API
import { ref, defineProps, defineEmits } from 'vue';

// 定义组件的属性
const props = defineProps({
  chatHistory: Array, // 接收聊天历史记录数组
  selectedChatId: Number, // 接收当前选中的聊天ID
});

// 定义组件可触发的事件
const emit = defineEmits(['selectChat']);

// 定义选择聊天记录的方法
const selectChat = (chat) => {
  emit('selectChat', chat.id); // 触发selectChat事件，传递选中的聊天ID
};

// 定义日期格式化方法
const formatDate = (timestamp) => {
  const date = new Date(timestamp); // 创建日期对象
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // 返回格式化后的日期和时间
};
</script>

<style scoped>
/* 聊天历史记录容器样式 */
.chat-history {
  flex: 1; /* 弹性布局占满剩余空间 */
  overflow-y: auto; /* 垂直方向可滚动 */
  padding: 8px; /* 内边距 */
}

/* 标题样式 */
h3 {
  font-size: 14px; /* 字体大小 */
  color: #6e6e80; /* 字体颜色 */
  padding: 8px 12px; /* 内边距 */
  margin-bottom: 8px; /* 底部外边距 */
}

/* 列表基础样式 */
ul {
  list-style: none; /* 移除列表样式 */
  padding: 0; /* 移除内边距 */
}

/* 列表项样式 */
li {
  padding: 12px; /* 内边距 */
  margin: 4px 0; /* 上下外边距 */
  border-radius: 6px; /* 圆角 */
  cursor: pointer; /* 鼠标指针样式 */
  transition: background 0.2s; /* 背景过渡动画 */
  color: #333333; /* 文字颜色 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 12px; /* 元素间距 */
}

/* 列表项悬停效果 */
li:hover {
  background: #f0f0f0; /* 悬停时的背景色 */
}

/* 选中状态的列表项样式 */
.active {
  background: #e5e5e5; /* 选中时的背景色 */
}

/* 聊天标题样式 */
.chat-title {
  font-size: 14px; /* 字体大小 */
  flex: 1; /* 弹性布局占满剩余空间 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  white-space: nowrap; /* 禁止文本换行 */
}

/* 聊天日期样式 */
.chat-date {
  font-size: 12px; /* 字体大小 */
  color: #6e6e80; /* 字体颜色 */
}
</style>