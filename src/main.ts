import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Ensure routes are defined
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient globally
    provideRouter(routes) // Provide routing if your app uses routes
    , provideAnimations() // Provide animations if your app uses them
    ,provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ]
}).catch(err => console.error(err));