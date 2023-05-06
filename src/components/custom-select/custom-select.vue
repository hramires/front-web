<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="searchInput"
        @input="searchCategories"
        placeholder="Digite uma palavra"
      ></b-form-input>
      <b-input-group-append>
        <b-button @click="addCategory">Adicionar</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-dropdown
      v-if="categories.length"
      ref="categoryDropdown"
      text="Selecione"
      class="mt-2"
    >
      <b-dropdown-item
        v-for="(category, index) in categories"
        :key="index"
        @click="selectCategory(category)"
      >
        {{ category }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      categories: [],
      selectedCategory: null,
    };
  },
  methods: {
    async searchCategories() {
      const allCategories = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
      this.categories = allCategories.filter((category) => category.toLowerCase()
        .includes(this.searchInput.toLowerCase()));
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.addCategory();
    },
    addCategory() {
      if (this.selectedCategory) {
        // Implemente a lógica para adicionar a categoria selecionada
        console.log('Categoria adicionada:', this.selectedCategory);

        // Limpe a seleção e a entrada de pesquisa
        this.selectedCategory = null;
        this.searchInput = '';
        this.categories = [];
      }
    },
  },
};
</script>
