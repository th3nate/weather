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
  public gender     = null;
  public genderList = [{name: 'Male', value: 'male'}, {name: 'Female', value: 'female'}];
  
  constructor(private apiService: ApiService, private userService: UserService) { }
  
  async init() {
    if (!this.userService.weather) { // if we do not have the data locally
      const weather = await this.apiService.weather();
      if (weather && weather.error != null || !weather) { // if error returned from API
        this.inProgress = false;
        console.log(weather);
      } else {
        this.inProgress          = false;
        this.userService.gender  = 'male';
        this.gender              = this.userService.gender;
        const parsedData         = this.parseData(weather);
        const sortedData         = this.sort(parsedData);
        this.userService.weather = sortedData;
        this.updateList(sortedData);
      }
    } else { // if data is available locally
      this.inProgress = false;
      this.gender     = this.userService.gender;
      this.first      = this.userService.first;
      this.rest       = this.userService.rest;
    }
  }
  
  parseData(data: any) {
    return map(data.list, (x) => {
      return {name: x.name, temp: x.main.temp, humidity: x.main.humidity};
    });
  }
  
  sort(data: any) {
    
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
    
    return customSort(data, {field: 'temp', number: this.gender === 'female' ? 21 : 20}, {
      field : 'humidity',
      number: 50
    });
    
  }
  
  changeGender(event) {
    this.inProgress         = true;
    this.userService.gender = event.currentTarget.selectedOptions[0].value;
    this.gender             = this.userService.gender;
    const sortedData        = this.sort(Object.assign([], this.userService.weather));
    this.updateList(sortedData);
    this.inProgress = false;
  }
  
  updateList(data) {
    this.first = pullAt(data, [0]);
    this.rest  = data;
    
    this.userService.first = this.first; // save locally
    this.userService.rest  = this.rest; // save locally
  }
  
  async ngOnInit() {
    await this.init();
  }
  
}
