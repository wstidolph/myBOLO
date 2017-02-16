/**
 * Created by wayne on 11/29/2016.
 */
export interface UserProfile {
  authKey: string;
  email: string;
  firstName: string;
  lastName: string;
  watchSet: string[];
  watchSetCount: number;
}

export class UserProfileImpl implements UserProfile {

  constructor(public authKey: string,
              public email: string,
              public firstName: string,
              public lastName: string,
              public watchSet: string[],
              public watchSetCount: number) {
  }

}
