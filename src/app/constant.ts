const API = 'https://samliweisen.herokuapp.com/api/';
function genAPI(endpoint) {
  let apiUrl = API + endpoint + '&origin=localhost';
  return apiUrl.replace('&','?');
}
export {
  genAPI
};