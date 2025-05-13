import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Client, ClientService } from '../services/clients.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  isUsersDropdownOpen = false;

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }
  clients: Client[] = [];
  searchQuery: string = '';
  isSearchActive: boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }


  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error loading clients:', err)
    });
  }
  deleteClient(client: Client) {
    if (!client?.id_user) {
      Swal.fire({
        title: 'Erreur',
        text: 'Impossible de supprimer ce client : ID manquant',
        icon: 'error',
        confirmButtonColor: '#F44336'
      });
      return;
    }

    Swal.fire({
      title: 'Confirmer la suppression',
      html: `Êtes-vous sûr de vouloir supprimer <strong>${client.nom} ${client.prenom}</strong> ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#F44336',
      cancelButtonText: 'Annuler',
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-delete-btn',
        cancelButton: 'professional-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id_user!).subscribe({
          next: () => {
            this.clients = this.clients.filter(c => c.id_user !== client.id_user);
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le client a été supprimé avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression :', err);
            Swal.fire({
              title: 'Erreur',
              text: 'Échec de la suppression du client',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  addClient(): void {
    Swal.fire({
      title: 'Ajouter un nouveau client',
      html: `
      <div class="professional-form">
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input1">Prénom</label>
            <input id="swal-input1" class="swal2-input professional-input" placeholder="Prénom">
          </div>
          <div class="form-group">
            <label for="swal-input2">Nom</label>
            <input id="swal-input2" class="swal2-input professional-input" placeholder="Nom">
          </div>
        </div><br>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input3">MDP</label>
            <input id="swal-input3" class="swal2-input professional-input" placeholder="Mot de passe">
          </div>
          <div class="form-group">
            <label for="swal-input4">Email</label>
            <input id="swal-input4" class="swal2-input professional-input" placeholder="Email">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input5">Âge</label>
            <input id="swal-input5" class="swal2-input professional-input" placeholder="Âge">
          </div>
          <div class="form-group">
            <label for="swal-input6">Adresse</label>
            <input id="swal-input6" class="swal2-input professional-input" placeholder="Adresse">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input7">Téléphone</label>
            <input id="swal-input7" class="swal2-input professional-input" placeholder="Téléphone">
          </div>
          <div class="form-group">
            <label for="swal-input8">Code postal</label>
            <input id="swal-input8" class="swal2-input professional-input" placeholder="Code postal">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input9">ZIP</label>
            <input id="swal-input9" class="swal2-input professional-input" placeholder="ZIP">
          </div>
        </div>
      </div>`,
      focusConfirm: false,
      confirmButtonText: 'Ajouter Client',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Quitter',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        return {
          nom: (document.getElementById('swal-input2') as HTMLInputElement).value,
          prenom: (document.getElementById('swal-input1') as HTMLInputElement).value,
          motdepasse: (document.getElementById('swal-input3') as HTMLInputElement).value,
          email: (document.getElementById('swal-input4') as HTMLInputElement).value,
          age: +(document.getElementById('swal-input5') as HTMLInputElement).value,
          adresse: (document.getElementById('swal-input6') as HTMLInputElement).value,
          tlf: (document.getElementById('swal-input7') as HTMLInputElement).value,
          codePostale: (document.getElementById('swal-input8') as HTMLInputElement).value,
          zip: (document.getElementById('swal-input9') as HTMLInputElement).value,
          statut: 'client'
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.clientService.createClient(result.value).subscribe({
          next: (newClient) => {
            this.clients.push(newClient);
            Swal.fire({
              title: 'Succès !',
              text: 'Le client a été ajouté avec succès.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Échec lors de l\'ajout du client.',
              icon: 'error',
              confirmButtonColor: '#F44336'
            });
          }
        });
      }
    });
  }

  editClient(client: Client): void {
    Swal.fire({
      title: 'Modifier le client',
      html: `
      <div class="professional-form">
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input1">Prénom</label>
            <input id="swal-input1" class="swal2-input professional-input" value="${client.prenom}">
          </div>
          <div class="form-group">
            <label for="swal-input2">Nom</label>
            <input id="swal-input2" class="swal2-input professional-input" value="${client.nom}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input3">Mot de passe</label>
            <input id="swal-input3" class="swal2-input professional-input" value="${client.motdepasse}">
          </div>
          <div class="form-group">
            <label for="swal-input4">Email</label>
            <input id="swal-input4" class="swal2-input professional-input" value="${client.email}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input5">Âge</label>
            <input id="swal-input5" class="swal2-input professional-input" value="${client.age}">
          </div>
          <div class="form-group">
            <label for="swal-input6">Adresse</label>
            <input id="swal-input6" class="swal2-input professional-input" value="${client.adresse}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input7">Téléphone</label>
            <input id="swal-input7" class="swal2-input professional-input" value="${client.tlf}">
          </div>
          <div class="form-group">
            <label for="swal-input8">Code postal</label>
            <input id="swal-input8" class="swal2-input professional-input" value="${client.codePostale}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="swal-input9">ZIP</label>
            <input id="swal-input9" class="swal2-input professional-input" value="${client.zip}">
          </div>
        </div>
      </div>`,
      focusConfirm: false,
      confirmButtonText: 'Enregistrer les modifications',
      confirmButtonColor: '#4CAF50',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      customClass: {
        popup: 'professional-popup',
        title: 'professional-title',
        confirmButton: 'professional-confirm-btn',
        cancelButton: 'professional-cancel-btn'
      },
      preConfirm: () => {
        return {
          id_user: client.id_user,
          nom: (document.getElementById('swal-input2') as HTMLInputElement).value,
          prenom: (document.getElementById('swal-input1') as HTMLInputElement).value,
          motdepasse: (document.getElementById('swal-input3') as HTMLInputElement).value,
          email: (document.getElementById('swal-input4') as HTMLInputElement).value,
          age: +(document.getElementById('swal-input5') as HTMLInputElement).value,
          adresse: (document.getElementById('swal-input6') as HTMLInputElement).value,
          tlf: (document.getElementById('swal-input7') as HTMLInputElement).value,
          codePostale: (document.getElementById('swal-input8') as HTMLInputElement).value,
          zip: (document.getElementById('swal-input9') as HTMLInputElement).value,
          statut: 'client'
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.clientService.updateClient(client.id_user!, result.value).subscribe({
          next: (updatedClient) => {
            const index = this.clients.findIndex(c => c.id_user === client.id_user);
            if (index !== -1) {
              this.clients[index] = updatedClient;
            }
            Swal.fire({
              title: 'Mise à jour réussie !',
              text: 'Les informations du client ont été mises à jour.',
              icon: 'success',
              confirmButtonColor: '#4CAF50'
            });
          },
          error: (err) => Swal.fire({
            title: 'Erreur !',
            text: 'Échec de la mise à jour du client.',
            icon: 'error',
            confirmButtonColor: '#F44336'
          })
        });
      }
    });
  }
  searchClient(): void {
    if (!this.searchQuery.trim()) {
      this.loadClients();
      this.isSearchActive = false;
      return;
    }

    this.isSearchActive = true;
    this.clientService.searchClients(this.searchQuery).subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error searching clients:', err)
    });
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchClient();
    }
  }
}