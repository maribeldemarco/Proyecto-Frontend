import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProducto } from '../../models/producto.model';
import { ApiService } from '../../services/api.service';
import { listaProductos } from './productos.mock';
@Component({
  selector: 'app-tabla-principal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tabla-principal.component.html',
  styleUrl: './tabla-principal.component.css'
})
export class TablaPrincipalComponent {

  productos = listaProductos;
  /*listadoProductos: IProducto[]= [];

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
      this._apiService.getProducts().subscribe((datos: IProducto[]) => {
        this.listadoProductos = datos; 
      })
  }*/
}
