import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent implements OnInit {
  @Output() cerrarFormulario = new EventEmitter<void>();
  @Input() productoAEditar: any;
  miFormulario: FormGroup;
  proveedores: any;
  productos: any;
  mensajeExito: string | null = null;

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.miFormulario = this._fb.group({
      id: "",
      Nombre: ['', Validators.required],
      Marca: ['', Validators.required],
      Stock: ['', [Validators.required, Validators.min(0)]],
      Perece: ['0', Validators.required], // Cambié a string '0' por defecto
      Fecha_Vencimiento: [''],
      ProveedorID: ['', [Validators.required, Validators.min(1)]],
      CategoriaSubcategoriaID: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this._apiService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
      console.log('Proveedores cargados:', this.proveedores);
    });

    this._apiService.getProductos().subscribe(productos => {
      this.productos = productos;
      console.log('Productos cargados:', this.productos);
    });
  }

  actualizar() {
    if (this.miFormulario.valid) {
      const idProd = this.miFormulario.value.id;
      const { id, ...productoParaBackend } = this.miFormulario.value;

      // Convertir fecha a null si perece es "No"
      const fechaVencimiento = this.miFormulario.value.Perece === '1'
        ? this.miFormulario.value.Fecha_Vencimiento
        : null;

      const productoFinal = {
        ...productoParaBackend,
        Fecha_Vencimiento: fechaVencimiento
      };

      this._apiService.putProducto(idProd, productoFinal).subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          this.mensajeExito = 'Producto actualizado con éxito.';
          setTimeout(() => (this.mensajeExito = null), 3000);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Ocurrió un error al actualizar el producto.');
        },
      });
    } else {
      alert('Formulario inválido. Por favor, verifique los datos.');
    }
  }

  cargarProducto(id: number) {
    const producto = this.productos.find((prod: any) => prod.productoid === Number(id));
    if (producto) {
      console.log(producto);
      const fechaFormateada = producto.vencimiento && producto.vencimiento !== '-'
        ? this.formatDate(producto.vencimiento)
        : null;

      this.miFormulario.patchValue({
        Nombre: producto.nombre,
        Marca: producto.marca,
        Stock: producto.stock,
        Perece: producto.perece === "Si" ? '1' : '0', // String '1' o '0'
        Fecha_Vencimiento: fechaFormateada,
        ProveedorID: producto.proveedorid,
        CategoriaSubcategoriaID: producto.categoriassubcategoriasid,
      });
    } else {
      alert(`No se encontró un producto con el ID ${id}`);
      this.miFormulario.reset();
    }
  }

  formatDate(date: string): string {
    if (date.includes('-')) {
      return date;
    }
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
}
