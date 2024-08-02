<template>
  <button
    class="w-full inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-twitch hover:bg-twitch-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10"
    :disabled="!!creds.twitch"
    @click.once="login"
  >
    <img src="/twitch.svg" class="size-6" />
    <span class="text-center w-full pr-6">{{
      creds.twitch
        ? `Connected as ${creds.twitch.displayName}`
        : "Login with Twitch"
    }}</span>
  </button>
</template>

<script lang="ts" setup>
import { useCredentialsStore } from "../../stores/credentials.vue";
import { login } from "../../clients/twitch";
const creds = useCredentialsStore();
</script>
