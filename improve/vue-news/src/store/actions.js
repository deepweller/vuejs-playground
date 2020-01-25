import {
  fetchNewsList,
  fetchAskList,
  fetchJobsList,
  fetchUserInfo,
  fetchAskItem,
  fetchList
} from '../api/index.js';

export default {
  FETCH_USER({ commit }, userName) {
    fetchUserInfo(userName)
      .then(({ data }) => {
        commit('SET_USER', data);
      })
      .catch();
  },
  FETCH_ASK_ITEM({ commit }, itemId) {
    fetchAskItem(itemId)
      .then(({ data }) => {
        commit('SET_ASK_ITEM', data);
      })
      .catch();
  },
  FETCH_LIST({ commit }, pageName) {
    fetchList(pageName)
      .then(({ data }) => commit('SET_LIST', data))
      .catch();
  }
};
