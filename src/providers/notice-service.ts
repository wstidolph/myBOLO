import {Injectable, Inject} from '@angular/core';
import {Schema, Notice, Noticeable} from '../app/model';
import {
  AngularFire,
  FirebaseRef,
  FirebaseListObservable,
  FirebaseObjectObservable, FirebaseDatabase
} from "angularfire2";

import {Context} from "../app/model/context";
import {ContextService} from "./context-service";
import {Watch} from "../app/model/watch";

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

  constructor(private af: AngularFire,
              @Inject(FirebaseRef) dbRef,
              private contextService: ContextService
  ) {
    this.dbRef = dbRef.database().ref();

    this.af.auth.subscribe(auth => {
      console.log('NoticeService sees auth is ', auth);
      if (auth) {
        this.userId = auth.uid;
        // this.myWatchSetsList$ = this.watchSetsForUser(auth.uid);
      }
    });
  }

  addNotice(notice: Notice) {
    console.log('NoticeService addNotice for ', notice);

    // copy over context properties if not already in the notice
    const ctx: Context = this.contextService.getContext();
    console.log('NS ctx', ctx);
    let finalNotice = Object.assign({watchKey: "unknown_watch_key"}, ctx, notice);

    console.log('NS finalNotice', finalNotice);
    const noticeKey =
      this.af.database.list(Schema.NOTICE).push(finalNotice).key;

    console.log('NS noticeKey', noticeKey);

    const wtn = Schema.watchToNotice(finalNotice.watchKey);
    console.log('NS wtn', wtn);
    this.af.database.list(wtn).push(noticeKey);

    const watchKey = finalNotice.watchKey;
    // each watchtonotice has a 'count' of how many
    // notices on that Watch;
    // this needs transactional updating

    const watchCountPath = Schema.watchCount(watchKey);
    console.log('NS watchCountPath', watchCountPath);

    let r = this.dbRef.child(watchCountPath);

    this.dbRef.child(watchCountPath)
      .transaction(function (curCount) {
        if (curCount) {
          return curCount + 1;
        } else {
          return 1;
        }
      });


  }
}
