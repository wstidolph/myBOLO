/**
 * Created by wayne on 10/30/2016.
 */
export class Schema {
  public static NOTICEABLE = "noticeable";
  /**
   * @type {string}
   */
  public static NOTICE = "/notice";
  /**
   * @type {string}
   */
  public static WATCH = "/watch";
  /**
   * Maps a key to a list of keys, each of which is key for a Watch;
   * @type {string}
   */

  public static watch(watchKey:string):string{
    return `${Schema.WATCH}/${watchKey}`;
  }
  public static WATCHSET = "/watchSet";

  public static watchCount(watchKey:string):string {
    return Schema.watch(watchKey)+ '/count';
  }

  public static WATCHESPERWATCHSET = "/watchesPerWatchSet";

  public static WATCHTONOTICE = "/watchToNotice";
  public static watchToNotice(wid:string):string {
    return `${Schema.WATCHTONOTICE}/${wid}`;
  }
  /**
   * Maps a watch key to a list of WatchSet keys.
   * @type {string}
   */
  //public static WATCHTOWATCHSETS = "watchToWatchSets";

  /**
   * Maps a Watch instance to an object of type WatchCount.
   * @type {string}
   */
  public static WATCHCOUNTS = "watchCounts";

  public static UID = "uid"
  public static USERPROFILE = "/userProfile";

  public static userWatchSets(uid:string):string {
    return `${Schema.USERPROFILE}/${Schema.UID}${Schema.WATCHSET}`;}

 // public static WATCHKEYSLIST = "watchKeysList";

/*  public static WATCHSETWATCHKEYLIST(wskey:string):string {
    return `${Schema.WATCHSET}/${wskey}/${Schema.WATCHKEYSLIST}`;}*/
}
