export interface Calendar {
    id: number;
    name: string;
    calendarEntries: CalendarEntry[];
}

export interface CalendarEntry {
    picturePath: string;
    opened: boolean;
    date: Date;
}


/*
export interface Calendar {
    id: number;
    name: string;
    day: number;
    date: Date;
    calendarEntries: string;
}
*/

