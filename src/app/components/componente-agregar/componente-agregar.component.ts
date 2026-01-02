import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/agregar.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-componente-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './componente-agregar.component.html',
  styleUrls: ['./componente-agregar.component.css']
})
export class ComponenteAgregarComponent {
  miFormulario: FormGroup;
  producto?: Producto;
  mensaje: string | null = null;
  exito: boolean = false;

  subcategorias = [
    { id: 49, nombre: 'Perros - Alimentos' },
    { id: 50, nombre: 'Perros - Accesorios' },
    { id: 51, nombre: 'Perros - Estética e Higiene' },
    { id: 52, nombre: 'Perros - Salud' },
    { id: 53, nombre: 'Gatos - Alimentos' },
    { id: 54, nombre: 'Gatos - Accesorios' },
    { id: 55, nombre: 'Gatos - Estética e Higiene' },
    { id: 56, nombre: 'Gatos - Salud' },
    { id: 57, nombre: 'Conejos - Alimentos' },
    { id: 58, nombre: 'Conejos - Accesorios' },
    { id: 59, nombre: 'Conejos - Estética e Higiene' },
    { id: 60, nombre: 'Conejos - Salud' },
    { id: 61, nombre: 'Peces - Alimentos' },
    { id: 62, nombre: 'Peces - Accesorios' },
    { id: 63, nombre: 'Peces - Estética e Higiene' },
    { id: 64, nombre: 'Peces - Salud' },
    { id: 65, nombre: 'Aves - Alimentos' },
    { id: 66, nombre: 'Aves - Accesorios' },
    { id: 67, nombre: 'Aves - Estética e Higiene' },
    { id: 68, nombre: 'Aves - Salud' }
  ];

  // AGREGA ESTO 👇
  proveedores = [
    { id: 1, nombre: 'PetWorld' },
    { id: 2, nombre: 'Mascotas Felices' },
    { id: 3, nombre: 'Animalia' },
    { id: 4, nombre: 'ZooPlus' },
    { id: 5, nombre: 'Happy Pets' },
    { id: 6, nombre: 'Pet Kingdom' }
  ];

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.miFormulario = this._fb.group({
      id: 0,
      Nombre: ['', Validators.required],
      Marca: ['', Validators.required],
      Stock: ['', [Validators.required, Validators.min(0)]],
      Perece: ['0', Validators.required],
      Fecha_Vencimiento: [''],
      ProveedorID: ['', [Validators.required, Validators.min(1)]],
      CategoriaSubcategoriaID: ['', [Validators.required, Validators.min(1)]]
    });
  }

  enviar() {
    if (this.miFormulario.valid) {
      const fechaVencimiento = this.miFormulario.value.Perece === '1'
        ? this.miFormulario.value.Fecha_Vencimiento
        : null;

      this.producto = {
        Nombre: this.miFormulario.value.Nombre,
        Marca: this.miFormulario.value.Marca,
        Stock: this.miFormulario.value.Stock,
        Perece: this.miFormulario.value.Perece,
        Fecha_Vencimiento: fechaVencimiento,
        ProveedorID: this.miFormulario.value.ProveedorID,
        CategoriaSubcategoriaID: this.miFormulario.value.CategoriaSubcategoriaID
      };

      this._apiService.postProducto(this.producto).subscribe({
        next: (respuesta) => {
          this.mensaje = 'Producto agregado correctamente';
          this.exito = true;
          this.miFormulario.reset();
        },
        error: (error) => {
          this.mensaje = 'Error al agregar el producto, verifique la información';
          this.exito = false;
          console.error('Error al agregar el producto:', error);
        }
      });
    } else {
      this.mensaje = 'Formulario incompleto';
      this.exito = false;
      console.error('Formulario invalido', this.miFormulario.errors);
    }
  }
}
