const API = 'https://samliweisen.herokuapp.com/api/';
function genAPI(endpoint,isLocal=false) {
  let apiUrl = API + endpoint + '?';
  if (isLocal) {
    apiUrl += 'origin=localhost';
  }
  return apiUrl;
}
export {
  genAPI
};