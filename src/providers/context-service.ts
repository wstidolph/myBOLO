import { Injectable } from '@angular/core';
import {AuthData} from './auth-data';
import {Context} from '../app/model';

@Injectable()
export class ContextService {

  constructor(public authData: AuthData) {
  }

  public getContext(): Context {
    let ctx:Context = {
      uid: this.authData.getUser() ?this.authData.getUser().uid : 'UNKNOWN USER',
      seenWhen: Date.now().toString()
    }; // default to 'now'
    return ctx;
  }
}
