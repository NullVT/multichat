<script lang="ts">
import { defineStore, Store } from "pinia";
import config from "../config";
import { Message } from "../types";

export type MessagesStore = Store<
  "messages",
  Message[],
  {},
  {
    add(msg: Message): void;
    remove(id: string): void;
  }
>;

export const useMessagesStore = defineStore("messages", {
  persist: true,
  state: (): Message[] => [],
  actions: {
    add(msg: Message) {
      // add message to store
      this.$state.push(msg);

      // limit max number of messages
      if (this.$state.length > config.maxMessages) {
        this.$state.shift();
      }
    },

    remove(id: string) {
      const index = this.$state.findIndex((msg) => msg.id === id);
      this.$state.splice(index, 1);
    },
  },
});
</script>
