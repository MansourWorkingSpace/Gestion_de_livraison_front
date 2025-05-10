import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../models/commande';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // Remarque : Vous n'avez pas besoin d'importer ToastrModule ici
    // car il est fourni au niveau de l'application via provideToastr()
  ],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  commandes: Commande[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private commandeService: CommandeService,
    private router: Router,
    private toastr: ToastrService // L'injection fonctionnera maintenant correctement
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }
  
  showSuccess(): void {
    this.toastr.success('Ceci est un message de succès !');
  }

  showError(): void {
    this.toastr.error('Une erreur est survenue.');
  }
  
  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: (data: Commande[]) => {
        this.commandes = data;
        this.isLoading = false;
        console.log('Commandes:', this.commandes);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des commandes';
        this.isLoading = false;
        console.error(err);
        this.showError(); // Afficher un toast d'erreur
      },
    });
  }
  
  allerVersQRScanner(): void {
    this.router.navigate(['/qr-scanner']);
  }
  
  accepterCommande(idCmd: number): void {
    this.commandeService.updateStatutCommande(idCmd, 'en_cours').subscribe({
      next: () => {
        this.toastr.success('Commande acceptée avec succès !');
        this.loadCommandes();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
        this.toastr.error('Une erreur est survenue lors de l\'acceptation de la commande.');
      }
    });
  }
}