<template>
  <Sidebar />
  <div class="mt-20 text-center">
    <h1 class="text-3xl underline decoration-red-500">
      Not connected to any accounts! <br />
      Please open the settings and connect at least one account.
    </h1>
    <p class="mt-6">
      NOTE: Once the settings have been opened for the first time the button
      will be hidden, <br />
      but it will still be shown when hovering, and on page reload.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Sidebar from "./components/sidebar.vue";
import useSettingsStore from "./stores/settings.vue";
import useCredentialsStore from "./stores/credentials.vue";
import { setDarkTheme } from "./helpers";

// handle oauth crap
if (window.location.pathname.startsWith("/oauth/twitch")) {
  // extract params from url
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  // send error toast
  if (params.has("error")) {
    console.error(
      "twitch auth error",
      params.get("error"),
      params.get("error_description")
    );
  }

  // persist auth token
  const creds = useCredentialsStore();
  if (!params.has("error") && params.has("access_token")) {
    creds.update({ twitch: params.get("access_token")! });
  }

  // remove params from url
  window.location.replace(
    window.location.href.split("#")[0].replace(/\/oauth\/twitch$/, "")
  );
}

// bind darkmode to html element
const settings = useSettingsStore();
settings.$onAction(({ name, after }) => {
  after(() => name === "update" && setDarkTheme(settings.darkMode));
});
onMounted(() => setDarkTheme(settings.darkMode));
</script>
