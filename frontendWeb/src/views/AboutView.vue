<template>
  <div class="about">
    <h1 class="text-2xl font-bold mb-4">À propos de cette application</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
      <p class="mb-4">
        Cette application simple permet de gérer une collection de citations inspirantes.
      </p>
      <p class="mb-4">
        Fonctionnalités :
      </p>
      <ul class="list-disc pl-5 mb-4">
        <li>Afficher une citation aléatoire</li>
        <li>Ajouter de nouvelles citations</li>
      </ul>
      <p>
        Développée avec Vue.js pour le frontend et Node Express.js pour le backend.
      </p>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style> 
