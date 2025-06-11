import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { ViewCustomer } from '../../models/viewcustomer';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { NotificationComponent } from '../shared/notification/notification.component';


@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, RouterModule, ButtonComponent, NotificationComponent],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  private customerService = inject(CustomerService);
  private errorHandler = inject(ErrorHandlerService);

  public customers: ViewCustomer[] = [];
  public showNotification = false;
  public notificationMessage = '';

  ngOnInit() {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        if (this.customers.length === 0) {
          this.noClients();
        }
      },
      error: (error) => {
        this.notificationMessage = this.errorHandler.getErrorMessage(error);
        this.showNotification = true;
      }
    });
  }
  
  noClients() {
    this.notificationMessage = "Non sono presenti clienti";
    this.showNotification = true;
  }

  deleteCustomer(id: string) {
    this.customerService.delete(id).subscribe(() => {
      this.notificationMessage = "Cliente eliminato con successo!";
      this.showNotification = true;
      this.customers = this.customers.filter(customer => customer.id !== id);
    });
  }
}
