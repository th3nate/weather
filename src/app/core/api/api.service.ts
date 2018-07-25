import {Injectable} from '@angular/core';
import {DataService} from '../data/data.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
  
  constructor(private dataService: DataService) {}
  
  async weather(): Promise<any> {
    const url    = environment.apiUrl + environment.apiToken;
    const method = 'post';
    const name   = 'weather';
    try {
      return await this.dataService.fetch(url, method, name);
    } catch (e) {
      return await e;
    }
  }
}
