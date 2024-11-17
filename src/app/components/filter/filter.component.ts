import { Component, OnInit } from '@angular/core';
import { GetAuxService } from '../../services/get-aux.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  categorias: any;
  subcategorias: any;
  proveedores: any;

  categoriaElegida = '';
  subcategoriaElegida = '';
  proveedorElegido = '';

  constructor(private _api: GetAuxService) {}

  ngOnInit(): void {
    this.cargar();
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

  mostrarSelect() {
    alert(`
      Categoria elegida: ${this.categoriaElegida}\n
      Subcategoria elegida: ${this.subcategoriaElegida}\n
      Proveedor elegido: ${this.proveedorElegido}
    `);
  }
}
