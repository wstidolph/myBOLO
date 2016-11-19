import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { WatchService } from '../../providers/watch-service';

/*
Show active Watches in a list; allow for quick-increment or click-through to detail-isaw
*/
@Component({
  selector: 'page-watch',
  templateUrl: 'watch.html'
})
export class WatchPage {

  public watchList$: any;

  constructor(private navCtrl: NavController, private watchService: WatchService) {
    this.watchList$ = watchService.getAllWatches();
  }

  ionViewDidLoad() {
    console.log('Hello WatchPage Page');
  }


  goToHome(){
    this.navCtrl.push(HomePage);
  }

  moreWatchOptions(watchKey: string){
    console.log('clicked on watch key: ${watchkey}');
  }

  quickNotice(watchKey: string){
    this.watchService.addQuickNotice(watchKey);
  }
}
