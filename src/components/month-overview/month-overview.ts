import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'month-overview',
  templateUrl: 'month-overview.html'
})
export class MonthOverviewComponent {
  @Input() month: number;
  @Input() year: number;
  private daysArr;

  constructor() {}

  ngOnChanges(){
    this.daysArr = this.createCalendar();
  }

  createCalendar(){
    let startDay = moment().year(this.year).month(this.month).startOf('M');
    let days = Array.apply(null, {length: startDay.daysInMonth() + 1})
    .map(Number.call, Number).slice(1);
    for(let i = 0; i < startDay.weekday(); i++){
      days.unshift(null);
    }
    for(let i = days.length; i < 42; i++){
      days.push(null);
    }
    
    return days;
  }
}
