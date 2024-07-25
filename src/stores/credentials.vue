<script lang="ts">
import { defineStore } from "pinia";

export type Credentials = {
  twitch?: string;
};

export default defineStore("credentials", {
  persist: true,
  state: (): Credentials => ({
    twitch: undefined,
  }),
  actions: {
    update(partial: Partial<Credentials>) {
      this.$state = { ...this.$state, ...partial };
    },
  },
});
</script>
