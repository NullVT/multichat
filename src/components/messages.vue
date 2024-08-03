<template>
  <div class="space-y-4 max-w-lg mt-3 ml-4">
    <Message v-for="msg in msgStore.messages" :key="msg.id" :msg="msg" />
  </div>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "../stores/messages.vue";
import Message from "./message.vue";

const msgStore = useMessagesStore();
</script>
