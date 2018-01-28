import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { WorkTimeDto } from "../classes/WorkTimeDto";

@Injectable()
export class WorkTimeService{
    private workedTimeDto: WorkTimeDto[] = [];
    
    constructor(private storage: Storage){}
    

    addWorkTime(workTime: WorkTimeDto){
        this.workedTimeDto.push(workTime);
        this.storage.set('workedTime', this.workedTimeDto);
    }
    deleteWorkTime(){
        this.storage.remove('workedTime');
    }
    getWorkTime(){
        return this.storage.get('workedTime').then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                return this.workedTimeDto.slice();
            }
        );
    }
}