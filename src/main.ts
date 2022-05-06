import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from './store'

const app = createApp(App);

// pass the injection key
app
.use(router)
.use(store, key)

app.mount("#app");
