<script lang="ts">
import { defineStore, Store } from "pinia";

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
      // todo: only keep n messages
      this.$state.push(msg);
    },
  },
});
</script>
