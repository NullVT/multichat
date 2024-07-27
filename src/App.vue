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
import { useSettingsStore } from "./stores/settings.vue";
import { useCredentialsStore } from "./stores/credentials.vue";
import { setDarkTheme } from "./helpers";
import { init as twitchInit, oauth as twitchOauth } from "./clients/twitch";
import { useMessagesStore } from "./stores/messages.vue";

// setup stores
const credsStore = useCredentialsStore();
const msgStore = useMessagesStore();

// handle oauth crap
if (window.location.pathname.startsWith("/oauth/twitch")) {
  twitchOauth(credsStore);
}

// bind darkmode to html element
const settings = useSettingsStore();
settings.$subscribe((mutation, state) => setDarkTheme(state.darkMode));
onMounted(() => setDarkTheme(settings.darkMode));

// setup connection to twitch
if (credsStore.twitch) {
  const twitchWs = twitchInit({
    channel: credsStore.twitch?.username ?? "nullvt",
    credsStore,
    msgStore,
  });
}
</script>
