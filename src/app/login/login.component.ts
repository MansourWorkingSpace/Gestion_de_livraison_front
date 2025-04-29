import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from "../components/input-field/input-field.component";
import { SubmitButtonComponent } from "../components/submit-button/submit-button.component";

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
