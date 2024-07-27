<script lang="ts">
import { defineStore } from "pinia";

export type Settings = {
  darkMode: boolean;
  sevenTv: boolean;
};

export const useSettingsStore = defineStore("settings", {
  persist: true,
  state: (): Settings => ({
    darkMode: false,
    sevenTv: false,
  }),
  actions: {},
});
</script>
