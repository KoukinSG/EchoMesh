<template>
  <div class="sidebar">
    <h3>聊天助手</h3>
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