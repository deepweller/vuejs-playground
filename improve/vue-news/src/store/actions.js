import { fetchNewsList, fetchAskList, fetchJobsList, fetchUserInfo, fetchAskItem } from "../api/index.js";

export default {
  FETCH_NEWS(context) {
    fetchNewsList()
      .then(res => {
        //바로 state에 담을 수 없고, mutation을 호출해야함 >> context.commit
        // this.state.news = res.data;
        context.commit("SET_NEWS", res.data);
        return res;
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
  },
  FETCH_USER({ commit }, userName) {
    fetchUserInfo(userName)
      .then(({ data }) => {
        commit("SET_USER", data)
      })
      .catch();
  },
  FETCH_ASK_ITEM({ commit }, itemId) {
    fetchAskItem(itemId)
      .then(({ data }) => {
        commit('SET_ASK_ITEM', data);
      })
      .catch();
  }
}