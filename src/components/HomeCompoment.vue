<style>
/* Corps de la page */
/* Corps de la page */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #e0e0e0; /* Fond sombre */
  color: #fff; /* Texte clair pour un meilleur contraste */
  margin: 0;
  padding: 0;
  line-height: 1.6;
  min-height: 100vh; /* Assure que le corps occupe toute la hauteur */
}

/* Navbar modernisée */
.navbar {
  background-color: #24263b;
  color: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  margin-top: 30px;
}

.navbar-title {
  font-size: 26px;
  font-weight: bold;
  color: black;
 margin-bottom: 10px;
}

.navbar a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-top: 0px;
}

.navbar a:hover {
  background-color: #3d4461;
}

/* Image de fond en plein écran */
.image {
  background-image: url("src/assets/images/ville-mirepoix.jpg");
  height: 80vh;
  background-size: cover;
  background-position: center;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

.image {
  margin: 0;
  font-size: 3em;
  font-weight: bold;
  color: turquoise;
}

/* Galerie d'images */
.gallery {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #e0e0e0;
}

/* Section image sélectionnée */
.selected-image {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.selected-image img {
  width: 80%;
  max-width: 450px;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

/* Carte de description */
.card {
  width: 100%;  /* S'assurer que la carte prend toute la largeur */
  max-width: 100%;  /* Pour éviter qu'elle ne dépasse la largeur de la page */
  margin: 30px; /* Évite les marges par défaut qui pourraient l'empêcher de prendre toute la largeur */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-left: 5px;

}

.card-body {
  padding: 20px;
  background-color: #e0e0e0;
  color: black;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;

}

.card-body p {
  font-size: 16px;
  color: black;
  margin: 8px 0;
}
.card-view{
  margin-top: 20px;
  background-color: #e0e0e0;
  color: black ;
  margin-left: 5px;

}
/* Boutons */
.btn {
  display: inline-block;
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2563eb;
}

/* Étoiles de notation */
.stars {
  display: flex;
  align-items: center;
}

.star {
  color: #fbbf24;
  margin-right: 4px;
}

/* Vues d'image */
.view-text {
  color: #ffffff;
  font-size: 16px;
}
.v-slide-group {
  background-color: #e0e0e0;
}
/* Carte dans le slider */
.v-slide-group-item {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  background-color:#e0e0e0;
}
.description-titre{
  margin-left: 20px;
  color: black
}
 h3{
  margin-top: 10px;
  color: black;
 }
.v-slide-group-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.v-img__img--contain {
  background-color: #e0e0e0;
}

/* Responsivité améliorée */
@media (max-width: 1200px) {
  .card {
    flex: 1 1 calc(33.33% - 20px);
    max-width: calc(33.33% - 20px);
  }
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }

  .selected-image img {
    width: 70%;
  }

  .image h1 {
    font-size: 2.5em;
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .navbar a {
    padding: 8px 15px;
  }

  .image h1 {
    font-size: 2em;
  }
}


</style>


<template>
  <!-- Image en plein écran -->
  <h1 class="image">
    Réservez dès maintenant votre Villa dans <br>le Sud Ouest dans la ville de Mirepoix
  </h1>

  <v-container fluid>
    <!-- Groupe d'images avec slide -->
    <v-sheet class="mx-auto" elevation="8">
      <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
        <v-slide-group-item
          v-for="(picture, index) in pictures"
          :key="'picture-' + index"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card
            :class="['ma-4', selectedClass]"
            color="grey-lighten-1"
            height="200"
            width="200"
            @click="toggle(); selected = picture; dialog = true"
          >
            <v-img
              :src="'http://localhost:8080/' + picture.lienImage"
              alt="Image de carte"
              cover
              class="d-flex fill-height align-center justify-center"
            />
            <v-scale-transition>
              <v-icon v-if="isSelected" color="#333" size="48">
                <font-awesome-icon :icon="['fas', 'xmark']" />
              </v-icon>
            </v-scale-transition>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Dialog pour image agrandie -->
    <v-dialog class="v-img__img--contain" v-model="dialog" max-width="800">
      <v-card v-if="selected">
        <v-img
          :src="'http://localhost:8080/' + selected.lienImage"
          alt="Image agrandie"
          max-height="600"
          contain
        />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Description de la villa -->
  <h2 class="description-titre">
    Maison spacieuse avec piscine et moderne offrant 4 chambres, 2 toilettes et 2 salles de bain. <br>
    À l'entrée, un hall mène à un grand salon lumineux, avec des baies vitrées donnant sur le jardin. <br>
    La cuisine équipée est ouverte sur la salle à manger, parfaite pour les repas en famille.
  </h2>

  <div class="card" id="card-description">
    <div class="card-body">
      <p>Number of Rooms: {{ housing.numberOfRoom }}</p>
      <p>Number of Persons: {{ housing.numberOfPersson }}</p>
      <p>Washing Machine: {{ housing.washingMachine ? 'Yes' : 'No' }}</p>
      <p>Pool: {{ housing.piscine ? 'Yes' : 'No' }}</p>
      <p>Dishwasher: {{ housing.diswasher ? 'Yes' : 'No' }}</p>
      <p>Number of WC: {{ housing.numberWC }}</p>
      <p>Address: {{ housing.adresse }}</p>
    </div>
  </div>

  <!-- Commentaires -->
  <h3>COMMENTAIRES:</h3>

  <!-- Affichage des vues -->
  <div v-for="(view, index) in views" :key="'view-' + index" class="card">
    <div class="card-view">
      <p>{{ view.name }}</p>
      <h5 class="card-title">View</h5>
      <p class="card-description">{{ view.description }}</p>

      <!-- Affichage des étoiles -->
      <div class="stars">
        <!-- Affiche les étoiles pleines -->
        <font-awesome-icon
          v-for="starIndex in Math.floor(view.note)"
          :key="'filled-star-' + starIndex"
          :icon="['fas', 'star']"
          class="star"
        />
        <!-- Affiche les étoiles vides -->
        <font-awesome-icon
          v-for="starIndex in 5 - Math.floor(view.note)"
          :key="'empty-star-' + starIndex"
          :icon="['far', 'star']"
          class="star"
        />
      </div>
    </div>
    <br>

    </div>

</template>

<script setup lang="ts">
import type { Housing, Picture, View } from '@/entities';
import { fetchOneHousing } from '@/Service/HousingService';
import { fetchAllpicture } from '@/Service/Picture';
import { onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fetchAllView } from '@/Service/ViewService';

// Définition des props
const { initialHousing } = defineProps<{
  initialHousing?: Housing;
}>();

// Initialisation de l'objet housing
const housing = ref<Housing>({
  id: 0,
  title: "",
  description: "",
  numberOfRoom: 0,
  numberOfPersson: 0,
  washingMachine: true,
  piscine: true,
  diswasher: true, // Correction de "diswasher" en "dishwasher"
  numberWC: 0,
  adresse: "",
  numberBathroom: 0,
  ...initialHousing // Si initialHousing est défini, il remplace les valeurs par défaut
});

// Initialisation de views et pictures
const views = ref<View[]>([]);
const pictures = ref<Picture[]>([]);
const selected = ref<Picture>();

const dialog = ref(false);

onMounted(async () => {
  try {
    pictures.value = await fetchAllpicture();
  } catch (e) {
    console.log(e);
  }

  try {
    housing.value = await fetchOneHousing(1);
  } catch (e) {
    console.log(e);
  }

  try {
    views.value = await fetchAllView();
  } catch (e) {
    console.log(e);
  }
});
</script>
