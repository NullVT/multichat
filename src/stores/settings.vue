<script lang="ts">
import { defineStore } from "pinia";

export type Settings = {
  darkMode: boolean;
  sevenTv: boolean;
};

export default defineStore("settings", {
  persist: true,
  state: (): Settings => ({
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    sevenTv: false,
  }),
  actions: {
    update(partialSettings: Partial<Settings>) {
      this.$state = { ...this.$state, ...partialSettings };
    },
  },
});
</script>
