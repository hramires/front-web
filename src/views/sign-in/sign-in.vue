<script>
import {
  BCard, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{ name: 'description', content: 'Sign In' }],
  },
  components: {
    BCard, BForm, BFormGroup, BFormInput, BButton,
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
    goBack() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<template>
    <div>
      <b-button variant="link" @click="goBack">Back</b-button>
      <b-card class="m-2 p-2">
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit">Submit</b-button>
        </b-form>
      </b-card>
    </div>
</template>
