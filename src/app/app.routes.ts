import { Routes } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { ComponenteAgregarComponent } from './components/componente-agregar/componente-agregar.component';

export const routes: Routes = [
  {path:'agregarproducto', component:ComponenteAgregarComponent},
  { path: 'home', component: HomeComponent },
  { path: 'inventario',component: FilterComponent},
  { path: 'editar-producto',component: ActualizarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
