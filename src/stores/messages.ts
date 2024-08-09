import { defineStore, Store } from "pinia";
import config from "../config";
import { Message } from "../types";

export type MessagesStore = Store<
  "messages",
  {
    messages: Message[];
  },
  {},
  {
    add(msg: Message): void;
    remove(id: string): void;
  }
>;

export const useMessagesStore = defineStore("messages", {
  // only persist on dev server
  persist: import.meta.env.DEV,

  state: () => ({
    messages: [] as Message[],
  }),

  actions: {
    add(msg: Message) {
      // Create a new array with the new message added
      const newMessages = [...this.messages, msg];

      // Limit max number of messages
      this.messages = newMessages.slice(-config.maxMessages);
    },

    remove(id: string) {
      // Create a new array with the message removed
      this.messages = this.messages.filter((msg) => msg.id !== id);
    },
  },
});
