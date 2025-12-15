export class ActualizarComponent {
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
      Perece: [0, [Validators.required, Validators.min(0)]], // 👈 NUMÉRICO
      Fecha_Vencimiento: [''],
      ProveedorID: [null, Validators.required],
      CategoriaSubcategoriaID: [null]
    });
  }

  ngOnInit() {
    this.api.getProveedores().subscribe(p => this.proveedores = p);
    this.api.getProductos().subscribe(p => this.productos = p);
  }

  cargarProducto(id: number) {
    const producto = this.productos.find(
      p => p.productoid === Number(id)
    );

    if (!producto) {
      alert(`No se encontró el producto ${id}`);
      return;
    }

    this.miFormulario.patchValue({
      Nombre: producto.nombre,
      Marca: producto.marca,
      Stock: producto.stock,
      Perece: producto.perece, // 👈 NÚMERO
      Fecha_Vencimiento: this.formatearFecha(producto.vencimiento),
      ProveedorID: producto.proveedorid,
      CategoriaSubcategoriaID: producto.categoriassubcategoriasid
    });
  }

  actualizar() {
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

  formatearFecha(fecha: string) {
    if (!fecha) return null;
    const [d, m, y] = fecha.split('/');
    return `${y}-${m}-${d}`;
  }
}
