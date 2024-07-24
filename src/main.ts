import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import piniaPersistedstate from "pinia-plugin-persistedstate";

// init vue
const app = createApp(App);

// set up store
const pinia = createPinia();
pinia.use(piniaPersistedstate);
app.use(pinia);

// mount app
app.mount("#app");
