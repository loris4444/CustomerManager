import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-notification-modal',
  imports: [ButtonComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() message = 'Operazione completata!';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
