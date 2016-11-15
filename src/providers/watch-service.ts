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
Data provider for Watches and WatchSets.
Connects to Firebase. Basic data layout:
/watch/:id/<watch fields>
/watchSet/:id/<watchSet fields>
/watchesPerWatchSet/:watchsetpushkey/:watchkey => count

temporary home for User-specific watch subscriptions:

/userProfile/:uid/watchSet/:watchsetId => true

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
        this.userId = auth.uid;
        this.myWatchSetsList$ = this.watchSetsForUser(auth.uid);

      }
    });
  }

  addWatchSet(theWatchSetKey:string):FirebaseListObservable<string[]> {
    let ws =
      this.af.database.list(`${Schema.WATCHSET}/${theWatchSetKey}`);
    ws.subscribe();

    return ws;
  }

  /*
  watch count management
   */
  getCount(watchkey:string) {
    return this.af.database.object(Schema.WATCHCOUNT(watchkey));
  }

  incCount(watchkey:string){
    this.dbRef.ref(Schema.WATCHCOUNT(watchkey)).transaction(function(curCount){
      if( curCount)  {
        return curCount + 1;
      } else {
        return 1;
      }
    });
  }

  zeroCount(watchKey:string){

  }
  addWatch(theWatch:Watch): Observable<Watch> {
    const obs: FirebaseObjectObservable<Watch> =
      this.dbRef.object(`${Schema.WATCHES}/${theWatch.key}`);

    return obs;
  }

  findAllWatches(): FirebaseListObservable<Watch[]> {
    return this.af.database.list(Schema.WATCHES);
  }

  getAllWatchSets() {
    return this.af.database.list(
      Schema.WATCHSET); //{Schema.WATCHSET}
  }
  watchSetsForUser(uid:string) {
    return this.af.database.list(
      Schema.USERWATCHSETS(uid)); // ${Schema.USERPROFILE}/{uid}/${Schema.WATCHSET}
  }

  getWatchesForWatchSet(wskey) {
    return this.af.database.list(`${Schema.WATCHESPERWATCHSET}/${wskey}`);
  }

  findWatchSetByKey(wskey:string) {
    return this.af.database.list(`${Schema.WATCHSET}/${wskey}`);
  }

  findWatchesByWatchset(wskey: string) {
    const watchKeyList$ = this.getWatchesForWatchSet(wskey);

    return watchKeyList$
      .map(wk => this.af.database.object(`${Schema.WATCHES}/${wk}`))
      .flatMap(fbobs => Observable.combineLatest(fbobs));
  }

  getWatchKeyList(watchSetKey:string='*'): FirebaseListObservable<any> {
    if(watchSetKey == '*'){
      console.log('getWatchList got *');
      return this.af.database.list(
        Schema.WATCHKEYSLIST);
    } else {
      console.log(
        'getting watch list for ${Schema.WATCHESPERWATCHSET}/${watchSetKey}');
      return this.af.database.list(
        `${Schema.WATCHESPERWATCHSET}/${watchSetKey}`);
    }
  }

  getWatchList(){

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
