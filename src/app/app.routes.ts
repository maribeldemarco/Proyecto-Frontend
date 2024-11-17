import { Routes } from '@angular/router';
import { TablaPrincipalComponent } from './components/tabla-principal/tabla-principal.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path:'tabla-principal', component:TablaPrincipalComponent},
    {path: '**', redirectTo:'', pathMatch:'full'}
];
