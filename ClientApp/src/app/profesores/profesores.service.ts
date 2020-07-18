import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProfesor } from "./IProfesor";
import { IMateria } from "../materias/imateria";

@Injectable({
  providedIn: "root",
})
export class ProfesoresService {
  private apiUrl: string = this.baseUrl + "api/profesores";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getProfesores(): Observable<IProfesor[]> {
    console.log(this.apiUrl);
    return this.http.get<IProfesor[]>(this.apiUrl);
  }

  getProfesorById(codProfesor: number): Observable<IProfesor> {
    console.log(this.apiUrl);
    return this.http.get<IProfesor>(this.apiUrl + "/" + codProfesor);
  }

  getMateriaProfesor(codProfesor: number): Observable<IMateria> {
    return this.http.get<IMateria>(
      this.apiUrl + "/" + codProfesor + "/materia"
    );
  }

  agregarProfesor(profesor: IProfesor): Observable<IProfesor> {
    profesor.profesorId = 0;
    return this.http.post<IProfesor>(this.apiUrl, profesor);
  }

  actualizarProfesor(
    codProfesor: number,
    profesor: IProfesor
  ): Observable<IProfesor> {
    profesor.profesorId = +codProfesor;
    return this.http.put<IProfesor>(this.apiUrl + "/" + codProfesor, profesor);
  }

  eliminarProfesor(codProfesor: number): Observable<IProfesor> {
    return this.http.delete<IProfesor>(this.apiUrl + "/" + codProfesor);
  }
}
