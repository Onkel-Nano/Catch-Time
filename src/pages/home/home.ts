import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import * as moment from 'moment';
import 'moment/locale/de';

import { NewWorkTimePage } from '../new-work-time/new-work-time';
import { StorageService } from '../../services/storage.service';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { DayOverviewPage } from '../day-overview/day-overview';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workedTimes: WorkTimeDto[][] = [];
  private weekDays: any[] = [
    { date: moment().day(1) },
    { date: moment().day(2) },
    { date: moment().day(3) },
    { date: moment().day(4) },
    { date: moment().day(5) },
    { date: moment().day(6) },
    { date: moment().day(7) },
  ]

  constructor(public navCtrl: NavController,
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.setWorkedTimes(this.weekDays[0].date, this.weekDays[6].date);
    
    setTimeout(() => {
      this.setWeekDays();
    }, 100);
  }

  setWorkedTimes(startDay: Date, endDay: Date) {
    this.resetWorkedTimes();
    if (moment(startDay).month() === moment(endDay).month()) {
      this.storageService.getWorkTime(startDay).then(
        workedTime => {
          this.workedTimes.push(workedTime);
        }
      );
    }
    else {
      let mockDay = moment(startDay);
      for (; mockDay.month() <= moment(endDay).month(); mockDay.add(1, 'months')) {
        this.storageService.getWorkTime(mockDay).then(
          workedTime => {
            this.workedTimes.push(workedTime);
          }
        );
      }
    }
  }

  setWeekDays() {
    for (let i = 0; i < this.weekDays.length; i++) {
      this.workedTimes.forEach(month => {
        month.forEach(workTime => {
          if (moment(this.weekDays[i].date).format('DD-MM-YYYY') == moment(workTime.date).format('DD-MM-YYYY')) {
            this.weekDays[i] = workTime;
          }
        });
      });
    }
  }

  resetWorkedTimes() {
    this.workedTimes = [];
  }

  //Navigation
  loadNewWorkTime() {
    this.navCtrl.push(NewWorkTimePage);
  }
  loadDayOverview(weekDay: WorkTimeDto) {
    // let mockWorkTime = JSON.parse(JSON.stringify(weekDay));
    this.modalCtrl.create(DayOverviewPage, weekDay).present();
  }
  //End of Navigation

  formatDay(date: Date) {
    return moment(date).format('dd');
  }
  formatDate(date:Date){
    return moment(date).format('DD. MMM YYYY')
  }
}
