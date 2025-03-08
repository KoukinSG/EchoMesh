<template>
  <div class="chat-container">
    <ChatSidebar />
    <ChatHistory />
    <ChatWindow />
  </div>
</template>

<script>
import ChatSidebar from '../components/ChatSidebar.vue';
import ChatHistory from '../components/ChatHistory.vue';
import ChatWindow from '../components/ChatWindow.vue';

export default {
  components: { ChatSidebar, ChatHistory, ChatWindow }
};
</script>

