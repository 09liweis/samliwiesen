const API = 'https://samliweisen.herokuapp.com/api/';
// const API = 'http://localhost:8081/api/'
function genAPI(endpoint) {
  let apiUrl = API + endpoint + '&origin=localhost';
  return apiUrl.replace('&','?');
}

function getAuthToken() {
  return localStorage.getItem('auth-token');
}

export {
  genAPI,
  getAuthToken
};