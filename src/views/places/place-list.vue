<script>
import {
  BCard, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';
</script>

<template>
    <div>
      
            <h1 :class="$style.title"> LOCAIS CADASTRADOS </h1>
            <b-card :class="$style.card1" 
            title="Local A"
            img-src="https://uploaddeimagens.com.br/images/004/421/358/full/Captura_de_tela_2023-04-07_133049.png?1680885102"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
          </b-card>
          <b-card :class="$style.card1" 
            title="Local B"
            img-src="https://uploaddeimagens.com.br/images/004/421/323/full/Captura_de_tela_2023-04-07_125048.png?1680882894"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
          </b-card>
          <b-card :class="$style.card1" 
            title="Local C"
            img-src="https://uploaddeimagens.com.br/images/004/421/335/full/Captura_de_tela_2023-04-07_130949.png?1680883999"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
          </b-card>
          <b-card :class="$style.card1" 
            title="Local D"
            img-src="https://uploaddeimagens.com.br/images/004/421/342/full/Captura_de_tela_2023-04-07_131617.png?1680884236"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text> 
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
          </b-card>
          <b-card :class="$style.card1" 
            title="Local E"
            img-src="https://uploaddeimagens.com.br/images/004/421/356/full/Captura_de_tela_2023-04-07_132910.png?1680884995"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button :class="$style.button" href="#" variant="primary">Editar</b-button>
          </b-card>
    </div>
</template>
<style type="scss" module>
.title{
    margin-left: 7.5rem;
    margin-top: 4rem;
    font-size: 2.5em;
}
.card1{
  margin-left: 7rem;
  margin-top: 2rem;
  width: 20rem;
}
.card2{
  margin-left: 7rem;
  margin-top: 2rem;
  width: 20rem;
}

.button{
  margin-left: 12rem;

}
</style>
