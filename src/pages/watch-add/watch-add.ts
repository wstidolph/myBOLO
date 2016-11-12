import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WatchService } from '../../providers/watch-service';

/*
  Generated class for the WatchAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-watch-add',
  templateUrl: 'watch-add.html'
})
export class WatchAddPage {

  constructor(public navCtrl: NavController, private watchService: WatchService) {}

  ionViewDidLoad() {
    console.log('Hello WatchAddPage Page');
  }

}
