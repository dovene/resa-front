<template>
  <footer>
    <div class="container">
      <!-- Section Contact -->
      <div class="footer-content">
        <h3>Contactez-nous</h3>
        <p> <br> <font-awesome-icon :icon="['fas', 'envelope']" />favrot.frederic@icloud.com</p>
        <p> <br> <font-awesome-icon :icon="['fas', 'envelope']" />carole.favrot@orange.fr</p>
        <p> <br> <font-awesome-icon :icon="['fas', 'phone']" /> 0678240300</p>
        <p> <br> <font-awesome-icon :icon="['fas', 'phone']" /> 0643729245</p>

      </div>

      <!-- Section Mon Compte -->
      <div class="footer-content my-account">
        <h3>Mon Compte</h3>
        <ul>
          <li><a href="#">Se connecter</a></li>
          <li><a href="#">Register</a></li>
          <li><a href="#">Mes reservation</a></li>
          <li><a href="#">Aide</a></li>
        </ul>
      </div>
    </div>
    <div class="bottom-bar">
      <p>&copy; 2023 Votre entreprise. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style>
/* Style de base */
footer {
  background-color: #333; /* Fond gris foncé */
  color: #fff; /* Texte blanc */
  padding: 20px 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  flex: 1 1 30%;
  margin: 0 10px;
}

.footer-content h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ff7f50;
}

.footer-content p {
  margin: 5px 0;
}

.footer-content ul {
  list-style: none;
  padding: 0;
}

.footer-content ul li {
  margin: 5px 0;
}

.footer-content a {
  color: #ccc;
  text-decoration: none;
}

.footer-content a:hover {
  color: #fff;
  text-decoration: underline;
}

/* Style des icônes sociales */
.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons a {
  color: #ccc;
  font-size: 16px;
}

.social-icons a:hover {
  color: #ff7f50;
}

/* Barre de bas de page */
.bottom-bar {
  text-align: center;
  padding: 10px 0;
  background-color: #222;
  color: #bbb;
  font-size: 14px;
  margin-top: 20px;
}
</style>
