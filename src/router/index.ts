import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Overview from "@/views/Overview.vue";
import EditCalendars from "@/views/EditCalendars.vue";
import ShowCalendar from "@/views/ShowCalendar.vue";
import {locationRight} from "@/assets/Calendars";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: Overview
    },
    {
      path: '/edit-calendars/:id',
      name: 'edit-calendars',
      component: EditCalendars
    },
    {
      path: '/show-calendar/:id',
      name: 'show-calendar',
      component: ShowCalendar
    },
  ]
})

export default router

