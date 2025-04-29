import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() id!: string;
  @Input() name!: string;
  @Input() required: boolean = true;
  @Input() value:any = '';

  @Output() valueChange = new EventEmitter<any>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
