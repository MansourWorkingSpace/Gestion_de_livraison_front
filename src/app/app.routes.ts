import { Routes } from '@angular/router';
import { RegisterClientComponent } from './register-client/register-client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterLivreurComponent } from './register-livreur/register-livreur.component';
import { RegisterCommercantComponent } from './register-commercant/register-commercant.component';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';


export const routes: Routes = [
    {path : '' , component : HomeComponent},
    {path : 'register-client' , component : RegisterClientComponent},
    {path : 'login' , component : LoginComponent },
    {path : 'dashbord' , component : DashbordComponent},
    {path : 'register-livreur' , component : RegisterLivreurComponent},
    {path : 'register-commercant' , component : RegisterCommercantComponent},
    {path : 'qr-scanner' , component : QrScannerComponent},
    {path : 'dashbordClient' , component :DashboardClientComponent},
    {path : 'dashbordAdmin' , component : DashbordAdminComponent}
];
