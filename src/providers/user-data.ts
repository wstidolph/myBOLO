import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {UserProfile, UserProfileImpl} from "../app/model/user-profile";
import {Schema} from "../app/model/schema";
import {
  AngularFire, FirebaseRef, FirebaseListObservable
} from 'angularfire2';

@Injectable()
export class UserDataService {

  dbRef: firebase.database.Reference;
  userProfileList$: Observable<UserProfile>;

  constructor(public af: AngularFire,
              @Inject(FirebaseRef) dbRef,) {
    this.dbRef = dbRef.database().ref();
    af.database.list(Schema.USERPROFILE)
      .combineLatest()
      // how to retun the Observable of UserProfiles that I want??
      .map(up => new UserProfileImpl(up["authKey"],
        up["email"],
        up["firstName"],
        up["lastName"],
        up["watchSet"],
        up["watchSetCount"]))
      .do(console.log)
      .subscribe();
    /*
     .from(up => {
     {
     authKey : up.authKey,
     email: up.email,
     firstName: up.firstName,
     lastName: up.lastName,
     watchSet: up.watchSet,
     watchSetCount: up.watchSetCount
     }
     }
     );*/
  }

}
