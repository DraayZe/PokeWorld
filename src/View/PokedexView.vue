<script setup>
import { onMounted, ref } from "vue";
import CardPokemon from "@/components/CardPokemon.vue";

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
  <label for="name">Rechercher votre pokémon préférés:</label>
  <input type="text" id="name" style="background-color: darkgrey"/>
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