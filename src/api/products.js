import axios from 'axios';
import { backend } from './constants';


export async function getProducts(params = {}) {
  return axios.get(`${backend}/api/products`, { params });
    // return axios.get(`http://localhost:3000/api/products`, { params });
}
export async function createProduct(data) {
  return axios.post(`${backend}/api/products`, data);
}
export async function updateProduct(id, data) {
  return axios.put(`${backend}/api/products/${id}`, data);
}
export async function deleteProduct(id) {
  return axios.delete(`${backend}/api/products/${id}`);
}
