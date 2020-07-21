import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IInscripcion } from "./iinscripcion";

@Injectable({
  providedIn: "root",
})
export class InscripcionesService {
  private apiUrl: string = this.baseUrl + "api/inscripciones";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getInscripciones(): Observable<IInscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<IInscripcion[]>(this.apiUrl);
  }

  getInscripcionById(
    codCurso: number,
    nroLegajo: number
  ): Observable<IInscripcion> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<IInscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo
    );
  }

  getInscripcionesPorAlumno(nroLegajo: number): Observable<IInscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<IInscripcion[]>(this.apiUrl + "/alumnos/" + nroLegajo);
  }

  getInscripcionesPorCurso(codCurso: number): Observable<IInscripcion[]> {
    console.log("HTTP GET: ", this.apiUrl);
    return this.http.get<IInscripcion[]>(this.apiUrl + "/cursos/" + codCurso);
  }

  agregarInscripcion(inscripcion: IInscripcion): Observable<IInscripcion> {
    console.log("HTTP POST: ", this.apiUrl);
    console.log(this.apiUrl);
    return this.http.post<IInscripcion>(this.apiUrl, inscripcion);
  }

  actualizarInscripcion(
    codCurso: number,
    nroLegajo: number,
    inscripcion: IInscripcion
  ): Observable<IInscripcion> {
    console.log("HTTP PUT: ", this.apiUrl);
    inscripcion.codCurso = +codCurso;
    inscripcion.nroLegajo = +nroLegajo;
    return this.http.put<IInscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo,
      inscripcion
    );
  }

  eliminarInscripcion(
    codCurso: number,
    nroLegajo: number
  ): Observable<IInscripcion> {
    console.log("HTTP DELETE: ", this.apiUrl);
    return this.http.delete<IInscripcion>(
      this.apiUrl + "/cursos/" + codCurso + "/alumnos/" + nroLegajo
    );
  }
}
