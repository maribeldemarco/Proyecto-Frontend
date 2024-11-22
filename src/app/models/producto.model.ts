export interface IProducto {
    PRODUCTO_ID: number;
    PROVEEDOR_ID: number;
    CATEGORIA_SUBCATEGORIA_ID: number;
    NOMBRE: string;
    MARCA: string;
    STOCK: number;
    PERECE: boolean;
    FECHA_VENCIMIENTO: Date;
}