<template>
  <!-- Section sur la ville de Mirepoix -->
  <section>
    <h1 class="title">La ville de Mirepoix</h1>
    <p>
      Cette petite ville de 3100 habitants permanents est située à mi-distance entre Carcassonne et Foix.
      C’est au Xᵉ siècle que l’on cite pour la première fois son nom dans une charte donnée aux habitants par
      Raymond Roger, comte de Foix. On lui attribue des origines celtes. Sur la grande place, on peut encore admirer les maisons
      à colombages sur galerie de bois. Des piliers en bois aidés d’étançons soutiennent les façades et forment de magnifiques
      galeries couvertes. Les solives des maisons les plus riches sont sculptées. Les plus belles sculptures se trouvent sur
      la maison de Justice du Seigneur, qui devient plus tard, en 1500, la Maison des Consuls : femmes à coiffe, tête barbue, tortue…
    </p>
    <p>
      Lors de la croisade contre les Albigeois en 1209, Simon de Montfort prend le château féodal. La famille de Mirepoix, très liée au
      Catharisme, est dépossédée. Simon de Montfort le donne, par le traité de Paris en 1229, à Guy de Lévis, son fidèle lieutenant qui
      devient Maréchal de Mirepoix. À cette époque, la ville s’étend au pied du château sur la rive droite de l’Hers et est très
      florissante : près de 2000 habitants, de nombreux commerces et industries.
    </p>
    <p>
      En 1279, la rupture du barrage de Puivert provoque une terrible inondation qui détruit toute la ville en n’épargnant que le château.
      En 1289, Guy de Lévis décide de rebâtir la ville sur la rive gauche de l’Hers. C’est son fils qui exécute ce projet. La ville
      est reconstruite en forme de bastide, ce qui explique les rues tracées au cordeau suivant deux axes perpendiculaires et une grande
      place centrale. La cité prospère et, en 1317, le pape Jean XXII en fait un évêché.
    </p>
    <p>
      En 1362, la ville est attaquée par une bande de routiers qui met le feu. Suite à ce grand incendie détruisant la partie sud de la ville,
      une nouvelle enceinte de protection est construite, constituée par de fortes murailles et quatre portes fortifiées pour mettre la ville
      à l’abri. De nos jours, il ne subsiste de cette fortification que la Porte d’Aval, qui laisse encore entrevoir des traces de herse.
    </p>
    <p>
      La petite église Saint-Maurice, construite en 1298 par Jean de Lévis et sa femme Constance de Foix, se transforme au cours du temps en
      cathédrale. De nos jours, la cathédrale Saint-Maurice possède une nef unique de 48 m de long, 24 m de hauteur, 22 m de large, un portail
      gothique et un clocher à la flèche élégante de 60 m de haut. Par sa largeur de nef, la cathédrale se situe au 2ᵉ rang en Europe après
      Gerone en Espagne. À l’intérieur, vandalisme et démolitions ont détruit de nombreux trésors, mais on peut encore admirer un tabernacle,
      un Christ en croix du XIVᵉ siècle et un des sept tableaux de Larivière-Vesontius.
    </p>
    <img
      class="image"
      :src=mirepoixImage
      alt="Mirepoix"
    />
  </section>

  <!-- Section sur la région de l'Ariège -->
  <section>
    <h1 class="title">L'Ariège : Un département français d'Occitanie</h1>
    <p>
      L'Ariège est un département français de la région Occitanie, nommé d'après la rivière homonyme, situé au sud-ouest de la France.
      L'Insee et La Poste lui attribuent le code 09. Sa préfecture est Foix, qui se trouve à 772 kilomètres de Paris à vol d'oiseau.
    </p>
    <p>
      Le département a été formé en 1790 par l’addition essentiellement de l'ancien comté de Foix (406 455 hectares) et de presque
      l'intégralité du Couserans (162 509 hectares). Au total, la superficie du département ariégeois est de 489 387 hectares.
      Il est frontalier au sud de la principauté d'Andorre et de la Catalogne (Espagne), à l'ouest de la Haute-Garonne et à l'est
      des Pyrénées-Orientales et de l'Aude. C'est un département de piémont et de haute montagne possédant de nombreux sites historiques
      allant de la Préhistoire à nos jours.
    </p>
    <img
      class="image"
      :src=ariegeImage
      alt="Mirepoix"
    />
  </section>
  <section>
    <h2> Commerces Conseillés</h2>
  <div v-for="(store, index) in store" :key="'store-' + index" class="card">
  <div class="card-store"> <!-- Ajout de la classe view-text ici -->
    <p>{{ store.name }}</p>
    <p class="card-type">{{ store.type }}</p>
    <p class="card-adresse">{{ store.adresse }}</p>
</div>
</div>
</section>

</template>

<script setup lang="ts">

import type { Store } from '@/entities';
import { fetchAllStore } from '@/Service/StoreService';
import { onMounted, ref } from 'vue';
import mirepoixImage from '@/assets/images/mirepoix.jpg';
import ariegeImage from '@/assets/images/region-arriege.jpg'


const store = ref<Store[]>([]);


onMounted(async () => {
  try {
    store.value = await fetchAllStore();
  } catch (e) {
    console.log(e);
  }
})
</script>
<style scoped>
/* Styles généraux */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: beige;

}

h1.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #f5a623;
}

p {
  line-height: 1.8;
  margin-bottom: 15px;
  text-align: justify;
  color: black;
}

section {
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background-color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Images */
img.image {
  margin: 20px auto;
  display: block;
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

/* Card Styles */
.card {
  background-color: #e0e0e0;
  color: black;
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.card h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #f5a623;
}

.card p {
  margin-bottom: 0;
  color: black;
}
.card-store{
  margin-left: 0px;
  width: 100%;
  color:black;
}

/* Section specific styles */
.section-mirepoix {
  background: linear-gradient(135deg, #5a8c6d, #2d5d49);
  padding: 30px;
  border-radius: 12px;
}

.section-ariege {
  background: linear-gradient(135deg, #607dab, #354f7a);
  padding: 30px;
  border-radius: 12px;
}
h2{
  color:black;
  text-align: center;
}
/* Responsiveness */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }

  h1.title {
    font-size: 1.6rem;
  }

  img.image {
    max-width: 100%;
  }

  section {
    padding: 15px;
  }

  .card {
    padding: 15px;
  }
}
</style>
