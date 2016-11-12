/**
 * Created by wstidolph on 10/2/16.
 */

export class Watch {
  count: number;
  noticeableKey: string;
  title: string;
  imgUrl: string; // object ref in storage
  timesToWatch: [string, string];
  key:string; // the pushkey for this Watch in Firebase
  active: boolean = true;
}
