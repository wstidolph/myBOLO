"use strict";
/**
 * Created by wstidolph on 10/1/16.
 */
var firebase_1 = require("firebase");
var fb_conf_dev_1 = require("../config/fb_conf.dev");
var db_data_1 = require("./db-data");
console.log('Initizalizing Firebase database ... ');
firebase_1.initializeApp(fb_conf_dev_1.firebaseConfig);
var watchesRef = firebase_1.database().ref('watch');
var watchSetsRef = firebase_1.database().ref('watchSet');
var noticeablesRef = firebase_1.database().ref('noticeable');
var noticesRef = firebase_1.database().ref('notice');
var userProfileRef = firebase_1.database().ref('userProfile');
var noticeableKeys = [];
db_data_1.dbData.noticables.forEach(function (noticeable) {
    noticeableKeys.push(noticeablesRef.push({
        description: noticeable.description,
        longDescription: noticeable.longDescription
    }).key);
});
console.log('noticeableKeys ', noticeableKeys);
var watchRefKeys = [];
db_data_1.dbData.watches.forEach(function (watch) {
    console.log('adding watch ', watch.url, ' with noticeableKey ', watch.noticeableKey);
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
console.log('watchRefKeys are: ', watchRefKeys);
var watchsetRefKeys = [];
db_data_1.dbData.watchsets.forEach(function (watchset) {
    console.log('adding watchset ', watchset.description);
    watchsetRefKeys.push(watchSetsRef.push({
        owner: watchset.ownerKey,
        description: watchset.description,
        longDescription: watchset.longDescription,
        active: true,
        count: 0,
        watchKeys: watchset.watchKeys.map(function (idx) { return watchRefKeys[idx]; })
    }).key);
});
db_data_1.dbData.userProfile.forEach(function (up) {
    var upkey = userProfileRef.push({
        firstName: up.firstName,
        lastName: up.lastName,
        email: up.email,
    }).key;
    console.log('userProfile key = ', upkey);
    var watchSetsForUserRef = userProfileRef.child(upkey).child('watchSet');
    var watchSetsForUser = up.watchSets.map(function (wsidx) { return watchsetRefKeys[wsidx]; });
    watchSetsForUser.forEach(function (wskey) {
        console.log('adding wskey ', wskey);
        var wskeyAssoc = watchSetsForUserRef.child(wskey);
        wskeyAssoc.set(true);
    });
});
