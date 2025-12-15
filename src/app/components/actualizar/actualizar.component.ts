import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
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
    this.api.getProveedores().subscribe((p: any) => this.proveedores = p);
    this.api.getProductos().subscribe((p: any) => this.productos = p);
  }

  cargarProducto(id: number): void {
    const producto = this.productos.find(p => p.productoid === Number(id));

    if (!producto) {
      alert(`No se encontró el producto ${id}`);
      return;
    }

    this.miFormulario.patchValue({
      Nombre: producto.nombre,
      Marca: producto.marca,
      Stock: producto.stock,
      Perece: producto.perece, // NUMÉRICO
      Fecha_Vencimiento: this.formatearFecha(producto.vencimiento),
      ProveedorID: producto.proveedorid,
      CategoriaSubcategoriaID: producto.categoriassubcategoriasid
    });
  }

  actualizar(): void {
    if (this.miFormulario.invalid) {
      alert('Formulario inválido');
      return;
    }

    const { id, ...body } = this.miFormulario.value;

    this.api.putProducto(id, body).subscribe(() => {
      this.mensajeExito = 'Producto actualizado correctamente';
      setTimeout(() => this.mensajeExito = null, 3000);
    });
  }

  formatearFecha(fecha: string | null): string | null {
    if (!fecha) return null;
    const [d, m, y] = fecha.split('/');
    return `${y}-${m}-${d}`;
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
  }
}
