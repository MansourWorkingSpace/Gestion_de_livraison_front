import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../components/input-field/input-field.component";
import { SubmitButtonComponent } from "../components/submit-button/submit-button.component";

@Component({
  selector: 'app-register-livreur',
  standalone: true,
  imports: [FormsModule, InputFieldComponent, SubmitButtonComponent],
  templateUrl: './register-livreur.component.html',
  styleUrl: './register-livreur.component.css'
})
export class RegisterLivreurComponent {
  nom: string = '';
  prenom: string = '';
  age: number = 0;
  tlf: string = '';
  email: string = '';
  statut: string = 'livreur';
  motdepasse: string = '';
  photodeprofil: string = '/images/photoProfil.jpg';
  tarifLivraison: number = 0;
  tarifRetour: number = 0;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const livreurData = {
      nom: this.nom,
      prenom: this.prenom,
      age: Number(this.age),
      tlf: this.tlf,
      email: this.email,
      statut: 'livreur',
      motdepasse: this.motdepasse,
      photodeprofil: this.photodeprofil,
      tarifLivraison: Number(this.tarifLivraison),
      tarifRetour: Number(this.tarifRetour)
    };

    this.authService.registerLivreur(livreurData).subscribe({
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