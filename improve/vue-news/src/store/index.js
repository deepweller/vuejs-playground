import Vue from 'vue';
import Vuex from 'vuex';
import { fetchNewsList, fetchAskList, fetchJobsList } from "../api/index.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        news: [],
        jobs: [],
        asks: []
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
        },
        FETCH_ASK(context) {
            fetchAskList()
            .then(res => {
                context.commit('SET_ASK', res.data);
            })
            .catch();
        },
        FETCH_JOBS(context) {
            fetchJobsList()
            .then(res => {
                context.commit('SET_JOBS', res.data);
            })
            .catch();
        }
    },
    mutations: {
        SET_NEWS(state, news) {
            state.news = news;
        },
        SET_ASK(state, asks) {
            state.asks = asks;
        },
        SET_JOBS(state, jobs) {
            state.jobs = jobs;
        }
    }
});