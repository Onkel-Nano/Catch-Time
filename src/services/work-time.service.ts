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
    deleteWorkTime(){
        this.storage.remove('workedTime');
    }
    getWorkTime(){
        return this.storage.get('workedTime').then(
            workedTime => {
                this.workedTime = workedTime == null ? [] : workedTime;
                return this.workedTime.slice();
            }
        );
    }
}