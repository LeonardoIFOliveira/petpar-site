import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institution } from '../core/model';
import { Animal } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  institutionUrl = 'http://localhost:8080/v1/institution';

  animalUrl = 'http://localhost:8080/v1/animal';

  constructor(private http: HttpClient) { }

  add(institution: Institution): Promise<Institution> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.institutionUrl, Institution.toJson(institution), { headers })
      .toPromise();
  }


  addAnimal(animal: Animal): Promise<Animal> {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

      return this.http.post<any>(this.activitiesUrl,
        Animal.toJson(animal), { headers })
        .toPromise();
  }

  async removeAnimal(id: number): Promise<any> {
    await this.http.delete(`${this.animalUrl}/${id}`)
      .toPromise();
    return null;
  }

  async updateAnimal(animal: Animal): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const response = await this.http.put<Animal>(`${this.animalUrl}/${animal.id}`, Animal.toJson(animal), { headers })
      .toPromise();
    const updated = response;
    this.stringToDate(updated);
    return updated;
  }

  async loadAnimalById(id: number): Promise<any> {
    const response = await this.http.get<Animal>(`${this.animalUrl}/${id}`)
      .toPromise();
    const Animal = response;
    this.stringToDate(Animal);
    return Animal;
  }

  private stringToDate(animal: any): void {
    Animal.date = moment(animal.date, 'DD/MM/YYYY').toDate();
  }

  async searchAnimals(filter: InstitutionAnimalFilter): Promise<any> {
      const headers = new HttpHeaders()
        .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      let params = new HttpParams()
        .set('page', filter.page.toString())
        .set('size', filter.itensPerPage.toString());

      if(filter.user){
        params = params.set('institutionId', filter.institution);
      }

//       if (filter.type) {
//         params = params.set('type', filter.type);
//       }
//
//       if (filter.initialDate) {
//         params = params.set('initialDate', this.datePipe.transform(filter.initialDate, 'yyyy-MM-dd')!);
//       }
//
//       if (filter.finalDate) {
//         params = params.set('finalDate', this.datePipe.transform(filter.finalDate, 'yyyy-MM-dd')!);
//       }

      const response: any = await this.http.get(`${this.animalUrl}/list-institution?resumo`, { headers, params })
        .toPromise();
      const activities = response['content'];
      const result = {
        activities,
        total: response['totalElements']
      };
      return result;
    }



}
