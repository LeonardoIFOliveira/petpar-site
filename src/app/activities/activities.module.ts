import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';

import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    ActivitiesListComponent,
    ActivityRegisterComponent
  ]
})
export class ActivitiesModule { }
