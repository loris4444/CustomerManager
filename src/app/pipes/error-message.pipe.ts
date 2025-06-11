import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  pure: true
})
export class ErrorMessagePipe implements PipeTransform {
  transform(control: ValidationErrors | null): string {
    if (!control) {
      return '';
    }

    if (control['required']) {
      return 'Campo obbligatorio.';
    }
    if (control['email']) {
      return 'Formato email non valido.';
    }

    return '';
  }
}
