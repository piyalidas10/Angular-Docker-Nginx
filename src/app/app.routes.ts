import { Routes } from '@angular/router';
import { HomeComponent } from './products/home/home.component';
import { CreateComponent } from './products/create/create.component';
import { EditComponent } from './products/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products/home', pathMatch: 'full' },
  { path: 'products/home', component: HomeComponent },
  { path: 'products/create', component: CreateComponent },
  { path: 'products/edit/:id', component: EditComponent },
];
