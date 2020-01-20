import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    news: [],
    jobs: [],
    asks: [],
    user: {},
    askItem: {}
  },
  actions,
  mutations,
  //vuex에 있는 computed와 동일한 속성
  getters: {
    fetchedAsk(state) {
      return state.asks;
    },
    fetchedItem(state) {
      return state.askItem;
    }
  }
});
