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
  private collapseIn: boolean = false;
  private weekDays: any[] = [
    { date: moment().day(1) },
    { date: moment().day(2) },
    { date: moment().day(3) },
    { date: moment().day(4) },
    { date: moment().day(5) },
    { date: moment().day(6) },
    { date: moment().day(7) },
  ]
  private months: any[] = [
    { name: 'Januar', number: 0 },
    { name: 'Februar', number: 1 },
    { name: 'März', number: 2 },
    { name: 'April', number: 3 },
    { name: 'Mai', number: 4 },
    { name: 'Juni', number: 5 },
    { name: 'Juli', number: 6 },
    { name: 'August', number: 7 },
    { name: 'September', number: 8 },
    { name: 'Oktober', number: 9 },
    { name: 'November', number: 10 },
    { name: 'Dezember', number: 11 },
  ];
  private selectedMonth: number;
  private isMonthOverview: boolean = false;

  constructor(public navCtrl: NavController,
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.initWorkTime();
  }

  showMonth(month: any) {
    this.selectedMonth = month;
    this.isMonthOverview = true;
    this.toggleCollapse();
  }

  toggleCollapse() {
    this.collapseIn = !this.collapseIn;
  }

  isCollapse() {
    return this.collapseIn;
  }

  private initWorkTime() {
    this.setWorkedTimes(this.weekDays[0].date, this.weekDays[6].date).then(
      () => setTimeout(() => {
        this.setWeekDays();
      }, 100));
  }

  async setWorkedTimes(startDay: Date, endDay: Date) {
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
    let dayModal = this.modalCtrl.create(DayOverviewPage, weekDay);
    dayModal.onDidDismiss(
      data => setTimeout(() => {
        weekDay = data;
        this.initWorkTime();
      }, 0)
    );
    dayModal.present();
  }
  //End of Navigation

  formatDay(date: Date) {
    return moment(date).format('dd');
  }
  formatDate(date: Date) {
    return moment(date).format('DD. MMM YYYY')
  }
}
