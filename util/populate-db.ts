/**
 * Created by wstidolph on 10/1/16.
 */
import {database, initializeApp} from "firebase";
import {firebaseConfig} from "../config/fb_conf.dev";
import {dbData} from "./db-data";

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);

const watchesRef = database().ref('watches');
const noticeablesRef = database().ref('noticeables');
const noticesRef = database().ref('notices');

dbData.noticables.forEach(noticeable => {
  const noticeableRef = noticeablesRef.push({
    taxonomyKey: noticeable.taxonomyKey,
    description: noticeable.description,
    longDescription: noticeable.longDescription
  })
});

dbData.watches.forEach( watch => {

  console.log('adding watch', watch.url);

  const watchRef = watchesRef.push({
    url: watch.url,
    description: watch.description,
    iconUrl: watch.iconUrl,
    watchListIcon: watch.watchListIcon,
    longDescription: watch.longDescription
  });

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


});
