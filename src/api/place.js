import axios from 'axios';

// url de exemplo, trocar pela correta quando possível
const PLACE_URL = 'https://exemplo.com/api/v1/sites';

/*
Request body create and update:
{
  "id_region": "001",
  "id_category": "002",
  "site_name": "Example Site",
  "photos": "longblob",
  "opening_hours": "9:00 AM",
  "closing_hours": "5:00 PM",
  "appointment": "N"
}
*/

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
