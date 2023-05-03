import axios from 'axios';

// url de teste
const EVENT_URL = 'http://localhost:3000/event';

export function createEvent(params) {
  return axios.post(EVENT_URL, params);
}

export function updateEvent(id, params) {
  const updateUrl = `${EVENT_URL}/${id}`;
  return axios.put(updateUrl, params);
}

export function deleteEvent(id) {
  const deleteUrl = `${EVENT_URL}/${id}`;
  return axios.delete(deleteUrl);
}

export function getEventById(id) {
  const geteUrl = `${EVENT_URL}/${id}`;
  return axios.get(geteUrl);
}

export function getAllEvents() {
  return axios.get(EVENT_URL);
}
