import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'create', component: CustomerFormComponent },
  { path: 'edit/:id', component: CustomerFormComponent },
];
