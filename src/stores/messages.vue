<script lang="ts">
import { defineStore, Store } from "pinia";
import config from "../config";
export type Message = {
  platform: "twitch" | "youtube";
  recivedAt: Date;
  from: string;
  body: string;
};

export type MessagesStore = Store<
  "messages",
  Message[],
  {},
  {
    push(msg: Message): void;
  }
>;
export const useMessagesStore = defineStore("messages", {
  persist: false,
  state: (): Message[] => [],
  actions: {
    push(msg: Message) {
      this.$state.push(msg);
      if (this.$state.length > config.maxMessages) {
        this.$state.shift();
      }
    },
  },
});
</script>
