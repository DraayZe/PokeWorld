<script setup>
import { computed, ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const target = ref(null);

// Associe la position de la souris à l'élément "target"
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

const cardTransform = computed(() => {
  const MAX_ROTATION = 15;

  // Vérifie si l'élément a une taille définie pour éviter des erreurs
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

// Définition des couleurs en fonction du type
const typeColors = {
  Feu: 'bg-red-400',
  Eau: 'bg-blue-400',
  Plante: 'bg-green-400',
  Électrik: 'bg-yellow-400',
  Insecte: 'bg-lime-500',
  Roche: 'bg-stone-400',
  Sol: 'bg-amber-600',
  Combat: 'bg-orange-600',
  Spectre: 'bg-purple-500',
  Psy: 'bg-pink-400',
  Ténèbres: 'bg-gray-700',
  Dragon: 'bg-indigo-400',
  Acier: 'bg-slate-400',
  Vol: 'bg-cyan-400',
  Poison: 'bg-fuchsia-500',
  Glace: 'bg-sky-300',
  Fée: 'bg-pink-200',
  Normal: 'bg-gray-400',
};

const mainTypeColor = computed(() => {
  if (!props.pokemon || !props.pokemon.types?.length) {
    return 'bg-gray-400';
  }

  const firstTypeName = props.pokemon.types[0].name;
  return typeColors[firstTypeName] || 'bg-gray-400';
});
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
      <p class="text-center mt-1 font-police-light text-sm py-2 ">#{{ props.pokemon.pokedex_id }}</p>
      <div class="flex justify-center mb-1">
        <div v-for="type in props.pokemon.types" :key="type.name" class="p-1">
          <img :src="type.image" :alt="type.name" class="h-7" />
        </div>
      </div>
    </div>

    <!-- Partie droite (image) -->
    <div :class="[mainTypeColor, 'flex items-center justify-center rounded-r-md w-34 h-full']">
      <img
          :src="props.pokemon.sprites.regular"
          :alt="props.pokemon.name.fr"
          class="max-w-full max-h-full"
      />
    </div>
  </div>
</template>
