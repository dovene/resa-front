<template>
  <header>
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <!-- Titre de la navbar -->

        <!-- Liens de la navbar -->
        <ul class="navbar-nav ms-auto">
          <span class="navbar-title">Mirepoix Bonheur</span>

          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/mirepoix">Mirepoix</RouterLink>
          <v-menu>
            <template v-slot:activator="{ props }">
              <a class="navbar-nav" v-bind="props">
                Loisirs <font-awesome-icon :icon="['fas', 'caret-down']" />
              </a>
            </template>

            <v-list bg-color="wihte">
              <v-list-item>
                <v-list-item-title>
                  <RouterLink to="/category/histoire" class="nav-link"><h3>Histoire</h3></RouterLink>
                </v-list-item-title>
                <v-list-item-title>
                  <RouterLink to="/category/Balade parc et jardin" class="nav-link"><h3>Balade parc et jardin</h3> </RouterLink>
                </v-list-item-title>
                <v-list-item-title>
                  <RouterLink to="/category/OutdoorActivity" class="nav-link"><h3>Outdoor activity</h3></RouterLink>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <RouterLink to="/Reservation">Reservation</RouterLink>
          <RouterLink to="/Admin" v-if="auth.user?.rôle == 'ROLE_ADMIN'">Admin</RouterLink>
          <RouterLink to="/Sign-In" v-if="!auth.user">Sign-In</RouterLink>
          <RouterLink to="/logout" v-if="auth.user" @click="clicklogout()">logout</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import router from '@/router';
import { useAuth } from '@/stores/auth';



const auth = useAuth();
function clicklogout(){
  auth.logout()

  router.push("/");
}

</script>

<style scoped>
header {
  width: 100%;

}

.navbar {
  width: 100%;
  height: 50px;
  /* Définit la hauteur de la navbar */
  display: flex;
  align-items: center;
  /* Centre le contenu verticalement */
  padding: 0 10px;
  background-color: #333333;
  /* Couleur gris foncé */
  color: white;
z-index: 100;
}

.navbar-title {
  margin-top: 14px;
  font-size: 20px;
  color: white;
  line-height: 20px;
  /* Centrage vertical du titre */
}

.navbar-nav {
  display: flex;
  gap: 15px;
  background-color: #333333;
  color: white;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 12px;
  padding: 0;
}

.nav-link:hover {
  text-decoration: none;
}


.v-list-item{

  font: size 80px;

  }
</style>
