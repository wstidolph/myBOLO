/**
 * Created by wstidolph on 10/2/16.
 */

export  interface WatchSet {

    ownerKey: string;
    description:string;
    watchKeyList:string[];
    longDescription?:string;
    startTime?: string;
    endTime?: string;
    olc_in?:string[]; // union of watches
    olc_ex?:string[];  // union of watches)
}
