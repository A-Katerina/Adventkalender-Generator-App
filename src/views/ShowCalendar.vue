<template>
<div class="wrapper relative z-20">
  <div class="name flex place-content-center mt-6"><h1 class="name p-1 rounded-sm text-white">{{ calendar.name }}</h1></div>

  <div class="mx-10 mt-6 pb-10">
    <div class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1  gap-8 w-[100%] h-[100%]"> <!--gap-4-->
      <div v-for="(entry, index) of calendar.calendarEntries" class="w-full h-full relative grid place-items-center">
        <button class="lg:text-2xl text-[px] lg:w-[60%] w-full bg-[#DD9692] lg:py-10 md:py-10 py-5 rounded-sm" @click="open(entry)"
                v-if="entry.opened === false">Day {{ index + 1 }}
        </button>
        <div class="" v-if="entry.opened">
          <div class="image"><img :src="entry.picturePath" v-if="entry.opened" class="z-0 object-cover max-h-full w-full"/>
            <div
                class="bg-[#F3DFBF] px-[5%] py-[1%] grid place-items-center z-10 absolute bottom-0 left-0 shadow-[2px_-2px_4px_1px_rgba(0,0,0,0.3)] xl:text-sm text-[8px]"
                v-if="entry.opened">{{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {getCalendarById, storeCalendars} from "@/assets/Calendars";
import {useRoute} from "vue-router";

const geklickt = ref();
const route = useRoute();
const calendar = ref();
const day = new Date;

console.log(geklickt.value);

function open(entry: any) {
  if (entry.picturePath != null && day.getDate() >= entry.date) {
    entry.opened = true;
    console.log(entry);
    console.log(calendar.value.calendarEntries);
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));
  }
}


console.log(route.path.slice(route.path.length - 1, route.path.length))


function istbildDrinnen() {
  if (!localStorage.getItem('geklickt')) {
    return true;
  } else {
    return false;
  }
}


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
      console.log(calendar.value.calendarEntries[0]);
    },
    {immediate: true}
)


document.body.style.background = 'white';

</script>

<style scoped>
.image {
  @apply h-full max-w-full relative;
}

.image::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, .6);
  -moz-box-shadow: inset 0 0 8px rgba(0, 0, 0, .6);
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, .6);
}

.name {
  font-family: "Lucida Calligraphy";
  font-weight: bolder;
}

</style>
