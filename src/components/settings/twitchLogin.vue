<template>
  <button
    v-if="!creds.twitch"
    class="w-full inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-twitch hover:bg-twitch-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    @click="login"
  >
    <img src="/twitch.svg" class="size-6 mr-6" />
    Login with Twitch
  </button>

  <button v-else class="w-full rounded-md bg-twitch" disabled>
    Connected to twitch
  </button>
</template>

<script lang="ts" setup>
import useCredentialsStore from "../../stores/credentials.vue";
const creds = useCredentialsStore();

const login = () => {
  const params = new URLSearchParams({
    response_type: "token",
    client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
    redirect_uri: `${window.location.origin}/oauth/twitch`,
    scope: "chat:read",
  });
  const url = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
  window.location.assign(url);
};
</script>
