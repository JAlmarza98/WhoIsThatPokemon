<template>
  <h1 v-if="!pokemon">Wait a moment please...</h1>
  <div v-else>
    <h1>who's that pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>

    <div v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        New game
      </button>
    </div>

    <div class="score">
      <div>score</div>
      <div>{{score}}</div>
    </div>

  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import getPokemonOptions from '../helpers/getPokemonsOptions'

export default {
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data () {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
      score: 0
    }
  },
  methods: {
    async mixPokemonArray () {
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer (selectedId) {
      this.showPokemon = true
      this.showAnswer = true

      if (selectedId === this.pokemon.id) {
        this.message = `Yes, ${this.pokemon.name}`
        this.score++
      } else {
        this.message = `Oops, it was ${this.pokemon.name}`
        this.score = 0
      }
    },
    newGame () {
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.pokemonArr = []
      this.mixPokemonArray()
    }
  },
  mounted () {
    this.mixPokemonArray()
  }
}
</script>

<style>
  h1,h2{
    color: white;
  }
  button {
    background-color: white;
    padding: 10px 0 10px 0;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    font-size: larger;
  }
  button:hover{
    background-color: rgb(192, 192, 192);
  }
  .score {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px;
    width: fit-content;
    margin: 0 auto;
    border-radius: 8px;
    font-size: larger;
    font-weight: bold;
  }
</style>
