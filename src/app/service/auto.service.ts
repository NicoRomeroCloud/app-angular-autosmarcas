import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Auto } from '../models/auto';
@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private apiUrl = 'http://localhost:8080/azurian/autos';


  constructor(private http: HttpClient) { }

  // Obtener todos los autos
  obtenerAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  // Obtener un auto por su ID
  obtenerAutoPorId(id: number): Observable<Auto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Auto>(url);
  }

  // Crear un nuevo auto
  crearAuto(auto: Auto): Observable<Auto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Auto>(this.apiUrl, auto, httpOptions);
  }

  // Actualizar un auto existente por su ID
  actualizarAuto(auto: Auto): Observable<Auto> {
    const url = `${this.apiUrl}/${auto.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Auto>(url, auto, httpOptions);
  }

  // Eliminar un auto por su ID
  eliminarAuto(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
