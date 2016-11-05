/**
 * Created by wstidolph on 10/2/16.
 */

export  class WatchSet {
  watchKeyList: Array<string> = [];

  get WatchKeys():Array<string> {
    return Array.from(this.watchKeyList); // copy
  }

  ngOnInit(){

  }
}
