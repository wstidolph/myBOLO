/**
 * Created by wstidolph on 10/2/16.
 */

export  class WatchSet {

  constructor(
    public ownerKey: string,
    public description:string,
    public longDescription:string,
    public watchKeyList:string[],
    public startTime: string,
    public endTime: string,
    public olc_in:string[], // union of watches
    public olc_ex:string[]  // union of watches){
  ){
    this.watchKeyList=[];
  }

  get WatchKeys():Array<string> {
    return this.watchKeyList; // copy
  }

  ngOnInit(){

  }
}
