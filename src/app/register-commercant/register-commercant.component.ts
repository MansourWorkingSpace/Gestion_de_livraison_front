import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../components/input-field/input-field.component';
import { SubmitButtonComponent } from '../components/submit-button/submit-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-commercant',
  standalone: true,
  imports: [
    FormsModule,
    InputFieldComponent,
    SubmitButtonComponent,
    CommonModule,
  ],
  templateUrl: './register-commercant.component.html',
  styleUrl: './register-commercant.component.css',
})
export class RegisterCommercantComponent {
  nom: string = '';
  prenom: string = '';
  age: number = 0;
  tlf: string = '';
  email: string = '';
  statut: string = 'commercant';
  motdepasse: string = '';
  photodeprofil: string = '/images/photoProfil.jpg';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const commercantData = {
      nom: this.nom,
      prenom: this.prenom,
      age: Number(this.age),
      tlf: this.tlf,
      email: this.email,
      statut: 'commercant', // Make sure this matches the backend enum (upper case and accents)
      motdepasse: this.motdepasse,
      photodeprofil: this.photodeprofil || '/images/photoProfil.jpg', // Default value for photo if empty
      // Add commercant-specific fields if necessary (like adresse, zip, etc.)
    };

    this.authService.registerCommercant(commercantData).subscribe({
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
      },
    });
  }
}
