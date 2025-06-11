import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
@Input() color: 'primary' | 'danger' | 'success' = 'primary';
@Input() type: 'button' | 'submit' | 'reset' = 'button';
@Input() disabled = false;

@Output() clicked = new EventEmitter<void>();

onClick(event: Event) {
    this.clicked.emit();
}
}
