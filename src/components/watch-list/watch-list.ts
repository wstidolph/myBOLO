import {Component, Input, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {WatchService} from "../../providers/watch-service";

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

  /*@Input()
  set wskey(newWskey:string) {
    this.watchKeyList$ = this.watchService.getWatchKeyList(newWskey);
  };*/
  wskey:string;

  public watchKeyList$: any;
  public watchList$: any;

  constructor(private navCtrl: NavController,
              private watchService: WatchService) {}

  ionViewDidLoad() {
    console.log('WatchListComponent view did load');
  }

  watchWasClicked($event) {

  }
}
