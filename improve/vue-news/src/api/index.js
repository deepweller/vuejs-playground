import axios from "axios"; //package.json에 있는 axios

// http request, response 관련된 config
const config = {
  baseUrl: "https://api.hnpwa.com/v0"
};

// api 공통 호출부분
function fetchNewsList() {
  // return axios.get(config.baseUrl + '/news/1.json');
  return axios.get(`${config.baseUrl}/news/1.json`);
}

function fetchJobsList() {
  return axios.get(`${config.baseUrl}/jobs/1.json`);
}

function fetchAskList() {
  return axios.get(`${config.baseUrl}/ask/1.json`);
}

function fetchUserInfo(userName) {
  return axios.get(`${config.baseUrl}/user/${userName}.json`);
}

export { fetchNewsList, fetchAskList, fetchJobsList, fetchUserInfo};
