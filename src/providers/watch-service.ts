import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Schema, Watch, WatchSet} from '../app/model';

import {
  AngularFire,
  FirebaseRef,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2";

/*
 Generated class for the Watch provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class WatchService {

  dbRef: any;
  myWatchSetsList$: FirebaseListObservable<any>;
  myWatchList$: FirebaseListObservable<any>;
  myUnifiedWatchList: Array<string> = [];

  userId: string;

  constructor(private af: AngularFire, @Inject(FirebaseRef) dbRef) {
    this.dbRef = dbRef.database().ref();

    this.af.auth.subscribe(auth => {
      console.log('auth is ',auth);
      if (auth) {
        this.myWatchSetsList$ = this.watchSetsForUser(auth.uid);
        this.userId = auth.uid;
      }
    });
  }

  addWatchSet(theWatchSetKey:string):FirebaseListObservable<string[]> {
    let ws =
      this.af.database.list(`${Schema.WATCHSET}/${theWatchSetKey}`);
    ws.subscribe();

    return ws;
  }
  addWatch(theWatch:Watch): Observable<Watch> {
    const obs: FirebaseObjectObservable<Watch> =
      this.dbRef.object(`${Schema.WATCHES}/${theWatch.key}`);

    return obs;
  }

  findAllWatches(): FirebaseListObservable<Watch[]> {
    return this.af.database.list(Schema.WATCHES);
  }

  watchSetsForUser(uid:string) {
    return this.af.database.list(
      Schema.USERWATCHSETS(uid));
  }

  /*makeUnifiedWatchList() {
   let flattened = this.flatten(this.myWatchSetsList$);
   // drop any dupes by making a Set and then back to Array
   this.myUnifiedWatchList = Array.from(new Set(flattened));
   }*/

  /* see http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
   flatten([[1, 2, 3], [4, 5]]); // [1, 2, 3, 4, 5]
   flatten([[[1, [1.1]], 2, 3], [4, 5]]); // [1, 1.1, 2, 3, 4, 5]
   */
  flatten(arr: Array<any>): Array<any> {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  }
}
