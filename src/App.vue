<template>
  <Sidebar />
  <div class="mt-20 text-center">
    <h1 class="text-3xl dark: text-white">
      Not connected to any accounts! <br />
      Please open the settings and connect at least one account.
    </h1>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./components/sidebar.vue";
import useSettingsStore from "./stores/settings.vue";

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
