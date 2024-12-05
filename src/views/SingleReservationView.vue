<template>
  <v-container>
    <v-row dense>
      <!-- Vérifie si une réservation existe avant d'afficher -->
      <v-col v-if="reservation" cols="12" sm="6" md="4">
        <v-card class="reservation-card" max-width="344" outlined>
          <!-- Titre de la carte -->
          <v-card-title class="reservation-title">
            Réservation
          </v-card-title>

          <!-- Sous-titre -->
          <v-card-subtitle class="reservation-subtitle">
            <div class="id-reservation"><strong>ID :</strong> {{ reservation.id }}</div>
            <div><strong>Date de début :</strong> {{ reservation.startDate }}</div>
            <div><strong>Date de fin :</strong> {{ reservation.endDate }}</div>
          </v-card-subtitle>

          <!-- Texte de la carte -->
          <v-card-text class="reservation-text">
            <div><strong>Prix total :</strong> {{ reservation.priceTotal }} €</div>
            <div><strong>Nombre d'adultes :</strong> {{ reservation.numberOfAdult }}</div>
            <div><strong>Nombre d'enfants :</strong> {{ reservation.numberOfChildren }}</div>
          </v-card-text>

          <!-- Boutons d'action -->
          <v-btn
            class="see-more-btn"
            @click="refuserReservation(reservation)"
            color="red"
          >
            Refuser
          </v-btn>
          <v-btn
            class="see-more-btn"
            @click="AccepterReservation(reservation)"
            color="green"
          >
            Accepter
          </v-btn>

            <v-btn class="see-more-btn" color="orange" @click="goBack">go Back</v-btn>

        </v-card>
      </v-col>
    </v-row>
<v-btn class="see-more-btn" color="rouge" @click="deleteReservation()">supprimer</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import type { Reservation } from "@/entities";

import { fetchOneReservation, ReservationDelete, updateReservation } from "@/Service/ReservationService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";


// Accès aux paramètres de la route
const route = useRoute();
const router =useRouter();
const reservation = ref<Reservation>();

// Chargement de la réservation à l'initialisation
onMounted(async () => {
  try {
    const reservationId = Number(route.params.id);
    if (!reservationId) {
      throw new Error("ID de réservation invalide.");
    }

    reservation.value = await fetchOneReservation(reservationId);
  } catch (e) {
    console.error("Erreur lors du chargement de la réservation :", e);
  }
});

// Fonction pour refuser une réservation
async function refuserReservation(resa: Reservation) {
  if (confirm(`Êtes-vous sûr de vouloir refuser la réservation #${resa.id} ?`)) {
    try {
      // Mettre à jour le statut de la réservation
      const updatedResa = { ...resa, status: "refuser" };
      await updateReservation(resa.id, updatedResa);

      // Mettre à jour localement
      reservation.value = updatedResa;

      console.log(`Réservation #${resa.id} refusée avec succès.`);
    } catch (error) {
      console.error(`Erreur lors du refus de la réservation #${resa.id}:`, error);
      alert(`Erreur : impossible de refuser la réservation.`);
    }
  }
}

// Fonction pour accepter une réservation
async function AccepterReservation(resa: Reservation) {
  if (confirm(`Êtes-vous sûr de vouloir accepter la réservation #${resa.id} ?`)) {
    try {
      // Mettre à jour le statut de la réservation
      const updatedResa = { ...resa, status: "accepter" };
      await updateReservation(resa.id, updatedResa);

      // Mettre à jour localement
      reservation.value = updatedResa;

      console.log(`Réservation #${resa.id} acceptée avec succès.`);
    } catch (error) {
      console.error(`Erreur lors de l'acceptation de la réservation #${resa.id}:`, error);
      alert(`Erreur : impossible d'accepter la réservation.`);
    }
  }
}
const goBack = () => {
  router.back(); // Retourne à la page précédente
};
async function deleteReservation() {
  if (route.params.id) {
    await ReservationDelete(Number(route.params.id));
   router.back()
  }
}


</script>

<style scoped>
/* Style général */
.reservation-card {
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.reservation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.reservation-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 15px 10px;
  background-color: #ff9800;
  color: white;
}

.see-more-btn {
  margin: 10px 5px;
  font-weight: bold;
}
</style>
