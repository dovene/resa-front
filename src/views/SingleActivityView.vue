<template>
  <div class="v-card-activity-container">
    <v-container>
      <v-row justify="center" align="start" dense>
        <v-col v-if="activity">
          <v-card class="activity-card">
            <!-- Image avec taille fixe -->
            <v-img
              class="activity-image"
              height="150"
              :src="activityImage"
            >
              <v-card-title class="activity-title">
                {{ activity.title }}

              </v-card-title>
            </v-img>

            <!-- Contenu texte avec alignement et taille fixe -->
            <v-card-text class="activity-text">
              <div class="activity-description">
                {{ activity.description }}
              </div>
              <div class="activity-site" v-if="activity.site">
                <a
                  :href="activity.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Activity Site

                </a>
              </div>
            </v-card-text>

            <!-- Actions alignées uniformément -->
            <v-card-actions v-if="auth.user?.rôle == 'ROLE_ADMIN'">
              <v-btn color="error" @click="deleteActivity">
                    Delete Activity

                  </v-btn>

            </v-card-actions>
  <v-btn class="see-more-btn" color="orange" @click="goBack">go Back</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { Activity, User } from '@/entities';
import router from '@/router';
import { fetchOneActivity, fetchOneActivityDelete } from '@/Service/ActivityService';
import { getUserByid } from '@/Service/Auth_Service';
import { useAuth } from '@/stores/auth';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Référence réactive pour l'activité
const activity = ref<Activity>();
const user = ref<User>();
// Route actuelle pour obtenir l'ID de l'activité
const route = useRoute();
const auth = useAuth()

// Chemin pour les images
const activityImage = computed(() =>
  activity.value?.picture ? `http://localhost:8080/uploads/${activity.value.picture}` : ''
);


// Fonction pour récupérer l'activité
async function loadActivity() {
  if (route.params.id) {
    activity.value = await fetchOneActivity(Number(route.params.id));
    if (activity.value?.id_user) {
      user.value = await getUserByid(activity.value.id_user);
    }
  }
}

// Fonction pour supprimer l'activité
async function deleteActivity() {
  if (route.params.id) {
    await fetchOneActivityDelete(Number(route.params.id));
    router.push({ path: '/', replace: true });
  }
}

// Surveillance des changements de la route
watch(
  () => route.params.id,
  async () => {
    await loadActivity();
  },
  { immediate: true }
);

const goBack = () => {
  router.back(); // Retourne à la page précédente
};
</script>

<style scoped>
/* Conteneur principal */
.v-card-activity-container {
  padding: 40px 20px;
  background: #e0e0e0;
  min-height: 100vh; /* S'assure que la page occupe tout l'écran */
  display: flex;
  justify-content: center;
  align-items: center;

}

/* Carte de l'activité */
.activity-card {
  /* Ombre plus douce */
  border-radius: 15px; /* Coins plus arrondis */
  overflow: hidden;
  background: white;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
  border: solid 4px black
}

.activity-card:hover {
  transform: translateY(-10px); /* Soulèvement au survol */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

/* Image de l'activité */
.activity-image {
  object-fit: cover;
  border-bottom: 4px solid #ff9800; /* Accent de couleur */
}

/* Titre de l'activité */
.activity-title {
  font-size: 20px;
  font-weight: 700;
  padding: 15px;
  color: white;

  text-align: center;
}

/* Texte dans la carte */
.activity-text {
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a; /* Couleur de texte douce */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Description */
.activity-description {
  color: #666;
  font-weight: 500;
}

/* Lien vers le site */
.activity-site a {
  color: #ff9800;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.activity-site a:hover {
  color: #e67e22; /* Couleur légèrement plus foncée au survol */
}

/* Effet global */
.activity-card:hover .activity-site a {
  color: #d35400; /* Accentuation lors du survol de la carte */
}
</style>
