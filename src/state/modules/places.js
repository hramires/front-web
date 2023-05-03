import * as placeApi from '@api/place';
import {
  ADD_PLACES,
  DELETE_PLACE,
  SET_PLACE,
  UPDATE_PLACE,
} from '@state/mutation-types';

export const state = {
  places: [],
};

export const getters = {
  getPlaceById: (state) => (id) => {
    const placeIndex = state.places.findIndex((obj) => obj.id === id);
    return state.places[placeIndex];
  },
  getPlaces(state) {
    return state.places;
  },
};

export const mutations = {
  [DELETE_PLACE](state, placeId) {
    const placeIndex = state.places.findIndex((obj) => obj.id === placeId);
    state.places.splice(placeIndex, 1);
  },
  [ADD_PLACES](state, places) {
    state.places = places;
  },
  [UPDATE_PLACE](state, place) {
    const placeIndex = state.places.findIndex((obj) => obj.id === place.id);
    state.places[placeIndex] = place;
  },
  [SET_PLACE](state, place) {
    state.places = [
      ...state.places,
      place,
    ];
  },
};

export const actions = {
  async createPlace({ commit }, { params }) {
    const response = await placeApi.createPlace(params);
    const place = response?.data?.place;
    commit(SET_PLACE, place);
    return place;
  },
  async updatePlace({ commit }, { id, params }) {
    const response = await placeApi.updatePlace(id, params);
    const place = response?.data?.place;
    commit(UPDATE_PLACE, place);
    return place;
  },
  async deletePlace({ commit }, { placeId }) {
    await placeApi.deletePlace(placeId);
    commit(DELETE_PLACE, placeId);
  },
  async fetchAllPlaces({ commit }) {
    const response = await placeApi.getAllPlaces();
    const places = response?.data?.places;
    commit(ADD_PLACES, places);
  },
  async fetchPlaceById({ commit }, { placeId }) {
    const response = await placeApi.getPlaceById(placeId);
    const place = response?.data?.place;
    commit(SET_PLACE, place);
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
