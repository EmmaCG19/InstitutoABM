import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Iinscripcion } from "./iinscripcion";

@Injectable({
  providedIn: "root",
})
export class InscripcionesService {
  private apiUrl: string = this.baseUrl + "api/inscripciones";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getInscripciones(): Observable<Iinscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<Iinscripcion[]>(this.apiUrl);
  }

  getInscripcionById(
    codCurso: number,
    nroLegajo: number
  ): Observable<Iinscripcion> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<Iinscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo
    );
  }

  getInscripcionesPorAlumno(nroLegajo: number): Observable<Iinscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<Iinscripcion[]>(this.apiUrl + "/alumnos/" + nroLegajo);
  }

  getInscripcionesPorCurso(codCurso: number): Observable<Iinscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<Iinscripcion[]>(this.apiUrl + "/cursos/" + codCurso);
  }

  agregarInscripcion(inscripcion: Iinscripcion): Observable<Iinscripcion> {
    console.log("HTTP POST: ", this.apiUrl);
    console.log(this.apiUrl);
    return this.http.post<Iinscripcion>(this.apiUrl, inscripcion);
  }

  actualizarInscripcion(
    codCurso: number,
    nroLegajo: number,
    inscripcion: Iinscripcion
  ): Observable<Iinscripcion> {
    console.log("HTTP PUT: ", this.apiUrl);
    inscripcion.codCurso = +codCurso;
    inscripcion.nroLegajo = +nroLegajo;
    return this.http.put<Iinscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo,
      inscripcion
    );
  }

  eliminarInscripcion(
    codCurso: number,
    nroLegajo: number
  ): Observable<Iinscripcion> {
    console.log("HTTP DELETE: ", this.apiUrl);
    return this.http.delete<Iinscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo
    );
  }
}
