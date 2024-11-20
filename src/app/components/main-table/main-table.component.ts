import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeleteProductComponent } from '../delete-product/delete-product.component'; // Importa el componente
import { listaProductos } from './productos.mock';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteProductComponent], // Añade aquí
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
})
export class MainTableComponent implements OnInit {
  productos: any[] = [];
  selectedProductId!: number | null;

  ngOnInit(): void {
    this.productos = listaProductos.map((producto) => ({
      ...producto,
      fecha_vencimiento_formateada: producto.fecha_vencimiento
        ? producto.fecha_vencimiento.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : null,
    }));
  }

  prepareDelete(productId: number) {
    this.selectedProductId = productId;
  }

  eliminarProducto(productId: number) {
    console.log(`Eliminando producto con ID: ${productId}`);
    this.productos = this.productos.filter(
      (producto) => producto.producto_id !== productId
    );
    this.selectedProductId = null;
  }

  cancelarEliminacion() {
    console.log('Eliminación cancelada');
    this.selectedProductId = null;
  }
}
