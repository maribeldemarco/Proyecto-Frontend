export const listaProductos: Productos[] = [
    {producto_id:1, proveedor_id:1, categoria_subcategoria_id:1, nombre:'Firulais', marca:'Royal caning', stock:10, perece:'0'},
    {producto_id:2, proveedor_id:2, categoria_subcategoria_id:2, nombre:'Menganita', marca:'Pipeta plus', stock:5, perece:'0'},
    {producto_id:3, proveedor_id:3, categoria_subcategoria_id:3, nombre:'Fulgencia', marca:'ATR Toys', stock:15, perece:'0', fecha_vencimiento: new Date(Date.parse('20 Feb 2025'))},
]
export interface Productos {
    producto_id: number;
    proveedor_id: number;
    categoria_subcategoria_id: number;
    nombre: string;
    marca: string;
    stock: number;
    perece: number | string;
    fecha_vencimiento?: Date;
    fecha_vencimiento_formateada?: string;
}