<template>
  <div class="assistant-list">
    <h3>选择助手</h3>
    <ul>
      <li
          v-for="assistant in assistants"
          :key="assistant.id"
          :class="{ active: assistant.id === selectedAssistant }"
          @click="selectAssistant(assistant.id)"
      >
        <span class="assistant-icon">🤖</span>
        <span class="assistant-name">{{ assistant.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from 'vue';
import {getChatAssistants} from '../api.js';

export default {
  setup() {
    const assistants = ref([]);
    const selectedAssistant = ref(null);

    const loadAssistants = async () => {
      assistants.value = await getChatAssistants();
      if (assistants.value.length > 0) {
        selectedAssistant.value = assistants.value[0].id;
      }
    };

    const selectAssistant = (id) => {
      selectedAssistant.value = id;
    };

    loadAssistants();

    return {
      assistants,
      selectedAssistant,
      selectAssistant
    };
  }
};
</script>

<style scoped>
.assistant-list {
  padding: 8px;
  border-bottom: 1px solid #e5e5e5;
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
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  color: #333333;
}

li:hover {
  background: #f0f0f0;
}

li.active {
  background: #e5e5e5;
}

.assistant-icon {
  font-size: 20px;
}

.assistant-name {
  font-size: 14px;
  flex: 1;
}
</style>