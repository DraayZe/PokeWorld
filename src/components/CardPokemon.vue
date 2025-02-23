<script setup>
import { computed, ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';
import { usePokemonBackground } from '@/composables/usePokemonBackground';
import { watch, toRef } from 'vue';

const target = ref(null);

// Associe la position de la souris à l'élément "target"
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

const cardTransform = computed(() => {
  const MAX_ROTATION = 15;

  if (!elementHeight.value || !elementWidth.value) return '';

  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2);
  const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);

  return isOutside.value
      ? "perspective(600px) rotateX(0deg) rotateY(0deg)"
      : `perspective(600px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});

// Déclaration des props
const props = defineProps({
  pokemon: Object
});

// Création d'une ref réactive pour suivre les changements du Pokémon
const pokemonRef = toRef(props, 'pokemon');

// Utilisation du composable pour générer le background dynamique
const { backgroundStyle } = usePokemonBackground(pokemonRef);
</script>


<template>
  <!-- On ajoute ref="target" pour que useMouseInElement suive cet élément -->
  <div
      ref="target"
      class="flex bg-gray-100 rounded-md drop-shadow-md w-72 h-30 transition-transform duration-300 ease-out"
      :style="{ transform: cardTransform }"
  >
    <!-- Partie gauche (informations) -->
    <div class="flex flex-col justify-center mx-2 mt-2 w-40">
      <h3 class="bg-[#1E1E1E] text-white text-center font-police-regular px-4 py-1 truncate rounded-2xl">
        {{ props.pokemon.name.fr }}
      </h3>
      <p class="text-center mt-1 font-police-light text-sm py-2">#{{ props.pokemon.pokedex_id }}</p>
      <div class="flex justify-center ">
        <router-link :to="{name: 'pokemon', params: {pokemon: props.pokemon.pokedex_id}}" class="bg-yellow-300 rounded-md text-white px-4 font-police-bold hover:scale-110 duration-300 ease-in-out " >Détails</router-link>
      </div>
    </div>

    <!-- Partie droite (image) avec background dynamique -->
    <div
        :style="backgroundStyle"
        class="flex items-center justify-center rounded-r-md w-34 h-full"
    >
      <img
          :src="props.pokemon.sprites.regular"
          :alt="props.pokemon.name.fr"
          class="max-w-full max-h-full"
      />
    </div>
  </div>
</template>
