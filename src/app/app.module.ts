import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { WatchPage } from '../pages/watch/watch';
import { WatchAddPage } from '../pages/watch-add/watch-add';
import { WatchSummaryPage } from '../pages/watch-summary/watch-summary';

import { AuthData } from '../providers/auth-data';
import { ContextService } from '../providers/context-service';
import { NoticeService } from '../providers/notice-service';
import { UserWatchService } from '../providers/user-watch';
import { WatchService } from '../providers/watch-service';
import { WatchNoticeService } from '../providers/watch-notice';

import {  WatchListComponent } from '../components/watch-list/watch-list';
// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {firebaseConfig} from '../../config/fb_conf.dev';
import {UserDataService} from "../providers/user-data";

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    WatchPage,
    WatchAddPage,
    WatchSummaryPage,
    WatchListComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    WatchPage,
    WatchAddPage,
    WatchSummaryPage,
  ],
  providers: [
    AuthData,
    ContextService,
    NoticeService,
    UserDataService,
    UserWatchService,
    WatchService,
    WatchNoticeService
  ]
})
export class AppModule {}

