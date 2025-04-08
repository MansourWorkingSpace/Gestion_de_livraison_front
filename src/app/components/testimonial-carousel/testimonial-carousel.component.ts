import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-carousel.component.html',
  styleUrl: './testimonial-carousel.component.css'
})
export class TestimonialCarouselComponent {
  @Input() testimonials: { text: string; author: string }[] = [];
}
