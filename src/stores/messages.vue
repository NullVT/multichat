<script lang="ts">
import { defineStore, Store } from "pinia";
import config from "../config";
import { Message } from "../types";

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
      // add message to store
      this.$state.push(msg);

      // limit max number of messages
      if (this.$state.length > config.maxMessages) {
        this.$state.shift();
      }
    },

    delete(id: string) {
      const index = this.$state.findIndex((msg) => msg.id === id);
      this.$state.splice(index, 1);
    },
  },
});
</script>
