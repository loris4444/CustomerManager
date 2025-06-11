import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Customer } from '../../models/customer';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NotificationComponent } from '../shared/notification/notification.component';


@Component({
    selector: 'app-customer-form',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, NotificationComponent, TextInputComponent],
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private customerService = inject(CustomerService);
    private errorHandler = inject(ErrorHandlerService);
    
    customerForm = this.fb.group({
    id: [{ value: '', disabled: false }, Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', Validators.required],
    companyId: ['', Validators.required]
    });

    public isEditMode = false;
    public showNotification = false;
    public notificationMessage = 'Cliente salvato con successo!';

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.isEditMode = true;
            this.customerForm.get('id')?.disable();

            this.customerService.getById(id).subscribe({
            next: (customer) => {
                this.customerForm.patchValue(customer);
            },
            error: (err) => {
                this.notificationMessage = this.errorHandler.getErrorMessage(err);
                this.showNotification = true;
            }
            });
        }
    }

    onSubmit(): void {
        if (this.customerForm.valid) {
            const rawValue = this.customerForm.getRawValue();

            const customer = rawValue as Customer;

            const request = this.isEditMode
            ? this.customerService.update(customer)
            : this.customerService.create(customer);
                
            request.subscribe({
                next: () => {
                    this.notificationMessage = `Cliente salvato con successo!`
                    this.showNotification = true
                },
                error: (err) => {
                    this.notificationMessage = this.errorHandler.getErrorMessage(err);
                    this.showNotification = true;
                }
            });
        }
    }
    get id(): FormControl {
    return this.customerForm.get('id') as FormControl;
    }

    get name(): FormControl {
      return this.customerForm.get('name') as FormControl;
    }

    get surname(): FormControl {
      return this.customerForm.get('surname') as FormControl;
    }

    get email(): FormControl {
      return this.customerForm.get('email') as FormControl;
    }

    get birthdate(): FormControl {
      return this.customerForm.get('birthdate') as FormControl;
    }

    get companyId(): FormControl {
      return this.customerForm.get('companyId') as FormControl;
    }
}
