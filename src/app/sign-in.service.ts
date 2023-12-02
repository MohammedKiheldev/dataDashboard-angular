import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private backendUrl = 'http://localhost:8080/login'; // Assurez-vous de mettre le bon endpoint

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };
    return this.http.post(this.backendUrl, credentials);
  }
}