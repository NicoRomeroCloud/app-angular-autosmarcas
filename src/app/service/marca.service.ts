import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private baseUrl = 'http://localhost:8080/azurian';

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.baseUrl}/marcas`);
  }

  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.baseUrl}/marcas/${id}`);
  }

  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.baseUrl}/postmarcas`, marca);
  }

  updateMarca(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.baseUrl}/marcas/${id}`, marca);
  }


  deleteMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/marcas/${id}`);
  }

}
