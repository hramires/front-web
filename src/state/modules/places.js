import Vue from 'vue';
import * as placeApi from '@api/place';
import {
  ADD_OR_UPDATE_PLACE,
  DELETE_PLACE,
} from '@state/mutation-types';

export const state = {
  places: {},
};

export const getters = {

};

export const mutations = {
  [DELETE_PLACE](state, { placeId }) {
    Vue.delete(state.places, placeId);
  },
  [ADD_OR_UPDATE_PLACE](state, { place }) {
    state.places.push(place);
  },
};

export const actions = {
  async createPlace({ commit }, { params }) {
    const json = JSON.stringify(params);
    const response = await placeApi.createPlace(json);
    const place = JSON.parse(response);
    commit(ADD_OR_UPDATE_PLACE, { place });
    return place;
  },
  async deletePlace({ commit }, { placeId }) {
    await placeApi.deletePlace(placeId);
    commit(DELETE_PLACE, { placeId });
  },
};
