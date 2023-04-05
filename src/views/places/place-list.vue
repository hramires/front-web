<script>
import {
  BCard, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';
</script>

<template>
    <div>
      <h1 :class="$style.title"> LOCAIS CADASTRADOS </h1>
      <b-card :class="$style.card1"
    title="Local 1"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Editar</b-button>
  </b-card>
    </div>
</template>
<style type="scss" module>
.title{
    margin-left: 4rem;
}
.card1{
  margin-left: 4rem;
}
</style>
