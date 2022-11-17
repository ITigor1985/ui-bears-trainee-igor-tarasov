import Vue from "vue";
import store from "./store/index";
import App from "./App.vue";
import loading from "vuejs-loading-screen";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(loading, {
  bg: "rgba(255, 255, 255, 0.3)",
  icon: "refresh",
  size: 5,
  icon_color: "black",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
