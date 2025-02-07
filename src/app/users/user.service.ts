import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../core/model';
import { Animal } from '../core/model';

export class AnimalUserFilter {
  user?: any;
  type?: string;
  page = 0;
  itensPerPage = 5;
}

export class AnimalAdoption {
  user?: any;
  id?: string;
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

      const response: any = await this.http.get(`${this.animalUrl}?resumo`, { headers, params })
        .toPromise();
      const activities = response['content'];
      const result = {
        activities,
        total: response['totalElements']
      };
      return result;
  }

  loadAnimal(id: number) {
    this.institutionService.loadAnimalById(id)
      .then(animal => {
        this.animal = animal;
      })
      .catch(error => this.errorHandler.handle(error));
  }


  async solicitarAdocao(adoption: AnimalAdoption): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

      let params = new HttpParams()
              .set('animalId', adoption.id)
              .set('userId', adoption.user.id) //TODO
              .set('status', 'IN_PROGRESS');

    const response = await this.http.put<any>(`${this.adoptionUrl}`,{ headers, params })
      .toPromise();
    const updated = response;
    this.stringToDate(updated);
    return updated;
  }

  async requestAdoption(id: number): Promise<any> {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');
      let user_id = this.route.snapshot.params[`user_id`];
      let params = new HttpParams()
              .set('animalId', id)
              .set('userId', user_id) //TODO
              .set('status', 'IN_PROGRESS');

      const response = await this.http.put<any>(`${this.adoptionUrl}`,{ headers, params })
        .toPromise();
      const updated = response;
      this.stringToDate(updated);
      return updated;
    }

}
