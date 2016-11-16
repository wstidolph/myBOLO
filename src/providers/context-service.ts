import { Injectable } from '@angular/core';
import {AuthData} from './auth-data';
import {Context} from '../app/model';

@Injectable()
export class ContextService {

  constructor(public authData: AuthData) {
  }

  public getContext(): Context {
    let ctx:Context = new Context(); // default to 'now'
    ctx.uid = this.authData.getUser().uid;
    return ctx;
  }
}
