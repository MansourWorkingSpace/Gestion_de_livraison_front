import { Routes } from '@angular/router';
import { RegisterClientComponent } from './register-client/register-client.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterLivreurComponent } from './register-livreur/register-livreur.component';
import { RegisterCommercantComponent } from './register-commercant/register-commercant.component';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CommercantComponent } from './commercant/commercant.component';
import { ClientComponent } from './client/client.component';
import { LivreurComponent } from './livreur/livreur.component';
import { ParametresComponent } from './parametres/parametres.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register-client', component: RegisterClientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashbord', component: DashbordComponent },
    { path: 'register-livreur', component: RegisterLivreurComponent },
    { path: 'register-commercant', component: RegisterCommercantComponent },
    { path: 'qr-scanner', component: QrScannerComponent },
    { path: 'dashbordClient', component: DashboardClientComponent },

    { path: '', component: DashboardAdminComponent },

    { path: 'dashboardadm', component: DashboardAdminComponent },

    { path: 'commercants', component: CommercantComponent },

    { path: 'clients', component: ClientComponent },

    { path: 'livreurs', component: LivreurComponent },

    { path: 'settingsowner', component: ParametresComponent },

    { path: '', component: HomeComponent },
    { path: 'register-client', component: RegisterClientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashbord', component: DashbordComponent },
    { path: 'register-livreur', component: RegisterLivreurComponent },
    { path: 'register-commercant', component: RegisterCommercantComponent },
    { path: 'qr-scanner', component: QrScannerComponent },
    { path: 'dashbordClient', component: DashboardClientComponent },

    { path: '', component: HomeComponent },
    { path: 'register-client', component: RegisterClientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashbord', component: DashbordComponent },
    { path: 'register-livreur', component: RegisterLivreurComponent },
    { path: 'register-commercant', component: RegisterCommercantComponent },
    { path: 'qr-scanner', component: QrScannerComponent },
    { path: 'dashbordClient', component: DashboardClientComponent },
    { path: 'dashbordAdmin', component: DashbordAdminComponent },
    { path: 'clients', component: ClientComponent },
    { path: 'commercants', component: CommercantComponent }
];
