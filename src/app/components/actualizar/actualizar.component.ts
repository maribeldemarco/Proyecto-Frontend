import { Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {
  @Output() cerrarFormulario = new EventEmitter<void>();
  miFormulario: FormGroup;

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.miFormulario = this._fb.group({
    id: 1,
    Nombre: ['', Validators.required],
    Marca: ['', Validators.required],
    Stock: ['', [Validators.required, Validators.min(0)]], 
    Perece: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
    Fecha_Vencimiento: ['', Validators.required], 
    ProveedorID: ['', [Validators.required, Validators.min(1)]], 
    CategoriaSubcategoriaID: ['', [Validators.required, Validators.min(1)]], 
  });
  }


  actualizar() {
      if (this.miFormulario.valid) {            
        
        if (this.miFormulario.value.perece !== 1) {
          this.miFormulario.value.fecha_Vencimiento = null;
        }            
        const idProd = this.miFormulario.value.id;     
        const { id, ...productoParaBackend } = this.miFormulario.value;    
        console.log('Datos enviados al backend:', idProd,productoParaBackend);    

        
        this._apiService.putProducto(idProd, productoParaBackend).subscribe({
          next: (response) => console.log('Producto actualizado:', response),
          error: (err) => console.error('Error al actualizar:', err),
        });

      } else {
       alert('Formulario inválido. Por favor, complete todos los campos.');
      }
  } 
  cancelar() {
    // Emite un evento para cerrar el formulario
    this.cerrarFormulario.emit();
  }
}