import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NoticeService} from '../../providers/notice-service';
import {Notice, Watch} from '../../app/model';

/*
  Generated class for the NoticeAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notice-add',
  templateUrl: 'notice-add.html'
})
export class NoticeAddPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NoticeAddPage Page');
  }

  addNotice(){

  }
}
