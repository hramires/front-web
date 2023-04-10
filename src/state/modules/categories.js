import * as categoryApi from '@api/category';

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
  async fetchAllCategories() {
    const categories = await categoryApi.getAllCategories();
    return categories;
  },
  //   ,
  //   async fetchPlaceById(context, { placeId }) {
  //     const response = await placeApi.getPlaceById(placeId);
  //     return response.data;
  //   }
};

export default {
  namespaced: true,
  actions,
};
