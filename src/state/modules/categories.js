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
  async deleteCategory(context, { categoryId }) {
    await categoryApi.deleteCategory(categoryId);
  },
  async fetchAllCategories() {
    const categories = await categoryApi.getAllCategories();
    return categories.data ? categories.data : null;
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
