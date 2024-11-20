import { Routes } from '@angular/router';
import { MainTableComponent } from './components/main-table/main-table.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path:'main-table', component:MainTableComponent},
    {path: '**', redirectTo:'', pathMatch:'full'}
];
