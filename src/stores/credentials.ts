import { defineStore, Store } from "pinia";
import { Credentials } from "../types";

export type CredentialsStore = Store<"credentials", Credentials>;

export const useCredentialsStore = defineStore("credentials", {
  persist: true,
  state: (): Credentials => ({
    twitchError: false,
    twitch: undefined,
  }),
  actions: {},
});
