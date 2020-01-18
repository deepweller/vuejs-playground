import Vue from 'vue';
import Vuex from 'vuex';
import { fetchNewsList } from "../api/index.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        news: []
    },
    actions: {
        FETCH_NEWS(context) {
            fetchNewsList()
            .then(res => {
                //바로 state에 담을 수 없고, mutation을 호출해야함 >> context.commit
                // this.state.news = res.data;
                context.commit('SET_NEWS', res.data);
            })
            .catch();
        }
    },
    mutations: {
        SET_NEWS(state, news) {
            state.news = news;
        }
    }
});