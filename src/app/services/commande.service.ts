import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root' // Le service est disponible globalement
})
export class CommandeService {
  private baseUrl = 'http://localhost:1586/commandes'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les commandes
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/all`);
  }

  // Mettre à jour le statut d'une commande
  updateStatutCommande(id: number, statut: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/statut/${statut}`, {});
  }

  // Scanner un code QR pour mettre à jour une commande
  updateCommandeFromQrCode(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/payer`, {});
  }
}