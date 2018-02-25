import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { NewWorkTimePage } from '../pages/new-work-time/new-work-time';
import { DayOverviewPage } from '../pages/day-overview/day-overview';

import { StorageService } from '../services/storage.service';
import { WorkTimeService } from '../services/work-time.service';
import { MonthOverviewComponent } from '../components/month-overview/month-overview';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewWorkTimePage,
    DayOverviewPage,
    MonthOverviewComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewWorkTimePage,
    DayOverviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService,
    WorkTimeService
  ]
})
export class AppModule {}
