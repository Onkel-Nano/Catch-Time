import { Injectable, as } from "@angular/core";
import { Storage } from "@ionic/storage";
import moment from "moment";
import 'moment/locale/de'

import { WorkTimeDto } from "../classes/WorkTimeDto";

@Injectable()
export class StorageService {
    private workedTimeDto: WorkTimeDto[] = [];

    constructor(private storage: Storage) { }

    addWorkTime(workTime: WorkTimeDto) {
        let key = this.createStorageKey(moment(workTime.date));

        this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                this.workedTimeDto.push(workTime);
                this.storage.set('workedTime/' + key, this.workedTimeDto);
            }
        )
    }

    getWorkTime(date: Date) {

        let key = this.createStorageKey(date);
        // this.storage.remove('workedTime/' + key)
        return this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                return Object.assign([], this.workedTimeDto);
            }
        );
    }

    changeWorkTime(workTime: WorkTimeDto) {
        let key = this.createStorageKey(moment(workTime.date));

        this.storage.get('workedTime/' + key).then(
            workedTime => {
                console.log('in');
                workedTime.forEach(function (w: WorkTimeDto, index: any) {
                    if (moment(w.date).format('DD') == moment(workTime.date).format('DD')) {
                        workedTime.splice(index, 1);
                        workedTime.push(workTime);
                        console.log('in');
                    }
                });
                this.storage.set('workedTime/' + key, workedTime);
            }
        )

    }

    createStorageKey(date: Date) {
        return date.format('MM-YYYY')
    }
}