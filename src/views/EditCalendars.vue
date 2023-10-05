<template>

<div class="wrapper relative">
  <div class="grid place-items-center">
<div class="flex flex-col place-items-center gap-1 bg-white rounded-sm">
  <input v-model="calendarName" maxlength="45" minlength="1" class="border rounded-sm shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]" placeholder="Name"/> <button :disabled="disableSubmitButton" class="border bg-white shadow-[0_4px_4px_rgba(0,0,0,0.20)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] w-fit p-1 rounded-sm disabled:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]" @click="updateName(calendar)">Submit</button>
  <p class="mt-[-2px]">Calendar-name: {{calendar.name}}</p>
</div>
  </div>
<!--  {{calendar}}-->

  <div class="mb-10 mx-10 mt-4 relative bg-white rounded-sm ">

    <div class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1  gap-8 w-[100%] h-[100%]">
      <div v-for="(entry, index) of calendar.calendarEntries">
        <div class="lg:ml-[-15px] md:ml-[-15px] ml-5">
          <button class="text-2xl py-5 px-1 bg-[#DD9692] w-[60%] ml-12 rounded-sm" @click="openSidebar(entry)">Day {{index+1}} <img :src="entry.picturePath" class="pt-2 rounded-sm"/></button>
        </div> <!--bg-[#E0A1A1]-->
      </div>
    </div>


  </div>
  <div class="grid place-items-center">
  <div class="absolute "><Sidebar v-if="sidebarVisible"/></div>
  </div>
</div>
</template>

<script setup lang="ts">
import {getCalendarById, storeCalendars, path, aktuellesFenster, sidebarVisible} from "@/assets/Calendars";
import Sidebar from '../components/Sidebar.vue';
import {useRoute} from "vue-router";
import {computed, ref, watch} from 'vue';
const calendarName = ref();
const route = useRoute();
const calendar = ref();

watch(
    () => route.params.id,
    newId => {
      console.log(newId)
    },
    {immediate: true}
)

watch(
    () => route.params.id,
    Id => {
      calendar.value = getCalendarById(Number(Id));
      console.log(calendar.value);
    },
    {immediate: true}
)

console.log(route.params);

function updateName(calendar: any) {
  if(calendarName.value !== null) {
    calendar.name = calendarName.value;
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));
    calendarName.value = null;
  }
}

function openSidebar(entry: any){
 // console.log('angeklicktes fenster', entry.picturePath);
  aktuellesFenster.value = entry;   // aktuellesFenster.value = entry.picturePath;
  console.log('angeklicktes fenster', aktuellesFenster.value);
  sidebarVisible.value = true;  //dadurch wird die Sidebar eingebledet -> gehe zu sidebar.vue

}

const disableSubmitButton = computed(() => {
  if (calendarName.value == null || calendarName.value.length == 0) {
    return true;
  } else {
    return false;
  }
})

document.body.style.background = 'white';

</script>

<style scoped>

</style>