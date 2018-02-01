import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-day-overview',
  templateUrl: 'day-overview.html',
})
export class DayOverviewPage {
  private workTime: WorkTimeDto;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private storageService: StorageService
  ) {
    this.workTime = Object.assign({}, this.navParams.data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeWorkTime() {
    this.storageService.changeWorkTime(this.workTime);
    this.viewCtrl.dismiss();
  }
}
