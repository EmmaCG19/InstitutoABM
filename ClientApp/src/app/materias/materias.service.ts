import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IMateria } from "./imateria";

@Injectable({
  providedIn: "root",
})
export class MateriasService {
  private apiUrl = this.baseUrl + "api/materias";
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getMaterias(): Observable<IMateria[]> {
    console.log(this.apiUrl);
    return this.http.get<IMateria[]>(this.apiUrl);
  }

  getMateria(codMateria: number): Observable<IMateria> {
    console.log(this.apiUrl);
    return this.http.get<IMateria>(this.apiUrl + "/" + codMateria);
  }

  crearMateria(materia: IMateria): Observable<IMateria> {
    materia.codMateria = 0;
    return this.http.post<IMateria>(this.apiUrl, materia);
  }

  actualizarMateria(
    codMateria: number,
    materia: IMateria
  ): Observable<IMateria> {
    console.log(this.apiUrl);
    console.log(codMateria, materia);
    materia.codMateria = +codMateria;
    return this.http.put<IMateria>(this.apiUrl + "/" + codMateria, materia);
  }

  deleteMateria(codMateria: number): Observable<IMateria> {
    console.log(this.apiUrl);
    return this.http.delete<IMateria>(this.apiUrl + "/" + codMateria);
  }
}
