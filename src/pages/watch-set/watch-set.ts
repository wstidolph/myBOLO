import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WatchService } from '../../providers/watch-service';
import {FirebaseListObservable} from "angularfire2";
/*
  Generated class for the WatchSet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-watch-set',
  templateUrl: 'watch-set.html'
})
export class WatchSetPage {
  @Input() selectedWSKey;

  watchSetList$: any;
  watchList$: any;

  constructor(public navCtrl: NavController,
              private watchService: WatchService) {
    this.watchSetList$ = watchService.getAllWatchSets();
    this.watchList$ = watchService.getAllWatchSets();
  }

  moreWatchSetOptions(wskey){
    console.log('asked for moreWatchSetOptions on key ', wskey);
    this.watchService.getWatchesForWatchSet(wskey);
  }

  ionViewDidLoad() {
    console.log('Hello WatchSetPage Page');
  }

}
