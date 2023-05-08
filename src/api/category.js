import axios from 'axios';
import { BASE_URL } from './utils';

// url de teste
const CATEGORY_URL = `${BASE_URL}/category`;

export function createCategory(params) {
  return axios.post(CATEGORY_URL, params);
}

// export function updatePlace(id, params) {
//   const updateUrl = `${PLACE_URL}/${id}`;
//   return axios.put(updateUrl, params);
// }

export function deleteCategory(id) {
  const deleteUrl = `${CATEGORY_URL}/${id}`;
  return axios.delete(deleteUrl);
}

// export function getPlaceById(id) {
//   const geteUrl = `${PLACE_URL}/${id}`;
//   return axios.get(geteUrl);
// }

export function getAllCategories() {
  return axios.get(CATEGORY_URL);
}
