import Vue from 'vue';
import * as placeApi from '@api/place';
import {
  ADD_PLACES,
  DELETE_PLACE,
} from '@state/mutation-types';

export const state = {
  places: {},
};

export const getters = {
  getPlaceById: (state) => (id) => state.places[id],
  getPlaces(state) {
    return state.places;
  },
};

export const mutations = {
  [DELETE_PLACE](state, { placeId }) {
    Vue.delete(state.places, placeId);
  },
  [ADD_PLACES](state, places) {
    state.places = [
      ...state.places,
      ...places,
    ];
  },
};

export const actions = {
  async createPlace(context, { params }) {
    const place = await placeApi.createPlace(params);
    return place.data ? place.data : null;
  },
  async updatePlace(context, { id, params }) {
    const place = await placeApi.updatePlace(id, params);
    return place.data ? place.data : null;
  },
  async deletePlace({ commit }, { placeId }) {
    await placeApi.deletePlace(placeId);
    commit(DELETE_PLACE, { placeId });
  },
  async fetchAllPlaces({ commit }) {
    const places = await placeApi.getAllPlaces();
    commit(ADD_PLACES, places);
    return places;
  },
  async fetchPlaceById(context, { placeId }) {
    const response = await placeApi.getPlaceById(placeId);
    return response.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
