import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';

import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
    imports: [CommonModule], 
  standalone: true,
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data: Produit[]) => this.produits = data,
      error: (err: any) => console.error('Error loading products:', err)
    });
  }



  ajouterAuxFavoris(produit: any) {
  console.log('Produit ajouté aux favoris :', produit);
  // Tu peux ici appeler un service ou changer une propriété
}

ajouterAuPanier(produit: any) {
  console.log('Produit ajouté au panier :', produit);
  // Ex: this.panierService.ajouter(produit);
}

voirDetails(idProd: number) {
  console.log('Voir détails du produit ID :', idProd);
  // Ex: this.router.navigate(['/produit', idProd]);
}

modifierProduit(produit: any) {
  console.log('Modifier produit :', produit);
  // Rediriger vers un formulaire de modification si besoin
}

supprimerProduit(idProd: number) {
  console.log('Supprimer produit ID :', idProd);
  // Appel à ton service de suppression ici
}

}
