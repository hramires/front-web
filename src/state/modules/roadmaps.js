import * as roadmapApi from '@api/roadmap';
import {
  ADD_ROADMAP,
  DELETE_ROADMAP,
  SET_ROADMAP,
  UPDATE_ROADMAP,
} from '@state/mutation-types';

export const state = {
  roadmaps: [],
};

export const getters = {
  getRoadmapById: (state) => (id) => {
    const roadmapIndex = state.roadmaps.findIndex((obj) => obj.id === id);
    return state.roadmaps[roadmapIndex];
  },
  getRoadmaps(state) {
    return state.roadmaps;
  },
};

export const mutations = {
  [DELETE_ROADMAP](state, roadmapId) {
    const roadmapIndex = state.roadmaps.findIndex((obj) => obj.id === roadmapId);
    state.roadmaps.splice(roadmapIndex, 1);
  },
  [ADD_ROADMAP](state, roadmaps) {
    state.roadmaps = roadmaps;
  },
  [UPDATE_ROADMAP](state, roadmap) {
    const roadmapIndex = state.roadmaps.findIndex((obj) => obj.id === roadmap.id);
    state.roadmaps[roadmapIndex] = roadmap;
  },
  [SET_ROADMAP](state, roadmap) {
    state.roadmaps = [
      ...state.roadmaps,
      roadmap,
    ];
  },
};

export const actions = {
  async createRoadmap({ commit }, { params }) {
    const response = await roadmapApi.createRoadMap(params);
    const roadmap = response?.data?.roadmap;
    commit(SET_ROADMAP, roadmap);
    return roadmap;
  },
  async updateRoadmap({ commit }, { id, params }) {
    const response = await roadmapApi.updateRoadMap(id, params);
    const roadmap = response?.data?.roadmap;
    commit(UPDATE_ROADMAP, roadmap);
    return roadmap;
  },
  async deleteRoadmap({ commit }, { roadmapId }) {
    await roadmapApi.deleteRoadMap(roadmapId);
    commit(DELETE_ROADMAP, roadmapId);
  },
  async fetchAllRoadmaps({ commit }) {
    const response = await roadmapApi.getAllRoadMaps();
    const roadmaps = response?.data?.roadmaps;
    commit(ADD_ROADMAP, roadmaps);
  },
  async fetchRoadmapById({ commit }, { roadmapId }) {
    const response = await roadmapApi.getRoadMapById(roadmapId);
    const roadmap = response?.data?.roadmap;
    commit(SET_ROADMAP, roadmap);
    return roadmap;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
