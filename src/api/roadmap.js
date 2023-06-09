import axios from 'axios';
import { BASE_URL } from './utils';

const ROAD_MAP_URL = `${BASE_URL}/roadmap`;

export function createRoadMap(params) {
  return axios.post(ROAD_MAP_URL, params);
}

export function updateRoadMap(id, params) {
  const updateUrl = `${ROAD_MAP_URL}/${id}`;
  return axios.put(updateUrl, params);
}

export function deleteRoadMap(id) {
  const deleteUrl = `${ROAD_MAP_URL}/${id}`;
  return axios.delete(deleteUrl);
}

export function getRoadMapById(id) {
  const geteUrl = `${ROAD_MAP_URL}/${id}`;
  return axios.get(geteUrl);
}

export function getAllRoadMaps() {
  return axios.get(ROAD_MAP_URL);
}
