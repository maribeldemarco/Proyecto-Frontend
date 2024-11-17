import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private url = 'http://localhost:3000/productos';

    constructor(private _http:HttpClient) {}

    public getProducts():Observable<IProducto[]> {
        return this._http.get<IProducto[]>(this.url);
    }
}