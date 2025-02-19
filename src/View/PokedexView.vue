<script setup>
import { onMounted, ref, computed } from "vue";
import CardPokemon from "@/components/CardPokemon.vue";

const listePokemons = ref([]);
const recherche = ref('');
const types = ref([]);
const typeFiltre = ref('');

// Charger les Pokémon
onMounted(async () => {
  const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
  const pokemons = await response.json();

  listePokemons.value = pokemons.slice(1); // Exclut le premier élément

  // Récupérer les types uniques
  const allTypes = new Set();
  listePokemons.value.forEach(pokemon => {
    pokemon.types.forEach(type => allTypes.add(type.name));
  });
  types.value = Array.from(allTypes);
});

// Propriété calculée combinant les filtres
const filteredPokemons = computed(() => {
  let result = listePokemons.value;

  // Filtrage par type
  if (typeFiltre.value) {
    result = result.filter(pokemon =>
        pokemon.types.some(t => t.name === typeFiltre.value)
    );
  }

  // Filtrage par recherche (appliqué sur le résultat déjà filtré par type)
  if (recherche.value.length > 2) {
    result = result.filter(pokemon =>
        pokemon.name.fr.toLowerCase().includes(recherche.value.toLowerCase()) ||
        pokemon.name.en.toLowerCase().includes(recherche.value.toLowerCase())
    );
  }

  return result;
});

// Fonctions pour modifier le filtre de type
const filtrerParType = (type) => {
  typeFiltre.value = type;
};

const resetFiltre = () => {
  typeFiltre.value = '';
};
</script>

<template>
  <div class="flex justify-center mt-6">
    <input v-model="recherche" type="text" class="border-2 rounded-md border-blue-700 w-4xl pl-2 " placeholder="Rechercher votre pokémon préféré" />
  </div>

  <div class="flex justify-center gap-2 my-4 flex-wrap">
    <button @click="resetFiltre" class="px-3 py-1 bg-gray-300 rounded cursor-pointer">
      Tous
    </button>
    <button v-for="type in types" :key="type" @click="filtrerParType(type)"
            class="px-3 py-1 rounded cursor-pointer"
            :class="typeFiltre === type ? 'bg-blue-700 text-white' : 'bg-[#1E1E1E] text-white'">
      {{ type }}
    </button>

  </div>

  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 justify-items-center gap-7 p-4">
    <card-pokemon
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
    />
  </div>
</template>

<style scoped>
/* Ajoute ici tes styles */
</style>
