<script setup>
import ThreeScene from '../components/ThreeScene.vue'
</script>

<template>
  <div class=" grid grid-cols-2 bg-yellow-300 min-h-screen">
    <div class="flex flex-col justify-center items-center px-20 ">
      <h2 class="font-police-bold text-4xl font-bold text-center  text-red-500 "> Recherche tous tes pokémons préférés avec PokeWorld ! </h2>
      <p class="text-lg text-center font-police-light text-black py-7 px-8 ">PokeWorld te permet de rechercher les pokémons de toutes les générations la génération, le type et pleins d'autres fonctionnalités !</p>
      <div class="hover:scale-110 duration-300 ease-in-out ">
        <router-link class="noise bg-blue-700 text-white font-regular px-15 py-3 rounded-sm cursor-pointer text-2xl" :to="{ name: 'pokedex' }"> Pokédex </router-link>
      </div>

    </div>
    <div class="flex justify-center items-end row-start-1 col-start-2">
      <ThreeScene />
    </div>

    <div class="flex justify-center items-end row-start-2 col-start-1 ">
      <p class="text-black font-police-bold  ">Projet réalisé par Lenny FERNET</p>
    </div>
    <div class="flex justify-center items-end row-start-2 col-start-2 ">
      <div class="text-black font-police-bold  px-3 cursor-pointer text-lg ">
        Retrouver le projet sur GitHub
      </div>
      <img src="/images/github-logo.png" alt="Github Logo" class="rounded-lg w-8  " />
    </div>
  </div>
</template>

<style scoped>
.noise {
  background:
      radial-gradient(circle at top center, rgba(255, 255, 255, 0.3) 0%, transparent 60%),
      linear-gradient(to top, #1447e6, #1447e6);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

}

.noise::after {
  content: "";
  position: absolute;
  inset: 0;
  background: url(https://grainy-gradients.vercel.app/noise.svg);
  opacity: 0.3;
}



</style>