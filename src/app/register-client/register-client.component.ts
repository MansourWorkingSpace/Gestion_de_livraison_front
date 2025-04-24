import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {
  nom: string = '';
  prenom: string = '';
  age: number = 0;
  tlf: string = '';
  email: string = '';
  statut: string = 'client'; // Default value
  motdepasse: string = '';
  photodeprofil: string = '/images/photoProfil.jpg'; // Default photo
  adresse: string = '';
  codePostale: string = '';
  zip: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const clientData = {
      nom: this.nom,
      prenom: this.prenom,
      age: this.age,
      tlf: this.tlf,
      email: this.email,
      statut: this.statut,
      motdepasse: this.motdepasse,
      photodeprofil: this.photodeprofil,
      adresse: this.adresse,
      codePostale: this.codePostale,
      zip: this.zip
    };
  
    console.log('Payload:', clientData); // Log the payload to verify its structure and values
  
    this.authService.registerClient(clientData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Inscription réussie ! Redirection vers la page de connexion...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Échec de l’inscription. Veuillez vérifier les informations saisies.';
      }
    });
  }
}
