import axios from 'axios'

const BASE_URL = 'http://localhost:3333'
const REST_PATH = 'api/blog'


function getUsersData() {
  const url = `${BASE_URL}/${REST_PATH}/users`;
  return axios.get(url).then(response => response.data);
}

function getPostsData() {
  const url = `${BASE_URL}/${REST_PATH}/posts`;
  return axios.get(url).then(response => response.data);
}

export { getUsersData, getPostsData }