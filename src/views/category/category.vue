<script>
import { mapActions } from 'vuex';
import { BButton, BSpinner } from 'bootstrap-vue';

export default {
  page: {
    meta: [{
      name: 'description',
      content: 'Categoria',
    }],
  },
  components: {
    BButton,
    BSpinner,
  },
  data() {
    return {
      isLoading: false,
      newCategory: '',
      categories: [],
      lastCategoryId: 0,
      currentCategoryId: null,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions('categories', ['fetchAllCategories', 'createCategory', 'deleteCategory']),
    async fetchCategories() {
      this.isLoading = true;
      this.categories = await this.fetchAllCategories();
      if (this.categories) {
        this.isLoading = false;
      }
    },
    async addCategory() {
      const category = await this.createCategory({ params: { name: this.newCategory } });
      if (category) {
        this.categories.push(category);
        this.newCategory = '';
        this.$bvToast.toast('Categoria criada com sucesso', {
          toaster: 'b-toaster-top-full',
          variant: 'success',
          noCloseButton: true,
        });
      } else {
        this.$bvToast.toast('Erro ao criar categoria', {
          toaster: 'b-toaster-top-full',
          variant: 'danger',
          noCloseButton: true,
        });
      }
    },
    showDeleteModal(categoryId) {
      this.currentCategoryId = categoryId;
      this.$refs['delete-modal'].show();
    },
    hideDeleteModal() {
      this.currentCategoryId = null;
      this.$refs['delete-modal'].hide();
    },
    async deleteCategoryById() {
      await this.deleteCategory({ categoryId: this.currentCategoryId });
      this.fetchCategories();
      this.hideDeleteModal();
    },
  },
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-primary">
        PAINEL DE GERENCIAMENTO - CATEGORIA
      </h1>
    </div>
    <div class="border border-primary">
      <div class="card-header text-white bg-secondary mb-3">
        <h2 class="mb-0">Cadastro de Nova Categoria</h2>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="category-input">Nome da Categoria:</label>
            <input
              type="text"
              class="form-control"
              id="category-input"
              placeholder="Nome da Categoria"
              v-model="newCategory"
            />
          </div>

          <div class="d-flex w-100 justify-content-end mt-4">
            <b-button
              type="button"
              variant="primary"
              @click="addCategory"
            >
              Cadastrar
            </b-button>
          </div>
        </form>
      </div>
      <div>
        <table v-if="!isLoading" class="table mt-5" striped hover>
          <thead>
            <tr>
              <th class="text-dark-green">#Id</th>
              <th class="text-dark-green">Categoria</th>
              <th class="text-dark-green">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(category, index) in categories"
              :key="category.id"
              :class="{ 'table-secondary': index % 2 == 0, 'table-light': index % 2 != 0 }"
            >
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <b-button
                  type="button"
                  variant="danger"
                  @click="showDeleteModal(category.id)"
                >
                  X
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-spinner v-else label="Loading"></b-spinner>
      </div>
    </div>

    <b-modal ref="delete-modal" title="Tem certeza que deseja deletar?" hide-footer>
      <b-button variant="danger" @click="deleteCategoryById">Sim</b-button>
      <b-button variant="info" @click="hideDeleteModal">Não</b-button>
    </b-modal>
  </div>
</template>
