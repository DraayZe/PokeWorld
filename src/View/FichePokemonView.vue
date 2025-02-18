<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const pokemon = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${route.params.pokemon}`)
    const data = await response.json()
    console.log('Réponse API :', data)
    pokemon.value = data
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error)
  }
})
</script>

<template>
  <div v-if="pokemon">
    <h3>{{ pokemon.name.fr }}</h3>
    <h4> {{ pokemon.generation }}</h4>

    <div>
      <div v-for="type in pokemon.types" :key="type.name" class="p-1">
        <img :src="type.image" :alt="type.name" class="h-7" />
      </div>
    </div>

  </div>

  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
/* Tes styles ici */
</style>
