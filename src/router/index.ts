import LoisirCategoryView from '@/views/LoisirCategoryView.vue';
import MirepoixView from '@/views/MirepoixView.vue';
import ReservationView from '@/views/ReservationView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '@/views/AdminView.vue';
import RegisterView from '@/views/RegisterView.vue';
import SingInView from '@/views/SingInView.vue';
import SingleActivityView from '@/views/SingleActivityView.vue';
import SingleReservationView from '@/views/SingleReservationView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mirepoix',
      name: 'mirepoix',
      component: MirepoixView, // Correction du nom de la variable importée
    },
    {
      path: '/loisir',
      name: 'loisir',
      component: LoisirCategoryView, // Correction de `LoisirView` qui n'était pas défini
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: ReservationView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/Sign-In',
      name: 'Sign-In',
      component: SingInView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/category/:theme',
      name: 'category',
      component: LoisirCategoryView,
    },
    {
      path: '/activity/:id',
      name: 'singleActivity',
      component: SingleActivityView, // Correction de la route
    },
    {
      path: '/reservation/:id',
      name: 'singleReservationView',
      component: SingleReservationView, // Correction de la route
    }

  ],
});

export default router;
