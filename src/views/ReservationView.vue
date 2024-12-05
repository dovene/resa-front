<template>
  <v-app>
    <v-container fluid>
      <!-- Carte avec image de couverture -->
      <v-card class="mx-0 text-center elevation-2" width="100%">
        <v-img
          class="align-end text-white"
          height="300"
          src="src/assets/images/devantMaison.jpg"
          cover
        >
          <v-card-title class="title">MirepoixBohneur</v-card-title>
        </v-img>

        <v-card-text class="text-center">
          <div>Address: 24 rue du marechal Foch 09500 Mirepoix</div>
          <br />
          <div>0472370475</div>
          <br />
          <div>www.mirepoixbonheur.com</div>
        </v-card-text>
      </v-card>

      <v-container fluid>
    <form @submit.prevent="handleSubmit">
      <!-- Section de Date Pickers pour Date de début et Date de fin -->
      <v-row justify="space-around" class="mt-4">
        <v-col cols="12" md="5">
          <label for="startDate">Date de Début</label>
          <v-date-picker
            v-if="loadedReservation"
            v-model="selectedDates"
            color="primary"
            elevation="2"
            :min="minDate"
            multiple="range"
            @change="calculateCost"
            :allowed-dates="dayAvailable"
          >
            <!-- Icônes personnalisées pour navigation -->


          </v-date-picker>
        </v-col>
      </v-row>
          <!-- Affichage du coût total -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-center">
              <div class="text-h5">Coût total : {{ totalCost }} €</div>
            </v-col>
          </v-row>

          <!-- Sélection du nombre d'adultes et d'enfants -->
          <v-row class="mt-4">
            <!-- Nombre adulte -->
            <v-col cols="12" md="6">
              <v-card class="pa-3" outlined>
                <v-row align="center" justify="space-between">
                  <font-awesome-icon :icon="['fas', 'user']" class="text-h6" />
                  <span class="text-h6">Nombre adulte</span>
                  <span
                    @click="updateCount('adultCount', -1)"
                    class="text-h6"
                    style="cursor: pointer;"
                  >
                    <font-awesome-icon :icon="['fas', 'minus']" />
                  </span>
                  <!-- Compteur -->
                  <span class="text-h6">{{ adultCount }}</span>

                  <!-- Icône + -->
                  <span
                    @click="updateCount('adultCount', 1)"
                    class="text-h6"
                    style="cursor: pointer;"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </span>
                </v-row>
              </v-card>
            </v-col>

            <!-- Nombre enfant -->
            <v-col cols="12" md="6">
              <v-card class="pa-3" outlined>
                <v-row align="center" justify="space-between">
                  <font-awesome-icon :icon="['fas', 'child']" class="text-h6" />
                  <span class="text-h6">Nombre enfant</span>

                  <!-- Icône - -->
                  <span
                    @click="updateCount('childCount', -1)"
                    class="text-h6"
                    style="cursor: pointer;"
                  >
                    <font-awesome-icon :icon="['fas', 'minus']" />
                  </span>

                  <!-- Compteur -->
                  <span class="text-h6">{{ childCount }}</span>

                  <!-- Icône + -->
                  <span
                    @click="updateCount('childCount', 1)"
                    class="text-h6"
                    style="cursor: pointer;"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </span>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12">
              <v-card class="pa-3" outlined>
                <v-row align="center" justify="space-between">
                  <v-icon color="orange">mdi-broom</v-icon>
                  <span class="text-h6">OPTION MÉNAGE 50 €</span>
                  <input
                  id="optionMenage"
                    type="checkbox"
                    v-model="optionMenage"
                    @change="updateOptionMenage"
                  />
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card class="pa-3" outlined>
                <v-row align="center" justify="space-between">
                  <v-icon color="teal">mdi-towel</v-icon>
                  <span class="text-h6">OPTION KIT DRAPS + SERVIETTE</span>
                  <input
                  id="optionKitDraps"
                    type="checkbox"
                    v-model="optionKitDraps"
                    @change="updateOptionKitDraps"
                  />
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- Bouton de soumission -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-btn color="primary" block type="submit" :disabled="isDatesReserved">
                Soumettre la réservation
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { postReservation } from "@/Service/ReservationService";
import axios from "axios";
import type { Reservation } from "@/entities";
import { useRouter } from "vue-router";

const router = useRouter();
// Variables réactives
const adultCount = ref(0);
const childCount = ref(0);
const optionMenage = ref(false);
const optionKitDraps = ref(false);
const selectedDates = ref<string[]>([]);
const pricePerNight = ref(80); // Prix par nuit
const totalCost = ref(0); // Coût total
const reservedDates = ref<Reservation[]>([]); // Liste des réservations récupérées
const loadedReservation = ref(false);

// Date minimale pour le sélecteur
const minDate = new Date().toISOString().split("T")[0];



// Récupérer les réservations à l'arrivée sur la page
onMounted(async () => {
  try {
    const response = await axios.get('/api/reservation'); // Remplacez l'URL par celle de votre API
    reservedDates.value = response.data; // Stocker les réservations récupérées
    loadedReservation.value = true;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);

  }
});

function dayAvailable(date:any) {

  return !reservedDates.value.some(reservation => {
    const reservedStart = new Date(reservation.startDate);
    const reservedEnd = new Date(reservation.endDate);
    return (
      (date >= reservedStart && date <= reservedEnd)
    );
  });
}

// Vérifier si les dates sélectionnées sont réservées
const isDateAvailable = (startDate: string, endDate: string): boolean => {
  const checkStart = new Date(startDate);
  const checkEnd = new Date(endDate);

  return reservedDates.value.some(reservation => {
    const reservedStart = new Date(reservation.startDate);
    const reservedEnd = new Date(reservation.endDate);
    return (
      (checkStart >= reservedStart && checkStart <= reservedEnd) ||
      (checkEnd >= reservedStart && checkEnd <= reservedEnd) ||
      (checkStart <= reservedStart && checkEnd >= reservedEnd)
    );
  });
};

const updateOptionMenage = () => {
  optionMenage.value = optionMenage.value;
};

const updateOptionKitDraps = () => {
  optionKitDraps.value = optionKitDraps.value;
};



const updateCount = (type: "adultCount" | "childCount", value: number) => {
  if (type === "adultCount") {
    adultCount.value = Math.max(0, adultCount.value + value);
  } else if (type === "childCount") {
    childCount.value = Math.max(0, childCount.value + value);
  }
};

// Fonction pour calculer le coût total
const calculateCost = () => {
  if (selectedDates.value.length > 1) {
    const startDate = new Date(selectedDates.value[0]);
    const endDate = new Date(selectedDates.value[selectedDates.value.length - 1]);

    const numberOfNights = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );

    // Calcul du coût
    const baseCost = numberOfNights * pricePerNight.value;
    const cleaningCost = optionMenage.value ? 50 : 0;
    const kitCost = optionKitDraps.value ? 20 : 0;

    totalCost.value = baseCost + cleaningCost + kitCost;
  } else {
    totalCost.value = 0; // Si les dates sont invalides
  }
};

// Observer les changements des options et dates
watch([selectedDates, optionMenage, optionKitDraps], calculateCost);

// Vérifier si les dates sélectionnées sont réservées
const isDatesReserved = computed(() => {
  if (selectedDates.value.length > 1) {
    const startDate = selectedDates.value[0];
    const endDate = selectedDates.value[selectedDates.value.length - 1];
    return isDateAvailable(startDate, endDate);
  }
  return false;
});

// Soumettre la réservation
const handleSubmit = async () => {
  if (totalCost.value === 0) {
    alert("Veuillez vérifier vos choix.");
    return;
  }

  const reservation:Reservation = {
    startDate: selectedDates.value[0],
    endDate: selectedDates.value[selectedDates.value.length - 1],
    numberOfAdult: adultCount.value,
    numberOfChildren: childCount.value,
    optionMenage: optionMenage.value,
    priceTotal: totalCost.value,
    id:0,
  };

  try {
    const addedReservation = await postReservation(reservation);

    if (!addedReservation || !addedReservation.id) {
      throw new Error("La création de la réservation a échoué.");
    }

    alert("Réservation créée avec succès !");
    router.back();
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la soumission.");
  }
};

</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.v-card {
  border-radius: 12px;
}

label {
  font-size: 1rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.text-h6 {
  font-size: 1.2rem;
  font-weight: bold;
}


.v-date-picker {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.v-container {
  max-width: 800px;
  margin: 0 auto;
}
#year-icon{
  color:black;
  background-color: black;
}
#optionMenage{
  transform: scale(2); /* Agrandit la checkbox */
  margin-right: 1.5rem;
}
#optionKitDraps{
  transform: scale(2); /* Agrandit la checkbox */
  margin-right: 1.5rem;
}
</style>
