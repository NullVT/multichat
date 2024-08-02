<template>
  <div class="relative rounded-xl bg-white px-6 py-4 pt-8 shadow">
    {{ props.msg.body }}
    <div
      class="absolute rounded-full px-6 py-1 top-2 left-9 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md bg-slate-600 text-white"
    >
      {{ props.msg.from }}
    </div>
  </div>
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
