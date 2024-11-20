import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/actualizar.model';


@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private url = 'http://localhost:3000/productos'
  
    constructor(private _http:HttpClient) { }
  
   
    public putProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
      return this._http.put<Producto>(`${this.url}/${id}`, producto);
    }
  
  }