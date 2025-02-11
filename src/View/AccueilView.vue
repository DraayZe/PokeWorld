<script setup>

</script>

<template>
  <div class="h-screen bg-[url('/images/bg-accueil.jpg')] bg-contain bg-repeat-x grid grid-cols-2 ">
    <div class="flex flex-col justify-center items-center mb-60 ">
      <h2 class="sora-500 text-4xl font-bold text-center text-yellow-400 "> Recherche tous tes pokémons préférés avec PokeWorld ! </h2>
      <p class="text-lg text-center sora-100 text-white py-7 px-8 ">PokeWorld te permet de rechercher les pokémons de toutes les générations la génération, le type et pleins d'autres fonctionnalités !</p>
      <bouton>
        <router-link class="bg-blue-700 text-white hover:text-blue-700 hover:bg-white sora-500 px-10 py-2 rounded-sm cursor-pointer text-xl sora-500 " :to="{ name: 'pokedex' }"> Pokédex </router-link>
      </bouton>
    </div>

    <div class="flex justify-center items-end row-start-2 col-start-1 ">
      <p class="text-black">Projet réalisé par Lenny FERNET</p>
    </div>
    <div class="flex justify-center items-end row-start-2 col-start-2">
      <bouton class="bg-gray-700 text-white hover:text-gray-700 hover:bg-white sora-500 px-10 py-2 rounded-sm cursor-pointer text-xl sora-500">
        Mon GitHub
      </bouton>
    </div>
  </div>
</template>

<style scoped>


</style>