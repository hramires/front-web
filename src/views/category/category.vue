<script>
import {
  BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{
      name: 'description',
      content: 'Categoria',
    }],
  },
  components: {
    BButton,
  },
  data() {
    return {
      newCategory: '',
      categories: [],
      lastCategoryId: 0,
    };
  },
  methods: {
    addCategory() {
      const id = this.categories.length > 0
        ? this.categories[this.categories.length - 1].id + 1 : 1;
      this.categories.push({ id, name: this.newCategory });
      this.newCategory = '';
    },
    deleteCategory(index) {
      this.categories.splice(index, 1);
    },
    onSubmit() {
      console.log('submit');
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: 'home' });
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
              class="mr-2"
              @click.prevent="addCategory"
            >
              Cadastrar
            </b-button>
            <b-button type="reset" variant="danger">Excluir</b-button>
          </div>
        </form>
      </div>
      <div>
        <table class="table mt-5" striped hover>
          <thead>
            <tr>
              <th class="text-dark-green">#Id</th>
              <th class="text-dark-green">Categoria</th>
              <th class="text-dark-green">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id"
              :class="{ 'table-secondary': index % 2 == 0, 'table-light': index % 2 != 0 }">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteCategory(index)"
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
