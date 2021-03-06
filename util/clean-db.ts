/**
 * Created by wstidolph on 10/1/16.
 */
import {database, initializeApp} from "firebase";
import {firebaseConfig} from "../config/fb_conf.dev";
import {dbData} from "./db-data";

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);
database().ref().remove()
  .then(_ => console.log('dropped all'))
  .then(_ => process.exit());

/*
const watchesRef = database().ref('watch');
const watchSetsRef = database().ref('watchSet');
const watchesPerWatchSetRef = database().ref('watchesPerWatchSet');
const noticeablesRef = database().ref('noticeable');
const noticesRef = database().ref('notice');
const userProfileRef = database().ref('userProfile');

watchesRef.remove()
  .then(_ => watchSetsRef.remove())
  .then(_ => watchesPerWatchSetRef.remove())
  .then(_ => noticeablesRef.remove())
  .then(_ => noticesRef.remove())
  .then(_ => userProfileRef.remove())
  .then(_ => console.log('done cleaning'))
  .then(_ => process.exit()
  );
  */
