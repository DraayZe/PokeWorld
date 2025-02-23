<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const pokemon = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${route.params.pokemon}`);
    const data = await response.json();
    console.log('Réponse API :', data);
    pokemon.value = data;
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }
});
</script>

<template>
  <div v-if="pokemon" class="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-lg">
    <div class="flex justify-center mb-4">
      <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="w-48 h-48 object-contain"/>
    </div>

    <h3 class="text-3xl font-semibold text-center text-blue-600">{{ pokemon.name.fr }}</h3>
    <h4 class="text-xl text-center text-gray-500 mb-4">Génération: {{ pokemon.generation }}</h4>

    <div class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Types:</h5>
      <div class="flex flex-wrap gap-2">
        <div v-for="type in pokemon.types" :key="type.name" class="flex items-center px-3 py-1 rounded-full bg-gray-200">
          <p class="mr-2 text-sm font-medium">{{ type.name }}</p>
          <img :src="type.image" :alt="type.name" class="h-6 w-6"/>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Talents:</h5>
      <div class="flex flex-wrap gap-2">
        <div v-for="talent in pokemon.talents" :key="talent.name" class="px-3 py-1 rounded-full bg-yellow-200 text-gray-800">
          <p class="text-sm font-medium">{{ talent.name }}</p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Statistiques:</h5>
      <div v-for="(value, key) in pokemon.stats" :key="key">
        <p class="text-sm text-gray-600 capitalize">
          {{ key.replace('_', ' ') }} : {{ value }}
        </p>
      </div>
    </div>

    <div class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Résistances:</h5>
      <div class="flex flex-wrap gap-2">
        <div v-for="resistance in pokemon.resistances" :key="resistance.name" class="px-3 py-1 rounded-full bg-green-200 text-gray-800">
          <p class="text-sm font-medium">{{ resistance.name }}</p>
        </div>
      </div>
    </div>

    <!-- Pré-évolutions (si elles existent) -->
    <div v-if="pokemon.evolution && pokemon.evolution.pre && pokemon.evolution.pre.length > 0" class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Pré-évolutions:</h5>
      <div v-for="preEvo in pokemon.evolution.pre" :key="preEvo.name" class="flex items-center gap-2">
        <p class="text-sm text-gray-600">{{ preEvo.name }} </p>
      </div>
    </div>

    <!-- Evolutions -->
    <div v-if="pokemon.evolution && pokemon.evolution.next && pokemon.evolution.next.length > 0" class="mb-4">
      <h5 class="font-medium text-lg text-gray-700 mb-2">Evolutions:</h5>
      <div v-for="evolution in pokemon.evolution.next" :key="evolution.pokedex_id" class="flex items-center gap-2">
        <p class="text-sm text-gray-600">{{ evolution.name }} </p>
      </div>
    </div>

    <!-- Si pas d'évolution -->
    <div v-else class="mb-4">
      Aucune évolution
    </div>

    <router-link class="text-blue-700 font-police-regular font-bold text-lg " :to="{ name: 'pokedex' }"> Pokédex </router-link>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-xl font-medium text-gray-500">Chargement...</p>
  </div>

</template>


<style scoped>
</style>
