import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../components/input-field/input-field.component";
import { SubmitButtonComponent } from "../components/submit-button/submit-button.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [FormsModule, InputFieldComponent, SubmitButtonComponent,CommonModule],
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
    // Convert age to number if needed
    const clientData = {
      nom: this.nom,
      prenom: this.prenom,
      age: Number(this.age), // Convert string to number
      tlf: this.tlf,
      email: this.email,
      statut: 'client',
      motdepasse: this.motdepasse,
      photodeprofil: '/images/photoProfil.jpg',
      adresse: this.adresse,
      codePostale: this.codePostale,
      zip: this.zip
    };
  
    console.log('Payload:', clientData);
  
    this.authService.registerClient(clientData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        if (error.status === 400) {
          this.errorMessage = 'Invalid data. Please check all fields.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
