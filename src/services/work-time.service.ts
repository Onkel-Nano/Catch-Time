import { Injectable } from "@angular/core";
import * as moment from "moment";
import 'moment/locale/de'

import { WorkTimeDto } from "../classes/WorkTimeDto";

@Injectable()
export class WorkTimeService {
    constructor() { }

    validateDayOverflow(start: any, end: any) {
        if (start && end) {
            if (start >= end) {
                return true;
            } else
                return false;
        }
    }

    adaptToStorage(workTime:WorkTimeDto){
        let formattedWorkTime: WorkTimeDto = new WorkTimeDto();
        
        formattedWorkTime.date = new Date(workTime.date);
        formattedWorkTime.start = workTime.start;
        formattedWorkTime.end = workTime.end;
        formattedWorkTime.comment = workTime.comment;
        formattedWorkTime.dayOverflow = workTime.dayOverflow;
        return formattedWorkTime;
    }
    
    filterWorkTimeArray(workedTime: WorkTimeDto[], filter: Date, target: WorkTimeDto[]){
        if(workedTime){
            workedTime.forEach(w => {
                if (moment(w.date).format('DD') != moment(filter).format('DD')) {
                    target.push(w);
                } 
            });
        }
    }
}
