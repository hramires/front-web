/* eslint-disable import/prefer-default-export */
import { GET_LOCATION_URL } from '@config/google';
import axios from 'axios';

export const getMarkerLocation = async (marker) => {
  let locationUrl = GET_LOCATION_URL;
  locationUrl = locationUrl.replace('{lat}', marker.lat);
  locationUrl = locationUrl.replace('{lng}', marker.lng);

  const location = axios.get(locationUrl).then((response) => {
    if (response?.data?.results) {
      return response.data.results[0].formatted_address;
    }
    return 'Endereço não encontrado';
  });
  return location;
};
