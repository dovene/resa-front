import type { User } from "@/entities";
import { fetchLogin, fetchLogout, postRegister } from "@/Service/Auth_Service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore('auth', () => {

  const user = ref<User | null>(null);  // Initialisez user avec null plutôt que undefined
  const stored = sessionStorage.getItem('user');
  if(stored) {
    user.value = JSON.parse(stored);
  }

    // Fonction de login
    async function login(email: string, password: string) {
        try {
            const data = await fetchLogin(email, password);
            console.log(data);
            user.value = data;  // Stocke les données utilisateur dans le state
            console.log(user.value);

            if (user.value?.id) {  // Vérifiez si user.value et user.value.id existent
                const id = JSON.stringify(user.value);
                console.log(id);
                sessionStorage.setItem('user', id);  // Stocke l'ID dans sessionStorage
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;  // Propagation de l'erreur si la connexion échoue
        }
    }

    // Fonction de logout
    async function logout() {
        try {
            await fetchLogout();
            sessionStorage.removeItem('user');  // Supprime l'ID du sessionStorage
            user.value = null;  // Réinitialise l'utilisateur
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }

    // Fonction de création d'un nouvel utilisateur
    async function handleSubmit(userNew: User) {
        try {
            const data = await postRegister(userNew);
            sessionStorage.setItem('user', JSON.stringify(data));  // Enregistre les données utilisateur dans sessionStorage
            user.value = data;  // Stocke les données utilisateur dans le state
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;  // Propagation de l'erreur si l'inscription échoue
        }
    }

    // Retourne les méthodes et l'état pour être utilisé dans vos composants
    return { user, login, logout, handleSubmit };
});
