import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model'; // Make sure this import is correct

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8081/produits';  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/all`);
  }

  // Fetch a product by its ID
  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }
}
