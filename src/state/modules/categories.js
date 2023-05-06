import * as categoryApi from '@api/category';
import {
  ADD_CATEGORIES,
  DELETE_CATEGORY,
  SET_CATEGORY,
  UPDATE_CATEGORY,
} from '@state/mutation-types';

export const state = {
  categories: [],
};

export const getters = {
  getCategories(state) {
    return state.categories;
  },
};

export const mutations = {
  [DELETE_CATEGORY](state, categoryId) {
    const categoryIndex = state.categories.findIndex((obj) => obj.id === categoryId);
    state.categories.splice(categoryIndex, 1);
  },
  [ADD_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [UPDATE_CATEGORY](state, category) {
    const categoryIndex = state.categories.findIndex((obj) => obj.id === category.id);
    state.categories[categoryIndex] = category;
  },
  [SET_CATEGORY](state, category) {
    state.categories = [
      ...state.categories,
      category,
    ];
  },
};

export const actions = {
  async createCategory({ commit }, { params }) {
    const response = await categoryApi.createCategory(params);
    const category = response?.data?.category;
    commit(SET_CATEGORY, category);
    return category;
  },
  async deleteCategory({ commit }, { categoryId }) {
    await categoryApi.deleteCategory(categoryId);
    commit(DELETE_CATEGORY, categoryId);
  },
  async fetchAllCategories({ commit }) {
    const response = await categoryApi.getAllCategories();
    const categories = response?.data?.categories;
    commit(ADD_CATEGORIES, categories);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
