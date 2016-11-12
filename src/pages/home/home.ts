import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { WatchService } from '../../providers/watch-service';

import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
import { WatchPage } from '../watch/watch';
import { WatchAddPage } from '../watch-add/watch-add';
import { WatchSetPage } from '../watch-set/watch-set';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  goToWatch(){
    this.navCtrl.push(WatchPage);
  }

  goToWatchAdd() {
    this.navCtrl.push(WatchAddPage)
  }

  goToWatchSet() {
    this.navCtrl.push(WatchSetPage)
  }
}
