<script lang="ts">
import { defineStore } from "pinia";
import { Settings } from "../types";

export const useSettingsStore = defineStore("settings", {
  persist: true,
  state: (): Settings => ({
    darkMode: false,
    sevenTv: false,
    timeout: 10,
  }),
  actions: {},
});
</script>
