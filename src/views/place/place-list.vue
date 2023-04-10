<script>
import {
  BCard, BButton,
} from 'bootstrap-vue';

export default {
  page: {
    meta: [{ name: 'description', content: 'Listar Locais' }],
  },
  components: { BCard, BButton },
};

</script>

<template>
  <div>
    <h1> LOCAIS CADASTRADOS </h1>
    <b-container :class="$style.container">
      <b-row>
        <b-card
          :class="$style.card"
          title="Local A"
          img-src="https://uploaddeimagens.com.br/images/004/421/358/full/Captura_de_tela_2023-04-07_133049.png?1680885102"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </b-card-text>
          <b-card-text :class="$style.updated"> Last updated 3 minutes ago</b-card-text>
          <b-button
            :class="$style.button"
            variant="primary"
            @click="$router.push({ name: 'editar-local', params: {id: 1}})"
          >
            Editar
          </b-button>
        </b-card>

        <b-card
          :class="$style.card"
          title="Local D"
          img-src="https://uploaddeimagens.com.br/images/004/421/342/full/Captura_de_tela_2023-04-07_131617.png?1680884236"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </b-card-text>
          <b-card-text :class="$style.updated"> Last updated 3 minutes ago</b-card-text>
          <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
        </b-card>

        <b-card
          :class="$style.card"
          title="Local B"
          img-src="https://uploaddeimagens.com.br/images/004/421/323/full/Captura_de_tela_2023-04-07_125048.png?1680882894"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </b-card-text>
          <b-card-text :class="$style.updated"> Last updated 3 minutes ago</b-card-text>
          <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
        </b-card>

        <b-card
          :class="$style.card"
          title="Local E"
          img-src="https://uploaddeimagens.com.br/images/004/421/356/full/Captura_de_tela_2023-04-07_132910.png?1680884995"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </b-card-text>
          <b-card-text :class="$style.updated"> Last updated 3 minutes ago</b-card-text>
          <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
        </b-card>

        <b-card
          :class="$style.card"
          title="Local C"
          img-src="https://uploaddeimagens.com.br/images/004/421/335/full/Captura_de_tela_2023-04-07_130949.png?1680883999"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-card-text>
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </b-card-text>
          <b-card-text :class="$style.updated"> Last updated 3 minutes ago</b-card-text>
          <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
        </b-card>
      </b-row>
    </b-container>
    <button :class="$style.floatButton" @click="$router.push({name: 'cadastro-local'})">+</button>
  </div>
</template>

<style type="scss" module>

.container {
  max-width: 100%;
}
.card{
  margin: 0;
  border-radius: 20px;
  margin-bottom: 2rem;
  margin-right: 2rem;
  width: 20rem;
  max-width: 20rem;
  height: 24rem;
}

.button{
  margin-left: 12rem;
  margin-top: -4.8rem;

}
.updated{
  margin-top: 2rem;
  font-size: 0.7em;
}
.floatButton{
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: #9DCC9A;
  background: #9DCC9A;
  position: fixed;
  float: bottom;
  bottom: 100px;
  right: 50px;
  z-index: 100;
  color:white;
  font-size: 40px;
}
</style>
