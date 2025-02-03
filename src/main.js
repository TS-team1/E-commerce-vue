import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// swiper config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// mitt
import mitt from "mitt";
const emitter = mitt();

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .provide("emitter", emitter)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount("#app");
