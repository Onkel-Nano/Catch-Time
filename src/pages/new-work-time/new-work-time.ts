import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkTime } from '../../classes/WorkTime';
import { WorkTimeService } from '../../services/work-time.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@IonicPage()
@Component({
  selector: 'page-new-work-time',
  templateUrl: 'new-work-time.html',
})
export class NewWorkTimePage {
  constructor(private workTimeService: WorkTimeService, public navCtrl: NavController) { }

  private workTime: WorkTime = new WorkTime();
  private dayOverflow: boolean = false;
  private workTimeForm = new FormGroup({
    date : new FormControl('', Validators.required),
    start : new FormControl('', Validators.required),
    end : new FormControl('', Validators.required)
  });
  
  validateDayOverflow(){
    console.log(this.workTimeForm.get('start'))
    console.log(this.workTimeForm.get('end'))
  }

  addWorkTime() {
    this.workTimeService.addWorkTime(this.workTime);
    this.navCtrl.pop();
  }
}
