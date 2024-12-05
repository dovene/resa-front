<template>

  <div class="form-container">
    <form @submit.prevent="handleLogin()">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" placeholder="Enter your email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="user.password" placeholder="Create a password" />
      </div>
      <div class="form-group">
        <button type="submit">Sign In</button>
      </div>

    </form>
  </div>
</template>



<script setup lang="ts">
import type { User } from '@/entities';
import { useAuth } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  const auth = useAuth();
const router = useRouter();
const user = ref<User>({
  email: "",
  password: "",
  firstName: '',
  lastName: '',
  rôle: '',
  birthdate: ''
})


// Méthode pour gérer la connexion
async function handleLogin() {
  try {
    // Validation des champs requis
    if (!user.value.email || !user.value.password) {
      console.error("Email and password are required.");
      return;
    }

    // Appel de la méthode de connexion
    await auth.login(user.value.email, user.value.password);

    // Stockage des informations utilisateur
    // Debugging dans la console



    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
}

</script>

<style scoped>
/* Container Styling */
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Group Styling */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

/* Input Focus */
input:focus {
  outline: none;
  border-color: #04aa6d;
  box-shadow: 0 0 5px rgba(4, 170, 109, 0.5);
}

/* Button Styling */
button {
  background-color: #04aa6d;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
