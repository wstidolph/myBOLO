/**
 * Created by wstidolph on 10/2/16.
 */

export class Watch {

  /**
   * pushkey of this Watch (doesn't exist until after push from back end)
   */
  public key:string;

  constructor(
    /*
     * pushkey of noticeable
     */
    public noticeableKey: string,
    /**
     * numer of times this Watch has been noticed
     */
    public count: number = 0,
    public title?: string,
    public imgUrl?: string, // object ref in storage
    public timesToWatch?: [string, string],
  ){}
}
