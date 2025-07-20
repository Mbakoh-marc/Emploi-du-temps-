import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';
import { Classe } from '../models/classe';
import { Matiere } from '../models/matiere';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/cours`);
  }

  addCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.baseUrl}/cours`, cours);
  }

  updateCours(id: number, cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.baseUrl}/cours/${id}`, cours);
  }

  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cours/${id}`);
  }

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/classes`);
  }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.baseUrl}/matieres`);
  }

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.baseUrl}/salles`);
  }
  getCoursBySalle(salleId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/salles/${salleId}/cours`);
  }


}

