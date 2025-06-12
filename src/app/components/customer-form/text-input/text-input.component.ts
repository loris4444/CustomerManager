import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from '../../../pipes/error-message.pipe'; 
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [TooltipModule, InputTextModule, ErrorMessagePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() inputId!: string;
  @Input() type: string = 'text';
  @Input() tooltipText?: string;

  getErrorMessage(): string {
    if (this.control.hasError('required')) {
      return `Il campo è obbligatorio`;
    }
    if (this.control.hasError('date')) {
      return `Formato email non valido.`;
    }
    return '';
  }
}
