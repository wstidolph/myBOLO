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

console.log('noticeableKeys ', noticeableKeys);

let watchRefKeys = [];

dbData.watches.forEach( watch => {

  console.log('adding watch ', watch.url, ' with noticeableKey ', watch.noticeableKey);

  watchRefKeys.push(watchesRef.push({
    url: watch.url,
    description: watch.description,
    noticeableKey: noticeableKeys[watch.noticeableKey],
    iconUrl: watch.iconUrl,
    watchListIcon: watch.watchListIcon,
    longDescription: watch.longDescription
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

console.log('watchRefKeys are: ', watchRefKeys);

let watchsetRefKeys = [];
dbData.watchsets.forEach(watchset => {
  console.log('adding watchset ', watchset.description);
  watchsetRefKeys.push(watchSetsRef.push({
    owner: watchset.ownerKey,
    description: watchset.description,
    watchKeys: watchset.watchKeys.map(idx => watchRefKeys[idx])
  }).key);
});

dbData.userProfile.forEach(up => {
  userProfileRef.push({
    firstName:  up.firstName,
    lastName: up.lastName,
    email: up.email,
    watchSets: up.watchSets.map(idx => watchsetRefKeys[idx])
  })
});


