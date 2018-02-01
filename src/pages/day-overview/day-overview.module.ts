import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkTimePage } from './work-time';

@NgModule({
  declarations: [
    WorkTimePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkTimePage),
  ],
})
export class DayOverviewPageModule {}
