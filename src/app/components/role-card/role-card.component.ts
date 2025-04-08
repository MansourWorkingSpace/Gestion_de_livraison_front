import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './role-card.component.html',
  styleUrl: './role-card.component.css'
})
export class RoleCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;
}
