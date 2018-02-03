import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { StorageService } from '../../services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkTimeService } from '../../services/work-time.service';

@IonicPage()
@Component({
  selector: 'page-new-work-time',
  templateUrl: 'new-work-time.html',
})
export class NewWorkTimePage {
  constructor(
    private storageService: StorageService,
    public navCtrl: NavController,
    private workTimeService: WorkTimeService
  ) { }

  private workTimeDto: WorkTimeDto = new WorkTimeDto();
  private workTimeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.maxLength(250))
  });

  ngDoCheck() {
    if (this.workTimeForm.get('end').dirty &&
      this.workTimeForm.get('start').dirty) {
      this.workTimeDto.dayOverflow = this.workTimeService.validateDayOverflow(
        this.workTimeForm.get('start').value,
        this.workTimeForm.get('end').value);
    }
  }

  addWorkTime() {
    this.fillWorkTimeDto();
    this.storageService.saveWorkTime(this.workTimeDto);
    this.navCtrl.pop();
  }

  fillWorkTimeDto() {
    this.workTimeDto.date = this.workTimeForm.get('date').value;
    this.workTimeDto.start = this.workTimeForm.get('start').value;
    this.workTimeDto.end = this.workTimeForm.get('end').value;
    this.workTimeDto.comment = this.workTimeForm.get('comment').value;
  }
}
