import axios from 'axios';


export function httpHandler() {
  const config = {
    
    headers:{
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
  return axios.create(config);
}

function credentialsHandler(config = { headers: {} }) {
  const csrf = atob(localStorage.getItem('token'));
  if (csrf) {
    config.headers.Authorization = `Bearer ${csrf}`;
  }
  return axios.create(config);
}

export function httpXcsrfHandler() {
  const config = {
    
    headers: {'content-type': 'application/x-www-form-urlencoded'},
  };
  return credentialsHandler(config);
}
