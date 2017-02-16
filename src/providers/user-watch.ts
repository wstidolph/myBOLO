import {Injectable, Inject} from '@angular/core';
import {WatchService} from './watch-service';

import {Context, Schema, Watch, Notice, WatchSet} from '../app/model';

import {
  AngularFire,
  FirebaseRef,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2";
import {Observable, Observer} from "rxjs";

@Injectable()
export class UserWatchService {

  private userId: string;

  dbRef: firebase.database.Reference;
  myWatchSetsList$: FirebaseListObservable<any>;
  myWatchList$: FirebaseListObservable<any>;

  constructor(private af: AngularFire,
              @Inject(FirebaseRef) dbRef,
              private watchService: WatchService) {

    this.dbRef = dbRef.database().ref();

    this.af.auth.subscribe(auth => {
      console.log('UserWatchService sees auth is ', auth);
      if (auth) {
        this.userId = auth.uid;
        //this.myWatchSetsList$ = this.watchSetsForUser();
      }
    });
    this.myWatchSetsList$ = this.af.database.list(
      //Schema.userWatchSets(this.userId)
      Schema.WATCHSET
    );

  }

  /**
   * Add the WatchSet key to the userProfile's watchSet list
   * @param wskey
   */
  subscribeToWatchset(wskey: string) {

  }

  watchSetsForUser(): FirebaseListObservable<any[]> {
    return this.myWatchSetsList$;
  }
}
