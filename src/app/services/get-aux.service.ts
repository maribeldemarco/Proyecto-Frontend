import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAuxService {

  private url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getCategorias() {
    return this._http.get(`${this.url}/categorias`);
  }

  public getSubcategorias() {
    return this._http.get(`${this.url}/subcategorias`);
  }

  public getProveedores() {
    return this._http.get(`${this.url}/proveedores`);
  }

  public getProductos() {
    return this._http.get(`${this.url}/productos`);
  }

  public getProductosByFilters(type: string, filters: string[]) {
    return this._http.get(`${this.url}/productos/${type}${filters.join('/')}`);
  }
}
