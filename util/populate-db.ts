/**
 * Created by wstidolph on 10/1/16.
 */
import {database, initializeApp} from "firebase";
import {firebaseConfig} from "../config/fb_conf.dev";
import {dbData} from "./db-data";

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);

const watchesRef = database().ref('watch');
const watchSetsRef = database().ref('watchSet');
const watchesPerWatchSetRef = database().ref('watchesPerWatchSet');
const noticeablesRef = database().ref('noticeable');
const noticesRef = database().ref('notice');
const userProfileRef = database().ref('userProfile');

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

dbData.userProfile.forEach(up => {
  const upkey = userProfileRef.push({
    firstName:  up.firstName,
    lastName: up.lastName,
    email: up.email,
  }).key;

  const watchSetsForUserRef = userProfileRef.child(upkey).child('watchSet');
  const watchSetsForUser = up.watchSets.map(wsidx => watchsetRefKeys[wsidx]);
  watchSetsForUser.forEach(wskey => {
    const wskeyAssoc = watchSetsForUserRef.child(wskey);
    wskeyAssoc.set(true);
  })
});

console.log('DB initialized');


