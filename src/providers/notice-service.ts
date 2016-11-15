import {Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Schema, Notice, Noticeable} from '../app/model';
import {
  AngularFire,
  FirebaseRef,
  FirebaseListObservable,
  FirebaseObjectObservable, FirebaseDatabase
} from "angularfire2";

/*
 Data provider for Notices and Noticeables.
 A Notice is the basic inflowing unit of data/alert/event.

 Connects to Firebase. Basic data layout:
 /noticeable/:pushkey/<noticeable fields>
 /notice/:noticepushkey/<notice fields>
 /watchToNotice/:watchkey/:noticepushkey => true
 */
@Injectable()
export class NoticeService {

  dbRef: firebase.database.Reference;
  userId: string;

  constructor(private af: AngularFire, @Inject(FirebaseRef) dbRef) {
    this.dbRef = dbRef.database().ref();

    this.af.auth.subscribe(auth => {
      console.log('auth is ',auth);
      if (auth) {
        this.userId = auth.uid;
        // this.myWatchSetsList$ = this.watchSetsForUser(auth.uid);
      }
    });
  }
  addNotice(notice:Notice){
    // get the reference to the thing being noticed, the watch

    const watchKey = notice.watchKey;
    const wtn = Schema.watchToNotice(notice.watchKey);
    let wtnkey =
      this.af.database.list(wtn).push(notice).key;


    // each watchtonotice has a 'count' of how many
    // notices on that Watch;
    // this needs transactional updating
    this.dbRef.ref(wtnkey).transaction
  }
}
