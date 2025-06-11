import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService {

  constructor() {}
  getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Errore di connessione: il server non è raggiungibile.';
    }

    if (typeof error.error === 'string') {
      return `Errore: ${error.error}`;
    }

    if (error.error?.message) {
      return `Errore: ${error.error.message}`;
    }

    return 'Si è verificato un errore sconosciuto.';
  }
}
