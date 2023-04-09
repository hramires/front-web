import Vue from 'vue';
import * as placeApi from '@api/place';
import {
  ADD_PLACES,
  DELETE_PLACE,
  UPDATE_PLACE,
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
  [UPDATE_PLACE](state, { place }) {
    const placeIndex = state.places.findIndex((obj) => obj.id === place.id);
    state.places[placeIndex] = place;
  },
};

export const actions = {
  async createPlace({ commit }, { params }) {
    const json = JSON.stringify(params);
    const response = await placeApi.createPlace(json);
    const place = JSON.parse(response);
    commit(ADD_PLACES, [place]);
    return place;
  },
  async updatePlace({ commit }, { id, params }) {
    const json = JSON.stringify(params);
    const response = await placeApi.updatePlace(id, json);
    const place = JSON.parse(response);
    commit(UPDATE_PLACE, { place });
    return place;
  },
  async deletePlace({ commit }, { placeId }) {
    await placeApi.deletePlace(placeId);
    commit(DELETE_PLACE, { placeId });
  },
  async fetchAllPlaces({ commit }) {
    const response = await placeApi.getAllPlaces();
    const places = JSON.parse(response);
    commit(ADD_PLACES, places);
    return places;
  },
  async fetchPlaceById({ placeId }) {
    const response = await placeApi.getPlaceById(placeId);
    const place = JSON.parse(response);
    return place;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
