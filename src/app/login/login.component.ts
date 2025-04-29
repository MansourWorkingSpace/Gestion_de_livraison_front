import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  motdepasse: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginClient(this.email, this.motdepasse)
    .subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashbord']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Email ou mot de passe incorrect');
      },
    });
  }
}
