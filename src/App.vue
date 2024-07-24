<template>
  <Sidebar />
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar.vue";
import { useSettingsStore } from "./stores/settings.vue";

// bind darkmode to html element
const settings = useSettingsStore();
settings.$onAction(({ name, after }) => {
  after(() => {
    if (name === "update") {
      document.documentElement.classList[settings.darkMode ? "add" : "remove"](
        "dark"
      );
    }
  });
});
</script>
