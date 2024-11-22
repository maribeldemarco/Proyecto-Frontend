import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetAuxService } from '../../services/get-aux.service';
import { FormsModule } from '@angular/forms';
// import { MainTableComponent } from "../main-table/main-table.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, /*MainTableComponent*/],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  categorias: any;
  subcategorias: any;
  proveedores: any;

  filtrosElegidos = {
    categoria: 'Todos',
    subcategoria: 'Todos',
    proveedor: 'Todos',
  };

  productos: any;

  constructor(private _api: GetAuxService) {}

  ngOnInit(): void {
    this.cargar();
    this.mostrarProductos();
  }

  async cargarCategorias() {
    this._api.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: () => {
        this.cargarCategorias();
      },
    });
  }

  async cargarSubcategorias() {
    this._api.getSubcategorias().subscribe({
      next: (data) => {
        this.subcategorias = data;
      },
      error: () => {
        this.cargarSubcategorias();
      },
    });
  }

  async cargarProveedores() {
    this._api.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: () => {
        this.cargarProveedores();
      },
    });
  }

  async cargar() {
    this.cargarCategorias().then(() =>
      this.cargarSubcategorias().then(() =>
        this.cargarProveedores())
    );
  }

  mostrarProductos() {
    let filters = [];
    let filtersType = [];
    if (this.filtrosElegidos.categoria != 'Todos') {
      filtersType.push('categoria');
      filters.push(this.filtrosElegidos.categoria);
    }
    if (this.filtrosElegidos.subcategoria != 'Todos') {
      filtersType.push('subcategoria');
      filters.push(this.filtrosElegidos.subcategoria);
    }
    if (this.filtrosElegidos.proveedor != 'Todos') {
      filtersType.push('proveedor');
      filters.push(this.filtrosElegidos.proveedor);
    }
    let filterType = filtersType.join('Y');
    if (filters.length > 0) {
      filterType += '/';
    }
    this._api.getProductosByFilters(filterType, filters).subscribe({
      next: (data) => {
        this.productos = data;
        console.log(data);
      }
    });
  }
}
