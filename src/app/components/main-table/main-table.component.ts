import { Component, Input, OnInit } from '@angular/core';
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

export class MainTableComponent implements OnInit {
  @Input() productosEntrantes?: any;

  productos: any[] = [];
  selectedProductId!: number | null;
  mostrarActualizar = true;
  productoAEditar: any;
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    console.log(this.productosEntrantes)
    this.productos = this.productosEntrantes.map((producto:any) => ({}));
  }

  prepareDelete(productId: number) {
    this.selectedProductId = productId;
  }

  eliminarProducto(productId: number) {
    console.log(`Eliminando producto con ID: ${productId}`);
    this.apiService.deleteProduct(productId).subscribe({
      next: () => {
        console.log(`Producto con ID ${productId} eliminado.`);
        window.location.reload();
      },
      error: (error) => console.error('Error al eliminar producto:', error),
    });
    this.selectedProductId = null;
  }

  cancelarEliminacion() {
    console.log('Eliminación cancelada');
    this.selectedProductId = null;
  }
}