import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { WorkTime } from "../classes/WorkTime";

@Injectable()
export class WorkTimeService{
    private workedTime: WorkTime[] = [];
    
    constructor(private storage: Storage){}

    addWorkTime(workTime: WorkTime){
        this.workedTime.push(workTime);
        this.storage.set('workedTime', this.workedTime);
    }

    getWorkTime(){
        return this.storage.get('workedTime').then(
            workedTime => {
                console.log(workedTime)
                this.workedTime = workedTime == null ? [] : workedTime;
                return this.workedTime.slice();
            }
        );
    }
}