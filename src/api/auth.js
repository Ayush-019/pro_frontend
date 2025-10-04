import axios from 'axios';
import { backend } from './constants';
 
export async function login(username, password) {
  const res = await axios.post(`${backend}/api/auth/login`, { username, password });
  console.log(res);
  return res;
}


export async function register(username, password) {
  return axios.post(`${backend}/api/auth/register`, { username, password });
}
