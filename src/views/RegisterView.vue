

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit()">
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          v-model="user.firstName"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          v-model="user.lastName"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Create a password"
          required
        />
      </div>
      <div class="form-group">
        <label for="birthdate">birthdate</label>
        <input
          type="date"
          id="birthdate"
          v-model="user.birthdate"
          placeholder="Create a password"
          required
        />
      </div>


      <div class="form-group">
        <button type="submit">Sign In</button>
      </div>
    </form>
  </div>
</template>



<script setup lang="ts">
import type { User } from "@/entities";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { postRegister } from "@/Service/Auth_Service";

const router = useRouter();


// Définition du modèle utilisateur
const user = ref<User>({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthdate: ""
});
async function handleSubmit() {
    await postRegister(user.value);
    router.push("/");
    router.back();
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

