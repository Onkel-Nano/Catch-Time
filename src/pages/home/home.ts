import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewWorkTimePage } from '../new-work-time/new-work-time';
import { WorkTimeService } from '../../services/work-time.service';
import { WorkTimeDto } from '../../classes/WorkTimeDto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  workedTimes: WorkTimeDto[] = [];

  constructor(public navCtrl: NavController, private workTimeService: WorkTimeService) {
  }

  ionViewWillEnter(){
    //only in dev-mode
    this.workTimeService.deleteWorkTime(); 

    this.workTimeService.getWorkTime().then(
      workedTime => {
        this.workedTimes = workedTime;
      }
    );
  }

  loadNewWorkTime(){
    this.navCtrl.push(NewWorkTimePage);
  }
}
