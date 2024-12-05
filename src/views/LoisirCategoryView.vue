<template>
  <div class="v-card-activity-container">

    <v-container>
      <v-row justify="center" align="start" dense>
        <v-col v-for="(activity, index) in activity" :key="'activity-' + index" cols="12" sm="6" md="4">
          <v-card class="activity-card">
            <!-- Image avec taille fixe -->
            <v-img class="activity-image" height="150" :src="'http://localhost:8080/uploads/' + activity.picture">
              <v-card-title class="activity-title">{{ activity.title }}</v-card-title>
            </v-img>

            <!-- Contenu texte avec alignement et taille fixe -->
            <v-card-text class="activity-text">
              <div class="activity-description">{{ truncateString(activity.description, 120) }}</div>
              <div class="activity-site"><a :href="activity.site">Site de l'activité</a></div>
            </v-card-text>

            <!-- Actions alignées uniformément -->
            <v-card-actions class="activity-actions">
              <RouterLink :to="'/activity/' + activity.id"><v-btn class="see-more-btn" color="orange">See
                  More</v-btn></RouterLink>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>


    </v-container>
  </div>

</template>

<script setup lang="ts">
import type { Activity } from '@/entities';
import { fetchAllActivityByCategory } from '@/Service/ActivityService';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num > 4 ? num - 4 : num) + "...";
}
// Références réactives pour les activités
const activity = ref<Activity[]>([]);

// Route pour récupérer le paramètre du thème
const route = useRoute();

// Observez les changements du paramètre `theme` dans la route
watch(
  () => route.params.theme,
  async () => {
    activity.value = await fetchAllActivityByCategory(route.params.theme as string);
  },
  { immediate: true }
);
</script>
<style scoped>
/* Conteneur principal */
.v-card-activity-container {
  padding: 30px;
  margin-top: 50px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Grille d'alignement */
.v-row {
  gap: 20px;
  /* Espace entre les colonnes */
}

/* Style pour les cartes */
.activity-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05); /* Ombre plus douce */
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

/* Image */
.activity-image {
  height: 180px;
  object-fit: cover;
  border-bottom: 3px solid #ffa726; /* Bordure pour séparer l'image du texte */
  transition: filter 0.3s ease;
}

.activity-card:hover .activity-image {
  filter: brightness(85%);
}

/* Titre de l'image */
.activity-title {
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5); /* Légère ombre derrière le texte */
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 5px;
  letter-spacing: 1px;
}

/* Texte de la carte */
.activity-text {
  padding: 20px;
  font-size: 15px;
  color: #444;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.activity-description {
  margin-bottom: 15px;
  color: #777;
  line-height: 1.5;
}

.activity-category {
  font-weight: bold;
  font-size: 16px;
  color: white;
  margin-bottom: 8px;
}

.activity-site {
  font-style: italic;
  color: #888;
  text-decoration: none;
}

.activity-site:hover {
  color: #ffa726;
  text-decoration: underline;
}

/* Actions de la carte */
.activity-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
}

/* Bouton "See More" */
.see-more-btn {
  font-weight: bold;
  text-transform: uppercase;
 
  color: black;
  padding: 8px 16px;
  border-radius: 6px;

}

.see-more-btn:hover {
  background-color: #f57c00;
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(255, 120, 0, 0.3);
}

/* Pour les petits écrans */
@media (max-width: 600px) {
  .activity-card {
    height: auto;
    min-height: 350px;
  }

  .activity-title {
    font-size: 18px;
    padding: 8px;
  }

  .activity-text {
    padding: 15px;
  }

  .see-more-btn {
    padding: 10px 20px;
    color:black
  }
}
</style>
