import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Watch} from "../app/model/watch";
import {NoticeService} from "./notice-service";
import {WatchService} from "./watch-service";
import {Notice} from "../app/model/notice";

/*
 Generated class for the WatchNotice provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WatchNoticeService {

  constructor(private watchService: WatchService,
              private noticeService: NoticeService) {
    console.log('Hello WatchNotice Provider');
  }

  /**
   * add a here-and-now Notice of the specified watch (if it exists)
   * @param watchKey
   */
  addQuickNotice(watch: Watch) {
    console.log('WNS watch', watch);
    let notice: Notice = {
      watchKey: watch.key,
      location: 'at home',
      description: 'no descriprion'
    }
    console.log('addQuickNotice', notice);
    this.noticeService.addNotice(notice);
  }
}
