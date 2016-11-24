import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ContextService} from './context-service';
import {NoticeService} from './notice-service';
import {Context, Schema, Watch, Notice, WatchSet} from '../app/model';


import {
  AngularFire,
  FirebaseRef,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2";
import {WatchNoticeService} from "./watch-notice";

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

  constructor(private af: AngularFire,
              @Inject(FirebaseRef) dbRef,
              private contextService: ContextService,
              private noticeService: NoticeService) {
    this.dbRef = dbRef.database().ref();

    this.af.auth.subscribe(auth => {
      console.log('watchService sees auth is ', auth);
      if (auth) {
        this.userId = auth.uid;
        this.myWatchSetsList$ = this.watchSetsForUser(auth.uid);

      }

      this.dbRef.child(Schema.WATCH).on('value', watchlist => {
        let watches = [];
        watchlist.forEach(watch => {
          watches.push(this.makeWatchFromJSON(watch.val()))
        })
        console.log('watches: ', watches);
      });

    });
  }

  makeWatchFromJSON(json): Watch {
    return {
      noticeableKey: json.noticeableKey,
      count: json.count,
      title: json.description
    }
  }


  addWatchSet(theWatchSetKey: string): FirebaseListObservable<string[]> {
    let ws =
      this.af.database.list(`${Schema.WATCHSET}/${theWatchSetKey}`);
    ws.subscribe();

    return ws;
  }

  /*
   watch count management
   */
  getCount(watchkey: string) {
    return this.af.database.object(Schema.watchCount(watchkey));
  }


  zeroCount(watchKey: string) {

  }

  addWatch(theWatch: Watch): any {
    console.log("UNIMPLEMENTED WatchService#addWatch");
  }

  getWatch(watchKey: string): FirebaseObjectObservable<Watch> {
    return this.af.database.object(Schema.watch(watchKey));
  }

  getAllWatches(): FirebaseListObservable<Watch[]> {
    return this.af.database.list(Schema.WATCH);
  }

  getAllWatchSets() {
    const refKey = Schema.WATCHSET;
    // console.log('getAllWatchSets', refKey);
    return this.af.database.list(refKey); //{Schema.WATCHSET}
  }

  watchSetsForUser(uid: string) {
    return this.af.database.list(
      Schema.userWatchSets(uid)); // ${Schema.USERPROFILE}/{uid}/${Schema.WATCHSET}
  }

  getLocalWatchStructure() {


  }

  getWatchesForWatchSet(wskey) {
    //console.log('getWatchesForWatchSet', wskey);
    const watchKeysList$ = this.getWatchKeyListPerWatchset(wskey);
    // watchKeyList$ as a FirebaseListObservable, is an array of key/cal pairs
    const rtnVal = watchKeysList$
      .map(wkl => // process each key/val pair
        // use the key to get the observable for the watch data (object)
        wkl.map(wk => this.af.database.object(Schema.watch(wk.$key)))
      )
      // use flatmap just to turn the Observable into the (latest) data
      .flatMap(fbobs => Observable.combineLatest(fbobs));
    //console.log('getWatchesForWatchSet done, rtnVal is ',rtnVal);
    return rtnVal;
  }


  /*  findWatchesByWatchset(wskey: string) {
   console.log('findWatchesByWatchset ', wskey);
   const watchKeyList$ = this.getWatchesForWatchSet(wskey);
   console.log('  watchKeyList$ is ', watchKeyList$);

   const listNode = '`${Schema.WATCHES}/${wskey}`';
   console.log('  listNode is ', listNode);
   return watchKeyList$
   .map(wk => this.af.database.object(wk))
   .flatMap(fbobs => Observable.combineLatest(fbobs));
   }*/

  getWatchKeyListPerWatchset(watchSetKey: string = '*'): FirebaseListObservable<any> {
    const refKey = `${Schema.WATCHESPERWATCHSET}/${watchSetKey}`;
    //console.log('getWatchKeyList for ',refKey);
    return this.af.database.list(refKey);
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
