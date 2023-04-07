<template>
  <div>
    <div>
      <h2 class="text-primary" :class="$style.title">
        PAINEL DE GERENCIAMENTO - CATEGORIA
      </h2>
    </div>
    <div class="border border-primary" :class="$style.border">
      <div class="card-header bg-dark-green">
        <h2 class="mb-0">Cadastro de Nova Categoria</h2>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="category-input">Nome da Categoria:</label>
            <input type="text" class="form-control" id="category-input" placeholder="Nome da Categoria"
              v-model="newCategory">
          </div>

          <b-row :class="$style.buttons">
            <b-col md="6" offset-md="10">
              <b-button type="button" variant="primary" @click="addCategory">Cadastrar</b-button>
              <b-button type="reset" variant="danger">Excluir</b-button>
            </b-col>
          </b-row>
        </form>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="text-dark-green">#Id</th>
          <th class="text-dark-green">Categoria</th>
          <th class="text-dark-green">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index"
          :class="{ 'table-success': index % 2 === 0, 'table-light': index % 2 !== 0 }">
          <td>{{ lastCategoryId + index }}</td>
          <td>{{ category }}</td>
          <td><button type="button" :class="$style.buttons" @click="deleteCategory(index)">X</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>

import {
  BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{
      name: 'description',
      content: 'Sign In',
    }],
  },
  components: {
    BFormGroup,
    BFormInput,
    BButton,
  },
  methods: {
    onSubmit() {
      console.log('submit');
      alert(JSON.stringify(this.form));
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
  },
  data() {
    return {
      newCategory: '',
      categories: [],
      lastCategoryId: 0
    }
  },
  methods: {
    addCategory() {
      if (this.newCategory) {
        this.categories.push(this.newCategory);
        this.newCategory = '';
        this.lastCategoryId += 1;
      }
    },
    deleteCategory(index) {
      this.categories.splice(index, 1);
      this.lastCategoryId = this.lastCategoryId - 1;
    }
  }
}
</script>
  
<style>
.table-striped>tbody>tr:nth-child(2n+1)>td,
.table-striped>tbody>tr:nth-child(2n+1)>th {
  background-color: #9DCC9A;
}
</style>
<style type="scss" module>
.title {
  font-family: "BigShoulders";
  font-size: 3rem;
  margin-left: 8rem;
  margin-top: 4rem;
  font-weight: 900;
}

.buttons {
  margin-right: 1em;
  margin-bottom: 0.75em;
}

.table {
  color: #152536;
}

.textInput {
  background-color: #F8F9FA;
  border-radius: 0.25rem;
  border: aliceblue;
}

.textArea {
  background-color: #F8F9FA;
  border-radius: 0.25rem;
  border: aliceblue;
  overflow-y: hidden !important;
}

.border {
  margin: 1rem 8rem;
  border-radius: 0.75rem;
  border-color: #9DCC9A !important;
}

.row {
  padding: 1.4rem 1.75rem;
}

label {
  font-family: "FireSans";
  font-size: 1.75rem;
  font-weight: 600;
  color: #024053;
  line-height: 2rem;
}
</style>


