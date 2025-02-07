import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../core/model';

export class AnimalUserFilter {
  user?: any;
  type?: string;
  page = 0;
  itensPerPage = 5;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'http://localhost:8080/v1/users';

  animalUrl = 'http://localhost:8080/v1/animal';

  adoptionUrl= 'http://localhost:8080/v1/adoption';

  constructor(private http: HttpClient) { }

  add(user: User): Promise<User> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.usersUrl, User.toJson(user), { headers })
      .toPromise();
  }

  async searchAnimals(filter: AnimalUserFilter): Promise<any> {
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
//
//       if (filter.initialDate) {
//         params = params.set('initialDate', this.datePipe.transform(filter.initialDate, 'yyyy-MM-dd')!);
//       }
//
//       if (filter.finalDate) {
//         params = params.set('finalDate', this.datePipe.transform(filter.finalDate, 'yyyy-MM-dd')!);
//       }

      const response: any = await this.http.get(`${this.animalUrl}?resumo`, { headers, params })
        .toPromise();
      const activities = response['content'];
      const result = {
        activities,
        total: response['totalElements']
      };
      return result;
  }


  async requestAdoption(id: string): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      let params = new HttpParams()
              .set('animalId', id)
              .set('userId', '1') //TODO
              .set('status', 'IN_PROGRESS');

//             if(filter.user){
//               params = params.set('user', filter.user);
//             }

    const response = await this.http.put<any>(`${this.adoptionUrl}`,{ headers, params })
      .toPromise();
    const updated = response;
    this.stringToDate(updated);
    return updated;
  }

}
