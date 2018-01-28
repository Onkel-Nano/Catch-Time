import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { WorkTimeService } from '../../services/work-time.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-work-time',
  templateUrl: 'new-work-time.html',
})
export class NewWorkTimePage {
  constructor(private workTimeService: WorkTimeService, public navCtrl: NavController) { }

  private workTimeDto: WorkTimeDto = new WorkTimeDto();
  private workTimeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.maxLength(250))
  });

  ngDoCheck() {
    this.validateDayOverflow();
  }

  toggleLabelColor(id : string){
    
  }

  validateDayOverflow() {
    let start = this.workTimeForm.get('start');
    let end = this.workTimeForm.get('end');
    if (start.value >= end.value && end.dirty) {
      this.workTimeDto.dayOverflow = true;
    } else
      this.workTimeDto.dayOverflow = false;
  }

  addWorkTime() {
    this.workTimeService.addWorkTime(this.workTimeDto);
    this.navCtrl.pop();
  }
}
