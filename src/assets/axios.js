import axios from "axios"
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

axios.defaults.baseURL = publicRuntimeConfig.apiUrl
axios.defaults.headers.common['Accept'] = 'application/json';

const uninterceptedAxiosInstance = axios.create();

uninterceptedAxiosInstance.interceptors.response.use(response => {
   return response
}, error => {
  // if (error.response && error.response.status === 401) {
  //   localStorage.removeItem('auth_token')

  //   window.location.pathname = (process.env.REACT_APP_BASENAME + '/bejelentkezes').replace(/\/\//g, '/')
  // }

  return Promise.reject(error)
})

export default uninterceptedAxiosInstance
