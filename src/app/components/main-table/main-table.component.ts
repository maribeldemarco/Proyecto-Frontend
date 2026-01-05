import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [CommonModule, DeleteProductComponent],
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
})
export class MainTableComponent implements OnChanges {

  @Input() productosEntrantes: any[] = [];

  productos: any[] = [];
  selectedProductId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productosEntrantes']) {
      const value = changes['productosEntrantes'].currentValue;

      if (Array.isArray(value)) {
        // Copiamos el array para evitar mutaciones raras
        this.productos = [...value];
        console.log('Productos actualizados:', this.productos);
      } else {
        this.productos = [];
      }
    }
  }

prepareDelete(productId: number) {
  this.selectedProductId = productId;  // ← PRIMERO actualiza
  setTimeout(() => {  // ← DESPUÉS abre
    const modalEl = document.getElementById('deleteModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }, 0);
}
  eliminarProducto(productId: number) {
    this.apiService.deleteProduct(productId).subscribe({
      next: () => {
        // Eliminamos el producto sin recargar la página
        this.productos = this.productos.filter(
          p => p.productoid !== productId
        );
      },
      error: err => console.error(err),
    });

    this.selectedProductId = null;
  }

  cancelarEliminacion() {
    this.selectedProductId = null;
  }
}
