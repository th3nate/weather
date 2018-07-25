import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListRoutingModule} from './list-routing.module';
import {ListComponent} from './list.component';
import {ApiService} from '../core/api/api.service';
import {DataService} from '../core/data/data.service';
import {UserService} from '../core/user/user.service';

@NgModule({
  imports     : [
    CommonModule,
    ListRoutingModule
  ],
  declarations: [ListComponent],
  providers   : [ApiService, DataService, UserService]
})
export class ListModule {
}
