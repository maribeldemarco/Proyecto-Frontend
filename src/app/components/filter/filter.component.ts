import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GetAuxService } from '../../services/get-aux.service';
import { FormsModule } from '@angular/forms';
import { MainTableComponent } from '../main-table/main-table.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, MainTableComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  categorias: any[] = [];
  subcategorias: any[] = [];
  proveedores: any[] = [];

  filtrosElegidos = {
    categoria: 'Todos',
    subcategoria: 'Todos',
    proveedor: 'Todos',
  };

  icono = 'fas fa-solid fa-eraser';
  resetBtnDisabled = false;
  productos: any[] = [];

  constructor(
    private _api: GetAuxService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    forkJoin({
      categorias: this._api.getCategorias(),
      subcategorias: this._api.getSubcategorias(),
      proveedores: this._api.getProveedores()
    }).subscribe({
      next: (data) => {
        this.categorias = Array.isArray(data.categorias) ? data.categorias : [];
        this.subcategorias = Array.isArray(data.subcategorias) ? data.subcategorias : [];
        this.proveedores = Array.isArray(data.proveedores) ? data.proveedores : [];

        this.cdr.detectChanges();
        this.mostrarProductos();
      },
      error: (error) => {
        console.error('Error al cargar filtros:', error);
        setTimeout(() => this.cargar(), 2000);
      }
    });
  }

  mostrarProductos() {
    let filters: string[] = [];
    let filtersType: string[] = [];

    if (this.filtrosElegidos.categoria && this.filtrosElegidos.categoria !== 'Todos') {
      filtersType.push('categoria');
      filters.push(this.filtrosElegidos.categoria);
    }
    if (this.filtrosElegidos.subcategoria && this.filtrosElegidos.subcategoria !== 'Todos') {
      filtersType.push('subcategoria');
      filters.push(this.filtrosElegidos.subcategoria);
    }
    if (this.filtrosElegidos.proveedor && this.filtrosElegidos.proveedor !== 'Todos') {
      filtersType.push('proveedor');
      filters.push(this.filtrosElegidos.proveedor);
    }

    let filterType = filtersType.join('Y');
    if (filters.length > 0) {
      filterType += '/';
    }

    this._api.getProductosByFilters(filterType, filters).subscribe({
      next: (data: any) => {
        this.productos = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.productos = [];
      }
    });
  }

  resetSelects() {
    this.filtrosElegidos.categoria = 'Todos';
    this.filtrosElegidos.subcategoria = 'Todos';
    this.filtrosElegidos.proveedor = 'Todos';

    this.icono = 'fas fa-solid fa-spinner';
    this.resetBtnDisabled = true;

    setTimeout(() => {
      this.mostrarProductos();
      this.icono = 'fas fa-solid fa-eraser';
      this.resetBtnDisabled = false;
    }, 2000);
  }
}
