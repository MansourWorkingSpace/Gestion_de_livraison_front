import { Routes } from '@angular/router';
import { RegisterClientComponent } from './register-client/register-client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path : '' , component : HomeComponent},
    {path : 'register-client' , component : RegisterClientComponent},
    {path : 'login' , component : LoginComponent },
];
