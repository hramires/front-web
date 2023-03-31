<script>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from "bootstrap-vue";

export default {
  page: {
    meta: [{ name: "description", content: "Cadastro Local" }]
  },
  components: {
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BButton
  },
  methods: {
    goBack() {
      this.$router.push({ name: "home" });
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    }
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true
    };
  }
};
</script>

<template>
  <div>
    <h2>PAINEL DE CADASTRO - LOCAL</h2>
    <div class="border border-primary">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col>
            <b-form-group
              id="name"
              label="Nome do Local"
              label-for="name"
              description=""
            >
              <b-form-input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Novo Local"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="description"
              label="Descrição"
              label-for="description"
              description=""
            >
              <b-form-textarea
                id="description"
                v-model="form.description"
                placeholder="Descrição única do local"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col>
            Segunda coluna
          </b-col>
        </b-row>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<style lang="scss" module>
body {
  padding: 10em 20em;
}
</style>
