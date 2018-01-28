import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWorkTimePage } from './new-work-time';

@NgModule({
  declarations: [
    NewWorkTimePage,
  ],
  imports: [
    IonicPageModule.forChild(NewWorkTimePage),
  ],
})
export class NewWorkTimePageModule {}
