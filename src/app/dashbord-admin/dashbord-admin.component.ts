import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css',
})
export class DashbordAdminComponent {
  isUsersDropdownOpen = false;
  notifications = [
    { id: 1, message: 'Nouvelle commande reçue', read: false },
    { id: 2, message: 'Mise à jour du système disponible', read: false },
    { id: 3, message: 'Rapport mensuel généré', read: true },
  ];

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  closeDropdowns(): void {
    this.isUsersDropdownOpen = false;
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }
}
