/**
 * Created by wstidolph on 10/2/16.
 */

export class Watch {
  key:string; // the pushkey for this Watch in Firebase
  count: number;
  noticeableKey: string;
  title: string;
  imgUrl: string; // object ref in storage
  timesToWatch: [string, string];
  active: boolean = true;
}
