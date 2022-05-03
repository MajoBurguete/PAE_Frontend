import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from 'vuex'
import { store, key } from './store'

const app = createApp(App);

app.use(router);
// pass the injection key
app.use(store, key)

app.mount("#app");
