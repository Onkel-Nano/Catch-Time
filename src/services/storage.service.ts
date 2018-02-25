import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as moment from "moment";
import 'moment/locale/de'

import { WorkTimeDto } from "../classes/WorkTimeDto";
import { WorkTimeService } from "./work-time.service";

@Injectable()
export class StorageService {
    private workedTimeDto: WorkTimeDto[] = [];

    constructor(
        private storage: Storage,
        private workTimeService: WorkTimeService
    ) { }

    getWorkTime(date: any) {
        let key = this.createStorageKey(date);
        return this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                return this.workedTimeDto.slice();
            }
        );
    }

    saveWorkTime(workTime: WorkTimeDto) {
        let key = this.createStorageKey(workTime.date);
        workTime = this.workTimeService.adaptToStorage(workTime);
        let tmp: WorkTimeDto[] = [];

        this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workTimeService.filterWorkTimeArray(workedTime, workTime.date, tmp);
                tmp.push(workTime);
                this.storage.set('workedTime/' + key, tmp);
            }
        )
    }
    deleteWorkTime(workTime: WorkTimeDto){
        let key = this.createStorageKey(workTime.date);
        let tmp: WorkTimeDto[] = [];
        
        this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workTimeService.filterWorkTimeArray(workedTime, workTime.date, tmp);
                this.storage.set('workedTime/' + key, tmp);
            }
        )
    }

    createStorageKey(date: Date) {
        return moment(date).format('MM-YYYY')
    }
}