import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private backendUrl = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<any> {
    return this.http.get(this.backendUrl);
  }

  getPersonById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  savePerson(person: any): Observable<any> {
    return this.http.post(this.backendUrl, person);
  }

}
