import Vue from "vue";
import store from "./store/index";
import App from "./App.vue";
import Vuex from "vuex";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import loading from "vuejs-loading-screen";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(loading, {
  bg: "#41b883ad",
  icon: "fas fa-spinner",
  size: 3,
  icon_color: "black",
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
