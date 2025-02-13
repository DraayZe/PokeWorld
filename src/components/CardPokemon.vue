<script setup>
defineProps({
  pokemon: Object,
});
</script>

<template>
    <div class="flex">
      <div>
        <h3> {{ pokemon.name.fr }} </h3>
        <p>{{ pokemon.pokedex_id }}</p>
        <div class="flex">
          <p v-for="type in pokemon.types" :key="type.name" class="p-1">
            <img :src="type.image" :alt="type.name" class="h-10" />
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="h-30 " />
      </div>
    </div>
</template>


<style scoped>


</style>