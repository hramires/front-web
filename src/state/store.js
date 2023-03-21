import Vue from 'vue';
import Vuex from 'vuex';
import * as rootModule from './root';

import modules from './modules';

Vue.use(Vuex);

// eslint-disable-next-line import/no-named-as-default-member
const store = new Vuex.Store({
  state: rootModule.state,
  getters: rootModule.getters,
  mutations: rootModule.mutations,
  actions: rootModule.actions,
  modules,
});

export default store;
