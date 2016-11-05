import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import { OpenLocationCode } from 'open-location-code';
declare var OpenLocationCode: any;
/*
  Generated class for the Location provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  olcObj: any;

  constructor(public http: Http) {
    this.olcObj = new OpenLocationCode();
    console.log('Hello Location Provider');
  }

  isValid(olc: string): boolean {
    return this.olcObj.isValid(olc);
  }

  isShort(olc: string): boolean {
    return this.olcObj.isShort(olc);
  }

  isFull(olc: string): boolean {
    return this.olcObj.isFull(olc);
  }

  encode(lat: string, lon: string, len: number = 10) {
    return this.olcObj(lat, lon, len);
  }

  decode(olc: string): CodeArea {
    var co: any = this.olcObj.decode(olc);
    return new CodeArea(
      co.latitudeCenter,
      co.longitudeCenter,
      co.latitudeLo,
      co.longitudeLo,
      co.latitudeHi,
      co.longitudeHi,
      co.codeLength
    );
  }

  /**
   Remove characters from the start of an OLC code.

   This uses a reference location to determine how many initial characters
   can be removed from the OLC code. The number of characters that can be
   removed depends on the distance between the code center and the reference
   location.

   The minimum number of characters that will be removed is four. If more than
   four characters can be removed, the additional characters will be replaced
   with the padding character. At most eight characters will be removed.

   The reference location must be within 50% of the maximum range. This ensures
   that the shortened code will be able to be recovered using slightly different
   locations.

   Args:
   code: A full, valid code to shorten.
   latitude: A latitude, in signed decimal degrees, to use as the reference
   point.
   longitude: A longitude, in signed decimal degrees, to use as the reference
   point.

   Returns:
   Either the original code, if the reference location was not close enough,
   or the .
   */
  shorten(olc:string, lat, lng:number): string {
    return this.olcObj.shorten(olc, lat, lng);
  }
  /**
   Recover the nearest matching code to a specified location.
   Given a valid short Open Location Code this recovers the nearest matching
   full code to the specified location.
   Short codes will have characters prepended so that there are a total of
   eight characters before the separator.
   Args:
    shortCode: A valid short OLC character sequence.
    referenceLatitude: The latitude (in signed decimal degrees) to use to
   find the nearest matching full code.
    referenceLongitude: The longitude (in signed decimal degrees) to use
   to find the nearest matching full code.
   Returns:
   The nearest full Open Location Code to the reference location that matches
   the short code. Note that the returned code may not have the same
   computed characters as the reference location. This is because it returns
   the nearest match, not necessarily the match within the same cell. If the
   passed code was not a valid short code, but was a valid full code, it is
   returned unchanged.

   The number of characters that will be prepended to the short code, where S
   is the supplied short code and R are the computed characters, are:
   SSSS    -> RRRR.RRSSSS
   SSSSS   -> RRRR.RRSSSSS
   SSSSSS  -> RRRR.SSSSSS
   SSSSSSS -> RRRR.SSSSSSS
   */
  recoverNearest(shortCode: string,
                 referenceLatitude,
                 referenceLongitude: number): string {
    return this.olcObj.recoverNearest(
      shortCode,
      referenceLatitude,
      referenceLongitude)
  }
}

export class CodeArea {
  constructor(
    public latCtr: number,
    public lonCtr: number,
    public latLo:number,
    public lngLo: number,
    public latHi: number,
    public lngHi: number,
    public codeLen: number){}
}
