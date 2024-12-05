<template>
  <div class="v-card-activity-container">
    <!-- Dropdown pour sélectionner un statut -->
    <select v-model="selectedStatus" class="status-filter">
      <option value="">All</option>
      <option value="en cours">En cours</option>
      <option value="accepter">Accepter</option>
      <option value="refuser">Refuser</option>
    </select>

    <!-- Liste des réservations -->
    <v-container>
      <v-row dense>
        <v-col v-for="reservation in filteredList" :key="`reservation-${reservation.id}`" cols="12" sm="6" md="4">
          <v-card class="reservation-card" max-width="344" outlined>
            <v-card-title class="reservation-title">Reservation</v-card-title>
            <v-card-subtitle class="reservation-subtitle">
              <div><strong>ID:</strong> {{ reservation.id }}</div>
              <div><strong>Start Date:</strong> {{ reservation.startDate }}</div>
              <div><strong>End Date:</strong> {{ reservation.endDate }}</div>
            </v-card-subtitle>
            <v-card-text class="reservation-text">
              Prix total: {{ reservation.priceTotal }}<br />
              Nombre d'adultes: {{ reservation.numberOfAdult }}<br />
              Nombre d'enfants: {{ reservation.numberOfChildren }}
            </v-card-text>
            <v-card-actions>
              <v-btn @click="refuserReservation(reservation)" color="red">Refuser</v-btn>
              <v-btn @click="accepterReservation(reservation)" color="green">Accepter</v-btn>

              <RouterLink :to="`/reservation/${reservation.id}`">
                <v-btn color="orange">Voir plus</v-btn>

              </RouterLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Section des commentaires -->
    <h3>Commentaires :</h3>
    <div v-for="(view, index) in views" :key="`view-${index}`" class="card">
      <div class="card-view">
        <p>{{ view.name }}</p>
        <h5 class="card-title">View</h5>
        <p class="card-description">{{ view.description }}</p>

        <!-- Affichage des étoiles -->
        <div class="stars">
          <font-awesome-icon v-for="starIndex in Math.floor(view.note)" :key="`filled-star-${starIndex}`"
            :icon="['fas', 'star']" class="star" />

        </div>
        <h3>Reponce</h3>
        <p class="card-reponce">{{ view.replies }}</p>



        <!-- Section des commentaires détaillés -->
        <div class="comments-section">
          <button @click="toggleReplyForm(index)">Répondre</button><br>
          <button @click="deleteReply(index)">Supprimer</button>

          <!-- Formulaire de réponse -->
          <div v-if="replyFormIndex === index" class="reply-form">
            <textarea v-model="replyText" placeholder="Écrire une réponse..."></textarea>
            <button @click="submitReply(index)">Envoyer</button>
            <button @click="deleteReply(index)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire pour soumettre une activité -->
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form">
        <h1>Ajouter une activité</h1>
        <div class="form-group">
          <label for="name">title</label>
          <input type="text" id="name" v-model="activity.title" placeholder="title" />
        </div>

        <div class="form-group">
          <label for="category">Catégorie</label>
          <input type="text" id="category" v-model="activity.category" placeholder="Catégorie" />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="activity.description" placeholder="Description"></textarea>
        </div>

        <div class="form-group">
          <label for="picture">Image</label>
          <input id="picture" @change="onFileChange" type="file" />
        </div>

        <div class="form-group">
          <label for="site">Site</label>
          <input type="text" id="site" v-model="activity.site" placeholder="Site" />
        </div>

        <div class="form-group">
          <button type="submit" class="btn">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Activity, Reservation, View } from "@/entities";
import { postUpload, postActivity } from "@/Service/ActivityService";
import { fetchAllReservation, ReservationDelete, updateReservation } from "@/Service/ReservationService";
import { fetchAllView, updateView } from "@/Service/ViewService";

// Router
const router = useRouter();
const route = useRoute();

// Références pour le formulaire d'activité
const activity = ref<Activity>({
  title: "",
  category: "",
  description: "",
  site: "",
  picture: "",
  thumbnailLink: "",
});
const image = ref<File | null>(null);


// Fonction de soumission du formulaire
async function handleSubmit() {
  try {
    // Vérification de l'image
    if (!image.value) {
      alert("Veuillez ajouter une image.");
      return;
    }

    // Récupération des informations utilisateur depuis le sessionStorage
    const userString = sessionStorage.getItem("user");
    if (!userString) {
      alert("Utilisateur non identifié. Veuillez vous connecter.");
      return;
    }

    const user = JSON.parse(userString);
    if (!user.id) {
      alert("ID utilisateur manquant. Veuillez vérifier vos informations.");
      return;
    }

    activity.value.id_user = user.id;

    // Téléchargement de l'image
    const imgName = await postUpload(image.value);
    if (!imgName) {
      alert("Le téléchargement de l'image a échoué. Veuillez réessayer.");
      return;
    }
    activity.value.picture = imgName;

    // Validation des champs de l'activité
    if (!activity.value.title || !activity.value.category || !activity.value.description || !activity.value.site) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    // Création de l'activité
    const addedActivity = await postActivity(activity.value);
    if (!addedActivity || !addedActivity.id) {
      throw new Error("La création de l'activité a échoué. Veuillez vérifier vos données.");
    }

    alert("Activité créée avec succès !");
    router.push(`/activity/${addedActivity.id}`);
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);

    if (error instanceof Error) {
      alert(`Une erreur s'est produite : ${error.message}`);
    } else {
      alert("Une erreur inconnue s'est produite.");
    }
  }
}

// Gestion des fichiers (input type="file")
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    image.value = target.files[0];

  }
}

// Gestion des réservations
const reservations = ref<Reservation[]>([]);
const selectedStatus = ref<string>("");

// Liste des réservations filtrées
const filteredList = computed(() =>
  selectedStatus.value
    ? reservations.value.filter((res) => res.status === selectedStatus.value)
    : reservations.value
);

// Refuser une réservation
const refuserReservation = async (resa: Reservation) => {
  if (confirm(`Êtes-vous sûr de vouloir refuser la réservation #${resa.id} ?`)) {
    try {
      const updatedResa = await updateReservation(resa.id, { ...resa, status: "refuser" });
      const index = reservations.value.findIndex((r) => r.id === resa.id);
      if (index !== -1) reservations.value[index] = updatedResa;
    } catch (error) {
      console.error("Erreur lors du refus de la réservation :", error);
      alert("Une erreur est survenue lors du refus de la réservation.");
    }
  }
};

// Accepter une réservation
const accepterReservation = async (resa: Reservation) => {
  if (confirm(`Êtes-vous sûr de vouloir accepter la réservation #${resa.id} ?`)) {
    try {
      const updatedResa = await updateReservation(resa.id, { ...resa, status: "accepter" });
      const index = reservations.value.findIndex((r) => r.id === resa.id);
      if (index !== -1) reservations.value[index] = updatedResa;
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la réservation :", error);
      alert("Une erreur est survenue lors de l'acceptation de la réservation.");
    }
  }
};

// Gestion des vues/commentaires
const views = ref<View[]>([]);
const replyFormIndex = ref<number | null>(null);
const replyText = ref<string>("");

const toggleReplyForm = (index: number) => {
  replyFormIndex.value = replyFormIndex.value === index ? null : index;
  replyText.value = "";
};

const submitReply = async (index: number) => {
  if (replyText.value.trim()) {
    const targetView = views.value[index];
    targetView.replies = replyText.value;
    const updatedView = await updateView(targetView); // Assurez-vous que `updateView` prend en charge la mise à jour des réponses
    if (!updatedView) {
      throw new Error("Échec de la mise à jour des réponses sur le serveur.");
    }

    // Met à jour la liste des vues localement
    views.value[index] = updatedView;
    try {
      // Réinitialise le formulaire
      replyFormIndex.value = null;
      replyText.value = "";
    } catch (error) {
      console.error("Erreur lors de la soumission de la réponse :", error);
      alert("Une erreur est survenue lors de l'envoi de votre réponse. Veuillez réessayer.");
    }
  } else {
    alert("Veuillez écrire une réponse avant d'envoyer.");
  }
};
//requete vers le back pour persister la réponse

replyFormIndex.value = null;
replyText.value = "";


// Chargement initial des données
onMounted(async () => {
  try {
    reservations.value = await fetchAllReservation();
    views.value = await fetchAllView();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
    alert("Une erreur est survenue lors du chargement des données.");
  }
});

const deleteReply = async (viewIndex: number) => {
  try {
    const targetView = views.value[viewIndex];
    targetView.replies = "";

    // Suppression de la réponse localement


    // Mise à jour côté serveur
    const updatedView = await updateView(targetView); // Assurez-vous que updateView envoie les données mises à jour
    if (!updatedView) {
      throw new Error("Échec de la mise à jour des réponses sur le serveur.");
    }

    // Mise à jour de la vue localement
    views.value[viewIndex] = updatedView;

  } catch (error) {
    console.error("Erreur lors de la suppression de la réponse :", error);
    alert("Une erreur est survenue lors de la suppression de votre réponse. Veuillez réessayer.");
  }
  async function deleteReservation() {
  if (route.params.id) {
    await ReservationDelete(Number(route.params.id));
    router.push({ path: '/', replace: true });
  }
}
};
</script>
<style scoped>
/* Style général */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

/* Conteneur principal */
.v-card-activity-container {
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

}
/* Dropdown pour filtrer par statut */
.status-filter {
  padding: 12px 14px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  width: 220px;
  background-color: #fff;
  color: #555;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.status-filter:focus {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-color: #ffa726; /* Couleur de bordure active */
}

/* Style des cartes */
.reservation-card {
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.reservation-card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
}

/* Titre de la carte */
.reservation-title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 14px;
  background-color: #ffa726;
  color: white;
  border-bottom: 1px solid #ff9800; /* Ajout de la ligne en bas pour plus de séparation */
  letter-spacing: 1px;
}

/* Sous-titre de la carte */
.reservation-subtitle {
  font-size: 16px;
  color: #777;
  margin: 12px 0;
  text-align: left;
  padding: 0 12px;
}

/* Texte de la carte */
.reservation-text {
  font-size: 15px;
  color: #555;
  margin: 12px 0;
  padding: 0 12px;
}

/* Conteneur des boutons d'action */
.action-buttons {
  display: flex;
  justify-content: space-around;
  padding: 12px;
  margin-top: 25px;
}

/* Style des boutons d'action */
.action-btn {
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 12px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
  min-width: 100px;
}

/* Bouton de refus */
.reject-btn {
  background-color: #f44336;
  color: white;
  box-shadow: 0px 2px 6px rgba(244, 67, 54, 0.2);
}

.reject-btn:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

/* Bouton d'acceptation */
.accept-btn {
  background-color: #4caf50;
  color: white;
  box-shadow: 0px 2px 6px rgba(76, 175, 80, 0.2);
}

.accept-btn:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

/* Bouton de retour */
.go-back-btn {
  background-color: #607d8b;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.go-back-btn:hover {
  background-color: #455a64;
  transform: scale(1.05);
}


.more-btn {
  background-color: #2196f3;
  color: white;
}

/* Conteneur principal */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: black;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Style des lignes */
.form-row {
  display: flex;
  flex-direction: column;

}

/* Style des labels */
.form-row label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: black;
}

/* Style des inputs et textarea */
.form-row input,
.form-row textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

/* Focus sur les inputs et textarea */
.form-row input:focus,
.form-row textarea:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Style pour le textarea */
.form-row textarea {
  min-height: 100px;
  resize: vertical;
}

/* Style du bouton */
.submit-button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Styles responsives */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .form-row label {
    font-size: 13px;
  }

  .submit-button {
    font-size: 14px;
    padding: 8px 12px;
    background-color: #007BFF;
    color: #007BFF;
  }
}

/* Form group */
h1 {
  color: black;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: #444;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

textarea {
  resize: none;
  height: 100px;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* File input styles */
input[type="file"] {
  padding: 0.5rem;
  border: none;
}

/* Submit button styles */
.btn {
  padding: 0.8rem 1.2rem;
  background-color: #003f7f;

  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:active {
  background-color: #003f7f;
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
