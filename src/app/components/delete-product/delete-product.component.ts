import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  @Input() productId!: number;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();

  confirmDelete() {
    this.onDelete.emit(this.productId);
  }

  cancelDelete() {
    this.onCancel.emit();
  }
}
