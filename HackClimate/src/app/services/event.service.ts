import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable({providedIn:'root'})
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2023-05-16 09:00", end_date: "2023-05-16 13:00", text: "Posypywanie pola gównem" },
            { id: 2, start_date: "2023-05-18 10:00", end_date: "2023-05-18 14:00", text: "Spuszczanie gówna do rzeki" },
        ]);
    }
}