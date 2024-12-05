import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "./axiosConfig"
import { createPinia } from 'pinia'; // Importation de Pinia
import App from './App.vue'; // Importation du composant principal
import router from './router'; // Importation du router
import { createVuetify } from 'vuetify';
import { mdi,aliases} from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



// Ajout des icônes FontAwesome à la bibliothèque
library.add(fas);

// Création de Vuetify
const vuetify = createVuetify({components,directives,icons: {
  aliases,sets: {mdi}, defaultSet:'mdi'
}});

// Création de l'application Vue
const app = createApp(App);

// Enregistrement global des composants et plugins
app.component('font-awesome-icon', FontAwesomeIcon); // Enregistrement global de FontAwesome
app.use(router); // Utilisation du router
app.use(createPinia()); // Utilisation de Pinia pour la gestion d'état
app.use(vuetify); // Utilisation de Vuetify

// Montage de l'application dans l'élément HTML avec l'ID "app"
app.mount('#app');
