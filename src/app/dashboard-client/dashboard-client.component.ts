import { Component, type OnInit } from "@angular/core";
import { ProduitService } from "../services/produit.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: "app-dashboard-client",
  imports: [CommonModule, FormsModule],
  templateUrl: "./dashboard-client.component.html",
  styleUrls: ["./dashboard-client.component.css"],
})
export class DashboardClientComponent implements OnInit {
  produits: any[] = [];
  cartItems: any[] = [];
  cartTotal = 0;
  showCart = false;

  selectedProduct: any = null;
  selectedQuantity = 1;
  quantityModal: any;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data: any[]) => (this.produits = data),
      error: (err: any) => console.error("Erreur chargement produits:", err),
    });

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.calculateTotal();
    }

    this.quantityModal = new bootstrap.Modal("#quantityModal");
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
      cartItemId: Date.now() + Math.random().toString(36).substring(2)
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
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + item.prix * item.quantity, 0);
  }

  saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
    this.saveCartToLocalStorage();
  }

  checkout() {
    alert(`Commande passée pour ${this.cartTotal} TND`);
    this.cartItems = [];
    this.cartTotal = 0;
    localStorage.removeItem("cart");
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}