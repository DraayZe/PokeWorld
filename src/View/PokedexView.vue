<script setup>
import { onMounted, ref } from "vue";
import CardPokemon from "@/components/CardPokemon.vue";

const data = ref([]);
const recherche = ref('');
const listePokemons = ref('');

onMounted(async () => {
  data.value = await fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => response.json())
      .then(pokemons => {
        return pokemons.slice(1); // Exclut le premier élément
      });
  listePokemons.value = data.value
});

const rechercher = () => {
  if (recherche.value.length > 2) {
    data.value = listePokemons.value.filter(pokemon =>
        pokemon.name.fr.toLowerCase().includes(recherche.value.toLowerCase())
    ) } else {
    data.value = listePokemons.value;
  }
}



</script>

<template>
  <label for="name">Rechercher votre pokémon préférés:</label>
  <input v-model="recherche" @keyup="rechercher" type="text" id="name" class="border"/>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-7 p-10">
    <card-pokemon
        v-for="pokemon in data"
        :key="pokemon.id"
        :pokemon="pokemon"
    />
  </div>
</template>




<style scoped>


</style>