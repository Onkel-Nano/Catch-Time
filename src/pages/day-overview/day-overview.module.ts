import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayOverviewPage } from './day-overview';

@NgModule({
  declarations: [
    DayOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DayOverviewPage),
  ],
})
export class DayOverviewPageModule {}
