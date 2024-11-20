import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  @Input() productId!: number; // ID del producto a eliminar
  @Output() onDelete = new EventEmitter<number>(); // Notifica que se confirmó la eliminación
  @Output() onCancel = new EventEmitter<void>(); // Notifica que se canceló la eliminación

  confirmDelete() {
    this.onDelete.emit(this.productId); // Emite el ID para eliminar
  }

  cancelDelete() {
    this.onCancel.emit(); // Notifica que se cancela
  }
}
