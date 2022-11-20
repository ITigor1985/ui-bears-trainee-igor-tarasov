import Vue from "vue";
import Vuex from "vuex";
import columns from "./modules/columns";
import cards from "./modules/cards";
import loader from "./modules/loader";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    columns,
    cards,
    loader,
  },
});
