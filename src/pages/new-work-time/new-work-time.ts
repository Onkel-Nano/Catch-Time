import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkTime } from '../../classes/WorkTime';
import { WorkTimeService } from '../../services/work-time.service';

@IonicPage()
@Component({
  selector: 'page-new-work-time',
  templateUrl: 'new-work-time.html',
})
export class NewWorkTimePage {

  private workTime: WorkTime = new WorkTime();

  constructor(private workTimeService: WorkTimeService, public navCtrl: NavController) {
  }

  addWorkTime() {
    this.workTimeService.addWorkTime(this.workTime);
    this.navCtrl.pop();
  }
}
