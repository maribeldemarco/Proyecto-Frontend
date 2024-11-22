import { Routes } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inventario',component: FilterComponent},
  { path: 'editar-producto',component: ActualizarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
