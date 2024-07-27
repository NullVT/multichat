<script lang="ts">
import { defineStore, Store } from "pinia";

export type Credentials = {
  twitch?: {
    token: string;
    username?: string;
  };
};

export type CredentialsStore = Store<"credentials", Credentials>;
export const useCredentialsStore = defineStore("credentials", {
  persist: true,
  state: (): Credentials => ({
    twitch: undefined,
  }),
  actions: {},
});
</script>
