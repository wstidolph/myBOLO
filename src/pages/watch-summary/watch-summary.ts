import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WatchService } from '../../providers/watch-service';
import { UserWatchService } from '../../providers/user-watch';
import { WatchListComponent } from '../../components/watch-list/watch-list';
import {FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs";


@Component({
  selector: 'page-watch-set',
  templateUrl: 'watch-summary.html'
})
export class WatchSummaryPage {


  watchSetList$: FirebaseListObservable<any>;
  //watchList$: any;

  wsuCount : number;
  constructor(public navCtrl: NavController,
              private userWatchService: UserWatchService,
              private watchService: WatchService) {
    this.watchSetList$ = userWatchService.myWatchSetsList$;
  }

  subscribeToWatchset(wskey){
    console.log('subscribing to key ', wskey);
    this.userWatchService.subscribeToWatchset(wskey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatchSetPage');
  }

}
