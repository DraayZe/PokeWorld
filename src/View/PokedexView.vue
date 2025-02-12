<script setup>
import { onMounted, ref } from "vue";

const data = ref([]);

onMounted(async () => {
  data.value = await fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => response.json())
      .then(pokemons => {
        return pokemons.slice(1); // Exclut le premier élément
      });
});
</script>


<template>
  <div>
    <h1>Liste des Pokémon</h1>
    <ul>
      <li v-for="pokemon in data" :key="pokemon.id">
        {{ pokemon.name.fr }} / génération :
       {{ pokemon.generation }}
        <li><img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="pokemon-image" /></li>
        <ul>
        <li v-for="type in pokemon.types" :key="type.name"> Type {{type.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.pokemon-image {
  width: 10%;
  height: auto;
}
</style>