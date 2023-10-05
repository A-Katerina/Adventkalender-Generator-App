<template>

  <div class="pb-6 relative">

<div class="flex flex-col place-items-center">


  <div  class="m-5 z-20"><button class="border bg-white p-4 rounded-sm drop-shadow-[0_10px_6px_rgba(0,0,0,0.25)]" @click="addCalendar()">Add Calendar</button></div>

  <div v-for="entry of storeCalendars.calendars" class="bg-white border min-w-[40%] p-2 m-3 rounded-sm drop-shadow-[0_10px_6px_rgba(0,0,0,0.25)] z-20" >
    <div class="flex flex-row justify-between">
      <div class="box flex place-items-center max-w-[300px]"><h1 class="">{{entry.name}}</h1></div>
      <div class="flex gap-2 ">

          <router-link :key="entry.id" :to="'edit-calendars/' + entry.id">
            <button class="border ml-[0.900rem] p-2 rounded-[100em] shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]">
              <EditCalendarIcon />
            </button>
            <p class="pt-1 mr-2 lg:text-[11px] text-[10px] text-[#073f78] font-medium">Edit Calendar</p>
          </router-link>
        <router-link :key="entry.id" :to="'show-calendar/' + entry.id">
          <button class="border ml-4 p-2 rounded-[100em] shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]">
            <ViewCalendarIcon />
          </button>
          <p class="pt-1 lg:text-[11px] text-[10px] text-[#073f78] font-medium">View Calendar</p>
        </router-link>
        <div>
          <button class="border ml-5 p-2 rounded-[100em] shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]" @click="openConfirmation(entry)">
            <DeleteCalendarIcon />
          </button>
          <p class="pt-1 lg:text-[11px] text-[10px] text-[#073f78] font-medium">Delete Calendar</p>
        </div>
      </div>
    </div>
  </div>


</div>

</div>

  <div class="grid place-items-center z-[999] absolute">
    <div class="absolute "><Confirmation v-if="confirmationVisible"/></div>
  </div>

  <div>
    <img :src="trees" class="z-10 fixed bottom-0 left-0"/>
  </div>

</template>

<script setup lang="ts">
import {storeCalendars, addCalendar, aktuellerKalender, sidebarVisible, confirmationVisible} from "@/assets/Calendars";
import {ref, computed, onBeforeMount} from "vue";
import EditCalendars from './EditCalendars.vue';
import snow from '@/components/icons/snow.svg';
import trees from '@/assets/trees.png';
import EditCalendarIcon from '@/components/icons/EditCalendarIcon.vue';
import ViewCalendarIcon from '@/components/icons/ViewCalendarIcon.vue';
import DeleteCalendarIcon from '@/components/icons/DeleteCalendarIcon.vue';
import Snowflakes from '@/assets/Snowflakes.vue';
import Confirmation from '@/components/Confirmation.vue';


console.table(storeCalendars.calendars);


const eintraege = storeCalendars.calendars;
const count = computed(() => {
  return storeCalendars.calendars.length;
});

const findName = computed(() => {
  const hilfsvar = storeCalendars.calendars.find(entry => entry.name == 'ersterKalender');
  return hilfsvar.name;
  //return storeCalendars.calendars.find(entry => entry.name == 'ersterKalender').id;
})


const filterName = computed( () => {
  const calendar = storeCalendars.calendars.find(entry => entry.name === 'new calendar');
  //const calendarEntry = calendar.calendarEntry.find((entry: { picturePath: string; }) => entry.picturePath === 'null');
  return calendar.name;

})

onBeforeMount(() => {

  if(localStorage.getItem('Calendars')) {
    storeCalendars.calendars = JSON.parse(localStorage.getItem('Calendars') || '[]');
  }
  // }
});


function openConfirmation(entry: any){
  // console.log('angeklicktes fenster', entry.picturePath);
  aktuellerKalender.value = entry;   // aktuellesFenster.value = entry.picturePath;
  console.log('angeklickter eintrag', aktuellerKalender.value);
  confirmationVisible.value = true;

}
</script>


<style scoped>

img{
  filter: drop-shadow(4px 1px 5px rgba(0, 0, 0, 0.6));
}

.box {

  word-break: break-all;
}




</style>