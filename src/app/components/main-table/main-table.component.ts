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

  @Input() productosEntrantes?: any[];

  productos: any[] = [];
  selectedProductId!: number | null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productosEntrantes']) {
      const value = changes['productosEntrantes'].currentValue;

      if (Array.isArray(value)) {
        this.productos = value;
        console.log('Productos actualizados:', this.productos);
      } else {
        this.productos = [];
      }
    }
  }

  prepareDelete(productId: number) {
    this.selectedProductId = productId;
  }

  eliminarProducto(productId: number) {
    this.apiService.deleteProduct(productId).subscribe({
      next: () => window.location.reload(),
      error: (err) => console.error(err),
    });
    this.selectedProductId = null;
  }

  cancelarEliminacion() {
    this.selectedProductId = null;
  }
}
