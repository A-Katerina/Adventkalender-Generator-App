<template>
  <div class="sidebar-mask">
    <div class="sidebar-wrapper">

      <div class="sidebar-container">
 <div class="py-20 sidebar relative">
   <img :src="hat" class="z-[999] w-[200px] absolute bottom-[48.5%] right-[70.5%] transform -scale-x-100"/>
   <div class="mx-10 grid place-items-center">
     <div>
       <button class="z-10 absolute left-[84%] top-[12%] hover:cursor-pointer" @click="close()"><div class="shadow rounded-[100em] w-[30px] h-[30px] grid place-items-center active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]">x</div></button>
     <h1>Fenster {{aktuellesFenster.date}}</h1>
       <div class="flex flew-row gap-2">
     <input placeholder="Paste image address" v-model="path" class="border rounded-sm shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]"/>
     <button class="bg-white border rounded-sm shadow active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] disabled:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]" :disabled="disableSubmitButton" @click="updateDoor(aktuellesFenster)">Submit</button>
     <button class="bg-white border rounded-sm shadow active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] disabled:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]"  @click="clearDoor(aktuellesFenster)" :disabled="disableClearButton(aktuellesFenster)">Clear</button>
       </div>
   </div>
   </div>
 </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {storeCalendars, getCalendarById, path, updateDoor, aktuellesFenster, sidebarVisible, clearDoor} from '../assets/Calendars'
import {computed, ref, watch} from 'vue';
import {useRoute} from "vue-router";
import hat from '@/assets/hat.png';
const calendar = ref();
const route = useRoute();


function close(){
  sidebarVisible.value = false;
  path.value = null;
}

const disableSubmitButton = computed(() => {
  if (path.value == null || !path.value.includes('http')) {
    return true;
  } else {
    return false;
  }
})


function disableClearButton(entry: any) {

  if (entry.picturePath == null) {
    return true;
  } else {
    return false;
  }

}



watch( () => route.params.id,
       newId => {
         calendar.value = getCalendarById(Number(newId));
         console.table('ID', calendar.value);
},
      {immediate: true}
)

</script>

<style scoped>

.sidebar-mask {
  position: fixed;
/*  z-index: 9998;*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.sidebar-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.sidebar-container {
  width: 400px;
  margin: 0px auto;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}




</style>