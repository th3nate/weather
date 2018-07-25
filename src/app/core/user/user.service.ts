import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  private data = <any>{};
  
  constructor() { }
  
  get userData() {
    return JSON.parse(JSON.stringify(this.data));
  }
  
  get weather() {
    return this.data['weather'];
  }
  
  set weather(val) {
    this.data['weather'] = val;
  }
  
  get first() {
    return this.data['first'];
  }
  
  set first(val) {
    this.data['first'] = val;
  }
  
  get rest() {
    return this.data['rest'];
  }
  
  set rest(val) {
    this.data['rest'] = val;
  }
  
}
