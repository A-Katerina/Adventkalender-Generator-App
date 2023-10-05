// @ts-ignore
import type {Calendar} from '../types';
import {reactive, ref} from "vue";


export const storeCalendars = reactive<{
    calendars: Calendar[]
}>({
    calendars: JSON.parse(localStorage.getItem('Calendars') || '[]')
});



export const locationRight = ref(false);

export function getCalendarById(calendarId: number): Calendar {

    return storeCalendars.calendars.find(entry => entry.id == calendarId);

};

export const path = ref();

export function updateDoor(calendarDoor: any) {
    calendarDoor.picturePath = path.value;
    calendarDoor.opened = false;
    console.log('angeklickte tür', calendarDoor);
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));
    sidebarVisible.value = false;
    path.value = null;

}

export function clearDoor(calendarDoor: any){
    calendarDoor.picturePath = null;
    calendarDoor.opened = false;
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));
    sidebarVisible.value = false;
    path.value = null;
}

export const aktuellesFenster = ref();
export const aktuellerKalender =ref();
export const sidebarVisible = ref(false);
export const confirmationVisible = ref(false);


export function deleteEntry(entry: any){
    console.log(storeCalendars.calendars);
    const x = storeCalendars.calendars.find(eintrag => eintrag.id === entry.id);
    console.log('gefundene entry', x, entry);

    console.log(storeCalendars.calendars.indexOf(entry));
    const index = storeCalendars.calendars.indexOf(entry);

    storeCalendars.calendars.splice(index, 1);    /* storeCalendars.calendars.splice(index, 1);*/
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));
    // alert('Successfully deleted ' + entry.name);
    confirmationVisible.value = false;
}


export function addCalendar(){
    let newId = 0;
  //  const newId = storeCalendars.calendars.length+1;
    if ( storeCalendars.calendars.length > 0) {
        newId = storeCalendars.calendars.length;
    }
    storeCalendars.calendars.push({id: newId,
                                    name: 'New calendar',
                                    calendarEntries: [
                                        { picturePath: null, opened: false, date: 1 },
                                        { picturePath: null, opened: false, date: 2 },
                                        { picturePath: null, opened: false, date: 3 },
                                        { picturePath: null, opened: false, date: 4 },
                                        { picturePath: null, opened: false, date: 5 },
                                        { picturePath: null, opened: false, date: 6 },
                                        { picturePath: null, opened: false, date: 7 },
                                        { picturePath: null, opened: false, date: 8 },
                                        { picturePath: null, opened: false, date: 9 },
                                        { picturePath: null, opened: false, date: 10 },
                                        { picturePath: null, opened: false, date: 11 },
                                        { picturePath: null, opened: false, date: 12 },
                                        { picturePath: null, opened: false, date: 13 },
                                        { picturePath: null, opened: false, date: 14 },
                                        { picturePath: null, opened: false, date: 15 },
                                        { picturePath: null, opened: false, date: 16 },
                                        { picturePath: null, opened: false, date: 17 },
                                        { picturePath: null, opened: false, date: 18 },
                                        { picturePath: null, opened: false, date: 19 },
                                        { picturePath: null, opened: false, date: 20 },
                                        { picturePath: null, opened: false, date: 21 },
                                        { picturePath: null, opened: false, date: 22 },
                                        { picturePath: null, opened: false, date: 23 },
                                        { picturePath: null, opened: false, date: 24 }
                                    ]
    });

    console.table(storeCalendars.calendars);
    localStorage.setItem('Calendars', JSON.stringify(storeCalendars.calendars));

}