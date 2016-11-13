/**
 * Created by wayne on 10/30/2016.
 */
export class Schema {
  public static NOTICEABLES = "noticeable";
  /**
   * maps a key to an object of type Notice.
   * Notice is 'isaw' instance, so there will be many many Notice objects.
   * @type {string}
   */
  public static NOTICES = "notice";
  /**
   * Maps a key to an object of type Watch.
   * @type {string}
   */
  public static WATCHES = "watches";
  /**
   * Maps a key to a list of keys, each of which is key for a Watch;
   * @type {string}
   */
  public static WATCHSET = "watchSet";

  public static WATCHESPERWATCHSET = "watchesPerWatchSet";

  /**
   * Maps a watch key to a list of WatchSet keys.
   * @type {string}
   */
  public static WATCHTOWATCHSETS = "watchToWatchSets";

  /**
   * Maps a Watch instance to an object of type WatchCount.
   * @type {string}
   */
  public static WATCHCOUNTS = "watchCounts";

  public static USERPROFILE = "userProfile";

  public static USERWATCHSETS(uid:string):string {
    return `${Schema.USERPROFILE}/{uid}/${Schema.WATCHSET}`;}

  public static WATCHKEYSLIST = "watchKeysList";

/*  public static WATCHSETWATCHKEYLIST(wskey:string):string {
    return `${Schema.WATCHSET}/${wskey}/${Schema.WATCHKEYSLIST}`;}*/
}
