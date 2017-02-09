
import { Injectable } from '@angular/core';


@Injectable()

export class DateService {  
    time: Date;

    constructor() {
        this.time = new Date();  
        setInterval(() => this.time = new Date(), 1000);
    }

    getTime() {
        return this.time;
    }
}