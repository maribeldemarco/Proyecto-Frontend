import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../components/root/app.component';

@Injectable({
  providedIn: 'root'
})

export class GetAuxService {
  private url = 'http://127.0.0.1:3000'

  constructor(private _http:HttpClient) { }

  public getCategorias() {
    return this._http.get(`${this.url}/categorias`);
  }

  public getSubcategorias() {
    return this._http.get(`${this.url}/subcategorias`);
  }

  public getProveedores() {
    return this._http.get(`${this.url}/proveedores`);
  }

  public test() {
    console.log(AppComponent.arguments);
    console.log(typeof AppComponent);
  }
}
