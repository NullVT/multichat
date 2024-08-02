<template>
  <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
    {{ props.msg.from }}: {{ props.msg.body }}
    <button @click="remove" class="bg-red-400">DELETE</button>
  </li>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "../stores/messages.vue";
import { useSettingsStore } from "../stores/settings.vue";
import { Message } from "../types";

const msgStore = useMessagesStore();
const settings = useSettingsStore();

const props = defineProps<{
  msg: Message;
}>();

const remove = () => {
  msgStore.delete(props.msg.id);
};

if (settings.timeout > 0) {
  setTimeout(() => remove(), settings.timeout * 1000);
}
</script>
