import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../components/input-field/input-field.component';
import { SubmitButtonComponent } from '../components/submit-button/submit-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputFieldComponent, SubmitButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  motdepasse: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.motdepasse).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response.statut === 'CLIENT') {
          this.router.navigate(['/dashbordClient']);
        }else if(response.statut === 'LIVREUR') {
          this.router.navigate(['/dashbord']);
        }else if (response.statut === 'ADMIN'){
          this.router.navigate(['/dashbordAdmin']);
        }else{
          this.router.navigate(['/dashbordCommercant'])
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Email ou mot de passe incorrect');
      },
    });
  }
}
