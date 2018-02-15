import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { WorkTimeDto } from '../../classes/WorkTimeDto';
import { StorageService } from '../../services/storage.service';
import * as moment from 'moment';
import 'moment/locale/de'
import { WorkTimeService } from '../../services/work-time.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { locale } from 'moment';


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
    private workTimeService: WorkTimeService,
    private alertCtrl: AlertController
  ) {
    this.workTime = Object.assign({}, this.navParams.data);
    this.workTimeBackup = this.navParams.data;
  }

  private workTime: WorkTimeDto;
  private workTimeBackup: WorkTimeDto;
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
      this.workTime.start == this.workTimeBackup.start &&
      this.workTime.end == this.workTimeBackup.end &&
      this.workTime.comment == this.workTimeBackup.comment
    )
      this.invalid = true;
    else
      this.invalid = false;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.workTimeBackup);
  }

  changeWorkTime() {
    this.storageService.saveWorkTime(this.workTime);
    this.viewCtrl.dismiss(this.workTime);
  }

  deleteWorkTime() {
    this.storageService.deleteWorkTime(this.workTime);
    this.clearWorkTime();
    this.viewCtrl.dismiss(this.workTimeBackup);
  }

  clearWorkTime() {
    this.workTimeBackup.start = null;
    this.workTimeBackup.end = null;
    this.workTimeBackup.comment = '';
  }

  presentConfirmDeletion() {
    let alert = this.alertCtrl.create({
      title: 'LÖSCHEN',
      message: 'Diese Arbeitszeit unwiderruflich löschen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Löschen',
          handler: () => {
            this.storageService.deleteWorkTime(this.workTime);
            this.clearWorkTime();
            alert.dismiss().then(()=>{
              this.viewCtrl.dismiss(this.workTimeBackup);
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  formatDate(date: any) {
    return moment(date).format('dd, DD. MMMM');
  }
}
