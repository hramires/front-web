import axios from 'axios';
import { BASE_URL } from './utils';

// url de teste
const PLACE_URL = `${BASE_URL}/place`;

export function createPlace(params) {
  return axios.post(PLACE_URL, params);
}

export function updatePlace(id, params) {
  const updateUrl = `${PLACE_URL}/${id}`;
  return axios.put(updateUrl, params);
}

export function deletePlace(id) {
  const deleteUrl = `${PLACE_URL}/${id}`;
  return axios.delete(deleteUrl);
}

export function getPlaceById(id) {
  const geteUrl = `${PLACE_URL}/${id}`;
  return axios.get(geteUrl);
}

export function getAllPlaces() {
  return axios.get(PLACE_URL);
}
