<template>
  <div class="space-y-4 max-w-2xl mt-3 ml-3">
    <Message v-for="msg in msgStore.$state" :key="msg.id" :msg="msg" />
  </div>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "../stores/messages.vue";
import Message from "./message.vue";

const msgStore = useMessagesStore();
</script>
