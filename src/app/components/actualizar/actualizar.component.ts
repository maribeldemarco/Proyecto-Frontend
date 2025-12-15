import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'] // CORREGIDO
})
export class ActualizarComponent implements OnInit {
  @Output() cerrarFormulario = new EventEmitter<void>();
  @Input() productoAEditar: any;

  miFormulario: FormGroup;
  proveedores: any[] = [];
  productos: any[] = [];
  mensajeExito: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.miFormulario = this.fb.group({
      id: [''],
      Nombre: ['', Validators.required],
      Marca: ['', Validators.required],
      Stock: [0, [Validators.required, Validators.min(0)]],
      Perece: [0, [Validators.required, Validators.min(0)]], // NUMÉRICO
      Fecha_Vencimiento: [''],
      ProveedorID: [null, Validators.required],
      CategoriaSubcategoriaID: [null]
    });
  }

  ngOnInit(): void {
    this.api.getProveedores().subscribe((p: any[]) => this.proveedores = p);
    this.api.getProductos().subscribe((p: any[]) => this.productos = p);

    // Si llega un producto para editar desde Input
    if (this.productoAEditar) {
      this.cargarProducto(this.productoAEditar.id || this.productoAEditar.ProductoID);
    }
  }

  cargarProducto(id: number): void {
    const producto = this.productos.find(p => p.ProductoID === Number(id) || p.productoid === Number(id));

    if (!producto) {
      alert(`No se encontró el producto ${id}`);
      this.miFormulario.reset();
      return;
    }

    const fechaFormateada = producto.Vencimiento ? this.formatDate(producto.Vencimiento) : '';

    this.miFormulario.patchValue({
      Nombre: producto.Nombre || producto.nombre,
      Marca: producto.Marca || producto.marca,
      Stock: producto.Stock,
      Perece: producto.Perece || 0,
      Fecha_Vencimiento: fechaFormateada,
      ProveedorID: producto.ProveedorID || producto.proveedorid,
      CategoriaSubcategoriaID: producto.CategoriasSubcategoriasID || producto.categoriassubcategoriasid
    });
  }

  actualizar(): void {
    if (this.miFormulario.invalid) {
      alert('Formulario inválido. Por favor, verifique los datos.');
      return;
    }

    const { id, ...productoParaBackend } = this.miFormulario.value;
    this.api.putProducto(id, productoParaBackend).subscribe({
      next: () => {
        this.mensajeExito = 'Producto actualizado con éxito.';
        setTimeout(() => (this.mensajeExito = null), 3000);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Ocurrió un error al actualizar el producto.');
      }
    });
  }

  cancelar(): void {
    this.miFormulario.reset({
      id: '',
      Nombre: '',
      Marca: '',
      Stock: 0,
      Perece: 0,
      Fecha_Vencimiento: '',
      ProveedorID: null,
      CategoriaSubcategoriaID: null
    });
    this.cerrarFormulario.emit();
  }

  formatDate(date: string): string {
    if (!date) return '';
    if (date.includes('-')) return date; // ya está en ISO
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
}
