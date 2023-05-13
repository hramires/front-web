import * as regionApi from '@api/region';
import {
  ADD_REGIONS,
  DELETE_REGION,
  SET_REGION,
  UPDATE_REGION,
} from '@state/mutation-types';

export const state = {
  regions: [],
};

export const getters = {
  getRegionById: (state) => (id) => {
    const regionIndex = state.regions.findIndex((obj) => obj.id === id);
    return state.regions[regionIndex];
  },
  getRegions(state) {
    return state.regions;
  },
};

export const mutations = {
  [DELETE_REGION](state, regionId) {
    const regionIndex = state.regions.findIndex((obj) => obj.id === regionId);
    state.regions.splice(regionIndex, 1);
  },
  [ADD_REGIONS](state, regions) {
    state.regions = regions;
  },
  [UPDATE_REGION](state, region) {
    const regionIndex = state.regions.findIndex((obj) => obj.id === region.id);
    state.regions[regionIndex] = region;
  },
  [SET_REGION](state, region) {
    const regionIndex = state.regions.findIndex((obj) => obj.id === region.id);
    if (!regionIndex) {
      state.regions = [
        ...state.regions,
        region,
      ];
    }
  },
};

export const actions = {
  async createRegion({ commit }, { params }) {
    const response = await regionApi.createRegion(params);
    const region = response?.data?.region;
    commit(SET_REGION, region);
    return region;
  },
  async updateRegion({ commit }, { id, params }) {
    const response = await regionApi.updateRegion(id, params);
    const region = response?.data?.region;
    commit(UPDATE_REGION, region);
    return region;
  },
  async deleteRegion({ commit }, { regionId }) {
    await regionApi.deleteRegion(regionId);
    commit(DELETE_REGION, regionId);
  },
  async fetchAllRegions({ commit }) {
    const response = await regionApi.getAllRegions();
    const regions = response?.data?.regions;
    commit(ADD_REGIONS, regions);
  },
  async fetchRegionById({ commit }, { regionId }) {
    const response = await regionApi.getRegionById(regionId);
    const region = response?.data?.region;
    const categories = response?.data?.categories;
    commit(SET_REGION, region);
    return { region, categories };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
