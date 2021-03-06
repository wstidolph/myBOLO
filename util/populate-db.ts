/**
 * Created by wstidolph on 10/1/16.
 */
import {database, initializeApp} from "firebase";
import {firebaseConfig} from "../config/fb_conf.dev";
import {dbData} from "./db-data";
import {Schema} from '../src/app/model/schema';
import {isNullOrUndefined} from "util";

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);

const watchesRef = database().ref(Schema.WATCH);
const watchSetsRef = database().ref(Schema.WATCHSET);
const watchesPerWatchSetRef = database().ref(Schema.WATCHESPERWATCHSET);
const watchSetToUserRef = database().ref(Schema.WATCHSETTOUSER);
const noticeablesRef = database().ref(Schema.NOTICEABLE);
const noticesRef = database().ref(Schema.NOTICE);
const userProfileRef = database().ref(Schema.USERPROFILE);

let noticeableKeys = [];
dbData.noticables.forEach(noticeable => {
  noticeableKeys.push(noticeablesRef.push({
    description: noticeable.description,
    longDescription: noticeable.longDescription
  }).key);
});

let watchRefKeys = [];

dbData.watches.forEach( watch => {

  watchRefKeys.push(watchesRef.push({
    url: watch.url,
    description: watch.description,
    noticeableKey: noticeableKeys[watch.noticeableKey],
    iconUrl: watch.iconUrl,
    watchListIcon: watch.watchListIcon,
    longDescription: watch.longDescription,
    active: true,
    count: 0
  }).key);

 /*
  let noticeKeysForWatch = [];

  watch.notices.forEach((notice:any) =>  {

    console.log('adding notice ', notice.url);

    noticeKeysForWatch.push(noticesRef.push({
      description: notice.description,
      duration: notice.duration,
      url: notice.url,
      tags: notice.tags,
      imageUrl:notice.imageUrl,
      videoUrl: notice.videoUrl || null,
      longDescription: notice.longDescription,
      watchId: notice.key
    }).key);

  });


  const association = database().ref('noticesForWatch');

  const noticesForWatch = association.child(watchRef.key);

  noticeKeysForWatch.forEach(noticeKey => {
    console.log('adding notice to watch ');

    const noticeWatchAssociation = noticesForWatch.child(noticeKey);

    noticeWatchAssociation.set(true);
  });
*/

});

let watchsetRefKeys = [];
dbData.watchsets.forEach(watchset => {

  // put into the watchKeys
  const wskey = watchSetsRef.push({
    owner: watchset.ownerKey,
    description: watchset.description,
    longDescription: watchset.longDescription,
    active: true,
    count: 0,
    //watchKeyList: watchset.watchKeyList.map(idx => watchRefKeys[idx])
  }).key;

  watchsetRefKeys.push(wskey);

  // record the association with specific watches, as indicated by the
  // watchKeyList in the data file; watchKeyList holds *indices into the watches
  //  array in the JSON
  watchset.watchKeyList.map(idx =>
    watchesPerWatchSetRef.child(wskey) // where to put the watch references
      .child(watchRefKeys[idx])
      .set(0)
  );
});

let upKeys = [];
dbData.userProfile.forEach(up => {
  const upkey = userProfileRef.push({
    authKey: up.authKey,
    firstName:  up.firstName,
    lastName: up.lastName,
    email: up.email,
    watchSetCount: up.watchSetCount
  }).key;
  // update the user's authKey to the new upkey pushkey
  upKeys.push(upkey);

  const watchSetsForUserRef = userProfileRef.child(upkey).child(Schema.WATCHSET);
  const watchSetsForUser = up.watchSets.map(wsidx => watchsetRefKeys[wsidx]);
  watchSetsForUser.forEach(wskey => {
    const wskeyAssoc = watchSetsForUserRef.child(wskey);
    wskeyAssoc.set(true);
    const wsuKeyAssoc = watchSetToUserRef.child(upkey).set(true);
  })
});

let noticeKeys=[];
dbData.notices.forEach(notice => {
  const noticekey = noticesRef.push({
    owner: upKeys[notice.uid],
    watch: watchRefKeys[notice.watch],
    seenWhen: notice.seenWhen
    //watchKeyList: watchset.watchKeyList.map(idx => watchRefKeys[idx])
  }).key;

  noticeKeys.push(noticekey);
  // update the count of the Watch
  watchesRef.child(watchRefKeys[notice.watch]+'/count').transaction(function(curCount){
    if( curCount)  {
      return curCount + 1;
    } else {
      return 1;
    }
  });
});

console.log('DB initialized');


