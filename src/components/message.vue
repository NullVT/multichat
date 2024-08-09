<template>
  <div
    class="relative rounded-lg bg-white px-6 py-4 pt-8 shadow"
    :class="
      (msg.from.broadcaster && 'ring-2 ring-red-600') ||
      (msg.from.moderator && 'ring-2 ring-green-600') ||
      (msg.from.vip && 'ring-2 ring-purple-500')
    "
  >
    {{ msg.body }}

    <!-- user -->
    <div
      class="absolute rounded-3xl px-6 py-1 top-2 left-8 transform -translate-x-12 -translate-y-1/2 drop-shadow-md bg-slate-600 text-white max-w-lg truncate"
    >
      {{ msg.from.name }}
    </div>

    <!-- dismiss button -->
    <button
      type="button"
      class="absolute top-0 right-0 rounded-md opacity-0 hover:opacity-100 hover:text-gray-500"
      @click="remove"
    >
      <span class="absolute -inset-2.5" />
      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "../stores/messages";
import { useSettingsStore } from "../stores/settings";
import { Message } from "../types";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const msgStore = useMessagesStore();
const settings = useSettingsStore();

const { msg } = defineProps<{
  msg: Message;
}>();

const remove = () => {
  msgStore.remove(msg.id);
};

if (settings.timeout > 0) {
  setTimeout(() => remove(), settings.timeout * 1000);
}
</script>
