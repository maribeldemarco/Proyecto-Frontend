import { Routes } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { AgregarComponent } from './components/agregar/agregar.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inventario',component: FilterComponent},
  { path: 'agregar-producto', component: AgregarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
