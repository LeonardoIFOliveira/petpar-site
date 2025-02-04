import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import moment from 'moment';

import { AuthService } from '../security/auth.service';
import { Activity } from '../core/model';
import { DatePipe } from '@angular/common';

export class ActivityFilter {
  user?: any;
  type?: string;
  initialDate?: Date;
  finalDate?: Date;
  page = 0;
  itensPerPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitiesUrl = 'http://localhost:8080/activities';

  email: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ) { }

  async search(filter: ActivityFilter): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams()
      .set('page', filter.page.toString())
      .set('size', filter.itensPerPage.toString());

    if(filter.user){
      params = params.set('user', filter.user);
    }

    if (filter.type) {
      params = params.set('type', filter.type);
    }

    if (filter.initialDate) {
      params = params.set('initialDate', this.datePipe.transform(filter.initialDate, 'yyyy-MM-dd')!);
    }

    if (filter.finalDate) {
      params = params.set('finalDate', this.datePipe.transform(filter.finalDate, 'yyyy-MM-dd')!);
    }

    const response: any = await this.http.get(`${this.activitiesUrl}?resumo`, { headers, params })
      .toPromise();
    const activities = response['content'];
    const result = {
      activities,
      total: response['totalElements']
    };
    return result;
  }

  add(activity: Activity): Promise<Activity> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.activitiesUrl,
      Activity.toJson(activity), { headers })
      .toPromise();
  }

  async remove(id: number): Promise<any> {
    await this.http.delete(`${this.activitiesUrl}/${id}`)
      .toPromise();
    return null;
  }

  async update(activity: Activity): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const response = await this.http.put<Activity>(`${this.activitiesUrl}/${activity.id}`, Activity.toJson(activity), { headers })
      .toPromise();
    const updated = response;
    this.stringToDate(updated);
    return updated;
  }

  async findById(id: number): Promise<any> {
    const response = await this.http.get<Activity>(`${this.activitiesUrl}/${id}`)
      .toPromise();
    const activity = response;
    this.stringToDate(activity);
    return activity;
  }

  private stringToDate(activity: any): void {
    activity.date = moment(activity.date, 'DD/MM/YYYY').toDate();
  }

}
