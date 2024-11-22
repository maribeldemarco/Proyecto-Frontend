import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../models/producto.model';
import { Producto } from '../models/agregar.model';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private url = 'http://localhost:3000'
  constructor(private _http:HttpClient) { }
 
   public putProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
      return this._http.put<Producto>(`${this.url}/productos/${id}`, producto);
    }

    public getProveedores() {
      return this._http.get(`${this.url}/proveedores`);
    }
    
    public getProductos() {
      return this._http.get(`${this.url}/productos`);   } 

    public getProducts():Observable<IProducto[]> {
        return this._http.get<IProducto[]>(`${this.url}/productos`);
    }

    public deleteProduct(productId: number):Observable<IProducto>{
      return this._http.delete<IProducto>(`${this.url}/productos/${productId}`);
    }
    public postProducto(producto: Producto):Observable<Producto> {
      return this._http.post<Producto>(`${this.url}/productos`, producto);
    }
}