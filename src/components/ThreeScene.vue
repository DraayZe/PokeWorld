<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvasContainer = ref(null); // Référence au conteneur

onMounted(() => {
  if (!canvasContainer.value) return;

  // Création du renderer avec alpha pour transparence
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
  canvasContainer.value.appendChild(renderer.domElement);

  // Création de la scène
  const scene = new THREE.Scene();

  // Caméra
  const camera = new THREE.PerspectiveCamera(100, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Contrôles de la caméra
  const controls = new OrbitControls(camera, renderer.domElement);
   controls.minDistance = 8;
   // controls.maxDistance = 10;
  controls.enableZoom = false;


  // Lumières


  const lumieregauche = new THREE.DirectionalLight(0xffffff, 3);
  lumieregauche.position.set(-4, 1, 2);
  lumieregauche.castShadow = true;
  scene.add(lumieregauche);

  const lumieredroite = new THREE.DirectionalLight(0xffffff, 4);
  lumieredroite.position.set(4, 1, 2);
  lumieredroite.castShadow = true;
  scene.add(lumieredroite);

  const lumierebas = new THREE.DirectionalLight(0xffffff, 1);
  lumierebas.position.set(0, -1, -3);
  lumierebas.castShadow = true;
  scene.add(lumierebas);

  const lumieredevant = new THREE.DirectionalLight(0xffffff, 3);
  lumieredevant.position.set(0, 3, 5);
  lumieredevant.castShadow = true;
  scene.add(lumieredevant);



  // Charger un modèle GLTF
  const loader = new GLTFLoader();
  loader.load("/models/pokeball.glb", function (gltf) {
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.z = 3;
    scene.add(gltf.scene);
  });

  // Animation
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();


});
</script>

<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 80vh;
  cursor: grab;
}

.canvas-container:active {
  cursor: grabbing;
}

</style>
