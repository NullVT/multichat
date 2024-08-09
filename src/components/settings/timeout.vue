<template>
  <label
    for="email"
    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
  >
    Timeout
    <span :class="settings.timeout === 0 && 'text-red-400'">
      ({{ settings.timeout === 0 ? "off" : `${settings.timeout}s` }})
    </span>
  </label>
  <div class="mt-2">
    <input
      v-model.number="settings.timeout"
      type="range"
      class="block transparent h-[4px] w-full appearance-none border-transparent dark:bg-neutral-200 bg-neutral-300"
      min="0"
      max="60"
      step="1"
    />
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "../../stores/settings";

const settings = useSettingsStore();
</script>
