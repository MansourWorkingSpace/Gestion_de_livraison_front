import { Component, NgModule } from '@angular/core';
import { RoleCardComponent } from '../components/role-card/role-card.component';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../components/feature-card/feature-card.component';
import { TestimonialCarouselComponent } from '../components/testimonial-carousel/testimonial-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoleCardComponent, CommonModule,FeatureCardComponent,TestimonialCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  roles = [
    {
      title: 'Client',
      description:
        'Passez des commandes, suivez vos livraisons, donnez votre avis, et plus encore.',
      link: '/register-client',
    },
    {
      title: 'Commerçant',
      description:
        'Gérez vos ventes, créez des factures, et suivez les achats de vos clients.',
      link: '/register-commercant',
    },
    {
      title: 'Livreur',
      description:
        'Visualisez les commandes à livrer, confirmez avec QR Code, définissez vos tarifs.',
      link: '/register-livreur',
    },
  ];
  features = [
    {
      icon: 'bi bi-bag-check',
      title: 'Commandes Simplifiées',
      description: 'Passez des commandes en quelques clics.',
    },
    {
      icon: 'bi bi-speedometer',
      title: 'Livraisons Rapides',
      description: 'Recevez vos colis rapidement et en sécurité.',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Sécurité & Suivi',
      description: 'Suivi en temps réel et sécurité des paiements.',
    },
    {
      icon: 'bi bi-people',
      title: 'Support Multi-Utilisateurs',
      description: 'Clients, commerçants, livreurs et admin connectés.',
    },
  ];
  homeTestimonials = [
    {
      text: '“Une plateforme intuitive qui facilite la vie !”',
      author: 'Fatima, Cliente régulière',
    },
    {
      text: '“Mes ventes sont mieux gérées depuis que je l\'utilise.”',
      author: 'Sami, Commerçant',
    },
  ];  
}
