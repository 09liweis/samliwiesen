const API = 'https://samliweisen.herokuapp.com/api/';
function genAPI(endpoint,isLocal=false) {
  let apiUrl = API + endpoint + '/';
  return apiUrl;
}
export {
  genAPI
};