import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'month-overview',
  templateUrl: 'month-overview.html'
})
export class MonthOverviewComponent {
  @Input() month: number;
  @Input() year: number;
  private daysArr;
  private startDay;

  constructor(private storageService: StorageService) { }

  ngOnChanges() {
    this.daysArr = this.createCalendar();
  }

  createCalendar() {
    let daysBeforeMonth = 0;
    let daysAfterMonth = 0;
    this.startDay = moment().year(this.year).month(this.month).startOf('M');
    let days = Array.apply(null, { length: this.startDay.daysInMonth() + 1 })
      .map(Number.call, Number).slice(1);
    for (let i = 0; i < this.startDay.weekday(); i++) {
      days.unshift(null);
      daysBeforeMonth++;
    }
    for (let i = days.length; i < 42; i++) {
      days.push(null);
      daysAfterMonth++;
    }
    this.fillUnsetDays(this.startDay, days, daysBeforeMonth, daysAfterMonth);
    return days;
  }

  fillUnsetDays(startDay: moment.Moment, days: number[], daysBeforeMonth: number, daysAfterMonth: number) {
    for (let i = 0; i < daysBeforeMonth; i++) {
      days[i] = moment(startDay).subtract(daysBeforeMonth - i, 'days').date();
    }
    for (let i = 1; i <= daysAfterMonth; i++) {
      days[days.length - i] = moment(startDay).add(days.length - daysBeforeMonth - i, 'days').date();
    }
  }
}
