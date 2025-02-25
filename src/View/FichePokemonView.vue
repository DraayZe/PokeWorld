<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pokemon = ref(null);
const favoris = ref(JSON.parse(localStorage.getItem("favoris")) || []);

// Vérifie si le Pokémon est déjà dans les favoris
const isFavori = computed(() => {
  return favoris.value.some(fav => fav.id === pokemon.value?.pokedex_id);
});

// Ajouter ou supprimer des favoris
const toggleFavori = () => {
  if (!pokemon.value) return;

  if (isFavori.value) {
    favoris.value = favoris.value.filter(fav => fav.id !== pokemon.value.pokedex_id);
  } else {
    favoris.value.push({
      id: pokemon.value.pokedex_id,
      name: pokemon.value.name.fr,
      sprite: pokemon.value.sprites.regular
    });
  }

  // Sauvegarde dans le localStorage
  localStorage.setItem("favoris", JSON.stringify(favoris.value));
};

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

    <!-- Bouton Favoris -->
    <div class="flex justify-center my-4">
      <button
          @click="toggleFavori"
          class="px-4 py-2 rounded-full text-white text-lg font-semibold transition cursor-pointer"
          :class="isFavori ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'">
        {{ isFavori ? 'Retirer des Favoris ❤️' : 'Ajouter aux Favoris 🤍' }}
      </button>
    </div>

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
    <div class="flex justify-center">
      <router-link class="text-white bg-blue-700 font-police-regular font-bold text-lg border rounded-sm p-2" :to="{ name: 'pokedex' }"> Retour au Pokédex </router-link>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-xl font-medium text-gray-500">Chargement...</p>
  </div>

</template>


<style scoped>
</style>
