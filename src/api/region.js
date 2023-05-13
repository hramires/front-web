import axios from 'axios';
import { BASE_URL } from './utils';

// url de teste
const REGION_URL = `${BASE_URL}/region`;

export function createRegion(params) {
  return axios.post(REGION_URL, params);
}

export function updateRegion(id, params) {
  const updateUrl = `${REGION_URL}/${id}`;
  return axios.put(updateUrl, params);
}

export function deleteRegion(id) {
  const deleteUrl = `${REGION_URL}/${id}`;
  return axios.delete(deleteUrl);
}

export function getRegionById(id) {
  const geteUrl = `${REGION_URL}/${id}`;
  return axios.get(geteUrl);
}

export function getAllRegions() {
  return axios.get(REGION_URL);
}
