import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewWorkTimePage } from '../new-work-time/new-work-time';
import { WorkTimeService } from '../../services/work-time.service';
import { WorkTime } from '../../classes/WorkTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workTimes: WorkTime[] = [];

  constructor(public navCtrl: NavController, private workTimeService: WorkTimeService) {
  }

  ionViewWillEnter(){
    //only in dev-mode
    this.workTimeService.deleteWorkTime(); 

    this.workTimeService.getWorkTime().then(
      workedTime => {
        this.workTimes = workedTime;
      }
    );
  }

  loadNewWorkTime(){
    this.navCtrl.push(NewWorkTimePage);
  }
}
