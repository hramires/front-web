import * as placeApi from '@api/place';

export const actions = {
  async createPlace(context, { params }) {
    const place = await placeApi.createPlace(params);
    return place.data ? place.data : null;
  },
  async updatePlace(context, { id, params }) {
    const place = await placeApi.updatePlace(id, params);
    return place.data ? place.data : null;
  },
  async deletePlace(context, { placeId }) {
    await placeApi.deletePlace(placeId);
  },
  async fetchAllPlaces() {
    const places = await placeApi.getAllPlaces();
    return places;
  },
  async fetchPlaceById(context, { placeId }) {
    const response = await placeApi.getPlaceById(placeId);
    return response.data;
  },
};

export default {
  namespaced: true,
  actions,
};
