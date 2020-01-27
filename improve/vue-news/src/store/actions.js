import {
  fetchUserInfo,
  fetchAskItem,
  fetchList
} from '../api/index.js';

export default {
  FETCH_USER({ commit }, userName) {
    return fetchUserInfo(userName)
      .then(({ data }) => {
        commit('SET_USER', data);
      })
      .catch();
  },
  FETCH_ASK_ITEM({ commit }, itemId) {
    return fetchAskItem(itemId)
      .then(({ data }) => {
        commit('SET_ASK_ITEM', data);
      })
      .catch();
  },
  FETCH_LIST({ commit }, pageName) {
    return fetchList(pageName)
      .then( response => {
        commit('SET_LIST', response.data)
        return response;
      })
      .catch();
  }
};
