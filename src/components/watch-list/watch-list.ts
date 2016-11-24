import {Component, Input, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WatchService} from "../../providers/watch-service";
import {WatchNoticeService} from '../../providers/watch-notice';
import {Observable} from "rxjs";
import {Watch} from "../../app/model/watch";
import {Notice} from "../../app/model/notice";

/*
  Manage and present a list of Watches
*/
@Component({
  selector: 'watch-list',
  templateUrl: 'watch-list.html',
  inputs: ['wskey']
})
export class WatchListComponent implements OnInit {
  ngOnInit(): void {
    console.log('WatchListComponent wskey is ', this.wskey);
    this.watchKeyList$ =
      this.watchService.getWatchKeyListPerWatchset(this.wskey);
    this.watchList$ =
      this.watchService.getWatchesForWatchSet(this.wskey);
    console.log('WatchListComponent ngOnInit done');
  }

  /**
   * WatchSet key (each WatchListComponent watches one WatchSet)
   */
  wskey:string;

  public watchKeyList$: Observable<string>;
  public watchList$: Observable<Watch>;

  constructor(private navCtrl: NavController,
              private watchService: WatchService,
              private watchNoticeService: WatchNoticeService) {}

  ionViewDidLoad() {
    console.log('WatchListComponent view did load');
  }

  watchWasClicked($event) {
    let watch :Watch = {
      noticeableKey: $event.noticeableKey,
      key:$event.$key

    }
    console.log('watchWasClicked', $event);
    this.watchNoticeService.addQuickNotice(watch);
  }
}
