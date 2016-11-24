/**
 * Created by wstidolph on 10/2/16.
 */

export interface Watch {
  /*
   * pushkey of noticeable
   */
  noticeableKey: string;
  /**
   * numer of times this Watch has been noticed
   */
  count?: number;
  /**
   * pushkey of this Watch (doesn't exist until after push from back end)
   */
  key?: string;
  title?: string;
  imgUrl?: string; // object ref in storage
  timesToWatch?: [string, string];
}
