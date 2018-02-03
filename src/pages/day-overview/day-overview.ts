import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
import 'moment/locale/de'
import { WorkTimeService } from '../../services/work-time.service';


@IonicPage()
@Component({
  selector: 'page-day-overview',
  templateUrl: 'day-overview.html',
})
export class DayOverviewPage {
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private storageService: StorageService,
    private workTimeService: WorkTimeService
  ) {
    this.workTimeOrigin = this.navParams.data;
    this.workTime = Object.assign({}, this.navParams.data);
  }

  private workTime: WorkTimeDto;
  private workTimeOrigin: WorkTimeDto;
  private invalid = true;
  public customOptions: any = {
    buttons: [{
      text: 'Löschen',
      handler: () => this.workTime.end = null
    }]
  }

  ngDoCheck() {
    this.validateForm();
    this.workTime.dayOverflow = this.workTimeService.validateDayOverflow(
      this.workTime.start,
      this.workTime.end);
  }

  validateForm() {
    if (
      this.workTime.start == this.workTimeOrigin.start &&
      this.workTime.end == this.workTimeOrigin.end &&
      this.workTime.comment == this.workTimeOrigin.comment
    )
      this.invalid = true;
    else
      this.invalid = false;
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeWorkTime() {
    this.storageService.saveWorkTime(this.workTime);
    this.viewCtrl.dismiss(this.workTime);
  }

  deleteWorkTime() {
    this.storageService.deleteWorkTime(this.workTime);
    this.viewCtrl.dismiss(null);
  }

  formatDate(date: any) {
    return moment(date).format('dd, DD. MMMM');
  }
}
