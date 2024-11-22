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

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.miFormulario = this._fb.group({
      id: 0,
      Nombre: ['', Validators.required],
      Marca: ['', Validators.required],
      Stock: ['', [Validators.required, Validators.min(0)]],
      Perece: ['', [Validators.required, Validators.min(0)]],
      Fecha_Vencimiento: ['', Validators.required],
      ProveedorID: ['', [Validators.required, Validators.min(1)]],
      CategoriaSubcategoriaID: ['', [Validators.required, Validators.min(1)]]
    });
  }

  enviar() {
    if (this.miFormulario.valid) {
      this.producto = {
        Nombre: this.miFormulario.value.Nombre,
        Marca: this.miFormulario.value.Marca,
        Stock: this.miFormulario.value.Stock,
        Perece: this.miFormulario.value.Perece,
        Fecha_Vencimiento: this.miFormulario.value.Fecha_Vencimiento,
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
