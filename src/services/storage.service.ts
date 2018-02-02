import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as moment from "moment";
import 'moment/locale/de'

import { WorkTimeDto } from "../classes/WorkTimeDto";

@Injectable()
export class StorageService {
    private workedTimeDto: WorkTimeDto[] = [];

    constructor(private storage: Storage) { }

    addWorkTime(workTime: WorkTimeDto) {
        let key = this.createStorageKey(workTime.date);

        this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                this.workedTimeDto.push(workTime);
                this.storage.set('workedTime/' + key, this.workedTimeDto);
            }
        )
    }

    getWorkTime(date: any) {

        let key = this.createStorageKey(date);
        // this.storage.remove('workedTime/' + key)
        return this.storage.get('workedTime/' + key).then(
            workedTime => {
                this.workedTimeDto = workedTime == null ? [] : workedTime;
                return this.workedTimeDto.slice();
            }
        );
    }

    changeWorkTime(workTime: WorkTimeDto) {
        let key = this.createStorageKey(workTime.date);
        let tmp: WorkTimeDto[] = [];

        this.storage.get('workedTime/' + key).then(
            workedTime => {
                workedTime.forEach(w => {
                    if (moment(w.date).format('DD') == moment(workTime.date).format('DD')) {
                        tmp.push(workTime);
                    } else
                        tmp.push(w);
                });
                this.storage.set('workedTime/' + key, tmp);
            }
        )

    }

    createStorageKey(date: Date) {
        return moment(date).format('MM-YYYY')
    }
}