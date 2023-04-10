import axios from "axios";

// url de teste
const CATEGORY_URL = "http://localhost:3000/category";

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

export function createCategory(params) {
  return axios.post(CATEGORY_URL, params);
}

// export function updatePlace(id, params) {
//   const updateUrl = `${PLACE_URL}/${id}`;
//   return axios.put(updateUrl, params);
// }

// export function deletePlace(id) {
//   const deleteUrl = `${PLACE_URL}/${id}`;
//   return axios.delete(deleteUrl);
// }

// export function getPlaceById(id) {
//   const geteUrl = `${PLACE_URL}/${id}`;
//   return axios.get(geteUrl);
// }

export function getAllCategories() {
  return axios.get(CATEGORY_URL);
}