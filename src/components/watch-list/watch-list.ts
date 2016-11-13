import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {WatchService} from "../../providers/watch-service";

/*
  Manage and present a list of Watches
*/
@Component({
  selector: 'watch-list',
  templateUrl: 'watch-list.html'
})
export class WatchListComponent {

  @Input()
  set wskey(newWskey:string) {
    this.watchKeyList$ = this.watchService.getWatchKeyList(newWskey);
  };

  public watchKeyList$: any;
  public watchList$: any;

  constructor(private navCtrl: NavController,
              private watchService: WatchService) {

  }


}
