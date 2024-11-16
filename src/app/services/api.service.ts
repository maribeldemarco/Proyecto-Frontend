import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/agregar.model';


@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private url = 'http://127.0.0.1:3000/productos'
  
    constructor(private _http:HttpClient) { }
  
   
    public postProducto(producto: Producto):Observable<Producto> {
      return this._http.post<Producto>(`${this.url}`, producto);
    }
  
   
  
  
  }