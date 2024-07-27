<template>
  <ul role="list" class="space-y-3 max-w-80">
    <li
      v-for="msg in msgStore.$state"
      :key="msg.recivedAt.toISOString()"
      class="overflow-hidden bg-gray-500 px-4 py-4 shadow sm:rounded-md sm:px-6"
    >
      {{ msg.from }}: {{ msg.body }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "../stores/messages.vue";

const msgStore = useMessagesStore();
</script>
