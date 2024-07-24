<script lang="ts">
import { defineStore } from "pinia";

export type Settings = {
  darkMode: boolean;
};

export const useSettingsStore = defineStore("settings", {
  persist: true,
  state: (): Settings => ({
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  }),
  actions: {
    update(partialSettings: Partial<Settings>) {
      this.$state = { ...this.$state, ...partialSettings };
    },
  },
});
</script>
