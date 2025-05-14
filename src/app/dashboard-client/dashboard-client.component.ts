import { Component, type OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService } from '../services/commande.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-dashboard-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css'],
})
export class DashboardClientComponent implements OnInit {
  produits: any[] = [];
  cartItems: any[] = [];
  cartTotal = 0;
  showCart = false;

  selectedProduct: any = null;
  selectedQuantity = 1;
  quantityModal: any;

  constructor(
    private produitService: ProduitService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data: any[]) => (this.produits = data),
      error: (err: any) => console.error('Erreur chargement produits:', err),
    });

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.calculateTotal();
    }

    this.quantityModal = new bootstrap.Modal('#quantityModal');
  }

  openQuantityModal(product: any) {
    this.selectedProduct = JSON.parse(JSON.stringify(product));
    this.selectedQuantity = 1;
    this.quantityModal.show();
  }

  confirmAddToCart() {
    if (!this.selectedProduct || this.selectedQuantity <= 0) return;

    // Always add as a new cart item (don't merge quantities)
    const newCartItem = {
      id_prod: this.selectedProduct.id_prod,
      nomProd: this.selectedProduct.nomProd,
      prix: this.selectedProduct.prix,
      quantity: this.selectedQuantity,
      // Add unique identifier
      cartItemId: Date.now() + Math.random().toString(36).substring(2),
    };

    this.cartItems.push(newCartItem);
    this.calculateTotal();
    this.saveCartToLocalStorage();

    // Reset selection
    this.selectedProduct = null;
    this.selectedQuantity = 1;
    this.showCart = true;
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce(
      (sum, item) => sum + item.prix * item.quantity,
      0
    );
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
    this.saveCartToLocalStorage();
  }
/*
  checkout() {
    const client = { id: 1 }; // Replace with actual logged-in client
    const now = new Date();

    for (const item of this.cartItems) {
      const commande = {
        client: client,
        adresse: 'Adresse ici',
        codePostale: '1234',
        statut: 'EN_ATTENTE',
        dateCmd: now,
        estpayee: false,
        produit: { idProd: item.id_prod },
        quantity: item.quantity,
        prixht: item.prix * item.quantity,
        prixUnitaire: item.prix,
        prixTotale: item.prix * item.quantity,
        tlf: '00000000',
        qrCode: null,
      };

      this.commandeService.addCommande(commande).subscribe({
        next: (res) => console.log('Commande ajoutée', res),
        error: (err) => console.error('Erreur ajout commande', err),
      });
    }

    alert(`Commande passée pour ${this.cartTotal} TND`);
    this.cartItems = [];
    this.cartTotal = 0;
    localStorage.removeItem('cart');
  }
    */
   checkout() {
              this.router.navigate(['/dashbord']); // Use Router to navigate

    }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
