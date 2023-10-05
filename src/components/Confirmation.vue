<template>
  <div class="sidebar-mask">
    <div class="sidebar-wrapper">

      <div class="sidebar-container">
        <div class="py-20 sidebar relative">
          <div class="mx-10 grid place-items-center">
            <div>
              <div class="flex flex-col gap-5 place-items-center">
              <div><p>You are about to delete {{aktuellerKalender.name}}!</p> </div>
                <div class="flex flex-row gap-5">
                <button class="p-2 bg-[#073f78] text-white border rounded-sm shadow active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] disabled:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]" @click="deleteEntry(aktuellerKalender)">OK</button>
                <button class="p-2 border rounded-sm shadow active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)] disabled:shadow-[inset_0_2px_5px_rgba(0,0,0,0.15)]"  @click="close()">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {storeCalendars, getCalendarById, path, updateDoor, aktuellerKalender, confirmationVisible, clearDoor, deleteEntry} from '../assets/Calendars'
import {computed, ref, watch} from 'vue';
import {useRoute} from "vue-router";
import hat from '@/assets/hat.png';
const calendar = ref();
const route = useRoute();


function close(){
  confirmationVisible.value = false;
}


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