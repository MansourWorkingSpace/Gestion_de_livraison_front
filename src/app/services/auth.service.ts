import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';  // Update with your API URL

  constructor(private http: HttpClient) { }

  loginClient(email: string, motdepasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginClient`, { email, motdepasse });
  }

  registerClient(clientData: {
    nom: string;
    prenom: string;
    age: number | null;
    tlf: string;
    email: string;
    statut: string;
    motdepasse: string;
    photodeprofil: string;
    adresse: string;
    codePostale: string;
    zip: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerClient`, clientData); // Use the full API URL
  }
  
}
