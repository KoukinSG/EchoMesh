<template>
  <div class="assistant-list">
    <ul>
      <li v-for="assistant in assistants" :key="assistant.id">{{ assistant.name }}</li>
    </ul>
  </div>
</template>

<script>
import { getChatAssistants } from '../api.js';

export default {
  data() {
    return { assistants: [] };
  },
  async created() {
    this.assistants = await getChatAssistants();
  }
};
</script>

<style scoped>
.assistant-list {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  width: 100%; /* 确保占满父容器宽度 */
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

li {
  padding: 8px;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #e0e0e0;
}
</style>