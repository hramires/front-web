import Vue from "vue";
import * as categoryApi from "@api/category";
import { ADD_CATEGORIES } from "@state/mutation-types";

export const state = {
  categories: {}
};

export const getters = {
  getCategoryById: state => id => state.categories[id],
  getCategories(state) {
    return state.categories;
  }
};

export const mutations = {
  //   [DELETE_PLACE](state, { placeId }) {
  //     Vue.delete(state.places, placeId);
  //   },
  [ADD_CATEGORIES](state, categories) {
    state.categories = [...state.categories, ...categories];
  }
};

export const actions = {
  async createCategory(context, { params }) {
    const category = await categoryApi.createCategory(params);
    return category.data ? category.data : null;
  },
  //   async updatePlace(context, { id, params }) {
  //     const place = await placeApi.updatePlace(id, params);
  //     return place.data ? place.data : null;
  //   },
  //   async deletePlace({ commit }, { placeId }) {
  //     await placeApi.deletePlace(placeId);
  //     commit(DELETE_PLACE, { placeId });
  //   },
  async fetchAllCategories({ commit }) {
    const categories = await categoryApi.getAllCategories();
    commit(ADD_CATEGORIES, categories);
    return categories;
  }
  //   ,
  //   async fetchPlaceById(context, { placeId }) {
  //     const response = await placeApi.getPlaceById(placeId);
  //     return response.data;
  //   }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
