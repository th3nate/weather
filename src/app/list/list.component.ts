import {Component, OnInit} from '@angular/core';
import {ApiService} from '../core/api/api.service';
import {UserService} from '../core/user/user.service';
import {map, sortBy, forEach, pull, pullAt} from 'lodash';
import {findClosest} from 'find-closest';

@Component({
  selector   : 'app-list',
  templateUrl: './list.component.html',
  styleUrls  : ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  public inProgress = true;
  public weather    = null;
  public first      = null;
  public rest       = null;
  
  constructor(private apiService: ApiService, private userService: UserService) { }
  
  async init() {
    if (!this.userService.weather) { // if we do not have the data locally
      const weather = await this.apiService.weather();
      if (weather && weather.error != null || !weather) { // if error returned from API
        this.inProgress = false;
        console.log(weather);
      } else {
        this.inProgress          = false;
        const parsedData         = this.parseData(weather);
        this.userService.weather = parsedData; // save locally
        
        this.first = pullAt(parsedData, [0]);
        this.rest  = parsedData;
        
        this.userService.first = this.first; // save locally
        this.userService.rest  = this.rest; // save locally
        // console.log(parsedData);
      }
    } else { // if data is available locally
      this.inProgress = false;
      this.first      = this.userService.first;
      this.rest       = this.userService.rest;
      // console.log(this.userService.userData);
    }
  }
  
  parseData(data: any) {
    const array  = [];
    const mapped = map(data.list, (x) => {
      return {name: x.name, temp: x.main.temp, humidity: x.main.humidity};
    });
    
    const customSort = (arr, ...fields) => {
      arr.sort((first, second) => {
        const calc = {one: 0, two: 0};
        
        fields.map(entry => {
          calc.one += Math.abs(first[entry.field] - entry.number);
          calc.two += Math.abs(second[entry.field] - entry.number);
        });
        
        return calc.one - calc.two;
      });
      return arr;
    };
    
    return customSort(mapped, {field: 'temp', number: 21}, {field: 'humidity', number: 50});
  }
  
  async ngOnInit() {
    await this.init();
  }
  
}
