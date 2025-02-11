<script setup>
import {onMounted, ref} from "vue";

const data = ref()





onMounted(async () => {
  data.value = await fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => response.json())
      .then(data => {
        return data
      })
})


</script>

<template>
  <div>
    <h1>Liste des Pokémon</h1>
    <ul>
      <li v-for="pokemon in data" :key="pokemon.id">
        {{ pokemon.name.fr }}
       {{ pokemon.generation }}
        <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="pokemon-image" />
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