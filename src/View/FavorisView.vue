<script setup>
import { ref, onMounted } from "vue";

const favoris = ref([]);

onMounted(() => {
  favoris.value = JSON.parse(localStorage.getItem("favoris")) || [];
});

const removeFavori = (id) => {
  favoris.value = favoris.value.filter(fav => fav.id !== id);
  localStorage.setItem("favoris", JSON.stringify(favoris.value));
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">Mes Pokémon Favoris</h2>

    <div v-if="favoris.length > 0" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <div v-for="fav in favoris" :key="fav.id" class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <img :src="fav.sprite" :alt="fav.name" class="w-24 h-24 object-contain mb-2"/>
        <p class="text-lg font-semibold">{{ fav.name }}</p>

        <div class="flex gap-2 mt-3">
          <router-link
              :to="{ name: 'pokemon', params: { pokemon: fav.id } }"
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Voir
          </router-link>
          <button
              @click="removeFavori(fav.id)"
              class="px-3 py-1 bg-red-500 text-white rounded text-sm cursor-pointer">
            Retirer
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500">Aucun favori pour le moment.</p>

    <div class="flex justify-center mt-6">
      <router-link class="text-white bg-blue-700 font-bold text-lg border rounded-sm p-2" :to="{ name: 'pokedex' }"> Retour au Pokédex </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
