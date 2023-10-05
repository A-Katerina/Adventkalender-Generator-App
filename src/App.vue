<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Overview from './views/Overview.vue';
import EditCalendars from './views/EditCalendars.vue';
import ShowCalendar from './views/ShowCalendar.vue';
import router from './router/index';
import {ref, computed, watch, onBeforeMount} from 'vue'
import {getCalendarById, locationRight} from "@/assets/Calendars";
import OverviewIcon from './components/icons/OverviewIcon.vue';
import lights from '@/assets/lights.png';
import ViewCalendarIcon from '@/components/icons/ViewCalendarIcon.vue';
import EditCalendarIcon from '@/components/icons/EditCalendarIcon.vue';
import snow from '@/components/icons/snow.svg';
import Snowflakes from '@/assets/Snowflakes.vue';


//const loc = ref(window.location.pathname);
const editCalendar = ref(false);
const route = useRoute();
const calendar = ref();


function onEditCalendar(){
  if (editCalendar.value == false){
    return false;
  } else {return true;}
}

const notOveriview = computed(() => {
  if (editCalendar.value == false){
    return false;
  } else {return true;}
})

watch(route, (newRoute) => {
  console.log(newRoute.path)
  console.log('calendar value', editCalendar.value)
  if (newRoute.name == 'edit-calendars' ||  newRoute.name == 'show-calendar'){
    editCalendar.value = true;
  } else {
    editCalendar.value = false;
  }
  console.log('neuer value', editCalendar.value)
});


watch(
    () => route.params.id,
    Id => {
      calendar.value = getCalendarById(Number(Id));
      console.log(calendar.value);
      console.log(Id)
    },
    {immediate: true}
)


</script>
<template>

  <div class="background relative" :class="{'bg-white': onEditCalendar() === true, 'bg-gradient-to-t from-[#021C39] via-[#052d5e] to-[#073f78]' : onEditCalendar() === false || route.path.includes('show-calendar')}"> <!--:class="{'bg-white': onEditCalendar() === true, 'bg-gradient-to-t from-[#021C39] via-[#052d5e] to-[#073f78]' : onEditCalendar() === false}"-->

    <Snowflakes v-if="onEditCalendar() === false || route.path.includes('show-calendar')"/>

    <div class="sticky top-0 z-[999]">

      <nav class="w-[100%] h-[78.5px] flex" :class="{'bg-[#073f78]': onEditCalendar() === true && route.path.includes('edit-calendars'), 'bg-white' : onEditCalendar() === false || route.path.includes('show-calendar')}">
        <RouterLink to="/">
          <div class="p-2">
            <div class="border bg-white shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] w-fit p-2 ml-4 rounded-[100em]" >
              <OverviewIcon />
            </div>
            <p class="pt-1 ml-3 text-[11px] text-[#073f78] font-medium" :class="{'text-white' : onEditCalendar() === true && route.path.includes('edit-calendars')}">Overview</p>
          </div>
        </RouterLink>
        <div v-if="route.path.includes('edit-calendars')" class="py-2 px-[6.5px]">
          <router-link :key="calendar.id" :to="'/' + 'show-calendar/' + calendar.id">
            <button class="border bg-white shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] w-fit p-2 ml-4 rounded-[100em]"><ViewCalendarIcon /> </button>
            <p class="pt-1 lg:text-[11px] text-[10px] text-white font-medium">View Calendar</p>
          </router-link>
        </div>
        <div v-if="route.path.includes('show-calendar')" class="p-2">
          <router-link :key="calendar.id" :to="'/' + 'edit-calendars/' + calendar.id">
            <button class="border bg-white ml-[0.900rem] p-2 rounded-[100em] shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]"><EditCalendarIcon /></button>
            <p class="pt-1 mr-2 lg:text-[11px] text-[10px] text-[#073f78] font-medium">Edit Calendar</p>
          </router-link>
        </div>
      </nav>


    </div>
    <div class="sticky top-[78.5px] z-0" v-if="!route.path.includes('show-calendar')"><img class="w-[100%] z-0" :src="lights" /></div>

  <router-view></router-view>
    <img :src="snow" class="snow absolute bottom-0 z-0" v-if="onEditCalendar() === false"/>
  </div>

</template>

<style scoped>

img {
  filter: drop-shadow(0px 5px 3px rgba(0,0,0,0.5));
}

.snow {
  filter: drop-shadow(4px 1px 5px rgba(0, 0, 0, 0.6));
}

#app {
  background-color: red;
}

Overview {
  background-color: red;
}


.background {
  min-height: 100vh;
}

</style>




