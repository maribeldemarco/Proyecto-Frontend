import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {
  @Output() cerrarFormulario = new EventEmitter<void>();
  @Input() productoAEditar: any; //cuando llegue el de Guada
  miFormulario: FormGroup;
  proveedores: any;
  productos: any;

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.miFormulario = this._fb.group({
    id: "",
    Nombre: ['', Validators.required],
    Marca: ['', Validators.required],
    Stock: ['', [Validators.required, Validators.min(0)]], 
    Perece: [0],
    Fecha_Vencimiento: [''],
    ProveedorID: ['', [Validators.required, Validators.min(1)]], 
    CategoriaSubcategoriaID: ['', [Validators.required, Validators.min(1)]], 
  });  
  }

    ngOnInit() {
      this._apiService.getProveedores().subscribe(proveedores => {
        this.proveedores = proveedores;
      });

      this._apiService.getProductos().subscribe(productos => {
        this.productos = productos;
      });        
    }

  actualizar()  {
    if (this.miFormulario.valid) {
        const idProd = this.miFormulario.value.id;
        const { id  ,  ...productoParaBackend } = this.miFormulario.value;       
        console.log('Datos enviados al backend:', idProd, productoParaBackend);

        this._apiService.putProducto(idProd, productoParaBackend).subscribe({
            next: (response) => console.log('Producto actualizado:', response),
            error: (err) => console.error('Error al actualizar:', err),
        });
    } else {
        alert('Formulario inválido. Por favor, verifique los datos.');
    }

  }
  cancelar() {
    // Emite un evento para cerrar el formulario
    this.cerrarFormulario.emit();    
  }

  //CARGAR LOS PRODUCTOS EN EL FORMULARIO
  cargarProducto(id: number) {
    const producto = this.productos.find((prod: any) => prod.ProductoID === id);  
    if (producto) {
      console.log(producto);  
      // Convertir la fecha al formato ISO (yyyy-MM-dd)
      const fechaFormateada = producto.Vencimiento ? this.formatDate(producto.Vencimiento) : null;
  
      // Cargar los valores en el formulario
      this.miFormulario.patchValue({
        Nombre: producto.Nombre,
        Marca: producto.Marca,
        Stock: producto.Stock,
        Perece: producto.Perece === "Si" ? 1 : 0,
        Fecha_Vencimiento: fechaFormateada,
        ProveedorID: producto.ProveedorID,
        CategoriaSubcategoriaID: producto.CategoriasSubcategoriasID,
      });
    } else {      
      alert(`No se encontró un producto con el ID ${id}`);
      this.miFormulario.reset();
    }
  }

  formatDate(date: string): string {
    // Verificar si la fecha ya está en formato ISO (yyyy-MM-dd)
    if (date.includes('-')) {
      return date; // Ya está en el formato correcto
    }
    // Convertir la fecha al formato dd/MM/yyyy a Formato yyyy-MM-dd
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Formato yyyy-MM-dd
  }
}