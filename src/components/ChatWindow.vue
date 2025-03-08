<template>
  <div class="chat-window">
    <iframe :src="chatUrl"></iframe>
  </div>
</template>

<script>
import { getChatWindowUrl } from '../api.js';

export default {
  props: ['assistantId'],
  computed: {
    chatUrl() {
      return getChatWindowUrl(this.assistantId);
    }
  }
};
</script>
