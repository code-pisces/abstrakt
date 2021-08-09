import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'abstrakt.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://abstrakt-api.herokuapp.com'
  })

  api.interceptors.request.use(config => {
    console.log(config);

    return config;
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
