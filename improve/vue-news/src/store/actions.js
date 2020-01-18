import { fetchNewsList, fetchAskList, fetchJobsList } from "../api/index.js";

export default {
  FETCH_NEWS(context) {
    fetchNewsList()
      .then(res => {
        //바로 state에 담을 수 없고, mutation을 호출해야함 >> context.commit
        // this.state.news = res.data;
        context.commit("SET_NEWS", res.data);
      })
      .catch();
  },
  FETCH_ASK({ commit }) {
    fetchAskList()
      .then(({ data }) => {
        commit("SET_ASK", data);
      })
      .catch();
  },
  FETCH_JOBS({ commit }) {
    fetchJobsList()
      .then(({ data }) => {
        commit("SET_JOBS", data);
      })
      .catch();
  }
}