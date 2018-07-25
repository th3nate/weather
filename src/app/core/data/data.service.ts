import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  async fetch(url: string, method: string, name: string, data?: object): Promise<any> {
    try {
      return await this.http[method](url, data).toPromise();
    } catch (e) {
      return await e;
    }
  }

}
