import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { StorageService } from '../../services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-work-time',
  templateUrl: 'new-work-time.html',
})
export class NewWorkTimePage {
  constructor(private storageService: StorageService, public navCtrl: NavController) { }

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

  validateDayOverflow() {
    let start = this.workTimeForm.get('start');
    let end = this.workTimeForm.get('end');
    if (start.value >= end.value && end.dirty) {
      this.workTimeDto.dayOverflow = true;
    } else
      this.workTimeDto.dayOverflow = false;
  }

  addWorkTime() {
    this.fillWorkTimeDto();
    this.storageService.addWorkTime(this.workTimeDto);
    this.navCtrl.pop();
  }

  fillWorkTimeDto(){
    this.workTimeDto.date = this.workTimeForm.get('date').value;
    this.workTimeDto.start = this.workTimeForm.get('start').value;
    this.workTimeDto.end = this.workTimeForm.get('end').value;
    this.workTimeDto.comment = this.workTimeForm.get('comment').value;
  }
}
